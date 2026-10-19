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

/* ---------- PPS UNIT 2 TOPIC CONTENT (2 Topics) ---------- */
export const PPS_UNIT2_TOPICS: Record<string, TopicContent> = {
  'pps:2:0': {
    explain: [
      'Recursion is a programming technique where a function calls itself to solve smaller sub-problems until reaching a base condition.',
      'Iteration uses repetitive loop constructs (`for`, `while`) without allocating additional stack activation records.',
      'Demonstrated via Factorial ($n! = n \\times (n-1)!$, with base case $0! = 1$) and Euclidean GCD ($\\gcd(a, b) = \\gcd(b, a \\pmod b)$, with base case $b = 0$).',
      'Recursive functions risk stack overflow when recursion depth exceeds stack limits, whereas iteration maintains $O(1)$ auxiliary stack space.',
    ],
    definition:
      'Recursion is a self-referential algorithmic mechanism where a function repeatedly invokes itself on decremented inputs until reaching an explicit base case, evaluated against iteration in terms of stack consumption, execution overhead, and structural elegance.',
    formula: 'n! = n \\times (n-1)!, \\quad \\gcd(a, b) = \\begin{cases} a & \\text{if } b = 0 \\\\ \\gcd(b, a \\pmod b) & \\text{otherwise} \\end{cases}',
    steps: [
      'Base Case Essential: The termination condition must be tested first before recursive dispatch; omitting it causes infinite recursion.',
      'Recursive Factorial: `int fact(int n) { if (n <= 1) return 1; return n * fact(n - 1); }`.',
      'Euclidean GCD: `int gcd(int a, int b) { if (b == 0) return a; return gcd(b, a % b); }`.',
      'Call Stack Push: Each call allocates a new stack frame storing local variables, formal parameters, and return address.',
      'Stack Unwinding: Upon reaching the base case, return values propagate backwards down the call chain, popping frames in LIFO order.',
    ],
    examAnswer: [
      'Compare recursion and iteration across execution overhead, memory consumption, and code readability.',
      'Write the complete recursive C implementations for `fact(n)` and Euclidean `gcd(a, b)`.',
      'Trace the activation stack for `fact(4)` illustrating both the forward call chain and the backward return unwinding.',
      'Explain the cause and symptom of stack overflow errors in recursive programs.',
    ],
    slip: 'Omitting the base condition or writing `return n * fact(n);` instead of `fact(n - 1);` leads to endless recursion and immediate stack exhaustion.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'RECURSIVE CALL STACK & UNWINDING (fact(4))', 'ta') +
          // Stack frames stacked vertically
          R(40, 32, 130, 26, 'fa') +
          T(105, 49, 'fact(1) -> returns 1', 'ta', 'middle') +
          R(40, 60, 130, 26) +
          T(105, 77, 'fact(2) = 2 * fact(1)', 't', 'middle') +
          R(40, 88, 130, 26) +
          T(105, 105, 'fact(3) = 3 * fact(2)', 't', 'middle') +
          R(40, 116, 130, 26) +
          T(105, 133, 'fact(4) = 4 * fact(3)', 't', 'middle') +
          R(40, 144, 130, 24) +
          T(105, 160, 'main() frame', 't', 'middle') +
          // Forward Push Arrow (Left)
          LA(25, 150, 25, 40, 'a') +
          T(18, 95, 'Push', 'ta', 'end') +
          // Return Unwinding Arrow (Right)
          LA(185, 45, 185, 155, 'a') +
          T(192, 49, '1', 'ta') +
          T(192, 77, '2 * 1 = 2', 't') +
          T(192, 105, '3 * 2 = 6', 't') +
          T(192, 133, '4 * 6 = 24', 'ta') +
          T(192, 160, 'res = 24', 'ta') +
          // Euclidean GCD note
          R(250, 45, 100, 110) +
          T(300, 65, 'Euclid GCD:', 'ta', 'middle') +
          T(300, 85, 'gcd(48, 18)', 't', 'middle') +
          T(300, 102, '↓ gcd(18, 12)', 't', 'middle') +
          T(300, 119, '↓ gcd(12, 6)', 't', 'middle') +
          T(300, 136, '↓ gcd(6, 0) = 6', 'ta', 'middle')
      ),
      caption:
        'Figure 2.0: Stack frame growth during recursive descent and return value unwinding for factorial and Euclidean GCD.',
    },
  },

  'pps:2:1': {
    explain: [
      'In C, all function parameters are passed by value: the function receives independent copies of caller arguments.',
      'To mutate variables belonging to the calling function, C uses pointers to simulate call by reference: the caller passes addresses (`&a`), and the callee dereferences them (`*a`).',
      'Arrays in C naturally decay to pointers to their first element when passed into functions, causing array parameters to inherently operate by reference.',
    ],
    definition:
      'Parameter passing is the transfer of argument data between caller and callee scopes, categorised into call by value (copying data, caller immutable) and simulated call by reference via pointers (passing addresses, caller mutable).',
    formula: '\\text{Value: } x_{\\text{callee}} = \\text{copy}(x_{\\text{caller}}); \\quad \\text{Ref: } *p_x \\longleftrightarrow \\text{Address}(x_{\\text{caller}}) \\implies \\Delta x_{\\text{caller}}',
    steps: [
      'Call by Value Isolation: `void swapVal(int a, int b)` modifies local stack copies; values in `main()` are unchanged.',
      'Address Passing: Caller invokes `swapRef(&a, &b);` passing the 64-bit addresses of its local variables.',
      'Pointer Dereferencing: `void swapRef(int *a, int *b)` uses indirection: `int temp = *a; *a = *b; *b = temp;` directly modifying the caller’s memory.',
      'Array Parameter Decay: Passing `int arr[]` passes `int *arr`. Any modification inside the function alters the original array.',
      'Const Qualifier Protection: Use `const int *arr` to prevent a function from accidentally altering an array passed by reference.',
    ],
    examAnswer: [
      'Contrast call by value and call by reference with memory layout diagrams.',
      'Write the complete C code for `swap(int *x, int *y)` and explain why `&` is required in the caller invocation.',
      'Explain how array arguments decay into pointers and why array size must be passed as an auxiliary parameter.',
      'Demonstrate how passing by value fails to swap two variables with code and stack trace.',
    ],
    slip: 'Invoking `swap(a, b)` instead of `swap(&a, &b)` in the caller, or writing `temp = a; a = b; b = temp;` without asterisks inside the pointer function.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'CALL BY VALUE VS CALL BY REFERENCE', 'ta') +
          // Left Box: Call by Value
          R(15, 34, 155, 142) +
          T(92, 52, 'Call by Value: swap(a, b)', 'ta', 'middle') +
          R(25, 62, 135, 40) +
          T(92, 78, 'main(): a = 5, b = 9', 't', 'middle') +
          T(92, 94, 'Passes copies (5, 9)', 't', 'middle') +
          R(25, 110, 135, 40) +
          T(92, 126, 'swap(): x = 9, y = 5', 't', 'middle') +
          T(92, 142, 'Local copies swapped', 't', 'middle') +
          T(92, 168, 'Result: main() a=5, b=9 (NO SWAP)', 'ta', 'middle') +
          // Right Box: Call by Reference
          R(190, 34, 155, 142, 'fa') +
          T(267, 52, 'Call by Ref: swap(&a, &b)', 'ta', 'middle') +
          R(200, 62, 135, 40) +
          T(267, 78, 'main(): &a=0x10, &b=0x14', 't', 'middle') +
          T(267, 94, 'Passes addresses', 't', 'middle') +
          R(200, 110, 135, 40) +
          T(267, 126, '*x = 9, *y = 5', 'ta', 'middle') +
          T(267, 142, 'Direct memory write!', 't', 'middle') +
          T(267, 168, 'Result: main() a=9, b=5 (SWAPPED)', 'ta', 'middle') +
          // Arrow pointing across
          LA(267, 110, 267, 102, 'a')
      ),
      caption:
        'Figure 2.1: Call by value isolates caller state by copying, whereas call by reference passes memory addresses for direct in-place mutation.',
    },
  },
};
