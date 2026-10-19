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

/* ---------- PPS UNIT STORIES (6 Units) ---------- */
export const PPS_UNIT_STORIES: Record<string, UnitStory> = {
  'pps:0': {
    whatItIs:
      'Algorithmic basics covers structured problem formulation, standard ANSI flowchart symbols, formatted console I/O, explicit type conversions, and core decision and repetition control structures in C.',
    whyItMatters:
      'A program cannot compute correct results if integer truncation silently zeros out fractional values or if loop termination conditions produce infinite execution. Mastering control flow is the bedrock of all computer science.',
    howItWorks:
      'Code executes sequentially from main(). Conditions branch via if-else ladders and multi-way jump tables in switch-case. Loops repeat invariant blocks until boundary guards fail, while type casting explicitly coerces types before arithmetic evaluation.',
  },
  'pps:1': {
    whatItIs:
      'Contiguous linear memory buffers (1-D and 2-D arrays) and null-terminated character sequences (strings) accessed directly through pointer offsets.',
    whyItMatters:
      'Digital computation fundamentally manipulates structured batches of data: vectors, image pixel grids, matrix transformations, and human text strings. Direct memory navigation is C’s primary performance advantage.',
    howItWorks:
      'An array identifier decays to the address of its zeroth element. Multidimensional arrays are indexed via row-major flattening: base + (i * cols + j) * sizeof(T). Strings terminate at byte 0x00 (\'\\0\'), enabling linear traversals and in-place two-pointer reversals.',
  },
  'pps:2': {
    whatItIs:
      'Procedural modularization through functions, call stack activation records, recursion vs iteration paradigms, and parameter passing mechanisms.',
    whyItMatters:
      'Monolithic code is unmaintainable. Decomposing problems into self-contained functions isolates scope. Understanding stack memory vs pointer reference passing prevents unintended side-effects and stack overflow crashes.',
    howItWorks:
      'Call by value pushes copies of arguments onto the function frame; modifications vanish on return. Call by reference passes memory addresses (pointers), enabling direct dereferencing and manipulation of caller variables. Recursive functions unwind through base cases.',
  },
  'pps:3': {
    whatItIs:
      'User-defined aggregate data structures (struct and union) with memory alignment/padding, and persistent non-volatile storage using C standard file I/O streams.',
    whyItMatters:
      'Real-world data entities (students, employees, transactions) have heterogeneous attributes. Ephemeral RAM memory clears on program termination; file handling ensures durable state persistence across executions.',
    howItWorks:
      'Structs allocate disjoint memory offsets for all members padded to word boundaries. Unions overlay all members at address offset zero, sizing to the largest element. File I/O utilizes FILE pointers, buffered streams, and EOF sentinels.',
  },
  'pps:4': {
    whatItIs:
      'The foundational tenets of Object-Oriented Programming (OOP) in C++: data encapsulation, class blueprints vs object instances, constructor/destructor lifecycles, static class-wide state, and friend declarations.',
    whyItMatters:
      'Procedural C leaves data vulnerable to arbitrary global modification. C++ classes enforce data hiding, invariants, and automatic deterministic resource cleanup (RAII), preventing resource and memory leaks.',
    howItWorks:
      'Private access specifiers guard internal member variables. Member methods provide controlled interfaces. Constructors initialize memory at instantiation, copy constructors perform deep buffer duplication, and destructors execute on scope exit.',
  },
  'pps:5': {
    whatItIs:
      'Advanced OOP paradigms: inheritance hierarchies, polymorphism (compile-time overloading and runtime virtual table dispatch), exception safety (try/throw/catch), and type-agnostic generic programming (templates).',
    whyItMatters:
      'Enables massive code reuse, extensible software architectures, robust defensive error recovery without return-code clutter, and zero-overhead type-safe collections in standard libraries.',
    howItWorks:
      'Derived classes inherit base properties; virtual base classes eliminate diamond redundancy. Virtual functions dispatch through runtime vtables (*vptr). Exceptions unwind the call stack to matching catch blocks, while templates instantiate concrete classes/functions during compilation.',
  },
};

