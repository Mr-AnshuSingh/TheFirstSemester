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

/* ---------- PPS UNIT 5 TOPIC CONTENT (4 Topics) ---------- */
export const PPS_UNIT5_TOPICS: Record<string, TopicContent> = {
  'pps:5:0': {
    explain: [
      'Inheritance allows a derived class to inherit member variables and methods from one or more base classes, establishing hierarchical "is-a" relationships and promoting code reuse.',
      'Five core inheritance topologies: Single, Multilevel, Multiple, Hierarchical, and Hybrid (Diamond).',
      'The Diamond Problem arises in multiple inheritance when a class inherits from two intermediate classes that share a common root base class, causing duplicate member copies and compiler ambiguity.',
      'In C++, the Diamond Problem is resolved using `virtual` base inheritance (`class B : virtual public A`), ensuring that only one shared subobject of the root class exists in the most derived class.',
    ],
    definition:
      'Inheritance is the OOP mechanism enabling hierarchical classification and code reuse across five topologies, resolved in hybrid diamond configurations through virtual base class deduplication.',
    formula: '\\text{Derived Class} = \\text{Base Members} + \\text{New Members}; \\quad \\text{class B : virtual public A} \\implies \\text{Single Root Copy}',
    steps: [
      'Single Inheritance: `class Derived : public Base { ... };`.',
      'Multilevel Inheritance: Class B inherits from A, and Class C inherits from B.',
      'Multiple Inheritance: Class C inherits directly from both Class A and Class B.',
      'Diamond Ambiguity: Class D inherits from B and C, which both inherit from A; calling `d.display()` causes an ambiguous member error.',
      'Virtual Base Solution: Inheriting with `virtual public A` in B and C forces the compiler to construct only a single shared instance of A in D.',
    ],
    examAnswer: [
      'Diagram and describe the 5 types of inheritance supported in C++.',
      'Explain the Diamond Problem with an inheritance diagram and sample code.',
      'Write the complete C++ solution using virtual base classes to resolve diamond ambiguity.',
      'Explain the difference between `public`, `protected`, and `private` inheritance modes.',
    ],
    slip: 'Omitting the `virtual` keyword when defining the intermediate classes (`class B : public A`), causing the compiler to flag member access as ambiguous in class D.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE DIAMOND PROBLEM & VIRTUAL BASE SOLUTION', 'ta') +
          // Root Class A
          R(130, 30, 100, 26, 'fa') +
          T(180, 47, 'Root Class A', 'ta', 'middle') +
          // Left Branch B
          LA(150, 56, 95, 80, 'a') +
          R(45, 80, 100, 26) +
          T(95, 97, 'Class B (virtual)', 't', 'middle') +
          // Right Branch C
          LA(210, 56, 265, 80, 'a') +
          R(215, 80, 100, 26) +
          T(265, 97, 'Class C (virtual)', 't', 'middle') +
          // Derived Class D
          LA(95, 106, 150, 130, 'a') +
          LA(265, 106, 210, 130, 'a') +
          R(130, 130, 100, 28, 'fa') +
          T(180, 147, 'Derived Class D', 'ta', 'middle') +
          // Solution callout
          T(180, 178, 'virtual public A ensures ONLY 1 COPY of Class A in Class D', 'ta', 'middle')
      ),
      caption:
        'Figure 5.0: The Diamond Problem in multiple inheritance and its resolution via C++ virtual base class deduplication.',
    },
  },

  'pps:5:1': {
    explain: [
      'Polymorphism ("many forms") allows a single programming interface to represent multiple distinct implementations.',
      'Compile-time polymorphism is achieved through function overloading (same identifier with different parameters) and operator overloading (custom operators like `+` for `Complex` numbers).',
      'Runtime polymorphism is achieved through abstract base classes and virtual functions (`virtual void area() = 0;`), which cannot be instantiated directly.',
      'Dynamic dispatch uses a virtual method table (`vtable`) and a virtual table pointer (`*vptr`) inside each object, resolving function calls at runtime based on the actual object type.',
    ],
    definition:
      'Polymorphism is the ability of program entities to execute specialized behaviors via compile-time resolution (function/operator overloading) or runtime dynamic dispatch via abstract classes and virtual tables (vtables).',
    formula: '\\text{Operator: } \\text{Complex operator+}(const \\text{Complex} \\&c); \\quad \\text{Abstract Method: } \\text{virtual void area}() = 0;',
    steps: [
      'Operator Overloading Syntax: `Complex operator+(const Complex &c) const { return Complex(real + c.real, imag + c.imag); }`.',
      'Function Overloading: Functions sharing the same name but distinct signatures resolved by compiler argument types.',
      'Pure Virtual Function: `virtual void area() = 0;` declares an abstract interface in `class Shape`.',
      'Abstract Class Guarantee: Classes with at least one pure virtual function cannot be directly instantiated.',
      'Runtime Dynamic Dispatch: `Shape *s = new Circle(5.0); s->area();` dispatches dynamically to `Circle::area()` through the vtable.',
    ],
    examAnswer: [
      'Compare compile-time polymorphism and runtime polymorphism across resolution mechanism, performance, and flexibility.',
      'Write complete C++ code implementing a `Complex` number class with overloaded `+` operator.',
      'Write an abstract base class `Shape` with pure virtual function `area()` and implement derived classes `Circle` and `Rectangle`.',
      'Explain the internal mechanics of `vtable` and `vptr` in C++ runtime polymorphism.',
    ],
    slip: 'Omitting the `virtual` keyword on the base class destructor (`virtual ~Shape()`), which causes undefined behavior and memory leaks when deleting derived objects through a base pointer.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'POLYMORPHISM: COMPILE-TIME VS RUNTIME', 'ta') +
          // Left Box: Compile-Time Overloading
          R(15, 34, 155, 142) +
          T(92, 52, 'Compile-Time Polymorphism', 'ta', 'middle') +
          R(25, 62, 135, 34) +
          T(92, 76, 'Function Overloading', 't', 'middle') +
          T(92, 88, 'add(int, int) vs add(float, float)', 't', 'middle') +
          R(25, 102, 135, 34, 'fa') +
          T(92, 116, 'Operator Overloading', 'ta', 'middle') +
          T(92, 128, 'c3 = c1 + c2 (Complex)', 'ta', 'middle') +
          T(92, 158, 'Resolved at compilation', 't', 'middle') +
          // Right Box: Runtime Dynamic Dispatch
          R(190, 34, 155, 142, 'fa') +
          T(267, 52, 'Runtime Polymorphism', 'ta', 'middle') +
          R(200, 62, 135, 30) +
          T(267, 76, 'Shape *s (Base Pointer)', 't', 'middle') +
          T(267, 86, 'virtual void area() = 0;', 't', 'middle') +
          LA(267, 92, 235, 110, 'a') +
          LA(267, 92, 300, 110, 'a') +
          R(200, 110, 65, 26) +
          T(232, 126, 'Circle', 't', 'middle') +
          R(270, 110, 65, 26) +
          T(302, 126, 'Rectangle', 't', 'middle') +
          T(267, 158, 'Dynamic vtable dispatch', 'ta', 'middle')
      ),
      caption:
        'Figure 5.1: Dual branches of C++ polymorphism: compile-time resolution via operator/function overloading vs runtime vtable dispatch.',
    },
  },

  'pps:5:2': {
    explain: [
      'Exception handling isolates error detection from error correction, preventing application crashes from unexpected runtime failures.',
      'Three core keywords: `try` (encloses monitored code), `throw` (signals an exceptional error condition), and `catch` (captures and resolves the exception).',
      'Demonstrated via safe division by zero: throwing an exception when the denominator is zero, avoiding operating system crash signals.',
      'Stack Unwinding: When an exception is thrown, destructors of all local objects in the try block are executed in reverse construction order before entering the catch block.',
    ],
    definition:
      'Exception handling is the structured error-management paradigm in C++ using `try`, `throw`, and `catch` that transfers control across call stack activation records while guaranteeing automatic stack unwinding and deterministic resource cleanup.',
    formula: '\\text{try} \\; \\{ \\text{if}(b == 0) \\; \\text{throw}(e); \\} \\; \\text{catch}(e) \\; \\{ \\text{recover}(); \\}',
    steps: [
      'Guarded Code: Enclose operations prone to runtime failure in a `try { ... }` block.',
      'Exception Condition: Check `if (denominator == 0) throw std::runtime_error("Division by zero!");`.',
      'Control Transfer: Normal execution halts immediately; runtime searches the call stack for an appropriate catch block.',
      'Stack Unwinding: Local objects within the unwound scopes are cleanly destructed.',
      'Catch Handler: `catch (const std::runtime_error &e)` catches the error and prints `e.what()` for graceful recovery.',
    ],
    examAnswer: [
      'Explain the flow of control through `try`, `throw`, and `catch` blocks in C++.',
      'Write complete C++ code handling division by zero using exception handling.',
      'Explain the concept of Stack Unwinding and its interaction with object destructors.',
      'Explain the purpose and positioning of the catch-all handler `catch (...)`.',
    ],
    slip: 'Throwing an exception without a matching `catch` block or throwing outside a `try` block, which causes immediate abnormal program termination via `std::terminate()`.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'C++ EXCEPTION HANDLING & STACK UNWINDING', 'ta') +
          // Try Block (Top)
          R(30, 35, 180, 55) +
          T(120, 52, 'try {', 'ta', 'middle') +
          T(120, 66, '  if (b == 0) throw "DivByZero";', 't', 'middle') +
          T(120, 80, '  res = a / b;', 't', 'middle') +
          // Throw Arrow Down
          LA(120, 90, 120, 120, 'a') +
          T(125, 108, 'throw (Unwinds Stack)', 'ta') +
          // Catch Block (Bottom)
          R(30, 120, 180, 50, 'fa') +
          T(120, 138, 'catch (const char* msg) {', 'ta', 'middle') +
          T(120, 154, '  cerr << "Error: " << msg;', 't', 'middle') +
          // Normal flow continuation on right
          R(240, 65, 100, 75) +
          T(290, 85, 'Program Continues', 'ta', 'middle') +
          T(290, 102, 'Gracefully', 't', 'middle') +
          T(290, 118, 'NO CRASH!', 'ta', 'middle') +
          LA(210, 145, 240, 115, 'a')
      ),
      caption:
        'Figure 5.2: Control transfers from throw through stack unwinding to the catch block, ensuring safe error recovery without crashing.',
    },
  },

  'pps:5:3': {
    explain: [
      'Templates enable generic programming in C++, allowing functions and classes to operate with generic types without code duplication.',
      'The compiler instantiates concrete functions and classes at compile time (monomorphization) based on argument types, guaranteeing zero runtime performance overhead.',
      'Function templates define generic algorithms: `template <typename T> T maxOf(T a, T b) { return a > b ? a : b; }`.',
      'Class templates define generic data structures: `template <typename T1, typename T2> class Pair` models heterogeneous key-value pairs.',
    ],
    definition:
      'Templates are compile-time meta-programming constructs that enable type-agnostic generic programming by generating strongly typed concrete functions and classes on demand during compilation.',
    formula: '\\text{template <typename T>} \\; T \\; f(T a, T b) \\xrightarrow{\\text{Compiler}} \\text{int } f(\\text{int}, \\text{int}), \\; \\text{double } f(\\text{double}, \\text{double})',
    steps: [
      'Template Declaration: Precede function or class with `template <typename T>` or `template <class T>`.',
      'Function Template: `template <typename T> T maxOf(T a, T b) { return (a > b) ? a : b; }`.',
      'Type Deduction: In `maxOf(10, 25)`, the compiler deduces `T = int`; in `maxOf(3.14, 2.71)`, it deduces `T = double`.',
      'Class Template: `template <typename T1, typename T2> class Pair { public: T1 first; T2 second; ... };`.',
      'Explicit Specification: Use `Pair<int, string> p(101, "Roll")` to instantiate heterogeneous types.',
    ],
    examAnswer: [
      'Define Generic Programming and explain how C++ templates achieve type safety without runtime penalty.',
      'Write the complete C++ code for a `maxOf` function template and test it with multiple types.',
      'Write the complete C++ implementation of a generic `Pair<T1, T2>` class template.',
      'Contrast C++ template monomorphization with Java generic type erasure.',
    ],
    slip: 'Calling `maxOf(5, 7.8)` without explicit template argument specification (`maxOf<double>(5, 7.8)`), which causes a compiler deduction ambiguity error between `int` and `double`.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'GENERIC TEMPLATE INSTANTIATION BLUEPRINT', 'ta') +
          // Generic Template (Top)
          R(80, 32, 200, 36, 'fa') +
          T(180, 48, 'template <typename T>', 'ta', 'middle') +
          T(180, 60, 'T maxOf(T a, T b) { return a > b ? a : b; }', 't', 'middle') +
          // 3 Instantiation Arrows
          LA(120, 68, 65, 110, 'a') +
          LA(180, 68, 180, 110, 'a') +
          LA(240, 68, 295, 110, 'a') +
          // Concrete Specializations (Bottom)
          R(15, 110, 100, 45) +
          T(65, 126, 'int maxOf', 'ta', 'middle') +
          T(65, 142, '(int, int)', 't', 'middle') +
          R(130, 110, 100, 45) +
          T(180, 126, 'double maxOf', 'ta', 'middle') +
          T(180, 142, '(double, double)', 't', 'middle') +
          R(245, 110, 100, 45) +
          T(295, 126, 'char maxOf', 'ta', 'middle') +
          T(295, 142, '(char, char)', 't', 'middle') +
          T(180, 178, 'Compile-Time Code Generation (Zero Runtime Overhead)', 'ta', 'middle')
      ),
      caption:
        'Figure 5.3: The C++ compiler generates specialized concrete machine code routines for each distinct type passed to a generic template.',
    },
  },
};
