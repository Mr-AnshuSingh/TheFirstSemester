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

/* ---------- PPS UNIT 4 TOPIC CONTENT (3 Topics) ---------- */
export const PPS_UNIT4_TOPICS: Record<string, TopicContent> = {
  'pps:4:0': {
    explain: [
      'In C++, a class is a blueprint combining state (data attributes) and behavior (member functions) into an encapsulated user-defined type.',
      'Encapsulation hides sensitive internal state (`private:`) behind a public interface (`public:`), preventing unauthorized external mutation and maintaining data integrity.',
      'An object is a concrete, stateful instance of a class allocated in memory.',
      'Demonstrated through a Bank Account system: private variables `balance`, `accNumber`; public methods `deposit()`, `withdraw()`, and `display()` that enforce business rules like minimum balance.',
    ],
    definition:
      'A class is an encapsulated user-defined template binding attributes and member functions together, enforcing data hiding through private access specifiers and exposing safe interfaces via public methods.',
    formula: '\\text{Class} = \\text{Private State (Encapsulated)} + \\text{Public Interface (Methods)} \\implies \\text{Object} = \\text{Instance}',
    steps: [
      'Class Definition: Declare class with `class BankAccount { private: double balance; public: void deposit(double); };`.',
      'Access Specifiers: `private:` members are accessible only by class member functions; `public:` members form the external caller API.',
      'Method Implementation: Member functions can be defined inline or outside using the scope resolution operator `void BankAccount::deposit(double amt)`.',
      'Invariant Enforcement: In `withdraw(double amt)`, check `if (amt > 0 && amt <= balance)` before deducting to disallow overdrafts.',
      'Object Instantiation: Create objects in `main()` with `BankAccount acc; acc.deposit(500);`. Direct assignment `acc.balance = 9999;` triggers a compile error.',
    ],
    examAnswer: [
      'Define Class, Object, and Encapsulation with clear C++ examples.',
      'Write the complete C++ implementation of a `BankAccount` class with private balance and public deposit/withdraw functions.',
      'Compare `struct` and `class` in C++ (default visibility: `public` in struct vs `private` in class).',
      'Explain how encapsulation protects data invariants and prevents bugs in large software codebases.',
    ],
    slip: 'Attempting to access private members directly from `main()` (e.g. `acc.balance = 5000;`), which results in a compile-time access violation error.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'ENCAPSULATION: CLASS VAULT & PUBLIC API', 'ta') +
          // Outer Class Capsule (Public Interface)
          R(30, 35, 300, 140) +
          T(180, 50, 'Class BankAccount (Encapsulated Boundary)', 'ta', 'middle') +
          // Public Methods on Perimeter
          R(45, 62, 75, 26, 'fa') +
          T(82, 79, 'deposit()', 'ta', 'middle') +
          R(142, 62, 75, 26, 'fa') +
          T(179, 79, 'withdraw()', 'ta', 'middle') +
          R(240, 62, 75, 26, 'fa') +
          T(277, 79, 'display()', 'ta', 'middle') +
          // Inner Vault (Private Core)
          R(75, 104, 210, 58) +
          T(180, 122, 'PRIVATE DATA (Hidden Core)', 'ta', 'middle') +
          T(180, 138, 'double balance;  long accNo;', 't', 'middle') +
          T(180, 152, 'Direct external access BLOCKED', 't', 'middle') +
          // External callers
          T(180, 186, 'External callers can ONLY invoke public methods', 'ta', 'middle')
      ),
      caption:
        'Figure 4.0: Encapsulation protects private member variables inside an inner core, accessible only through verified public methods.',
    },
  },

  'pps:4:1': {
    explain: [
      'A constructor is a special member function having the exact same name as the class and no return type, executed automatically upon object instantiation.',
      'Three fundamental constructors: Default constructor (zero parameters), Parameterized constructor (custom initialization arguments), and Copy constructor (constructs a new object by copying an existing object).',
      'A destructor (`~ClassName()`) is called automatically when an object goes out of scope or is deleted, reclaiming resources (RAII: Resource Acquisition Is Initialization).',
      'A default copy constructor performs shallow copying (duplicating raw pointer addresses), leading to double-free heap corruption when both objects destruct; a custom copy constructor implements deep copying (allocating distinct heap buffers).',
    ],
    definition:
      'Constructors and destructors are object lifecycle methods: constructors initialize member variables upon instantiation, while destructors automate deterministic cleanup upon destruction, ensuring safe dynamic memory management through deep copying.',
    formula: '\\text{Deep Copy: } \\text{dst.data} = \\text{new char}[\\text{len} + 1]; \\quad \\text{strcpy}(\\text{dst.data}, \\text{src.data}) \\neq \\text{Shallow Copy}',
    steps: [
      'Default Constructor: `String() : data(nullptr), len(0) {}` creating safe empty state.',
      'Parameterized Constructor: `String(const char* s)`: allocates `data = new char[strlen(s) + 1]` and copies characters.',
      'Copy Constructor Signature: `String(const String &other)` taking a const reference to prevent infinite recursive copying.',
      'Deep Copy Implementation: Allocates independent heap memory buffer and duplicates the character content.',
      'Destructor: `~String() { delete[] data; }` reclaiming heap memory deterministically when the object scope terminates.',
    ],
    examAnswer: [
      'Define Default, Parameterized, and Copy Constructors with syntax and code.',
      'Explain the difference between Shallow Copy and Deep Copy, detailing why shallow copies cause double-free heap errors.',
      'Write the complete C++ implementation of a custom `String` class with deep copy constructor and destructor.',
      'Explain why the copy constructor parameter must be passed as a reference (`const ClassName &`) rather than by value.',
    ],
    slip: 'Declaring the copy constructor as `String(String s)` without the ampersand `&`, which causes infinite recursive calls to the copy constructor at compile-time!',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'SHALLOW COPY (DOUBLE-FREE) VS DEEP COPY', 'ta') +
          // Shallow Copy (Left)
          T(20, 36, 'Shallow Copy (Fatal Hazard):', 'ta') +
          R(20, 44, 70, 24) +
          T(55, 60, 'str1.data', 't', 'middle') +
          R(20, 76, 70, 24) +
          T(55, 92, 'str2.data', 't', 'middle') +
          LA(90, 56, 120, 70, 'a') +
          LA(90, 88, 120, 74, 'a') +
          R(120, 54, 55, 32, 'fa') +
          T(147, 74, 'Heap "Hi"', 'ta', 'middle') +
          T(95, 118, 'Double delete[] crash!', 'ta', 'middle') +
          // Separator
          L(185, 30, 185, 175, 'd') +
          // Deep Copy (Right)
          T(195, 36, 'Deep Copy (Independent Buffers):', 'ta') +
          R(195, 44, 70, 24) +
          T(230, 60, 'str1.data', 't', 'middle') +
          LA(265, 56, 290, 56, 'a') +
          R(290, 44, 55, 24, 'fa') +
          T(317, 60, 'Heap "Hi"', 'ta', 'middle') +
          R(195, 84, 70, 24) +
          T(230, 100, 'str2.data', 't', 'middle') +
          LA(265, 96, 290, 96, 'a') +
          R(290, 84, 55, 24, 'fa') +
          T(317, 100, 'Heap "Hi"', 'ta', 'middle') +
          R(195, 130, 150, 42) +
          T(270, 146, 'new char[len + 1]', 'ta', 'middle') +
          T(270, 162, 'Each deletes own buffer', 't', 'middle')
      ),
      caption:
        'Figure 4.1: Shallow copy shares pointer targets leading to double-free crashes; deep copy allocates independent heap storage for both objects.',
    },
  },

  'pps:4:2': {
    explain: [
      'A static data member belongs to the class itself rather than to individual object instances; only one shared copy exists across all instances.',
      'Static member functions can only access static data members and static methods; they do not have a `this` pointer.',
      'A `friend` function is an external non-member function granted privileged access to the `private` and `protected` members of a class.',
      'Demonstrated by tracking active object counts with static members, and using friend functions for non-member utility operations.',
    ],
    definition:
      'Static members represent class-wide shared state and routines independent of instance instantiation, while friend functions are external non-member functions explicitly granted access to a class’s private members.',
    formula: '\\text{Shared: } \\text{ClassName}::\\text{staticVar}; \\quad \\text{friend void f(ClassName &obj)} \\implies \\text{Access}(obj.\\text{private})',
    steps: [
      'Static Variable Declaration: `static int count;` inside class body.',
      'Static Definition in File Scope: `int MyClass::count = 0;` allocating memory in the static data segment.',
      'Lifecycle Counting: Increment `count++` in constructors, decrement `count--` in destructor.',
      'Static Member Function: `static int getCount() { return count; }` called as `MyClass::getCount()`.',
      'Friend Declaration: Declare `friend void displayDetails(const MyClass &obj);` inside the class; implement outside as normal function.',
    ],
    examAnswer: [
      'Explain the memory layout and lifecycle of static data members in C++.',
      'Write complete C++ code demonstrating how to count the number of live objects using static members.',
      'Define a friend function and write an example showing it accessing private members.',
      'Explain why static member functions cannot access non-static data members or use the `this` pointer.',
    ],
    slip: 'Forgetting to define the static data member outside the class in global scope (`int Class::count = 0;`), resulting in an "undefined reference" linker error.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'STATIC SHARED STATE & FRIEND FUNCTION', 'ta') +
          // Object instances
          R(20, 36, 75, 45) +
          T(57, 52, 'obj1', 'ta', 'middle') +
          T(57, 68, 'int id = 1;', 't', 'middle') +
          R(105, 36, 75, 45) +
          T(142, 52, 'obj2', 'ta', 'middle') +
          T(142, 68, 'int id = 2;', 't', 'middle') +
          R(190, 36, 75, 45) +
          T(227, 52, 'obj3', 'ta', 'middle') +
          T(227, 68, 'int id = 3;', 't', 'middle') +
          // Shared Static box
          LA(57, 81, 120, 115, 'a') +
          LA(142, 81, 142, 115, 'a') +
          LA(227, 81, 165, 115, 'a') +
          R(75, 115, 140, 42, 'fa') +
          T(145, 132, 'static int count = 3;', 'ta', 'middle') +
          T(145, 146, 'Shared by ALL objects', 't', 'middle') +
          // Friend function on Right
          R(280, 45, 70, 110) +
          T(315, 65, 'friend', 'ta', 'middle') +
          T(315, 80, 'function', 'ta', 'middle') +
          T(315, 105, 'Unlocked', 't', 'middle') +
          T(315, 120, 'private', 't', 'middle') +
          T(315, 135, 'access', 't', 'middle') +
          LA(280, 100, 265, 60, 'a') +
          T(145, 180, 'Static belongs to Class; Friend bridges Encapsulation', 'ta', 'middle')
      ),
      caption:
        'Figure 4.2: Static members provide class-level shared state across all instances, while friend functions bridge private encapsulation.',
    },
  },
};
