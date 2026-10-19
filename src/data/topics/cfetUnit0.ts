import { TopicContent, UnitStory } from '@/types/syllabus';

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

/* ---------- CFET UNIT STORIES (5 Units) ---------- */
export const CFET_UNIT_STORIES: Record<string, UnitStory> = {
  'cfet:0': {
    whatItIs:
      'Computer systems are physical machines engineered around the stored-program Von Neumann architecture, integrating CPU control logic, arithmetic execution units, memory hierarchies, and system buses.',
    whyItMatters:
      'Every electronic device from microcontrollers to supercomputers executes instructions through this fundamental hardware-software loop: fetching bytes from memory, decoding opcodes, and driving physical circuits.',
    howItWorks:
      'The CPU alternates through the Fetch-Decode-Execute instruction cycle. The memory hierarchy balances cost, capacity, and latency: tiny ultra-fast registers feed L1/L2/L3 caches, which buffer main RAM, while non-volatile secondary storage retains mass files.',
  },
  'cfet:1': {
    whatItIs:
      'Data representation is the binary encoding system that translates numbers, textual glyphs, and logical values into discrete physical voltages (0s and 1s) inside semiconductor circuits.',
    whyItMatters:
      'Computers have no native concept of decimal numbers or English letters. Understanding positional number systems, radix conversions, and signed complements is vital for writing efficient low-level software without arithmetic overflow.',
    howItWorks:
      'Radix division and multiplication convert between Decimal, Binary, Octal, and Hexadecimal. Signed integers utilize 2’s complement arithmetic (flip bits and add 1), enabling the same hardware adder circuit to execute both addition and subtraction. Characters map to standardized numeric tables (7-bit ASCII, multi-byte Unicode UTF-8).',
  },
  'cfet:2': {
    whatItIs:
      'Operating systems serve as the intermediary layer between physical hardware and application software, managing CPU scheduling, memory allocation, storage access, and peripheral I/O.',
    whyItMatters:
      'Without an operating system, every programmer would have to write custom device drivers for graphics chips, manually manage physical RAM addresses, and prevent conflicting programs from corrupting each other.',
    howItWorks:
      'The OS kernel abstracts raw devices into clean primitives: processes for computation, virtual memory pages for RAM, and hierarchical file systems for disk. It multiplexes the CPU using preemptive time-slicing and protects memory boundaries using page tables.',
  },
  'cfet:3': {
    whatItIs:
      'Computer networking links autonomous computers over physical and wireless media using standardized protocols (OSI and TCP/IP) to exchange packets, share resources, and deliver distributed services.',
    whyItMatters:
      'The global Internet powers modern commerce, scientific collaboration, and mobile communication. Understanding network topologies, device roles, and IP routing is essential for building distributed computing systems.',
    howItWorks:
      'Data is sliced into packets and routed through hubs, switches (Layer 2 MAC forwarding), and routers (Layer 3 IP routing). Reliable transport (TCP handshake) or fast datagrams (UDP) convey application payloads (HTTP, DNS, FTP) across client-server architectures.',
  },
  'cfet:4': {
    whatItIs:
      'Emerging technologies encompass modern computational paradigms transforming industry: Internet of Things (IoT), Cybersecurity & the CIA Triad, Artificial Intelligence, Blockchain distributed ledgers, and Data Science pipelines.',
    whyItMatters:
      'These transformative technologies automate industrial production, secure financial networks, extract predictive insights from massive telemetry, and protect critical infrastructure from cyber warfare.',
    howItWorks:
      'IoT networks connect physical sensor nodes to cloud analytic engines. The CIA triad (Confidentiality, Integrity, Availability) governs defensive cybersecurity. Blockchains link cryptographically hashed transaction blocks across peer-to-peer networks without central authorities. Data science turns raw telemetry into actionable models.',
  },
};

