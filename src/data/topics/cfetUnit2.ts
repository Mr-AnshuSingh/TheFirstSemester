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

/* ---------- CFET UNIT 2 TOPIC CONTENT (8 Topics) ---------- */
export const CFET_UNIT2_TOPICS: Record<string, TopicContent> = {
  'cfet:2:0': {
    explain: [
      'Software is the comprehensive collection of computer programs, procedures, and associated documentation that instructs physical hardware how to perform tasks.',
      'Software is broadly classified into System Software (which manages and controls the computer hardware) and Application Software (which accomplishes end-user tasks).',
    ],
    definition:
      'Computer software is an organized collection of binary code, algorithms, and associated documentation that directs physical electronic circuits to execute defined data-processing operations.',
    formula: '\\text{Software} = \\text{Programs} + \\text{Data Structures} + \\text{Documentation}',
    steps: [
      'System Software: Provides core background services; directly interfaces with physical hardware (Operating System, Device Drivers, Compilers, Linkers).',
      'Application Software: Solves specific user problems; runs on top of system software (Web browsers, Office suites, CAD design, Games).',
      'Utility Software: Housekeeping and maintenance tools optimizing performance and security (Disk defragmenters, Antivirus, Backup tools).',
      'Firmware: Low-level software embedded permanently into non-volatile ROM/Flash chips (BIOS/UEFI, router microcode).',
      'Hardware-Software Layering: User <-> Application Software <-> Operating System <-> Device Drivers <-> Hardware.',
    ],
    examAnswer: [
      'Define software and contrast it with hardware (Hardware is physical tangible circuitry; Software is intangible intellectual instructions).',
      'Draw the concentric layered hierarchy of a computer system: Hardware at center, surrounded by OS, Applications, and Users.',
      'Differentiate System Software from Application Software with 3 examples of each.',
      'Define Firmware and Utility Software.',
    ],
    slip: 'Do not categorize utility software (like antivirus or file compressors) as operating systems; utilities are maintenance tools that run on top of an existing OS.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'SOFTWARE HIERARCHICAL LAYERS', 'ta') +
          C(180, 100, 75) +
          T(180, 165, 'Hardware (CPU, RAM, Disk)', 't', 'middle') +
          C(180, 95, 52, 'fa') +
          T(180, 132, 'System Software (OS)', 'ta', 'middle') +
          C(180, 88, 30) +
          T(180, 102, 'Applications', 't', 'middle') +
          C(180, 78, 12, 'fa') +
          T(180, 82, 'User', 'ta', 'middle') +
          T(180, 182, 'OS shields user applications from raw physical hardware complexity', 'ta', 'middle')
      ),
      caption: 'Concentric software abstraction layers surrounding physical computer hardware.',
    },
  },

  'cfet:2:1': {
    explain: [
      'System software acts as the foundational operating platform of a computer, providing an environment where application programs can run reliably and hardware resources can be managed efficiently.',
      'Major categories include the Operating System, Device Drivers, Language Translators, Linkers, and Loaders.',
    ],
    definition:
      'System software is a collection of programs designed to operate, control, and extend the processing capabilities of a computer, serving as the interface between application software and underlying hardware.',
    formula: '\\text{System Software} = \\text{OS} + \\text{Device Drivers} + \\text{Translators} + \\text{Linker/Loader} + \\text{Utilities}',
    steps: [
      'Operating System (OS): Master control program; manages CPU, memory, storage, security, and process scheduling.',
      'Device Drivers: Specialized low-level software translating standard OS commands into specific hardware signals for printers, graphics cards, and network adapters.',
      'Language Translators: Compilers, assemblers, and interpreters that transform source code into executable binary.',
      'Linker: Combines independently compiled object code files and library routines into a single unified executable file.',
      'Loader: Transfers the executable program from secondary storage into main RAM addresses and initializes CPU execution registers.',
    ],
    examAnswer: [
      'List at least 4 distinct types of system software and explain the primary function of each.',
      'Differentiate between a Linker (combines object files) and a Loader (loads program into memory for execution).',
      'Explain why Device Drivers are essential for modern modular hardware expansion.',
      'State the role of system utilities such as disk defragmenters and backup tools.',
    ],
    slip: 'Do not confuse the linker with the compiler; the compiler translates source code into intermediate object files (.obj/.o), while the linker resolves external function references to produce the final executable (.exe).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'SYSTEM SOFTWARE EXECUTION PIPELINE', 'ta') +
          R(15, 45, 65, 40) +
          T(47, 62, 'Source', 't', 'middle') +
          T(47, 76, 'Files (.c)', 'ta', 'middle') +
          LA(80, 65, 105, 65, 'a') +
          R(105, 45, 65, 40, 'fa') +
          T(137, 62, 'Compiler', 't', 'middle') +
          T(137, 76, 'Object (.o)', 'ta', 'middle') +
          LA(170, 65, 195, 65, 'a') +
          R(195, 45, 65, 40) +
          T(227, 62, 'Linker', 't', 'middle') +
          T(227, 76, '+ Libs', 'ta', 'middle') +
          LA(260, 65, 285, 65, 'a') +
          R(285, 45, 65, 40, 'fa') +
          T(317, 62, 'Loader', 't', 'middle') +
          T(317, 76, 'To RAM', 'ta', 'middle') +
          R(30, 115, 300, 48) +
          T(180, 134, 'Device Drivers translate OS system calls into hardware signals', 'ta', 'middle') +
          T(180, 150, 'Operating System coordinates execution, memory, and I/O devices', 't', 'middle')
      ),
      caption: 'The system software toolchain transforming source code through compilation, linking, and loading into RAM.',
    },
  },

  'cfet:2:2': {
    explain: [
      'Application software consists of programs developed to help end-users perform specific productive, educational, creative, or computational tasks.',
      'It divides into General-Purpose (off-the-shelf commercial packages) and Customized (bespoke software tailored for specific organizational workflows).',
    ],
    definition:
      'Application software is computer programming designed directly for end-user interaction to accomplish dedicated business, technical, educational, or entertainment objectives.',
    formula: '\\text{Application Software} = \\text{General Purpose (Packaged)} + \\text{Specialized (Custom)}',
    steps: [
      'General Purpose Software: Mass-market commercial software designed to satisfy common productivity needs across diverse domains.',
      'Examples: Word Processors (MS Word, Google Docs), Spreadsheets (Excel), Database Management Systems (Oracle, MySQL), Web Browsers (Chrome).',
      'Specialized / Bespoke Software: Custom-engineered solutions commissioned by specific organizations to meet precise operational rules.',
      'Examples: Railway Reservation Systems (IRCTC), Hospital Management Information Systems, Banking Core Transaction Engines.',
      'Comparison: General purpose is cheap, thoroughly tested, and immediately available; custom software is expensive, tailored to unique business logic, but requires prolonged development.',
    ],
    examAnswer: [
      'Define Application Software and explain its position relative to System Software.',
      'Differentiate General-Purpose (Packaged) software from Customized (Tailor-made) software with 3 comparative criteria.',
      'Provide 2 concrete real-world examples for both categories.',
      'Discuss the trade-offs of build vs buy in enterprise software selection.',
    ],
    slip: 'Do not claim an operating system is application software; operating systems manage the machine for other software, whereas application software solves user tasks.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'APPLICATION SOFTWARE TAXONOMY', 'ta') +
          R(30, 36, 140, 75) +
          T(100, 54, 'General-Purpose', 'ta', 'middle') +
          T(100, 72, 'Off-the-shelf Packages', 't', 'middle') +
          T(100, 88, 'Word, Excel, Chrome', 'ta', 'middle') +
          T(100, 102, 'Low cost, broad use', 't', 'middle') +
          R(190, 36, 140, 75, 'fa') +
          T(260, 54, 'Specialized (Custom)', 'ta', 'middle') +
          T(260, 72, 'Bespoke Development', 't', 'middle') +
          T(260, 88, 'IRCTC, Banking Core', 'ta', 'middle') +
          T(260, 102, 'Tailored business logic', 't', 'middle') +
          R(20, 126, 320, 45) +
          T(180, 144, 'General purpose is mass-produced; customized software is built to order', 't', 'middle') +
          T(180, 160, 'Runs strictly on top of Operating System APIs', 'ta', 'middle')
      ),
      caption: 'Classification of application software into off-the-shelf general packages and bespoke solutions.',
    },
  },

  'cfet:2:3': {
    explain: [
      'The Operating System (OS) is the primary software system that acts as an intermediary between the computer user and the raw computer hardware.',
      'It has two fundamental viewpoints: Extended Machine / Software Virtualizer (provides clean high-level abstractions like files and sockets) and Resource Manager (fairly and securely allocates CPU time, memory space, and I/O devices).',
    ],
    definition:
      'An Operating System is system software that manages computer hardware and software resources, provides common services for computer programs, and serves as an extended virtual machine interface for users.',
    formula: '\\text{OS Primary Goals: } \\text{Convenience} \\; (\\text{User}) + \\text{Efficiency} \\; (\\text{System}) + \\text{Ability to Evolve}',
    steps: [
      'Objective 1 (Convenience): Hides the horrifying low-level details of hardware interrupts, disk sectors, and timing pulses, offering simple APIs.',
      'Objective 2 (Efficiency): Maximizes system throughput, minimizes idle CPU cycles, and prevents memory thrashing.',
      'Objective 3 (Evolution): Modular design allows adding new hardware peripherals and protocol stacks without rewriting core kernel logic.',
      'Dual-Mode Operation: Hardware enforces User Mode (restricted instructions) and Kernel/Supervisor Mode (privileged instructions) via a hardware mode bit.',
      'System Calls: The programming interface allowing user programs to request privileged kernel services (e.g. read(), write(), fork()).',
    ],
    examAnswer: [
      'Define an Operating System from both the User perspective (convenient abstraction) and System perspective (resource allocator).',
      'List and explain the 3 primary objectives of an OS: Convenience, Efficiency, Ability to evolve.',
      'Explain Dual-Mode Operation (User Mode vs Kernel Mode) and why it protects system stability.',
      'Define a System Call and trace how a user program invokes the OS kernel to write data to disk.',
    ],
    slip: 'Do not think user programs can write directly to physical disk sectors; all I/O must pass through privileged OS system calls to prevent accidental data corruption or malicious security bypasses.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'OS AS RESOURCE MANAGER & EXTENDED MACHINE', 'ta') +
          R(20, 36, 320, 30) +
          T(180, 54, 'User Programs & Applications', 't', 'middle') +
          LA(180, 66, 180, 84, 'a') +
          T(180, 78, 'System Calls (Trap to Kernel Mode)', 'ta', 'middle') +
          R(20, 84, 320, 44, 'fa') +
          T(180, 102, 'OPERATING SYSTEM KERNEL', 't', 'middle') +
          T(180, 118, 'CPU Scheduler · Virtual Memory · File System · Drivers', 'ta', 'middle') +
          LA(180, 128, 180, 146, 'a') +
          R(20, 146, 320, 30) +
          T(180, 164, 'Physical Hardware: CPU · RAM · Disks · Network Card', 't', 'middle')
      ),
      caption: 'The Operating System intermediary position managing physical resources via privileged system call boundaries.',
    },
  },

  'cfet:2:4': {
    explain: [
      'Operating systems evolved through different architectures tailored for specific computing environments: Batch, Time-Sharing, Distributed, and Real-Time Operating Systems.',
      'Batch systems automate non-interactive job processing; Time-Sharing systems multiplex CPU time for interactive multi-users; Distributed systems coordinate networked clusters; Real-Time systems guarantee strict temporal execution deadlines.',
    ],
    definition:
      'Operating systems are classified into distinct architectural paradigms based on user interaction latency, job dispatching mechanisms, and temporal determinism constraints.',
    formula: '\\text{Real-Time OS: } \\text{Correctness} = \\text{Logical Result} + \\text{Deadline Compliance}',
    steps: [
      'Batch OS: Similar jobs grouped into batches and processed sequentially without human user interaction; low CPU idle time, but long turnaround latency.',
      'Time-Sharing OS: Rapidly switches CPU between active processes using Round-Robin time quantum slices (e.g. 10 ms), giving each user the illusion of dedicated access (Unix, Linux).',
      'Distributed OS: Manages a collection of independent, networked computers, presenting them to the user as a single coherent unified system (distributed transparency).',
      'Hard Real-Time OS: Missing a temporal deadline results in total catastrophic system failure (e.g. aircraft fly-by-wire, automotive airbag controllers, pacemaker implants).',
      'Soft Real-Time OS: Missing a deadline degrades quality of service but does not cause total physical catastrophe (e.g. video streaming, online gaming).',
    ],
    examAnswer: [
      'Compare Batch, Time-Sharing, Distributed, and Real-Time operating systems in a detailed 4-column matrix.',
      'Contrast Hard Real-Time OS with Soft Real-Time OS, giving 2 safety-critical examples of each.',
      'Explain how Time-Sharing systems achieve interactive responsiveness using CPU time slicing.',
      'Explain the concept of Network Transparency in Distributed Operating Systems.',
    ],
    slip: 'Do not confuse high-speed throughput with real-time computing; a real-time OS is NOT necessarily fast, but it is strictly DETERMINISTIC—it mathematically guarantees meeting deadline bounds.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 4 PARADIGMS OF OPERATING SYSTEMS', 'ta') +
          R(20, 36, 150, 55) +
          T(95, 52, 'Batch OS', 't', 'middle') +
          T(95, 68, 'No user interaction', 'ta', 'middle') +
          T(95, 82, 'Jobs queued sequentially', 't', 'middle') +
          R(190, 36, 150, 55) +
          T(265, 52, 'Time-Sharing OS', 't', 'middle') +
          T(265, 68, 'Preemptive CPU slicing', 'ta', 'middle') +
          T(265, 82, 'Multi-user interactive', 't', 'middle') +
          R(20, 102, 150, 55) +
          T(95, 118, 'Distributed OS', 't', 'middle') +
          T(95, 134, 'Networked node cluster', 'ta', 'middle') +
          T(95, 148, 'Single system illusion', 't', 'middle') +
          R(190, 102, 150, 55, 'fa') +
          T(265, 118, 'Real-Time (RTOS)', 't', 'middle') +
          T(265, 134, 'Hard temporal deadlines', 'ta', 'middle') +
          T(265, 148, 'Airbags, avionics, robotics', 't', 'middle') +
          T(180, 178, 'RTOS mandates mathematical determinism over raw throughput', 'ta', 'middle')
      ),
      caption: 'The four fundamental OS evolutionary paradigms: Batch, Time-Sharing, Distributed, and Real-Time.',
    },
  },

  'cfet:2:5': {
    explain: [
      'The two most critical core responsibilities of an operating system kernel are Process Management and Memory Management.',
      'Process management tracks program execution lifetimes and arbitrates CPU cores, while memory management dynamically allocates, isolates, and protects RAM blocks.',
    ],
    definition:
      'Process management controls active execution units through scheduling and state transitions, while memory management tracks RAM allocations and isolates process address spaces using paging and virtual memory.',
    formula: '\\text{Process} = \\text{Program in Execution} + \\text{PCB} + \\text{Stack/Heap} + \\text{Registers}',
    steps: [
      'Process State Model: New (created) -> Ready (waiting in queue for CPU) -> Running (executing on core) -> Blocked/Waiting (I/O event) -> Terminated (finished).',
      'Process Control Block (PCB): Kernel data structure holding Process ID (PID), program counter, CPU register states, and open file handles.',
      'CPU Scheduling: Short-term scheduler selects next process from Ready queue using algorithms: FCFS, Shortest Job First (SJF), Round Robin (RR), Priority.',
      'Memory Management Functions: Tracks allocated and free memory bytes; dynamically allocates stack/heap via malloc(); prevents processes from accessing neighbor memory.',
      'Virtual Memory & Paging: Divides virtual address space into fixed-size Pages (typically 4 KB) mapped to physical Page Frames in RAM, swapping unused pages to disk.',
    ],
    examAnswer: [
      'Draw the classic 5-State Process Transition diagram: New, Ready, Running, Waiting, Terminated.',
      'List the critical fields stored within a Process Control Block (PCB).',
      'Explain the purpose of CPU scheduling and describe Round-Robin scheduling.',
      'Define Virtual Memory, Paging, and Page Faults.',
    ],
    slip: 'Do not confuse a program with a process; a program is a passive executable file stored on disk, whereas a process is an active entity loaded into RAM with its own program counter and resources.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, '5-STATE PROCESS LIFECYCLE MODEL', 'ta') +
          C(40, 95, 20) +
          T(40, 99, 'New', 't', 'middle') +
          LA(60, 95, 100, 95, 'a') +
          C(120, 95, 20, 'fa') +
          T(120, 99, 'Ready', 'ta', 'middle') +
          LA(140, 88, 200, 68, 'a') +
          T(170, 70, 'Dispatch', 't') +
          C(220, 65, 20, 'fa') +
          T(220, 69, 'Running', 'ta', 'middle') +
          LA(200, 68, 140, 88, 'd') +
          T(170, 94, 'Preempt', 't') +
          LA(240, 65, 280, 65, 'a') +
          C(300, 65, 20) +
          T(300, 69, 'Exit', 't', 'middle') +
          LA(220, 85, 220, 125, 'a') +
          T(225, 108, 'I/O Wait', 't') +
          C(220, 145, 20) +
          T(220, 149, 'Waiting', 't', 'middle') +
          LA(200, 145, 135, 110, 'a') +
          T(150, 136, 'I/O Done', 'ta') +
          T(180, 180, 'PCB preserves complete CPU register context during state switches', 'ta', 'middle')
      ),
      caption: 'The classic 5-state process lifecycle model governing CPU scheduling transitions.',
    },
  },

  'cfet:2:6': {
    explain: [
      'The user interface is the mechanism through which humans interact with the operating system.',
      'The two primary paradigms are the Command-Line Interface (CLI), which relies on keyboard-entered textual syntax, and the Graphical User Interface (GUI), which relies on visual WIMP elements (Windows, Icons, Menus, Pointer).',
    ],
    definition:
      'A user interface is the boundary software layer mediating communication between users and the operating system kernel, realized either through text-command interpreters (CLI) or graphical window managers (GUI).',
    formula: '\\text{GUI} = \\text{WIMP} \\; (\\text{Windows} + \\text{Icons} + \\text{Menus} + \\text{Pointing Device})',
    steps: [
      'Command-Line Interface (CLI): User types precise text commands into a shell (e.g. bash, PowerShell); fast, scriptable, low RAM overhead, steep learning curve.',
      'Graphical User Interface (GUI): User manipulates graphical widgets using a mouse or touchscreen; visual, intuitive, beginner-friendly, but consumes substantial memory and GPU cycles.',
      'Automation & Scripting: CLI commands can be chained into shell scripts (bash, batch) to automate complex administrative pipelines; difficult in pure GUI.',
      'Resource Consumption: CLI requires minimal video memory and can operate over slow remote SSH connections; GUI requires graphical compositors and dedicated RAM.',
      'Target Audiences: System administrators and programmers rely on CLI for speed and automation; general consumers rely on GUI for accessibility.',
    ],
    examAnswer: [
      'Construct a 5-point comparison table: CLI versus GUI.',
      'Compare across: Input device, Ease of learning, Resource consumption, Scriptability/Automation, and Remote administration speed.',
      'Define the WIMP acronym used in modern graphical desktop environments.',
      'Give concrete examples of each (CLI: Bash, Zsh, PowerShell; GUI: Windows Explorer, macOS Finder, GNOME).',
    ],
    slip: 'Do not assume CLI is obsolete; in server administration, cloud computing, and DevOps, CLI is the overwhelmingly dominant interface due to scriptability and headless remote efficiency.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'USER INTERFACE: CLI VERSUS GUI', 'ta') +
          R(20, 36, 150, 115) +
          T(95, 52, 'CLI (Terminal / Shell)', 'ta', 'middle') +
          R(30, 62, 130, 48) +
          T(35, 76, '$ ls -la /var/log', 't') +
          T(35, 92, '$ grep "error" sys.log', 'ta') +
          T(35, 104, '$ systemctl restart', 't') +
          T(95, 126, 'Low RAM · Fast · Scriptable', 'ta', 'middle') +
          T(95, 142, 'Steep learning curve', 't', 'middle') +
          R(190, 36, 150, 115, 'fa') +
          T(265, 52, 'GUI (WIMP Desktop)', 'ta', 'middle') +
          R(205, 62, 120, 48) +
          R(210, 68, 30, 20) +
          T(225, 82, 'Win', 't', 'middle') +
          C(260, 78, 8, 'fa') +
          T(280, 82, 'Menu', 't') +
          T(265, 126, 'Visual · Intuitive · Mouse', 'ta', 'middle') +
          T(265, 142, 'High RAM/GPU footprint', 't', 'middle') +
          T(180, 178, 'Servers rely on CLI for headless automation; consumers prefer GUI', 'ta', 'middle')
      ),
      caption: 'Side-by-side comparison of text-based Command Line Interface and graphical WIMP interface.',
    },
  },

  'cfet:2:7': {
    explain: [
      'A file system is the operating system method for organizing, naming, storing, and retrieving files on secondary storage media.',
      'Different operating systems employ different structural paradigms: Windows uses drive letters with NTFS/FAT32, while Linux and macOS use a single unified root directory tree (/) with ext4 and APFS.',
    ],
    definition:
      'A file system is an architectural storage abstraction that manages data indexing, directory hierarchies, access permissions, and physical sector allocation across storage media.',
    formula: '\\text{Path: } \\text{Windows: } \\text{C:\\\\Users\\\\docs} \\quad \\text{vs} \\quad \\text{Linux/macOS: } \\text{/home/users/docs}',
    steps: [
      'Directory Hierarchy: Windows employs separate drive letters for each storage partition (C:\\, D:\\); Linux/macOS merges all drives into a single unified root tree beginning at /.',
      'Windows File Systems (NTFS / FAT32): NTFS supports journaling, file encryption (EFS), compression, and access control lists (ACLs). FAT32 has a maximum single file size limit of 4 GB.',
      'Linux File Systems (ext4): High-performance journaling file system supporting POSIX permissions (read, write, execute for user, group, other). Case-sensitive filenames.',
      'macOS File Systems (APFS): Apple File System optimized for SSDs, featuring instant file cloning, snapshots, and strong multi-key encryption.',
      'File Attributes: Metadata including filename, file size, creation/modification timestamps, and permission flags.',
    ],
    examAnswer: [
      'Explain the fundamental difference between Windows drive-letter paths (C:\\) and Unix unified root trees (/).',
      'Compare NTFS with FAT32, highlighting the 4 GB file size barrier in FAT32.',
      'Explain Linux file permissions (rwx for User, Group, and Others) and case sensitivity.',
      'Define Journaling in file systems: prevents filesystem corruption by recording metadata changes in a log before writing to disk.',
    ],
    slip: 'Linux file paths use forward slashes (/) and are strictly case-sensitive ("File.txt" is completely different from "file.txt"), whereas Windows uses backslashes (\\) and is case-insensitive.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'FILE SYSTEM PARADIGMS: WINDOWS VS LINUX', 'ta') +
          R(20, 36, 150, 115) +
          T(95, 52, 'Windows: Partition Drives', 'ta', 'middle') +
          T(95, 72, 'C:\\ (System)  D:\\ (Data)', 't', 'middle') +
          T(95, 92, 'NTFS · FAT32 (4GB limit)', 'ta', 'middle') +
          T(95, 112, 'Backslash: C:\\Users\\Doc', 't', 'middle') +
          T(95, 132, 'Case-Insensitive', 'ta', 'middle') +
          R(190, 36, 150, 115, 'fa') +
          T(265, 52, 'Linux / macOS: Single Root', 'ta', 'middle') +
          T(265, 72, '/ (Root Tree)', 't', 'middle') +
          T(265, 92, 'ext4 · APFS (Journaling)', 'ta', 'middle') +
          T(265, 112, 'Forward Slash: /home/doc', 't', 'middle') +
          T(265, 132, 'Case-SENSITIVE', 'ta', 'middle') +
          T(180, 178, 'Journaling records transaction logs to prevent data corruption during power loss', 'ta', 'middle')
      ),
      caption: 'Comparative architecture of Windows partitioned drive letters and Unix unified single root trees.',
    },
  },
};