/* ---------- PPS UNIT 0 TOPIC CONTENT (3 Topics) ---------- */
export const PPS_UNIT0_TOPICS: Record<string, TopicContent> = {
  'pps:0:0': {
    explain: [
      'An algorithm is a step-by-step, finite, unambiguous sequence of instructions designed to solve a computational problem.',
      'A flowchart provides a visual blueprint of the algorithm using standardized ANSI symbols (ovals for terminal points, parallelograms for I/O, rectangles for calculations, and diamonds for decisions).',
      'In C, arithmetic division between two integers automatically truncates the fractional portion (e.g. 7 / 2 yields 3). Explicit type casting `(float)` must be used to force floating-point division.',
    ],
    definition:
      'Algorithmic logic is the deterministic sequence of unambiguous instructions for problem solving, visualized via standard flowchart notation and implemented in C using explicit type coercion and formatted standard I/O streams.',
    formula: '\\text{Area}_{\\text{triangle}} = \\frac{1}{2} b h = (\\text{float})(b \\times h) / 2.0f, \\quad \\text{Area}_{\\text{circle}} = \\pi r^2',
    steps: [
      'Flowchart Representation: Oval (Start/Stop), Parallelogram (Input/Output: read base, height, radius), Rectangle (Processing: calculate area), Arrows (Control flow direction).',
      'Formatted Input: `scanf("%d %d", &base, &height);` passing memory addresses using the reference operator `&`.',
      'Integer Truncation Hazard: In C, `int / int` produces an integer result truncated toward zero. `1 / 2` evaluates to `0`.',
      'Explicit Type Casting: `(float)(base * height) / 2.0f` promotes the operand to float, preserving decimal fractions (e.g. 21.0f / 2 = 10.50f).',
      'Formatted Output: `printf("Triangle Area = %.2f\\n", tri_area);` formats floating-point values to 2 decimal places.',
    ],
    examAnswer: [
      'Sketch the 4 standard flowchart symbols (Terminal Oval, Process Rectangle, Input/Output Parallelogram, Decision Diamond).',
      'Write the complete C program to compute triangle area and circle area from user input.',
      'Explain the difference between implicit type promotion and explicit type casting `(type)expression`.',
      'Explain why passing `base` instead of `&base` to `scanf()` causes undefined behavior or segmentation fault.',
    ],
    slip: 'Never write `float area = 1 / 2 * base * height;` because integer division `1 / 2` evaluates to `0` first, causing the calculated area to always equal 0.00!',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'FLOWCHART & EXPLICIT TYPE CASTING', 'ta') +
          // Flowchart Blocks (Left)
          R(20, 32, 60, 22) +
          T(50, 47, 'START', 't', 'middle') +
          LA(50, 54, 50, 68, 'a') +
          P('M 25 68 L 85 68 L 75 90 L 15 90 Z') +
          T(48, 83, 'read b, h', 't', 'middle') +
          LA(50, 90, 50, 104, 'a') +
          R(12, 104, 76, 26, 'fa') +
          T(50, 117, '(float)(b*h)/2', 'ta', 'middle') +
          T(50, 126, 'tri_area', 't', 'middle') +
          LA(50, 130, 50, 144, 'a') +
          P('M 25 144 L 85 144 L 75 166 L 15 166 Z') +
          T(48, 159, 'print area', 't', 'middle') +
          LA(50, 166, 50, 174, 'a') +
          R(20, 174, 60, 14) +
          T(50, 184, 'STOP', 't', 'middle') +
          // Separator
          L(105, 30, 105, 180, 'd') +
          // Right Box: Truncation vs Cast Callout
          T(120, 45, 'Integer Truncation Trap in C:', 'ta') +
          R(120, 55, 225, 45) +
          T(130, 72, 'int b = 7, h = 3;', 't') +
          T(130, 88, 'float a = (b * h) / 2;  // 21 / 2 -> 10.00!', 'ta') +
          T(120, 120, 'Correct Explicit Cast:', 'ta') +
          R(120, 130, 225, 48, 'fa') +
          T(130, 148, 'float a = (float)(b * h) / 2.0f;', 'ta') +
          T(130, 166, '// Casts 21 -> 21.0f / 2 -> 10.50f', 't')
      ),
      caption:
        'Figure 0.0: Flowchart control flow and the necessity of explicit (float) casting to prevent integer division truncation.',
    },
  },

  'pps:0:1': {
    explain: [
      'Decision-making statements control program branch flow based on conditional boolean expressions.',
      'An `if-else if-else` ladder evaluates range conditions sequentially, executing the first branch whose predicate tests true.',
      'A `switch-case` statement provides multi-way branch selection based on the equality of an integral expression against compile-time constants.',
      'In switch-case, each case block must terminate with a `break` statement; otherwise, execution falls through into subsequent case blocks.',
    ],
    definition:
      'Decision-making structures are control flow mechanisms that route execution through alternative code paths using sequential boolean predicates (if-else ladder) or discrete jump tables (switch-case).',
    formula: '\\text{Grade} = \\begin{cases} \\text{\'O\'} & \\text{if } \\text{marks} \\ge 90 \\\\ \\text{\'A\'} & \\text{if } 80 \\le \\text{marks} < 90 \\\\ \\text{\'B\'} & \\text{if } 70 \\le \\text{marks} < 80 \\\\ \\text{\'P\'} & \\text{otherwise} \\end{cases}',
    steps: [
      'Grade Determination: Evaluate marks in descending order using `if (marks >= 90) grade = \'O\'; else if (marks >= 80) grade = \'A\'; ...`.',
      'Switch-Case Dispatch: Pass character variable `switch (grade)` to evaluate constant case labels.',
      'Break Keyword: Halts execution within the switch statement and branches immediately to the closing brace.',
      'Fall-Through Behavior: If `break` is omitted, control cascades into subsequent case statements regardless of their labels.',
      'Default Case: Executes as a fallback whenever no preceding case label matches the selector expression.',
    ],
    examAnswer: [
      'Compare `if-else ladder` and `switch-case` across supported data types, range checks, and assembly branching performance.',
      'Write the complete C code for assigning grades using if-else and printing performance remarks using switch-case.',
      'Explain the significance of the `break` statement and demonstrate fall-through behavior with code.',
      'Explain why floating-point variables (`float`/`double`) cannot be used as switch selectors in C.',
    ],
    slip: 'Forgetting the `break;` statement at the end of each switch case causes unwanted fall-through execution into all following case blocks.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'IF-ELSE LADDER & SWITCH DISPATCH', 'ta') +
          // Decision Diamond 1
          P('M 60 35 L 105 55 L 60 75 L 15 55 Z') +
          T(60, 58, 'marks>=90?', 't', 'middle') +
          LA(105, 55, 140, 55, 'a') +
          T(120, 48, 'Yes', 'ta') +
          R(140, 43, 60, 24, 'fa') +
          T(170, 58, 'grade=\'O\'', 'ta', 'middle') +
          // False branch downward
          LA(60, 75, 60, 95, 'a') +
          T(65, 88, 'No', 't') +
          P('M 60 95 L 105 115 L 60 135 L 15 115 Z') +
          T(60, 118, 'marks>=80?', 't', 'middle') +
          LA(105, 115, 140, 115, 'a') +
          T(120, 108, 'Yes', 'ta') +
          R(140, 103, 60, 24) +
          T(170, 118, 'grade=\'A\'', 't', 'middle') +
          // Switch Jump Table on Right
          R(230, 35, 115, 135) +
          T(287, 52, 'switch (grade)', 'ta', 'middle') +
          L(235, 60, 340, 60, 'd') +
          T(240, 78, 'case \'O\': Outstanding', 't') +
          T(240, 94, '  break; // exit', 'ta') +
          T(240, 114, 'case \'A\': Excellent', 't') +
          T(240, 130, '  break; // exit', 'ta') +
          T(240, 150, 'default: Pass', 't') +
          // Arrow connecting into switch
          LA(200, 55, 230, 70, 'a') +
          LA(200, 115, 230, 110, 'a')
      ),
      caption:
        'Figure 0.1: Conditional range evaluation in an if-else ladder followed by discrete jump dispatch in a switch-case block.',
    },
  },

  'pps:0:2': {
    explain: [
      'Iterative problem solving utilizes loops (`for`, `while`, `do-while`) to execute a block of statements repeatedly until a termination condition is met.',
      'Fibonacci sequence generation computes each subsequent term as the sum of the preceding two ($F_n = F_{n-1} + F_{n-2}$), shifting state variables iteratively.',
      'Primality testing checks if an integer $N > 1$ has divisors other than 1 and itself; optimizing trial division up to $\\sqrt{N}$ cuts computational steps from $O(N)$ to $O(\\sqrt{N})$.',
    ],
    definition:
      'Iteration is the repetitive execution of an instruction block governed by loop invariants, initialization, and termination criteria, demonstrated through Fibonacci recurrence and optimized $O(\\sqrt{N})$ primality testing.',
    formula: 'F_n = F_{n-1} + F_{n-2} \\quad (F_0 = 0, F_1 = 1); \\quad \\text{Prime check: } d \\in [2, \\lfloor\\sqrt{N}\\rfloor] \\implies N \\pmod d \\neq 0',
    steps: [
      'Fibonacci Register Shift: Initialize `a = 0, b = 1`. In each iteration: `next = a + b`, print `a`, update `a = b`, `b = next`.',
      'Primality Base Cases: If $N \\le 1$, return non-prime. If $N = 2$, return prime.',
      'Trial Division Optimization: If $N$ has a factor greater than $\\sqrt{N}$, its paired factor must be less than $\\sqrt{N}$.',
      'Optimized Loop: Test `for (int d = 2; d * d <= N; d++)`. If `N % d == 0`, $N$ is composite; break immediately.',
      'Generating Primes up to N: Run the primality test inside an outer loop from 2 to $N$.',
    ],
    examAnswer: [
      'Write the complete C program to generate the first N terms of the Fibonacci sequence.',
      'Write an efficient C function to check if a number is prime using the $\\sqrt{N}$ loop boundary.',
      'Prove mathematically why factor testing can stop at $\\sqrt{N}$ instead of checking all integers up to $N - 1$.',
      'Compare `for` loops (pre-test, fixed iterations) with `while` loops (pre-test, event-driven) and `do-while` loops (post-test, executes at least once).',
    ],
    slip: 'Writing the prime check loop as `for (i = 2; i < n; i++)` or `i <= n/2` is functionally correct but causes massive performance penalties on large inputs compared to `i * i <= n`.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'FIBONACCI SHIFT & SQRT(N) PRIMALITY', 'ta') +
          // Fibonacci Shift Registers (Top)
          T(20, 38, 'Fibonacci State Registers:', 'ta') +
          R(20, 46, 50, 24) +
          T(45, 62, 'a = 0', 't', 'middle') +
          T(78, 62, '+', 'ta', 'middle') +
          R(90, 46, 50, 24) +
          T(115, 62, 'b = 1', 't', 'middle') +
          LA(140, 58, 165, 58, 'a') +
          R(165, 46, 65, 24, 'fa') +
          T(197, 62, 'next = 1', 'ta', 'middle') +
          P('M 115 70 L 115 82 L 45 82 L 45 70', 'a') +
          T(80, 92, 'Shift: a = b, b = next', 't', 'middle') +
          // Separator
          L(245, 30, 245, 175, 'd') +
          // Sqrt(N) Primality (Right)
          T(255, 45, 'Prime Test O(√N)', 'ta') +
          R(255, 56, 95, 24, 'fa') +
          T(302, 72, 'd * d <= N', 'ta', 'middle') +
          T(255, 96, 'For N = 10,000:', 't') +
          T(255, 112, '• Naive: 9,998 checks', 't') +
          T(255, 128, '• Half: 5,000 checks', 't') +
          T(255, 144, '• Sqrt: 100 checks!', 'ta') +
          T(255, 168, 'Factor pairs mirror at √N', 't')
      ),
      caption:
        'Figure 0.2: Iterative Fibonacci sliding registers (left) and optimized trial division factor check cutoff at √N (right).',
    },
  },
};