/* ---------- CFET UNIT 0 TOPIC CONTENT (8 Topics) ---------- */
export const CFET_UNIT0_TOPICS: Record<string, TopicContent> = {
  'cfet:0:0': {
    explain: [
      'Computers are classified based on size, processing capability, and application domain into Microcomputers, Minicomputers, Mainframes, and Supercomputers.',
      'Every digital computer consists of five classical functional units: Input Unit, Central Processing Unit (incorporating ALU, Control Unit, and Registers), Memory Unit, and Output Unit.',
    ],
    definition:
      'A computer is an electronic programmable data-processing machine that accepts raw data through input units, stores and processes it according to stored program instructions in the CPU, and delivers meaningful output information.',
    formula: '\\text{Computer System} = \\text{Hardware} + \\text{Software} + \\text{Data} + \\text{Users}',
    steps: [
      'Microcomputers: Personal computers, laptops, tablets, and embedded controllers built on a single microprocessor.',
      'Minicomputers (Midrange): Multi-user systems supporting dozens of simultaneous terminals in manufacturing and labs.',
      'Mainframe Computers: High-throughput enterprise transaction processors capable of handling millions of concurrent database queries (banking, airlines).',
      'Supercomputers: Massively parallel computing clusters optimized for floating-point calculation throughput (FLOPS) in climate simulation, genomics, and nuclear physics.',
      'Functional Units Loop: Input Unit -> Memory Unit <-> CPU (ALU + Control Unit + Registers) -> Output Unit.',
    ],
    examAnswer: [
      'List and differentiate the 4 classes of computers: Micro, Mini, Mainframe, Supercomputer.',
      'Draw the 5-block functional diagram of a computer system: Input, ALU, Control Unit, Memory, Output.',
      'Explain the role of the Control Unit (directs data flow) and ALU (executes arithmetic and logical operations).',
      'Define FLOPS (Floating-Point Operations Per Second) as the performance metric of supercomputers.',
    ],
    slip: 'Do not confuse memory capacity with processing power; mainframes specialize in massive I/O throughput and transaction reliability, whereas supercomputers specialize in raw mathematical calculation speed.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'FUNCTIONAL UNITS OF A COMPUTER', 'ta') +
          R(15, 60, 65, 45) +
          T(47, 86, 'INPUT', 't', 'middle') +
          LA(80, 82, 110, 82, 'a') +
          R(110, 35, 140, 95) +
          T(180, 52, 'CPU (Central Processor)', 'ta', 'middle') +
          R(120, 62, 55, 30) +
          T(147, 80, 'ALU', 't', 'middle') +
          R(185, 62, 55, 30) +
          T(212, 80, 'CU', 't', 'middle') +
          R(130, 98, 100, 24) +
          T(180, 114, 'Registers', 'ta', 'middle') +
          LA(250, 82, 280, 82, 'a') +
          R(280, 60, 65, 45) +
          T(312, 86, 'OUTPUT', 't', 'middle') +
          R(110, 145, 140, 32) +
          T(180, 165, 'MEMORY UNIT (RAM)', 't', 'middle') +
          LA(150, 130, 150, 145, 'a') +
          LA(210, 145, 210, 130, 'a')
      ),
      caption: 'The five classic functional units of a digital computer system.',
    },
  },

  'cfet:0:1': {
    explain: [
      'The Central Processing Unit (CPU) is the brain of the computer, executing program instructions by coordinating data movement and arithmetic computations.',
      'The fundamental operation of the CPU is the cyclic Instruction Cycle consisting of three phases: Fetch, Decode, and Execute.',
    ],
    definition:
      'CPU organization defines the structural interconnection of the Arithmetic Logic Unit (ALU), Control Unit (CU), internal bus systems, and register sets that execute machine-level binary instructions.',
    formula: '\\text{Instruction Cycle} = \\text{Fetch} \\longrightarrow \\text{Decode} \\longrightarrow \\text{Execute} \\; [\\pm \\text{Interrupt}]',
    steps: [
      'Fetch Phase: Program Counter (PC) places address on Address Bus; Memory returns instruction byte into Memory Data Register (MDR); instruction moved to Instruction Register (IR); PC increments.',
      'Decode Phase: Control Unit decodes the opcode bits in the Instruction Register, determining required operands and circuit paths.',
      'Execute Phase: ALU performs the commanded operation (addition, bitwise AND, comparison); results stored in Accumulator or memory.',
      'Writeback: Final result is committed to target register or written across the data bus into main memory.',
      'System Clock: Regulates execution cycles; clock frequency (e.g. 3.5 GHz) determines how many clock pulses occur per second.',
    ],
    examAnswer: [
      'Draw the CPU block diagram showing ALU, Control Unit, PC, IR, MAR, MDR, and Accumulator.',
      'Detail the 3 steps of the Instruction Cycle: Fetch, Decode, Execute.',
      'Explain the purpose of the Program Counter (holds address of next instruction) and Instruction Register (holds current instruction opcode).',
      'Differentiate between Hardwired Control Units and Microprogrammed Control Units.',
    ],
    slip: 'Do not state that the CPU executes high-level code directly; high-level code must first be compiled or translated into binary machine instructions (opcodes and operands).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CPU INSTRUCTION CYCLE: FETCH-DECODE-EXECUTE', 'ta') +
          R(20, 50, 90, 50) +
          T(65, 72, '1. FETCH', 't', 'middle') +
          T(65, 88, 'PC -> RAM -> IR', 'ta', 'middle') +
          LA(110, 75, 135, 75, 'a') +
          R(135, 50, 90, 50, 'fa') +
          T(180, 72, '2. DECODE', 't', 'middle') +
          T(180, 88, 'CU Opcode Logic', 'ta', 'middle') +
          LA(225, 75, 250, 75, 'a') +
          R(250, 50, 90, 50) +
          T(295, 72, '3. EXECUTE', 't', 'middle') +
          T(295, 88, 'ALU Operation', 'ta', 'middle') +
          P('M295 100 L295 140 L65 140 L65 100', 'd') +
          T(180, 132, 'PC increments: PC <- PC + 1', 'ta', 'middle') +
          T(180, 172, 'Repeat continuously at billions of clock cycles per second', 't', 'middle')
      ),
      caption: 'The fundamental cyclic Fetch-Decode-Execute instruction loop executed by the CPU.',
    },
  },

  'cfet:0:2': {
    explain: [
      'The memory architecture and hierarchy organizes storage technologies in a multi-tier pyramid to resolve the speed-versus-cost trade-off.',
      'As one moves from top to bottom of the hierarchy: access speed decreases, storage capacity increases, and cost per bit drops dramatically.',
    ],
    definition:
      'Memory hierarchy is a structured multi-level architectural design that minimizes average memory access latency by positioning small, high-speed SRAM caches near the CPU and large, low-cost DRAM/storage further away.',
    formula: 'T_{\\text{avg}} = h \\cdot T_{\\text{cache}} + (1 - h) \\cdot T_{\\text{RAM}}, \\quad h = \\text{Hit Ratio}',
    steps: [
      'Level 0 (Registers): Located inside CPU core; access time < 1 ns; capacity < 1 KB; fastest and costliest.',
      'Level 1/2/3 (Caches): On-chip SRAM; access time 1-10 ns; capacity 32 KB to 64 MB; holds frequently accessed data/code.',
      'Level 4 (Main Memory / RAM): Off-chip synchronous DRAM; access time ~50-100 ns; capacity 8-64 GB; volatile workspace.',
      'Level 5 (Secondary Storage): SSD / NVMe (Flash) and HDD (magnetic); access time microseconds to milliseconds; capacity Terabytes; non-volatile.',
      'Level 6 (Tertiary / Offline): Magnetic tape, optical discs; archive storage.',
    ],
    examAnswer: [
      'Draw the Memory Hierarchy pyramid showing Registers, L1/L2/L3 Cache, Main Memory (RAM), Secondary Storage (SSD/HDD).',
      'State the 3 governing trade-offs: Access Speed, Storage Capacity, and Cost per bit.',
      'Write the formula for Average Memory Access Time (AMAT) using cache hit ratio h.',
      'Differentiate Volatile memory (RAM, Cache) from Non-Volatile memory (ROM, Flash, SSD).',
    ],
    slip: 'Do not describe secondary storage (SSD/HDD) as part of main memory; secondary storage is block-addressable and non-volatile, whereas main memory is byte-addressable by CPU load/store instructions.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'MEMORY HIERARCHY PYRAMID', 'ta') +
          P('M180 30 L225 65 L135 65 Z', 'fa') +
          T(180, 56, 'Registers (<1ns)', 't', 'middle') +
          P('M135 65 L225 65 L255 100 L105 100 Z', 'l') +
          T(180, 88, 'Caches L1/L2/L3 (SRAM)', 'ta', 'middle') +
          P('M105 100 L255 100 L285 135 L75 135 Z', 'l') +
          T(180, 122, 'Main Memory (DRAM, ~50ns)', 't', 'middle') +
          P('M75 135 L285 135 L320 170 L40 170 Z', 'l') +
          T(180, 156, 'Secondary Storage (SSD / HDD)', 'ta', 'middle') +
          LA(25, 165, 25, 35, 'a') +
          T(30, 28, 'Speed & Cost', 'ta') +
          LA(335, 35, 335, 165, 'a') +
          T(335, 182, 'Capacity', 't', 'end')
      ),
      caption: 'The hierarchical memory pyramid balancing access latency against storage capacity and bit cost.',
    },
  },

  'cfet:0:3': {
    explain: [
      'CPU registers are high-speed internal memory cells that hold immediate operands, memory addresses, and execution flags.',
      'Cache memory drastically enhances system throughput by exploiting the Principle of Locality (Temporal and Spatial), preventing the fast CPU from stalling while waiting for slow main RAM.',
    ],
    definition:
      'Registers are specialized internal CPU flip-flop storage elements operating at processor clock speeds, while cache memory is an intermediate high-speed SRAM buffer that stores recently or frequently accessed memory blocks.',
    formula: '\\text{Speedup} = \\frac{T_{\\text{without cache}}}{T_{\\text{with cache}}} = \\frac{T_{\\text{RAM}}}{h \\cdot T_{\\text{cache}} + (1 - h) T_{\\text{RAM}}}',
    steps: [
      'Program Counter (PC): Holds memory address of the next instruction to be fetched.',
      'Instruction Register (IR): Holds the binary opcode of the instruction currently being executed.',
      'Memory Address Register (MAR) & Memory Buffer/Data Register (MBR/MDR): Interface CPU with system address and data buses.',
      'Accumulator (AC) & General Purpose Registers (GPR): Store intermediate arithmetic and logic outputs.',
      'Principle of Locality: Temporal Locality (items accessed recently will be accessed again soon; e.g. loop variables) and Spatial Locality (items near accessed items will be accessed soon; e.g. arrays).',
    ],
    examAnswer: [
      'List at least 5 dedicated CPU registers and state the exact function of each (PC, IR, MAR, MDR, AC).',
      'Explain Cache Hit and Cache Miss, and state the Average Memory Access Time formula.',
      'Define the Principle of Locality with both Temporal and Spatial examples.',
      'Differentiate between L1, L2, and L3 cache placement (L1 split into I-cache/D-cache inside core; L3 shared across cores).',
    ],
    slip: 'Do not confuse MAR (holds the memory address) with MDR (holds the actual data value being read or written).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CPU REGISTERS & CACHE IMPACT', 'ta') +
          R(20, 36, 120, 110) +
          T(80, 54, 'CPU CORE', 'ta', 'middle') +
          R(30, 64, 100, 20) +
          T(80, 78, 'PC · IR · AC', 't', 'middle') +
          R(30, 90, 100, 20) +
          T(80, 104, 'MAR · MDR', 't', 'middle') +
          R(30, 116, 100, 22, 'fa') +
          T(80, 131, 'L1 Cache', 'ta', 'middle') +
          LA(140, 127, 180, 127, 'a') +
          R(180, 60, 60, 80) +
          T(210, 96, 'L2/L3', 't', 'middle') +
          T(210, 112, 'Cache', 'ta', 'middle') +
          LA(240, 100, 270, 100, 'a') +
          R(270, 50, 70, 100) +
          T(305, 96, 'RAM', 't', 'middle') +
          T(305, 112, '(DRAM)', 'ta', 'middle') +
          T(180, 172, 'Cache hit ratio h ~ 95% cuts average memory latency from 60ns to <2ns', 'ta', 'middle')
      ),
      caption: 'Register set and multi-level cache buffer shielding CPU from slow main memory bus access.',
    },
  },

  'cfet:0:4': {
    explain: [
      'The motherboard (mainboard) is the central printed circuit board (PCB) that physically connects and enables communication between all hardware components of a computer.',
      'It houses the CPU socket, chipset (Northbridge/Southbridge or unified PCH), memory slots, expansion buses, and power delivery circuits.',
    ],
    definition:
      'The motherboard is the primary structural and electrical backplane of a computer system, integrating processor sockets, memory channels, expansion slots, BIOS/UEFI firmware, and system buses.',
    formula: '\\text{Motherboard} = \\text{CPU Socket} + \\text{Chipset} + \\text{RAM Slots} + \\text{PCIe Slots} + \\text{Buses}',
    steps: [
      'CPU Socket: Physical socket (LGA, PGA, BGA) that interfaces microprocessor pins with the motherboard power and signal lines.',
      'Chipset: Controls communication between CPU and peripherals: High-speed lanes (PCIe, RAM) and Lower-speed I/O (SATA, USB, audio).',
      'RAM DIMM Slots: Multi-channel slots providing direct high-speed data pathways between CPU memory controller and DRAM sticks.',
      'Expansion Slots (PCIe): Peripheral Component Interconnect Express slots for graphics cards (x16), NVMe storage (x4), and network adapters.',
      'BIOS/UEFI ROM: Non-volatile chip containing firmware that initializes hardware self-tests (POST) and bootstraps the operating system.',
    ],
    examAnswer: [
      'Enumerate and describe at least 5 primary components of a motherboard.',
      'Explain the function of the Chipset (historical Northbridge vs Southbridge; modern unified Platform Controller Hub).',
      'Explain the purpose of the BIOS/UEFI chip and the Power-On Self-Test (POST).',
      'Describe the role of PCIe lanes in connecting discrete graphics and high-speed NVMe SSDs.',
    ],
    slip: 'Do not confuse BIOS/UEFI with the operating system; BIOS/UEFI is low-level firmware stored in a motherboard ROM chip that only initializes hardware and locates the OS bootloader.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'MOTHERBOARD ARCHITECTURE & COMPONENTS', 'ta') +
          R(20, 32, 320, 145) +
          T(30, 48, 'Motherboard PCB', 'ta') +
          R(40, 56, 70, 60, 'fa') +
          T(75, 86, 'CPU', 't', 'middle') +
          T(75, 100, 'Socket', 'ta', 'middle') +
          R(130, 56, 50, 60) +
          T(155, 86, 'RAM', 't', 'middle') +
          T(155, 100, 'Slots', 'ta', 'middle') +
          R(205, 70, 55, 45) +
          T(232, 92, 'Chipset', 't', 'middle') +
          T(232, 106, '(PCH)', 'ta', 'middle') +
          R(280, 56, 45, 25) +
          T(302, 72, 'BIOS', 'ta', 'middle') +
          R(40, 130, 140, 20) +
          T(110, 144, 'PCIe x16 (GPU)', 't', 'middle') +
          R(205, 130, 120, 20) +
          T(265, 144, 'SATA / M.2 NVMe', 'ta', 'middle')
      ),
      caption: 'Layout diagram of a motherboard showing CPU socket, RAM slots, chipset, PCIe expansion, and BIOS.',
    },
  },

  'cfet:0:5': {
    explain: [
      'The Von Neumann architecture, proposed by John von Neumann in 1945, is the foundational blueprint of general-purpose computers.',
      'Its defining characteristic is the Stored-Program Concept: program instructions and data share the exact same physical memory and bus system.',
    ],
    definition:
      'The Von Neumann architecture is a theoretical computer design where program instructions and data are stored together in a single read-write addressable memory, processed sequentially through a central CPU via shared buses.',
    formula: '\\text{Von Neumann Bottleneck: } \\text{Throughput} \\le \\text{Memory Bus Bandwidth}',
    steps: [
      'Core Units: Central Processing Unit (ALU + Control Unit + Registers), Memory Unit (shared for instructions and data), and Input/Output interfaces.',
      'Shared Memory: Both code opcodes and data variables reside in the same memory space and are indistinguishable until decoded.',
      'Sequential Execution: Instructions are fetched and executed one after another in linear sequence unless altered by explicit jump/branch instructions.',
      'Von Neumann Bottleneck: Because instructions and data share the same physical bus, the CPU cannot read an instruction and read/write data simultaneously, capping system throughput.',
      'Harvard Architecture Contrast: Features physically separate memory spaces and buses for instructions and data (common in DSPs and embedded microcontrollers).',
    ],
    examAnswer: [
      'Draw the classic Von Neumann architecture diagram showing CPU (ALU, CU), Shared Memory, Input, and Output.',
      'Explain the Stored-Program Concept.',
      'Define the Von Neumann Bottleneck and explain why it limits modern computer performance.',
      'Differentiate Von Neumann architecture from Harvard architecture.',
    ],
    slip: 'Never claim Von Neumann computers have separate memories for instructions and data; having a unified shared memory for both code and data is the exact defining attribute of Von Neumann machines.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'VON NEUMANN ARCHITECTURE (STORED-PROGRAM)', 'ta') +
          R(110, 32, 140, 65) +
          T(180, 48, 'CPU', 't', 'middle') +
          R(120, 56, 50, 30) +
          T(145, 75, 'ALU', 'ta', 'middle') +
          R(190, 56, 50, 30) +
          T(215, 75, 'CU', 'ta', 'middle') +
          R(110, 120, 140, 35, 'fa') +
          T(180, 138, 'SHARED MEMORY', 't', 'middle') +
          T(180, 150, '(Instructions + Data)', 'ta', 'middle') +
          LA(180, 97, 180, 120, 'a') +
          LA(180, 120, 180, 97, 'a') +
          R(15, 120, 65, 35) +
          T(47, 142, 'INPUT', 't', 'middle') +
          LA(80, 137, 110, 137, 'a') +
          R(280, 120, 65, 35) +
          T(312, 142, 'OUTPUT', 't', 'middle') +
          LA(250, 137, 280, 137, 'a') +
          T(180, 178, 'Bottleneck: Shared bus restricts simultaneous code/data fetch', 'ta', 'middle')
      ),
      caption: 'Von Neumann stored-program architecture sharing a single unified memory and bus.',
    },
  },

  'cfet:0:6': {
    explain: [
      'Programming languages bridge human problem-solving and raw binary hardware execution across three levels: Machine Language, Assembly Language, and High-Level Languages.',
      'Each tier trades direct hardware control and execution speed for human readability, programmer productivity, and platform portability.',
    ],
    definition:
      'Computer languages are formal syntactic systems categorized into low-level machine-dependent codes (binary opcodes and mnemonic assembly) and high-level machine-independent abstractions (C, Java, Python).',
    formula: '\\text{High-Level} \\xrightarrow{\\text{Compiler}} \\text{Assembly} \\xrightarrow{\\text{Assembler}} \\text{Machine Code (0s & 1s)}',
    steps: [
      'Machine Language (First Generation): Pure binary 0s and 1s understood directly by CPU hardware; platform-dependent, error-prone, non-portable.',
      'Assembly Language (Second Generation): Replaces binary opcodes with human-readable mnemonics (e.g. MOV, ADD, JMP); translated 1:1 into machine code by an Assembler.',
      'High-Level Languages (Third Generation): Natural English-like syntax and mathematical expressions (C, C++, Java, Python); machine-independent; translated via Compilers or Interpreters.',
      'Fourth Generation Languages (4GL): Declarative, domain-specific languages (e.g. SQL) that specify "what to do" rather than "how to do it".',
    ],
    examAnswer: [
      'Construct a 3-tier comparative table: Machine Language vs Assembly Language vs High-Level Language.',
      'Compare across: Readability, Hardware Dependency, Execution Speed, and Need for Translator.',
      'Define the role of an Assembler: translates mnemonic assembly code into binary object machine code.',
      'Explain the concept of Portability: High-level code can run on different CPU architectures without rewriting logic.',
    ],
    slip: 'Do not assume assembly language is machine-independent; assembly language is tightly bound to a specific CPU instruction set architecture (x86 assembly will not run on ARM).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'LANGUAGE ABSTRACTION SPECTRUM', 'ta') +
          R(20, 36, 100, 45) +
          T(70, 54, 'High-Level', 't', 'middle') +
          T(70, 70, 'C, Java, Python', 'ta', 'middle') +
          LA(120, 58, 140, 58, 'a') +
          T(130, 48, 'Compiler', 't', 'middle') +
          R(140, 36, 100, 45, 'fa') +
          T(190, 54, 'Assembly', 't', 'middle') +
          T(190, 70, 'MOV, ADD, JMP', 'ta', 'middle') +
          LA(240, 58, 260, 58, 'a') +
          T(250, 48, 'Assembler', 't', 'middle') +
          R(260, 36, 85, 45) +
          T(302, 54, 'Machine Code', 't', 'middle') +
          T(302, 70, '10110001...', 'ta', 'middle') +
          L(20, 110, 340, 110) +
          LA(340, 130, 20, 130, 'a') +
          T(180, 126, 'Hardware Abstraction & Portability Increases', 'ta', 'middle') +
          LA(20, 160, 340, 160, 'a') +
          T(180, 156, 'Execution Speed & Hardware Control Increases', 't', 'middle')
      ),
      caption: 'The language translation pipeline from human-readable high-level code to hardware binary execution.',
    },
  },

  'cfet:0:7': {
    explain: [
      'Compilers and Interpreters are language translators that convert human-readable source code into executable machine instructions.',
      'A compiler translates the entire source program into an independent executable machine-code file before execution, whereas an interpreter translates and executes source code line-by-line in real time.',
    ],
    definition:
      'A compiler is a language processor that translates the entire source code into native machine code at once, generating an executable file, whereas an interpreter translates and executes instructions sequentially on the fly.',
    formula: '\\text{Compiler: Source} \\to \\text{Binary Object} \\to \\text{Fast Run}; \\quad \\text{Interpreter: Line} \\to \\text{Execute} \\to \\text{Next}',
    steps: [
      'Compilation Stages: Lexical Analysis -> Syntax Analysis -> Semantic Analysis -> Intermediate Code Gen -> Optimization -> Target Code Gen.',
      'Compiler Error Reporting: Analyzes complete code and reports all compilation errors and warnings simultaneously after scanning the whole file.',
      'Interpreter Execution Loop: Reads one statement, translates to machine operations, executes immediately, and halts at the first encountered error.',
      'Execution Speed: Compiled programs (C/C++, Rust) run orders of magnitude faster than interpreted programs (Python, Ruby) because translation occurs ahead of time.',
      'Hybrid Approach (Java, C#): Compiles source into intermediate Bytecode, executed by a Virtual Machine (JVM) featuring a Just-In-Time (JIT) compiler.',
    ],
    examAnswer: [
      'Construct a comprehensive 5-point comparison table between Compiler and Interpreter.',
      'Compare: Translation unit (whole program vs line-by-line), Intermediate object code (generated vs none), Execution speed (fast vs slow), Error reporting (all at end vs stops at first error).',
      'Give language examples for each: Compiler (C, C++, Go); Interpreter (Python, JavaScript, Ruby).',
      'Explain the hybrid JIT (Just-In-Time) compilation approach used in Java.',
    ],
    slip: 'Do not say interpreters are useless because they are slower; interpreters provide immediate rapid prototyping, interactive debugging, and platform-independent execution.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'COMPILER VERSUS INTERPRETER EXECUTION', 'ta') +
          R(20, 36, 150, 115) +
          T(95, 52, 'COMPILER (Ahead-of-Time)', 'ta', 'middle') +
          T(95, 72, 'Source Code (All)', 't', 'middle') +
          LA(95, 78, 95, 96, 'a') +
          T(95, 108, 'Machine Code (.exe)', 't', 'middle') +
          LA(95, 114, 95, 132, 'a') +
          T(95, 144, 'Blazing Fast Execution', 'ta', 'middle') +
          R(190, 36, 150, 115) +
          T(265, 52, 'INTERPRETER (Line-by-Line)', 'ta', 'middle') +
          T(265, 72, 'Source Line', 't', 'middle') +
          LA(265, 78, 265, 96, 'a') +
          T(265, 108, 'Translate & Execute', 'ta', 'middle') +
          LA(265, 114, 265, 132, 'a') +
          T(265, 144, 'Next Line (Stops on Error)', 't', 'middle') +
          T(180, 178, 'C/C++ compile once; Python/JS interpret continuously', 'ta', 'middle')
      ),
      caption: 'Execution workflow difference between whole-program compilation and line-by-line interpretation.',
    },
  },
};
