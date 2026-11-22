/* Oldham College Digital Labs - Python Notebook kernel (Pyodide). One persistent namespace, like a Jupyter kernel. */
const BASE=self.location.href.replace(/[^/]*$/,'');
importScripts(BASE+'pyodide.js');
let PY=null,ready=null;
function post(m){self.postMessage(m);}
self.ocImg=function(b){post({t:'img',id:self.ocJob,b:String(b)});};
function boot(){if(!ready)ready=(async()=>{PY=await loadPyodide({indexURL:BASE});await PY.loadPackage(['pandas','matplotlib'],{messageCallback:()=>{},errorCallback:()=>{}});
  PY.runPython(`
import sys, io, base64, os, ast, json
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
os.makedirs("/home/pyodide", exist_ok=True)
os.chdir("/home/pyodide")
pd.set_option("display.max_columns", 30)
def _oc_show(*a, **k):
    import js
    for n in plt.get_fignums():
        f=plt.figure(n); b=io.BytesIO(); f.savefig(b, format="png", dpi=96, bbox_inches="tight")
        js.ocImg(base64.b64encode(b.getvalue()).decode())
    plt.close("all")
plt.show=_oc_show
NS={"__name__":"__main__"}
def _oc_display(v):
    if v is None: return None
    try:
        if isinstance(v,(pd.DataFrame,)):
            return {"html":v.to_html(max_rows=30,max_cols=20,border=0,classes="nbdf"),"text":""}
        if isinstance(v,pd.Series):
            return {"html":v.to_frame().to_html(max_rows=30,border=0,classes="nbdf"),"text":""}
    except Exception:
        pass
    return {"text":repr(v)}
def _oc_run(src):
    tree=ast.parse(src,"<cell>","exec")
    last=None
    if tree.body and isinstance(tree.body[-1],ast.Expr):
        last=ast.Expression(tree.body.pop().value)
    exec(compile(tree,"<cell>","exec"),NS)
    res=None
    if last is not None:
        res=eval(compile(last,"<cell>","eval"),NS)
    if plt.get_fignums(): _oc_show()
    d=_oc_display(res)
    return json.dumps(d) if d else ""
def _oc_vars():
    out=[]
    for k,v in list(NS.items()):
        if k.startswith("_") or callable(v) or type(v).__name__=="module": continue
        t=type(v).__name__
        try:
            if isinstance(v,pd.DataFrame): size=f"{v.shape[0]} rows × {v.shape[1]} cols"; val=", ".join(map(str,v.columns[:6]))+("…" if v.shape[1]>6 else "")
            elif isinstance(v,pd.Series): size=f"{len(v)}"; val=str(v.name)
            elif hasattr(v,"__len__") and not isinstance(v,str): size=str(len(v)); val=repr(v)[:60]
            else: size="1"; val=repr(v)[:60]
        except Exception: size="";val=""
        out.append([k,t,size,val])
    return json.dumps(out)
def _oc_files():
    return json.dumps(sorted([[f,os.path.getsize(f)] for f in os.listdir(".") if os.path.isfile(f)]))
`);return true;})();return ready;}
self.onmessage=async e=>{const m=e.data;
  if(m.t==='boot'){try{await boot();post({t:'booted'});post({t:'vars',v:JSON.parse(PY.runPython('_oc_vars()')),f:JSON.parse(PY.runPython('_oc_files()'))});}catch(err){post({t:'bootfail',err:String(err)});}return;}
  if(m.t==='file'){try{await boot();PY.FS.writeFile('/home/pyodide/'+m.name,new Uint8Array(m.data));post({t:'vars',v:JSON.parse(PY.runPython('_oc_vars()')),f:JSON.parse(PY.runPython('_oc_files()'))});}catch(err){post({t:'bootfail',err:String(err)});}return;}
  if(m.t==='getfile'){try{const d=PY.FS.readFile('/home/pyodide/'+m.name);post({t:'filedata',name:m.name,data:d});}catch(err){}return;}
  if(m.t==='delfile'){try{PY.FS.unlink('/home/pyodide/'+m.name);}catch(err){}post({t:'vars',v:JSON.parse(PY.runPython('_oc_vars()')),f:JSON.parse(PY.runPython('_oc_files()'))});return;}
  if(m.t==='run'){try{await boot();}catch(err){post({t:'done',id:m.id,ok:false,err:'Python could not start: '+err});return;}
    const flush=s=>post({t:'out',id:m.id,s:s+'\n'});
    PY.setStdout({batched:flush});PY.setStderr({batched:s=>post({t:'err',id:m.id,s:s+'\n'})});
    self.ocJob=m.id;
    try{PY.globals.set('_oc_src',m.code);const r=PY.runPython('_oc_run(_oc_src)');post({t:'done',id:m.id,ok:true,res:r?JSON.parse(r):null});}
    catch(err){let s=String(err&&err.message||err);const i=s.lastIndexOf('File "<cell>"');if(i>=0)s=s.slice(i);s=s.replace(/^Traceback[^\n]*\n/,'');post({t:'done',id:m.id,ok:false,err:s.trim()});}
    try{post({t:'vars',v:JSON.parse(PY.runPython('_oc_vars()')),f:JSON.parse(PY.runPython('_oc_files()'))});}catch(x){}
  }
};
