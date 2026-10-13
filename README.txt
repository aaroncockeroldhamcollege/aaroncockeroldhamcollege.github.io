Oldham College — Cisco Networking Academy Labs
==============================================

GitHub / flat layout
  Every file is in the root folder (no assets/ or pdfs/ subfolders), ready for
  a GitHub repo. A .nojekyll file is included so GitHub Pages serves files as-is.
  Publish: push this folder to a repo, enable GitHub Pages (Settings -> Pages)
  from the branch root; index.html is the home page.

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
    routing-tables.html      Routing Table Lab — interpret a routing table for
                             the exam: the fields, a step-by-step worked
                             example, and exam-style practice (longest prefix
                             match, next hop, default route, static vs dynamic).
    asa-firewall.html        ASA Firewall Lab — three tabs: (1) security
                             levels, default rules and stateful inspection with
                             scored scenarios; (2) rule practice — build ACL
                             rules and put them in order; (3) configure an ASA
                             5505 in the CLI (VLAN 10/20 interfaces, ACLs,
                             inspect icmp) beside a live topology that shows
                             test packets permitted or denied. Guided and
                             independent tasks; auto-configure option.
    command-prompt-lab.html  Command Prompt Lab — a simulated Windows cmd.exe
                             on a PC monitor: ipconfig, ping, tracert,
                             nslookup, netstat, arp, route, whois, tasklist,
                             netsh and more; plus a practice task that starts
                             on a Windows desktop (fix a reception PC's DNS and
                             find a suspicious connection).

  Exam & project practice
    cidr-subnetting-lab.html CIDR Subnetting Lab — step-by-step subnetting
                             (mask, host bits, block size, network,
                             broadcast, usable range, hosts), each step
                             checked and explained; binary helper; 3 levels.
    network-components-quiz.html
                             Network Components Quiz — name each topology
                             symbol and drag the matching definition onto it;
                             study cards included.
    exam-skills.html         Exam Skills Drills — scored, exam-style drills on
                             subnetting & VLSM, ports & protocols,
                             troubleshooting from command output, and ACLs.
    esp-practice.html        ESP Practice Lab — practice for the Packet Tracer
                             parts of the Employer-Set Project: find & fix
                             security defects and build a test log, secure a
                             network extension, and how marks are won. (Original
                             practice material, not the live assessment.)

  Demos for class
    network-demos.html       Big, looping animations for the projector /
                             whiteboard discussion: OSI encapsulation,
                             routing between networks, VLANs & trunking,
                             OSPF convergence, NAT/PAT, the TCP 3-way
                             handshake, DHCP (DORA), ARP, reading a routing
                             table, subnetting with CIDR, VLSM, ports & protocols,
                             troubleshooting, ACLs and the ASA 5505 firewall.
                             Each loops with a caption per step; use the full-
                             screen button for the whiteboard, pause to discuss,
                             step with the arrows, or change speed.

  Cyber
    security-labs.html       All cyber labs in one tabbed page: the Range
                             (guided), Workstation Audit, Incident
                             Investigation, Mobile Forensics, SQL Injection
                             & prevention, Free Play and a scored Capstone.

  *.pdf                      Instruction sheets (root folder).
  *.png / favicon.svg        Logos and site icon (root folder).

Features
  - Device nodes on the Network Lab and VLAN lab diagrams can be DRAGGED
    around the canvas with the mouse (click still opens the device); their
    positions are remembered in the browser.
  - The Network Demos canvas has a FULL-SCREEN button for the whiteboard.
  - A site favicon (favicon.svg) is included.
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
