/* Oldham College Digital Labs - Python (Pyodide) worker. Runs learner code off the page so it can be stopped. */
const BASE=self.location.href.replace(/[^/]*$/,'');
importScripts(BASE+'pyodide.js');
let PY=null,ready=null,pend={},seq=0,JSPI=typeof WebAssembly.Suspending==='function';
function post(m){self.postMessage(m);}
self.ocImg=function(b){post({t:'img',id:self.ocJob,b:String(b)});};
function boot(pk){if(!ready)ready=(async()=>{PY=await loadPyodide({indexURL:BASE});await PY.loadPackage(pk||['pandas','matplotlib'],{messageCallback:()=>{},errorCallback:()=>{}});
  PY.runPython(`
import sys, io, base64, builtins, os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
_oc_figs=[]
def _oc_show(*a, **k):
    for n in plt.get_fignums():
        f=plt.figure(n); b=io.BytesIO(); f.savefig(b, format="png", dpi=96, bbox_inches="tight"); _oc_figs.append(base64.b64encode(b.getvalue()).decode())
        try:
            import js
            js.ocImg(_oc_figs[-1])
        except Exception:
            pass
    plt.close("all")
plt.show=_oc_show
def _oc_collect():
    _oc_show()
    out=list(_oc_figs); _oc_figs.clear(); return out
os.chdir("/home/pyodide")
if "/home/pyodide" not in sys.path: sys.path.insert(0, "/home/pyodide")
`);return true;})();return ready;}
/* input(): ask the page and wait (JSPI), or read from the pre-typed lines */
let LINES=[],INTERACTIVE=false;
self.ocAsk=function(prompt){return new Promise(res=>{const id=++seq;pend[id]=res;post({t:'input',id,job:self.ocJob,prompt:String(prompt||'')});});};
self.onmessage=async e=>{const m=e.data;
  if(m.t==='answer'){const r=pend[m.id];delete pend[m.id];if(r)r(m.value);return;}
  if(m.t==='boot'){try{await boot(m.packages);post({t:'booted',jspi:JSPI});}catch(err){post({t:'bootfail',err:String(err)});}return;}
  if(m.t==='run'){try{await boot();}catch(err){post({t:'done',id:m.id,ok:false,err:'Python could not start: '+err});return;}
    const out=[];const flush=s=>{out.push(s);post({t:'out',id:m.id,s:s+'\n'});};
    PY.setStdout({batched:flush});PY.setStderr({batched:flush});
    for(const [n,txt] of Object.entries(m.files||{})){PY.FS.writeFile('/home/pyodide/'+n,txt);}
    for(const n of (m.remove||[])){try{PY.FS.unlink('/home/pyodide/'+n);}catch(x){}}
    for(const [n,txt] of Object.entries(m.modules||{})){PY.FS.writeFile('/home/pyodide/'+n,txt);}
    LINES=(m.stdin||[]).slice();INTERACTIVE=!!m.interactive&&JSPI;
    const g=PY.globals.get('dict')();g.set('__name__',m.name||'__main__');
    try{
      PY.runPython(`
import builtins, sys, importlib
importlib.invalidate_caches()
for _m in [k for k in list(sys.modules) if k in ${JSON.stringify(Object.keys(m.modules||{}).map(x=>x.replace(/\.py$/,'')))}]:
    del sys.modules[_m]
`);
      self.ocLines=LINES;self.ocInteractive=INTERACTIVE;self.ocJob=m.id;
      PY.runPython(`
import builtins, js
from pyodide.ffi import run_sync
def _oc_input(prompt=""):
    if js.ocInteractive:
        return str(run_sync(js.ocAsk(str(prompt))) or "")
    print(prompt, end="")
    if js.ocLines.length == 0:
        print()
        raise EOFError("the program asked for more input than was typed in the Input box")
    v = js.ocLines.shift()
    v = "" if v is None else str(v)
    print(v)
    return v
builtins.input=_oc_input
`);
      if(m.pre)await PY.runPythonAsync(m.pre,{globals:g,filename:'<setup>'});
      await PY.runPythonAsync(m.code,{globals:g,filename:m.fname||'main.py'});
      const imgs=PY.globals.get('_oc_collect')().toJs();post({t:'done',id:m.id,ok:true,out:out.join('\n'),images:imgs,vars:m.probe?probe(g,'_oc_dump(lambda: '+m.probe+')'):null});}
    catch(err){let imgs=[];try{imgs=PY.globals.get('_oc_collect')().toJs();}catch(x){}const msg=clean(String(err&&err.message||err));
      post({t:'done',id:m.id,ok:false,out:out.join('\n'),err:msg.trim(),images:imgs,eof:/EOFError/.test(msg)});}
    finally{try{g.destroy();}catch(x){}}}};
function probe(g,code){try{return PY.runPython(code,{globals:g});}catch(e){return 'ERR '+String(e.message||e).split('\n').filter(Boolean).pop();}}
/* keep only the learner's own frames in a traceback */
function clean(t){t=t.replace(/^PythonError: /,'');const L=t.split('\n'),o=[];let skip=false;
  for(const l of L){if(/^  File "/.test(l)){skip=/File "(\/lib\/|<exec>|<setup>)/.test(l);if(!skip)o.push(l);continue;}
    if(/^    /.test(l)){if(!skip)o.push(l);continue;}skip=false;o.push(l);}
  return o.join('\n').replace(/\/home\/pyodide\//g,'').trim();}
