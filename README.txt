Oldham College — Cisco Networking Academy Labs
==============================================

A self-contained website. To host it, copy this whole folder to any
web server or the college intranet and open index.html. Everything runs
in the browser; no server-side code, database or internet access is needed.

Pages
  index.html                 Landing page (links to every lab)

  Networking
    network-lab.html         Full Cisco IOS simulator: routers, switches,
                             an ASA firewall, PCs, laptops, phone, printer,
                             access point and web server. VLANs, trunks,
                             routing, DHCP, NAT and wireless.
    vlan-practice-lab.html   Focused two-switch VLAN / trunking lab with
                             guided objectives that tick off as you work.
    network-playground.html  Packet Tracer-style sandbox: drag devices,
                             click to wire them, auto-configuration, ping.
    teraterm.html            Tera Term-style console on a monitor; configure
                             a router or a switch (tabs) from scratch in IOS.
    osi-trainer.html         OSI & TCP/IP models: learn, order the layers,
                             match protocols/PDUs, and a scored quiz.

  Demos for class
    network-demos.html       Big, looping animations for the projector /
                             whiteboard discussion: OSI encapsulation,
                             routing between networks, VLANs & trunking,
                             OSPF convergence, NAT/PAT, the TCP 3-way
                             handshake, DHCP (DORA), ARP, and a subnetting
                             visualiser. Each loops with a caption per step;
                             Pause to discuss, step with the arrows, or
                             change speed.

  Cyber
    security-labs.html       All cyber labs in one tabbed page: the Range
                             (guided), Workstation Audit, Incident
                             Investigation, Mobile Forensics, SQL Injection
                             & prevention, Free Play and a scored Capstone.

  pdfs/                      Downloadable instruction sheet for each activity
                             (linked from the "Instructions (PDF)" button in
                             each lab header).
  assets/                    Oldham College and Cisco Networking Academy logos

Features
  - Consistent network topology symbols (router, switch, L3 switch, PC,
    laptop, server, firewall/ASA, access point, IP phone, printer, cloud)
    used across every lab and demo, in the standard Cisco diagram style.
  - The Network Lab topology includes an ISP / Internet cloud at the edge
    (uplink from edge router R2), and larger, more readable device consoles.
  - Persistent DARK MODE — toggle top-right; remembered across all labs.
  - Terminal colour toggle — green-on-black or white-on-black (Tera Term
    style), remembered across labs.
  - Resizeable, Windows 7-style GUI and terminal windows (drag a corner).
  - Network diagrams zoom in/out (+ / - / reset, or Ctrl-scroll) without
    changing the page size.
  - Whiteboard button on every page (bottom-right) for scratch notes;
    saved in the browser per lab.
  - Each lab saves progress in the browser (localStorage), per lab.
  - The cyber labs are fictional simulations; nothing touches real systems.

Notes
  - All IOS command entry is emulated (? help, Tab completion, history).
  - To swap in your own VLAN lab, replace vlan-practice-lab.html (keep the
    <header class="site-hdr"> and the whiteboard <script> block near the end
    for consistent styling).
