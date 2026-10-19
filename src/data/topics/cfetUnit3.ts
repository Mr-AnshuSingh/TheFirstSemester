import { TopicContent } from '@/types/syllabus';

/* ---------- SVG Builder Helpers ---------- */
const S = (w: number, h: number, b: string) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" class="w-full h-auto">${b}</svg>`;
const L = (a: number, b: number, c: number, d: number, k = 'l') =>
  `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}"/>`;
const escT = (s: string) =>
  String(s).replace(/&(?!(lt|gt|amp);)/g, '&amp;').replace(/</g, '&lt;');
const T = (x: number, y: number, s: string, k = 't', an = 'start') =>
  `<text x="${x}" y="${y}" class="${k}" text-anchor="${an}">${escT(s)}</text>`;
const P = (d: string, k = 'l', m = '') =>
  `<path d="${d}" class="${k}" ${m}/>`;
const C = (x: number, y: number, r: number, k = 'l') =>
  `<circle cx="${x}" cy="${y}" r="${r}" class="${k}"/>`;
const R = (x: number, y: number, w: number, h: number, k = 'l') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${k}"/>`;
const LA = (a: number, b: number, c: number, d: number, k = 'a') =>
  `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}" marker-end="url(#ar)"/>`;

/* ---------- CFET UNIT 3 TOPIC CONTENT (11 Topics) ---------- */
export const CFET_UNIT3_TOPICS: Record<string, TopicContent> = {
  'cfet:3:0': {
    explain: [
      'A computer network is an interconnected collection of autonomous computing devices capable of exchanging data and sharing resources.',
      'Networking eliminates physical isolation, allowing multi-user access to costly peripherals (printers, storage clusters), centralized database records, and instant telecommunication.',
    ],
    definition:
      'A computer network is a telecommunications network consisting of two or more computing nodes linked via physical or wireless transmission media that communicate through standardized protocol suites.',
    formula: '\\text{Network} = \\text{Nodes (Hosts)} + \\text{Media (Links)} + \\text{Networking Devices} + \\text{Protocols}',
    steps: [
      'Resource Sharing: Hardware sharing (network laser printers), software license pooling, and distributed cloud file storage.',
      'Centralized Management: Backups, security patches, and user credentials managed centrally via directory domains.',
      'High Reliability: Redundant data links and alternative routing paths prevent single-point downtime.',
      'Network Components: End Nodes (PCs, servers, smartphones), Intermediary Devices (switches, routers), and Transmission Media.',
    ],
    examAnswer: [
      'Define a Computer Network and list 4 major advantages of networking.',
      'Describe the 3 essential components of any network: Nodes, Transmission Media, and Protocols.',
      'Explain how networks enable centralized administration and cost-efficient hardware sharing.',
      'Differentiate autonomous hosts from dumb terminal-mainframe configurations.',
    ],
    slip: 'Do not confuse the physical connection with the logical network; connecting computers with a cable achieves nothing unless they share a common communication protocol stack.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'COMPUTER NETWORK ARCHITECTURE', 'ta') +
          C(60, 60, 20) +
          T(60, 64, 'PC 1', 't', 'middle') +
          C(60, 140, 20) +
          T(60, 144, 'PC 2', 't', 'middle') +
          C(300, 60, 20) +
          T(300, 64, 'Server', 't', 'middle') +
          C(300, 140, 20) +
          T(300, 144, 'Printer', 't', 'middle') +
          R(140, 80, 80, 40, 'fa') +
          T(180, 102, 'Network Switch', 'ta', 'middle') +
          L(78, 68, 140, 92) +
          L(78, 132, 140, 108) +
          L(220, 92, 282, 68) +
          L(220, 108, 282, 132) +
          T(180, 168, 'Resource Sharing · Centralized Backups · High Availability', 'ta', 'middle')
      ),
      caption: 'Basic computer network linking client nodes, shared server, and network printer via a switch.',
    },
  },

  'cfet:3:1': {
    explain: [
      'Transmission media provide the physical pathway over which data bits travel from transmitter to receiver.',
      'They divide into Guided Media (physical cables: Twisted Pair, Coaxial, Fiber Optic) and Unguided Media (electromagnetic waves propagating through free space: Radio, Microwave, Infrared).',
    ],
    definition:
      'Transmission media encompass the physical and wireless propagation conduits through which electromagnetic or optical information signals travel across a telecommunications network.',
    formula: '\\text{Media: } \\text{Guided (Copper / Glass)} \\quad \\text{vs} \\quad \\text{Unguided (Radio / Microwaves)}',
    steps: [
      'Twisted Pair Cable: Pairs of insulated copper wires twisted to cancel electromagnetic interference (EMI); UTP (Unshielded) and STP (Shielded); Cat5e/Cat6 supports up to 1-10 Gbps.',
      'Coaxial Cable: Central copper core, dielectric insulator, metallic braided mesh shield, outer jacket; used in cable television and broadband modems.',
      'Fiber Optic Cable: Hair-thin strands of glass/silica carrying pulses of light via Total Internal Reflection; immune to EMI, offers Terabit bandwidth, low attenuation.',
      'Radio Waves (3 kHz - 1 GHz): Omnidirectional waves penetrating building walls; used in FM radio, Wi-Fi, and cellular networks.',
      'Microwaves (1 GHz - 300 GHz): Unidirectional line-of-sight propagation; used in satellite links and cellular terrestrial towers.',
    ],
    examAnswer: [
      'Construct a comparative table: Twisted Pair vs Coaxial Cable vs Fiber Optic Cable.',
      'Compare across: Physical medium, Transmission mode (electrical vs optical), Bandwidth, Attenuation, and EMI immunity.',
      'Explain the principle of Total Internal Reflection in optical fibers.',
      'Differentiate Guided (Bounded) media from Unguided (Wireless) media with 2 examples each.',
    ],
    slip: 'Do not claim fiber optic cables conduct electricity; fiber optics transmit modulated light photons through silica glass, providing complete immunity to electrical noise and ground loops.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'TRANSMISSION MEDIA TAXONOMY', 'ta') +
          R(20, 36, 150, 75) +
          T(95, 54, 'Guided Media (Wired)', 'ta', 'middle') +
          T(30, 72, '1. Twisted Pair (UTP/STP)', 't') +
          T(30, 88, '2. Coaxial Cable', 't') +
          T(30, 102, '3. Fiber Optic (Light)', 'ta') +
          R(190, 36, 150, 75, 'fa') +
          T(265, 54, 'Unguided (Wireless)', 'ta', 'middle') +
          T(200, 72, '1. Radio Waves (Omni)', 't') +
          T(200, 88, '2. Microwaves (Line of sight)', 't') +
          T(200, 102, '3. Infrared (Short range)', 'ta') +
          R(20, 124, 320, 48) +
          T(30, 144, 'Fiber Optic: Core + Cladding -> Total Internal Reflection', 'ta') +
          T(30, 160, 'Highest bandwidth, lowest attenuation, immune to electrical noise (EMI)', 't')
      ),
      caption: 'Categorization of transmission media into guided physical cables and unguided wireless channels.',
    },
  },

  'cfet:3:2': {
    explain: [
      'Data transmission across networks is characterized by transmission mode, signal type, and channel capacity.',
      'Transmission modes define the directional capability of communication: Simplex (one-way only), Half-Duplex (both directions, but one at a time), and Full-Duplex (simultaneous bidirectional communication).',
    ],
    definition:
      'Data transmission is the physical transfer of digital bitstreams over a communication channel, categorized by directionality (simplex/duplex) and signal representation (analog/digital).',
    formula: '\\text{Bandwidth (Hz/bps)} \\propto \\text{Maximum Channel Capacity } C = B \\log_2(1 + \\text{SNR})',
    steps: [
      'Simplex Mode: Unidirectional communication; transmitter only sends, receiver only receives (e.g. keyboard to CPU, broadcast television).',
      'Half-Duplex Mode: Bidirectional communication, but only one party can transmit at any given instant (e.g. Walkie-Talkies).',
      'Full-Duplex Mode: True simultaneous bidirectional communication over dedicated pairs or frequency channels (e.g. telephone conversation, modern switched Ethernet).',
      'Analog vs Digital: Analog signals are continuous waveforms (sound, voice); digital signals are discrete binary voltage pulses (0V/5V).',
      'Bandwidth vs Throughput: Bandwidth is theoretical maximum channel capacity; Throughput is actual measured payload data delivered per second.',
    ],
    examAnswer: [
      'Define Simplex, Half-Duplex, and Full-Duplex transmission modes with clear real-world examples and directional arrows.',
      'Differentiate between Bandwidth (capacity) and Throughput (actual delivered speed).',
      'Explain the difference between Analog and Digital data signals.',
      'Mention Shannon-Hartley theorem: Channel capacity depends on bandwidth and Signal-to-Noise Ratio (SNR).',
    ],
    slip: 'Do not confuse half-duplex with simplex: half-duplex IS bidirectional, but transmission cannot occur in both directions at the exact same instant.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'DATA TRANSMISSION DIRECTIONALITY MODES', 'ta') +
          R(20, 36, 95, 80) +
          T(67, 54, 'Simplex', 'ta', 'middle') +
          T(67, 72, 'A -> B only', 't', 'middle') +
          LA(40, 85, 95, 85, 'a') +
          T(67, 104, 'Keyboard / TV', 't', 'middle') +
          R(132, 36, 95, 80) +
          T(179, 54, 'Half-Duplex', 'ta', 'middle') +
          T(179, 72, 'A <-> B (alt)', 't', 'middle') +
          LA(150, 80, 205, 80, 'a') +
          LA(205, 90, 150, 90, 'a') +
          T(179, 104, 'Walkie-Talkie', 't', 'middle') +
          R(245, 36, 95, 80, 'fa') +
          T(292, 54, 'Full-Duplex', 'ta', 'middle') +
          T(292, 72, 'A <-> B (simult)', 't', 'middle') +
          LA(265, 85, 320, 85, 'a') +
          LA(320, 85, 265, 85, 'a') +
          T(292, 104, 'Telephone / Switched', 'ta', 'middle') +
          T(180, 148, 'Bandwidth = Theoretical Capacity; Throughput = Actual Delivery', 't', 'middle') +
          T(180, 168, 'Full-duplex doubles effective bandwidth by isolating TX and RX lines', 'ta', 'middle')
      ),
      caption: 'Directional transmission modes: Simplex (one-way), Half-Duplex (alternating), and Full-Duplex (simultaneous).',
    },
  },

  'cfet:3:3': {
    explain: [
      'Networks are classified based on geographical coverage into Local Area Networks (LAN), Metropolitan Area Networks (MAN), and Wide Area Networks (WAN).',
      'LAN covers a single room or building with high speeds; MAN spans a municipal city; WAN spans nations and continents, with the Internet being the ultimate WAN.',
    ],
    definition:
      'Geographical network taxonomy categorizes communication infrastructure by spatial radius, ownership, data transfer rates, and propagation error characteristics into LAN, MAN, and WAN.',
    formula: '\\text{LAN (Room/Building)} \\subset \\text{MAN (City)} \\subset \\text{WAN (Global Internet)}',
    steps: [
      'Local Area Network (LAN): Spans a room, office, or campus (< 1-2 km); privately owned; high data rates (100 Mbps - 10 Gbps); low propagation delay; low bit error rate; technology: Ethernet, Wi-Fi.',
      'Metropolitan Area Network (MAN): Spans an entire city (5 - 50 km); owned by public consortium or telecom; medium speeds; technology: Cable TV networks, Metro Ethernet.',
      'Wide Area Network (WAN): Spans countries or the globe (> 100 km); owned by multiple telecom conglomerates; lower speeds; higher error rates; technology: Fiber backbones, satellite links, Internet.',
      'PAN (Personal Area Network): Sub-category spanning personal workspace (< 10 m) using Bluetooth or Zigbee.',
    ],
    examAnswer: [
      'Construct a 5-point comparison table: LAN vs MAN vs WAN.',
      'Compare across: Geographic scope, Ownership, Data rate, Bit error rate, and Technology.',
      'State the typical radius for each: LAN (<2 km), MAN (up to 50 km), WAN (>100 km).',
      'Identify the global Internet as the largest real-world example of a WAN.',
    ],
    slip: 'Do not claim WANs have higher speeds and lower error rates than LANs; long-distance public WAN links suffer from higher propagation latency and noise than private short-distance LAN copper/fiber runs.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'NETWORK GEOGRAPHICAL SCALES: LAN, MAN, WAN', 'ta') +
          R(20, 36, 95, 80) +
          T(67, 54, 'LAN', 'ta', 'middle') +
          T(67, 72, '< 2 km (Office)', 't', 'middle') +
          T(67, 88, '1 to 10 Gbps', 'ta', 'middle') +
          T(67, 104, 'Ethernet / Wi-Fi', 't', 'middle') +
          R(132, 36, 95, 80) +
          T(179, 54, 'MAN', 'ta', 'middle') +
          T(179, 72, '5 - 50 km (City)', 't', 'middle') +
          T(179, 88, '100 Mbps - 1 Gbps', 'ta', 'middle') +
          T(179, 104, 'Cable TV / Metro', 't', 'middle') +
          R(245, 36, 95, 80, 'fa') +
          T(292, 54, 'WAN', 'ta', 'middle') +
          T(292, 72, 'Global / Nations', 't', 'middle') +
          T(292, 88, 'Multi-provider', 'ta', 'middle') +
          T(292, 104, 'Internet / Satellite', 't', 'middle') +
          R(20, 126, 320, 45) +
          T(180, 144, 'LAN has highest speed & lowest error rate (private ownership)', 't', 'middle') +
          T(180, 160, 'WAN links heterogeneous LANs together across global backbones', 'ta', 'middle')
      ),
      caption: 'Comparison of geographic coverage, data transfer speeds, and media ownership for LAN, MAN, and WAN.',
    },
  },

  'cfet:3:4': {
    explain: [
      'Network topology defines the physical layout or logical arrangement of computing nodes and communication links.',
      'The four foundational topologies are Bus, Star, Ring, and Mesh, each exhibiting distinct cost, scalability, and single-point-of-failure vulnerabilities.',
    ],
    definition:
      'Network topology is the geometric and logical structural arrangement of communication links and nodes that dictates data routing paths and fault tolerance in a computer network.',
    formula: '\\text{Full Mesh Links: } L = \\frac{n(n-1)}{2}, \\quad \\text{Star Links: } L = n',
    steps: [
      'Bus Topology: Nodes share a single common backbone trunk cable terminated with resistive caps; cheap and simple; a break in backbone cable disables entire network; heavy collision domain.',
      'Star Topology: All nodes connect independently to a central hub or switch; failure of one cable affects only that node; failure of central hub brings down entire network; most widely deployed LAN topology.',
      'Ring Topology: Nodes form a closed loop; packets pass sequentially in one direction (token ring); failure of one node breaks the loop unless a dual-ring is used.',
      'Mesh Topology: Every node connects to every other node with dedicated point-to-point links; requires $n(n-1)/2$ physical links; highest fault tolerance and privacy, but extremely costly.',
      'Hybrid Topology: Combination of two or more topologies (e.g. Star-Bus or Tree topology).',
    ],
    examAnswer: [
      'Draw neat sketches of the 4 classic topologies: Star, Bus, Ring, and Mesh.',
      'Calculate the number of links in a full mesh network of n nodes: $L = n(n-1)/2$.',
      'Identify the Single Point of Failure (SPoF) for each topology: Hub in Star, Backbone cable in Bus, any node in simple Ring.',
      'State why Star topology is the standard choice in modern commercial buildings.',
    ],
    slip: 'Do not forget the formula $n(n-1)/2$ for Mesh links; in an exam numerical with 10 nodes, calculating 10 links instead of 45 links ($10 \\times 9 / 2$) will lose all marks.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 4 CLASSIC NETWORK TOPOLOGIES', 'ta') +
          C(50, 50, 6, 'fa') +
          L(50, 50, 25, 30) +
          L(50, 50, 75, 30) +
          L(50, 50, 25, 70) +
          L(50, 50, 75, 70) +
          T(50, 85, 'Star', 'ta', 'middle') +
          L(110, 50, 180, 50) +
          L(125, 50, 125, 35) +
          L(145, 50, 145, 35) +
          L(165, 50, 165, 35) +
          T(145, 85, 'Bus', 'ta', 'middle') +
          C(235, 35, 6) +
          C(265, 50, 6) +
          C(235, 65, 6) +
          C(205, 50, 6) +
          P('M235 35 L265 50 L235 65 L205 50 Z', 'l') +
          T(235, 85, 'Ring', 'ta', 'middle') +
          C(300, 35, 6) +
          C(340, 35, 6) +
          C(340, 65, 6) +
          C(300, 65, 6) +
          L(300, 35, 340, 35) +
          L(340, 35, 340, 65) +
          L(340, 65, 300, 65) +
          L(300, 65, 300, 35) +
          L(300, 35, 340, 65) +
          L(340, 35, 300, 65) +
          T(320, 85, 'Mesh', 'ta', 'middle') +
          R(20, 110, 320, 65) +
          T(30, 130, 'Star: Fails if central switch fails (dominant LAN standard)', 't') +
          T(30, 146, 'Bus: Fails if backbone breaks · Ring: Token passing loop', 't') +
          T(30, 162, 'Mesh: Complete redundancy, requires n(n-1)/2 physical links', 'ta')
      ),
      caption: 'Visual layouts of Star, Bus, Ring, and Mesh network topologies.',
    },
  },

  'cfet:3:5': {
    explain: [
      'A communication protocol is a formal set of rules, standards, and conventions that govern how devices exchange data across a network.',
      'Protocols standardize Syntax (data format), Semantics (control meaning of bit patterns), and Timing (speed matching and sequencing).',
      'The theoretical reference standard is the OSI 7-Layer Model, while the practical implementation standard of the Internet is the TCP/IP Model.',
    ],
    definition:
      'A communication protocol is an agreed-upon technical standard defining message formatting, error detection, flow control, and sequencing rules to enable meaningful data exchange between heterogeneous computer nodes.',
    formula: '\\text{OSI 7 Layers} \\longrightarrow \\text{Physical, Data Link, Network, Transport, Session, Presentation, Application}',
    steps: [
      'Protocol Elements: Syntax (structure/coding), Semantics (control info and error actions), and Timing (data rate and synchronization).',
      'OSI 7-Layer Stack: 1. Physical (bits), 2. Data Link (frames, MAC), 3. Network (packets, IP), 4. Transport (segments, TCP/UDP), 5. Session (dialogues), 6. Presentation (encryption/compression), 7. Application (HTTP, FTP).',
      'TCP/IP 4-Layer Stack: Network Access Layer -> Internet Layer (IP) -> Transport Layer (TCP/UDP) -> Application Layer (HTTP, DNS).',
      'Data Encapsulation: As data descends layers, headers/trailers are wrapped around the payload; de-encapsulation unpacks headers at receiver.',
    ],
    examAnswer: [
      'Define a Network Protocol and detail its 3 key elements: Syntax, Semantics, Timing.',
      'List all 7 layers of the OSI reference model in strict bottom-to-top order.',
      'Map the OSI 7-layer model to the TCP/IP 4-layer architecture.',
      'Explain the concept of Data Encapsulation and PDU (Protocol Data Unit: Frame, Packet, Segment).',
    ],
    slip: 'Always remember the OSI layer order from bottom (1) to top (7): Physical (1), Data Link (2), Network (3), Transport (4), Session (5), Presentation (6), Application (7). Mnemonic: "Please Do Not Throw Sausage Pizza Away".',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'OSI 7-LAYER REFERENCE MODEL VS TCP/IP', 'ta') +
          R(20, 32, 140, 18) +
          T(90, 45, '7. Application (HTTP, DNS)', 't', 'middle') +
          R(20, 52, 140, 18) +
          T(90, 65, '6. Presentation (SSL/TLS)', 't', 'middle') +
          R(20, 72, 140, 18) +
          T(90, 85, '5. Session (Dialogues)', 't', 'middle') +
          R(20, 92, 140, 18, 'fa') +
          T(90, 105, '4. Transport (TCP / UDP)', 'ta', 'middle') +
          R(20, 112, 140, 18) +
          T(90, 125, '3. Network (IP Packets)', 't', 'middle') +
          R(20, 132, 140, 18) +
          T(90, 145, '2. Data Link (Frames, MAC)', 't', 'middle') +
          R(20, 152, 140, 18) +
          T(90, 165, '1. Physical (Bits, Cables)', 't', 'middle') +
          R(190, 32, 150, 58, 'fa') +
          T(265, 62, 'Application Layer', 'ta', 'middle') +
          R(190, 92, 150, 18) +
          T(265, 105, 'Transport Layer (TCP/UDP)', 't', 'middle') +
          R(190, 112, 150, 18) +
          T(265, 125, 'Internet Layer (IP)', 'ta', 'middle') +
          R(190, 132, 150, 38) +
          T(265, 152, 'Network Access Layer', 't', 'middle') +
          T(180, 184, 'OSI: Theoretical 7-Layer · TCP/IP: Practical 4-Layer Implementation', 'ta', 'middle')
      ),
      caption: 'Comparison of the theoretical OSI 7-layer model and the practical TCP/IP 4-layer model.',
    },
  },

  'cfet:3:6': {
    explain: [
      'Networking hardware devices operate at different layers of the protocol stack to connect nodes, filter traffic, and route packets across disparate networks.',
      'A Hub broadcasts to all ports (Layer 1); a Switch forwards frames to specific MAC addresses (Layer 2); a Router routes packets across IP subnets (Layer 3); a Modem converts digital to analog; a Gateway translates between incompatible protocol suites.',
    ],
    definition:
      'Network devices are dedicated hardware components that regenerate physical signals, forward layer-2 frames by physical MAC address, or route layer-3 packets by logical IP address.',
    formula: '\\text{Hub (L1: Broadcast)} \\longrightarrow \\text{Switch (L2: MAC Unicast)} \\longrightarrow \\text{Router (L3: IP Routing)}',
    steps: [
      'Repeater / Hub (Layer 1): Physical layer multiport repeater; blindly broadcasts incoming signals to all ports; creates a single large collision domain.',
      'Bridge / Switch (Layer 2): Data link layer device; maintains a MAC Address Table (CAM); inspects frame destination MAC and unicasts data only to target port; eliminates collisions.',
      'Router (Layer 3): Network layer device; maintains an IP Routing Table; forwards packets across different subnets; determines optimal path (OSPF, BGP); isolates broadcast domains.',
      'Modem (Modulator/Demodulator): Converts digital computer pulses into analog waves for transmission over phone/cable lines and vice versa.',
      'Gateway: High-layer protocol converter that translates between fundamentally incompatible architectures (e.g. connecting an SNA mainframe network to a TCP/IP network).',
    ],
    examAnswer: [
      'Construct a 5-row comparison table: Hub vs Switch vs Router vs Modem vs Gateway.',
      'State the OSI operational layer for each device (Hub=Layer 1, Switch=Layer 2, Router=Layer 3, Gateway=Layers 4-7).',
      'Explain why switches replaced hubs in modern local area networks (collision domain isolation and security).',
      'Differentiate between MAC address forwarding (Switch) and IP address routing (Router).',
    ],
    slip: 'Never confuse a switch with a router: a switch connects multiple devices within the SAME local network using MAC addresses; a router connects DIFFERENT networks together using IP addresses.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'NETWORK INTERCONNECTION DEVICES', 'ta') +
          R(20, 36, 95, 60) +
          T(67, 52, 'Hub (Layer 1)', 'ta', 'middle') +
          T(67, 68, 'Blind Broadcast', 't', 'middle') +
          T(67, 84, 'Shared collisions', 't', 'middle') +
          R(132, 36, 95, 60, 'fa') +
          T(179, 52, 'Switch (Layer 2)', 'ta', 'middle') +
          T(179, 68, 'MAC Unicast Table', 't', 'middle') +
          T(179, 84, 'Zero collisions', 'ta', 'middle') +
          R(245, 36, 95, 60) +
          T(292, 52, 'Router (Layer 3)', 'ta', 'middle') +
          T(292, 68, 'IP Routing Table', 't', 'middle') +
          T(292, 84, 'Connects Subnets', 't', 'middle') +
          R(20, 108, 150, 48) +
          T(95, 126, 'Modem (MO-DEM)', 't', 'middle') +
          T(95, 142, 'Analog <-> Digital Signals', 'ta', 'middle') +
          R(190, 108, 150, 48) +
          T(265, 126, 'Gateway (L4-7)', 't', 'middle') +
          T(265, 142, 'Protocol Translation', 'ta', 'middle') +
          T(180, 178, 'Hub shouts to all; Switch whispers to one; Router directs between networks', 'ta', 'middle')
      ),
      caption: 'Hierarchy of network interconnection devices mapped by operational protocol layer.',
    },
  },

  'cfet:3:7': {
    explain: [
      'Wireless networking eliminates physical cabling by transmitting high-frequency radio waves or microwaves through the air.',
      'Key wireless standards include Wi-Fi (IEEE 802.11) for local high-throughput coverage, Bluetooth (IEEE 802.15.1) for personal short-range peripherals, and Cellular networks (4G/5G) for wide-area mobile coverage.',
    ],
    definition:
      'Wireless networking encompasses telecommunications protocols and radio frequency transceiver hardware that establish data links without physical conductive cabling.',
    formula: '\\text{Wi-Fi: IEEE 802.11 (2.4 GHz / 5 GHz / 6 GHz); } \\quad \\text{Bluetooth: IEEE 802.15.1 (2.4 GHz)}',
    steps: [
      'Wi-Fi Standards (IEEE 802.11): 802.11b/g/n (2.4 GHz, longer range, crowd interference), 802.11ac/ax (Wi-Fi 6, 5 GHz/6 GHz, high speed up to 9.6 Gbps).',
      'Wireless Access Point (WAP): Central transceiver device bridging wireless mobile clients with the wired Ethernet infrastructure.',
      'Bluetooth (WPAN): Short-range radio frequency standard (< 10 m, 2.4 GHz ISM band) for pairing wireless keyboards, headphones, and medical sensors.',
      'Cellular Generations: 3G (mobile internet), 4G LTE (IP-packet all-digital network), 5G NR (ultra-low millisecond latency, massive machine-type IoT communications).',
      'Wireless Security Protocols: WEP (cracked, obsolete) -> WPA2 (AES encryption) -> WPA3 (SAE simultaneous authentication of equals, immune to offline dictionary attacks).',
    ],
    examAnswer: [
      'Explain the IEEE 802.11 Wi-Fi standard family and differentiate 2.4 GHz from 5 GHz frequency bands.',
      'Differentiate Wi-Fi from Bluetooth in terms of Range, Data Rate, Power Consumption, and Topology.',
      'Describe the role of a Wireless Access Point (WAP) and SSID.',
      'Trace the evolution of wireless encryption: WEP -> WPA2 -> WPA3.',
    ],
    slip: 'Do not use WEP encryption in examples; WEP is mathematically broken and can be cracked in seconds; modern networks mandate WPA2-AES or WPA3.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'WIRELESS NETWORKING TAXONOMY', 'ta') +
          R(20, 36, 95, 75) +
          T(67, 54, 'Wi-Fi (WLAN)', 'ta', 'middle') +
          T(67, 72, 'IEEE 802.11ax', 't', 'middle') +
          T(67, 88, 'Up to 10 Gbps', 'ta', 'middle') +
          T(67, 102, '2.4 / 5 / 6 GHz', 't', 'middle') +
          R(132, 36, 95, 75) +
          T(179, 54, 'Bluetooth (PAN)', 'ta', 'middle') +
          T(179, 72, 'IEEE 802.15.1', 't', 'middle') +
          T(179, 88, '< 10 m range', 'ta', 'middle') +
          T(179, 102, 'Low Energy (BLE)', 't', 'middle') +
          R(245, 36, 95, 75, 'fa') +
          T(292, 54, 'Cellular (WWAN)', 'ta', 'middle') +
          T(292, 72, '4G LTE / 5G NR', 't', 'middle') +
          T(292, 88, 'Kilometers range', 'ta', 'middle') +
          T(292, 102, 'Tower Handoffs', 't', 'middle') +
          R(20, 122, 320, 50) +
          T(30, 142, 'Security: WPA3 uses SAE (Simultaneous Authentication of Equals)', 'ta') +
          T(30, 158, 'WAP connects wireless radio stations to wired Ethernet backbone', 't')
      ),
      caption: 'Wireless networking technologies categorized by coverage scale: WLAN, WPAN, and Cellular WWAN.',
    },
  },

  'cfet:3:8': {
    explain: [
      'The Internet is a globally connected "network of networks" communicating via the standardized TCP/IP protocol suite.',
      'Every connected node is uniquely identified by a numerical IP Address: either a 32-bit IPv4 address or an expanded 128-bit IPv6 address.',
    ],
    definition:
      'An IP address is a unique numerical identifier assigned to each device connected to a computer network that uses the Internet Protocol for communication, providing network addressing and host identification.',
    formula: '\\text{IPv4: } 32 \\text{ bits } (4 \\text{ octets: } 192.168.1.1); \\quad \\text{IPv6: } 128 \\text{ bits } (8 \\text{ quartets: } 2001:0db8::1)',
    steps: [
      'IPv4 Format: 32 bits divided into 4 octets separated by dots (e.g. 192.168.1.1); total address space $2^{32} \\approx 4.29 \\times 10^9$ addresses.',
      'IPv4 Address Classes: Class A (1-126, huge networks), Class B (128-191, medium), Class C (192-223, small LANs), Class D (224-239, Multicast), Class E (240-254, Experimental).',
      'Private IP Addresses (RFC 1918): Non-routable on public internet; translated via NAT: Class A: 10.0.0.0/8, Class B: 172.16.0.0/12, Class C: 192.168.0.0/16.',
      'IPv4 Exhaustion: Rapid growth of mobile phones and IoT depleted the 4.3 billion IPv4 pool, necessitating IPv6.',
      'IPv6 Format: 128 bits written as 8 groups of 4 hexadecimal digits separated by colons ($2^{128} \\approx 3.4 \\times 10^{38}$ addresses—virtually inexhaustible).',
    ],
    examAnswer: [
      'Define an IP Address and explain its dual purpose (Host identification and Network addressing).',
      'Describe the structure of an IPv4 address (32 bits, 4 dotted-decimal octets).',
      'Construct a table detailing IPv4 Classes A, B, and C with address ranges and default subnet masks.',
      'Contrast IPv4 with IPv6: Address length (32 vs 128 bits), Notation (dotted decimal vs colon hex), and Address capacity.',
    ],
    slip: 'Never write an IPv4 octet value greater than 255; each octet is strictly an 8-bit unsigned number ($2^8 = 256$, values 0 to 255). An address like 192.168.1.300 is invalid.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'IP ADDRESS ARCHITECTURE: IPv4 VERSUS IPv6', 'ta') +
          R(20, 36, 320, 55) +
          T(30, 54, 'IPv4: 32 bits (4 Octets) -> ~4.3 Billion Addresses', 'ta') +
          T(30, 74, '192 . 168 . 1 . 1   [11000000.10101000.00000001.00000001]', 't') +
          R(20, 100, 320, 55, 'fa') +
          T(30, 118, 'IPv6: 128 bits (8 Hex Quartets) -> 3.4 x 10^38 Addresses', 'ta') +
          T(30, 138, '2001 : 0db8 : 85a3 : 0000 : 0000 : 8a2e : 0370 : 7334', 't') +
          T(180, 178, 'IPv4 exhaustion solved by NAT (temporary) and IPv6 (permanent)', 'ta', 'middle')
      ),
      caption: 'Structural comparison of 32-bit IPv4 dotted-decimal and 128-bit IPv6 hexadecimal addressing.',
    },
  },

  'cfet:3:9': {
    explain: [
      'The Internet functions through standardized protocol suites: Transport layer (TCP vs UDP) and Application layer (HTTP, FTP, DNS).',
      'TCP guarantees reliable, ordered byte streams via a 3-way handshake; UDP prioritizes real-time speed with zero transmission guarantees.',
      'DNS acts as the Internet’s phonebook, translating human-friendly domain names into numerical IP addresses.',
    ],
    definition:
      'Internet application and transport protocols govern connection establishment, reliable payload delivery, resource naming, and hierarchical domain resolution across global networks.',
    formula: '\\text{URL} = \\text{Scheme} \\; (\\text{https}) + \\text{Domain} \\; (\\text{lnjpit.ac.in}) + \\text{Port} \\; (:443) + \\text{Path} \\; (/syllabus) + \\text{Query}',
    steps: [
      'TCP (Transmission Control Protocol): Connection-oriented; establishes session via 3-Way Handshake (SYN -> SYN-ACK -> ACK); provides error detection, acknowledgments, retransmission, and flow control.',
      'UDP (User Datagram Protocol): Connectionless; no handshake, no acknowledgments, no retransmission; low 8-byte header overhead; used for VoIP, live video streaming, DNS queries.',
      'HTTP / HTTPS: Hypertext Transfer Protocol for web browsing; port 80 (HTTP) and port 443 (HTTPS secured with TLS encryption).',
      'FTP (File Transfer Protocol): Transfers files between client and server using separate control (port 21) and data (port 20) connections.',
      'DNS (Domain Name System): Hierarchical distributed database mapping domain names (google.com) to IP addresses (142.250.190.46) on UDP port 53.',
    ],
    examAnswer: [
      'Construct a 5-point comparison table between TCP and UDP.',
      'Draw and explain the TCP 3-Way Handshake (SYN, SYN-ACK, ACK).',
      'Explain the role of DNS in resolving a URL when a user enters a website in a browser.',
      'Deconstruct the anatomical components of a URL: Protocol, Domain name, Port, Path, and Query parameters.',
    ],
    slip: 'Do not say UDP is "bad" because it is unreliable; UDP is intentionally designed for real-time video/gaming where retransmitting a late packet is useless.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'TCP 3-WAY HANDSHAKE & DNS RESOLUTION', 'ta') +
          R(20, 36, 150, 85) +
          T(95, 52, 'TCP 3-Way Handshake', 'ta', 'middle') +
          T(35, 70, 'Client ------ SYN -----> Server', 't') +
          T(35, 86, 'Client <--- SYN-ACK ---- Server', 'ta') +
          T(35, 102, 'Client ------ ACK -----> Server', 't') +
          T(95, 116, 'Connection Established!', 'ta', 'middle') +
          R(190, 36, 150, 85, 'fa') +
          T(265, 52, 'DNS Query (UDP 53)', 'ta', 'middle') +
          T(200, 70, 'Client asks: "lnjpit.ac.in?"', 't') +
          T(200, 88, 'DNS returns: "103.x.x.x"', 'ta') +
          T(200, 104, 'Direct IP web connect', 't') +
          R(20, 130, 320, 44) +
          T(30, 150, 'URL: https://   www.lnjpit.ac.in   /about   ?dept=cse', 't') +
          T(30, 166, '    [Scheme]      [Domain]        [Path]    [Query]', 'ta')
      ),
      caption: 'TCP 3-way handshake connection establishment, DNS resolution, and URL anatomy.',
    },
  },

  'cfet:3:10': {
    explain: [
      'The client-server architecture is the dominant distributed computing model where network workloads are partitioned between service requesters (clients) and service providers (servers).',
      'Clients initiate communication by requesting data or computational services; servers continuously listen on dedicated network ports to process and respond to multiple concurrent client requests.',
    ],
    definition:
      'Client-server architecture is a distributed computing paradigm where tasks are split between centralized service providers (servers) and distributed user requesters (clients) over network sockets.',
    formula: '\\text{Client-Server Cycle: } \\text{Client Request} \\xrightarrow{\\text{Network}} \\text{Server Processing} \\xrightarrow{\\text{Network}} \\text{Response Payload}',
    steps: [
      'Client Role: Initiates service requests; manages user presentation interface; sends formatted requests over HTTP/TCP.',
      'Server Role: Passively waits on designated network ports (e.g. 80/443); processes requests; queries back-end databases; enforces access control; delivers responses.',
      '2-Tier Architecture: Client (UI + Business Logic) talks directly to Database Server.',
      '3-Tier Architecture: Presentation Tier (Client Web Browser) <-> Application/Logic Tier (Web/App Server) <-> Data Tier (Database Engine).',
      'P2P Contrast (Peer-to-Peer): Decentralized model where every participating node possesses equivalent capabilities, acting simultaneously as both client and server (BitTorrent, Blockchain).',
    ],
    examAnswer: [
      'Define Client-Server Architecture and describe the operational roles of the Client and Server.',
      'Draw the 3-Tier Client-Server Architecture showing Presentation Tier, Application Tier, and Database Tier.',
      'Contrast Client-Server architecture with Peer-to-Peer (P2P) architecture.',
      'List the primary advantages of client-server systems: Centralized data management, access security, and easy scalability.',
    ],
    slip: 'A server is primarily a SOFTWARE ROLE, not just a physical computer; any computer running server software (like Apache or Node.js) listening on a port acts as a server.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, '3-TIER CLIENT-SERVER ARCHITECTURE', 'ta') +
          R(20, 50, 75, 55) +
          T(57, 72, 'Client Tier', 't', 'middle') +
          T(57, 88, 'Browser / UI', 'ta', 'middle') +
          LA(95, 78, 135, 78, 'a') +
          T(115, 68, 'HTTP', 't', 'middle') +
          R(135, 50, 90, 55, 'fa') +
          T(180, 72, 'Application Tier', 't', 'middle') +
          T(180, 88, 'Business Logic', 'ta', 'middle') +
          LA(225, 78, 265, 78, 'a') +
          T(245, 68, 'SQL', 't', 'middle') +
          R(265, 50, 75, 55) +
          T(302, 72, 'Data Tier', 't', 'middle') +
          T(302, 88, 'Database', 'ta', 'middle') +
          R(20, 120, 320, 50) +
          T(30, 140, 'Separation of Concerns: UI changes do not alter database schemas', 't') +
          T(30, 156, 'Contrast with P2P: In P2P (BitTorrent), every node acts as client AND server', 'ta')
      ),
      caption: 'The 3-tier client-server model separating presentation, application business logic, and database storage.',
    },
  },
};
