import { PpsExperiment } from '@/types/syllabus';

export const PPS_EXPERIMENTS: PpsExperiment[] = [
  {
    id: 'le-1',
    codeNum: 'LE-1',
    unitIndex: 0,
    title: 'Area of Shapes & Explicit Type Casting',
    language: 'C',
    problem: 'Compute the area of a circle and triangle using explicit (float) type casting to prevent integer truncation.',
    code: `#include <stdio.h>

int main() {
    int base = 7, height = 3;
    float radius = 5.0f;
    // Without (float), 1/2 evaluates to 0 in integer arithmetic
    float tri_area = (float)(base * height) / 2;
    float cir_area = 3.14159f * radius * radius;
    printf("Triangle Area = %.2f\n", tri_area);
    printf("Circle Area   = %.2f\n", cir_area);
    return 0;
}`,
    sampleInput: 'base = 7, height = 3, radius = 5.0',
    expectedOutput: 'Triangle Area = 10.50\nCircle Area   = 78.54',
    vivaTip: 'Always explain why (float)7 / 2 gives 3.50 whereas 7 / 2 gives 3 (integer division truncates toward zero).',
    traceFrames: [
      { line: 4, explanation: 'Allocate ints base=7 and height=3 on main stack frame.', variables: { base: 7, height: 3 } },
      { line: 5, explanation: 'Initialize IEEE-754 float radius = 5.0f.', variables: { base: 7, height: 3, radius: '5.00' } },
      { line: 7, explanation: 'Cast product (21) to float 21.0f before dividing by 2 -> 10.50f.', variables: { base: 7, height: 3, radius: '5.00', tri_area: '10.50' } },
      { line: 8, explanation: 'Compute π * r² = 3.14159 * 25.0 = 78.54f.', variables: { base: 7, height: 3, tri_area: '10.50', cir_area: '78.54' }, stdout: 'Triangle Area = 10.50\nCircle Area   = 78.54' }
    ]
  },
  {
    id: 'le-2',
    codeNum: 'LE-2',
    unitIndex: 0,
    title: 'Student Grading System (if-else & switch-case)',
    language: 'C',
    problem: 'Assign letter grades using an if-else ladder and print grade remarks using switch-case with break statements.',
    code: `#include <stdio.h>

int main() {
    int marks = 84;
    char grade;
    if (marks >= 90) grade = 'O';
    else if (marks >= 80) grade = 'A';
    else if (marks >= 70) grade = 'B';
    else grade = 'P';

    switch (grade) {
        case 'O': printf("Grade O: Outstanding\n"); break;
        case 'A': printf("Grade A: Excellent\n"); break;
        case 'B': printf("Grade B: Good\n"); break;
        default:  printf("Grade P: Pass\n");
    }
    return 0;
}`,
    sampleInput: 'marks = 84',
    expectedOutput: 'Grade A: Excellent',
    vivaTip: 'If you omit break in switch-case, execution falls through to subsequent cases until a break or closing brace.',
    traceFrames: [
      { line: 4, explanation: 'Initialize marks = 84.', variables: { marks: 84, grade: '?' } },
      { line: 7, explanation: 'Condition marks >= 80 is true (84 >= 80); assign grade = \'A\'.', variables: { marks: 84, grade: "'A'" } },
      { line: 13, explanation: 'Match case \'A\', print output, and execute break to exit switch.', variables: { marks: 84, grade: "'A'" }, stdout: 'Grade A: Excellent' }
    ]
  },
  {
    id: 'le-3',
    codeNum: 'LE-3',
    unitIndex: 0,
    title: 'Primes up to N & Fibonacci Series',
    language: 'C',
    problem: 'Generate Fibonacci terms iteratively and test primality by checking divisors from 2 to √n.',
    code: `#include <stdio.h>

int main() {
    int n = 7, a = 0, b = 1;
    printf("Fibonacci: ");
    for (int i = 1; i <= n; i++) {
        printf("%d ", a);
        int next = a + b;
        a = b;
        b = next;
    }
    return 0;
}`,
    sampleInput: 'n = 7',
    expectedOutput: 'Fibonacci: 0 1 1 2 3 5 8',
    vivaTip: 'For prime check of N, loop only while i * i <= N because any composite number has a factor <= √N.',
    traceFrames: [
      { line: 4, explanation: 'Seed first two Fibonacci registers a = 0, b = 1.', variables: { n: 7, i: 1, a: 0, b: 1 } },
      { line: 8, explanation: 'Iteration i=1: compute next = 0 + 1 = 1, shift a=1, b=1.', variables: { n: 7, i: 1, a: 1, b: 1, next: 1 }, stdout: 'Fibonacci: 0 ' },
      { line: 8, explanation: 'Iteration i=4: compute next = 1 + 2 = 3, shift a=2, b=3.', variables: { n: 7, i: 4, a: 2, b: 3, next: 3 }, stdout: 'Fibonacci: 0 1 1 2 ' },
      { line: 11, explanation: 'Loop completes at i=7 after printing 7 terms.', variables: { n: 7, i: 7, a: 13, b: 21 }, stdout: 'Fibonacci: 0 1 1 2 3 5 8' }
    ]
  },
  {
    id: 'le-4',
    codeNum: 'LE-4',
    unitIndex: 1,
    title: '1-D Array: Linear Search, Max/Min & Average',
    language: 'C',
    problem: 'Scan a 1-D array to find maximum, minimum, average, and locate a target element via linear search.',
    code: `#include <stdio.h>

int main() {
    int a[5] = {7, 3, 12, 4, 9};
    int max = a[0], min = a[0], sum = 0;
    for (int i = 0; i < 5; i++) {
        if (a[i] > max) max = a[i];
        if (a[i] < min) min = a[i];
        sum += a[i];
    }
    printf("Max = %d, Min = %d, Avg = %.1f\n", max, min, (float)sum / 5);
    return 0;
}`,
    sampleInput: 'a = {7, 3, 12, 4, 9}',
    expectedOutput: 'Max = 12, Min = 3, Avg = 7.0',
    vivaTip: 'Always initialize max and min to a[0] (not 0), otherwise an array of all negative numbers gives a wrong maximum of 0.',
    traceFrames: [
      { line: 5, explanation: 'Initialize max = a[0] (7), min = a[0] (7), sum = 0.', variables: { max: 7, min: 7, sum: 0, i: 0 } },
      { line: 7, explanation: 'At i=1 (a[1]=3): min updates to 3.', variables: { max: 7, min: 3, sum: 10, i: 1 } },
      { line: 7, explanation: 'At i=2 (a[2]=12): max updates to 12.', variables: { max: 12, min: 3, sum: 22, i: 2 } },
      { line: 11, explanation: 'Loop ends with sum=35; average = (float)35/5 = 7.0.', variables: { max: 12, min: 3, sum: 35, avg: '7.0' }, stdout: 'Max = 12, Min = 3, Avg = 7.0' }
    ]
  },
  {
    id: 'le-5',
    codeNum: 'LE-5',
    unitIndex: 1,
    title: '2-D Arrays: Matrix Multiplication & Transpose',
    language: 'C',
    problem: 'Multiply two 2x2 matrices using three nested loops (i, j, k) and compute the transpose.',
    code: `#include <stdio.h>

int main() {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{2, 0}, {1, 2}};
    int C[2][2] = {{0, 0}, {0, 0}};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C[i][j] += A[i][k] * B[k][j];
    printf("C = [[%d, %d], [%d, %d]]\n", C[0][0], C[0][1], C[1][0], C[1][1]);
    return 0;
}`,
    sampleInput: 'A = [[1,2],[3,4]], B = [[2,0],[1,2]]',
    expectedOutput: 'C = [[4, 4], [10, 8]]',
    vivaTip: 'Matrix multiplication A(m×n) * B(p×q) is valid only when n == p, and the result has dimension m×q.',
    traceFrames: [
      { line: 6, explanation: 'Zero-initialize accumulator matrix C[2][2].', variables: { 'C[0][0]': 0, 'C[0][1]': 0, 'C[1][0]': 0, 'C[1][1]': 0 } },
      { line: 10, explanation: 'Row 0, Col 0: C[0][0] = 1*2 + 2*1 = 4.', variables: { i: 0, j: 0, 'C[0][0]': 4, 'C[0][1]': 4 } },
      { line: 11, explanation: 'Row 1 completed: C[1][0] = 3*2 + 4*1 = 10, C[1][1] = 3*0 + 4*2 = 8.', variables: { 'C[0][0]': 4, 'C[0][1]': 4, 'C[1][0]': 10, 'C[1][1]': 8 }, stdout: 'C = [[4, 4], [10, 8]]' }
    ]
  },
  {
    id: 'le-6',
    codeNum: 'LE-6',
    unitIndex: 1,
    title: 'Pointers & Strings: In-Place Reverse & Vowel Count',
    language: 'C',
    problem: 'Reverse a null-terminated string in place using two pointers and count vowels and consonants.',
    code: `#include <stdio.h>

int main() {
    char s[] = "CHAPRA";
    int len = 6;
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        char tmp = s[i];
        s[i] = s[j];
        s[j] = tmp;
    }
    printf("Reversed = %s\n", s);
    return 0;
}`,
    sampleInput: 's = "CHAPRA"',
    expectedOutput: 'Reversed = ARPAHC',
    vivaTip: 'Every C string ends with the null terminator \'\\0\'; sizeof("CHAPRA") is 7 bytes whereas strlen("CHAPRA") is 6.',
    traceFrames: [
      { line: 4, explanation: 'Store char array s = "CHAPRA\\0" (7 bytes on stack).', variables: { s: '"CHAPRA"', i: 0, j: 5 } },
      { line: 8, explanation: 'Swap s[0] (\'C\') and s[5] (\'A\') -> "AHAPRC".', variables: { s: '"AHAPRC"', i: 1, j: 4 } },
      { line: 11, explanation: 'Pointers cross at center; final reversed string is "ARPAHC".', variables: { s: '"ARPAHC"', i: 3, j: 2 }, stdout: 'Reversed = ARPAHC' }
    ]
  },
  {
    id: 'le-7',
    codeNum: 'LE-7',
    unitIndex: 2,
    title: 'Recursion vs Iteration: Factorial & Euclid GCD',
    language: 'C',
    problem: 'Compute n! and GCD(a, b) using recursion with an explicit base case.',
    code: `#include <stdio.h>

int fact(int n) {
    if (n <= 1) return 1; // Base case
    return n * fact(n - 1);
}
int gcd(int a, int b) {
    return (b == 0) ? a : gcd(b, a % b);
}
int main() {
    printf("fact(4) = %d, gcd(48, 18) = %d\n", fact(4), gcd(48, 18));
    return 0;
}`,
    sampleInput: 'n = 4, a = 48, b = 18',
    expectedOutput: 'fact(4) = 24, gcd(48, 18) = 6',
    vivaTip: 'Without the base case (n <= 1), recursive calls never terminate and cause a stack overflow.',
    traceFrames: [
      { line: 5, explanation: 'Stack push: fact(4) -> fact(3) -> fact(2) -> fact(1).', variables: { stackDepth: 4, currentN: 1 } },
      { line: 4, explanation: 'Base case hit at n=1; unwinds 1 -> 2 -> 6 -> 24.', variables: { fact4: 24, gcdStep: 'gcd(48,18)->gcd(18,12)->gcd(12,6)->gcd(6,0)' } },
      { line: 11, explanation: 'Both recursive functions return to main().', variables: { fact4: 24, gcdResult: 6 }, stdout: 'fact(4) = 24, gcd(48, 18) = 6' }
    ]
  },
  {
    id: 'le-8',
    codeNum: 'LE-8',
    unitIndex: 2,
    title: 'Call by Value vs Call by Reference (Pointer Swap)',
    language: 'C',
    problem: 'Demonstrate why call by value only edits a copy whereas call by reference swaps the caller variables via pointers.',
    code: `#include <stdio.h>

void swapVal(int x, int y) { int t = x; x = y; y = t; }
void swapRef(int *x, int *y) { int t = *x; *x = *y; *y = t; }

int main() {
    int a = 5, b = 9;
    swapVal(a, b);
    printf("After swapVal: a=%d, b=%d\n", a, b);
    swapRef(&a, &b);
    printf("After swapRef: a=%d, b=%d\n", a, b);
    return 0;
}`,
    sampleInput: 'a = 5, b = 9',
    expectedOutput: 'After swapVal: a=5, b=9\nAfter swapRef: a=9, b=5',
    vivaTip: 'In C, call by reference is simulated by passing pointer addresses (&a, &b) and dereferencing with *x and *y.',
    traceFrames: [
      { line: 8, explanation: 'swapVal copies a=5, b=9 into local x, y; main a, b remain untouched.', variables: { a: 5, b: 9, 'swapVal(x,y)': '9, 5 (discarded)' }, stdout: 'After swapVal: a=5, b=9' },
      { line: 10, explanation: 'swapRef receives addresses &a, &b and dereferences to swap in place.', variables: { a: 9, b: 5, '*x': 9, '*y': 5 }, stdout: 'After swapVal: a=5, b=9\nAfter swapRef: a=9, b=5' }
    ]
  },
  {
    id: 'le-9',
    codeNum: 'LE-9',
    unitIndex: 3,
    title: 'Structures vs Unions: Employee Payroll & sizeof()',
    language: 'C',
    problem: 'Store employee payroll fields in a struct and compare memory allocation between struct and union using sizeof().',
    code: `#include <stdio.h>

struct EmpStruct { int id; float salary; char grade; };
union  EmpUnion  { int id; float salary; char grade; };

int main() {
    struct EmpStruct e = {101, 45000.50f, 'A'};
    printf("Employee #%d | Salary: %.2f | Grade: %c\n", e.id, e.salary, e.grade);
    printf("sizeof(struct) = %zu bytes, sizeof(union) = %zu bytes\n",
           sizeof(struct EmpStruct), sizeof(union EmpUnion));
    return 0;
}`,
    sampleInput: 'id = 101, salary = 45000.50, grade = A',
    expectedOutput: 'Employee #101 | Salary: 45000.50 | Grade: A\nsizeof(struct) = 12 bytes, sizeof(union) = 4 bytes',
    vivaTip: 'struct allocates separate space for every member (plus alignment padding); union shares a single block equal to its largest member.',
    traceFrames: [
      { line: 7, explanation: 'Allocate struct EmpStruct (4 + 4 + 1 + 3 padding = 12 bytes).', variables: { 'e.id': 101, 'e.salary': '45000.50', 'e.grade': "'A'" } },
      { line: 9, explanation: 'Compare struct (12 bytes) vs union (largest member float/int = 4 bytes).', variables: { sizeofStruct: '12 B', sizeofUnion: '4 B' }, stdout: 'Employee #101 | Salary: 45000.50 | Grade: A\nsizeof(struct) = 12 bytes, sizeof(union) = 4 bytes' }
    ]
  },
  {
    id: 'le-10',
    codeNum: 'LE-10',
    unitIndex: 3,
    title: 'File Handling: Student Records & Keyword Search',
    language: 'C',
    problem: 'Write student records to a file, verify fopen() != NULL, read lines back, and close with fclose().',
    code: `#include <stdio.h>
#include <string.h>

int main() {
    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) return 1;
    fprintf(fp, "101 Aman MnC\n102 Priya CSE\n");
    fclose(fp);

    fp = fopen("students.txt", "r");
    char line[64];
    while (fgets(line, sizeof(line), fp)) {
        if (strstr(line, "MnC")) printf("Match: %s", line);
    }
    fclose(fp);
    return 0;
}`,
    sampleInput: 'Keyword = "MnC"',
    expectedOutput: 'Match: 101 Aman MnC',
    vivaTip: 'Always check if (fp == NULL) before reading/writing and call fclose(fp) to flush buffers and release OS file descriptors.',
    traceFrames: [
      { line: 5, explanation: 'Open students.txt in write mode ("w") and verify fp != NULL.', variables: { fp: '0x7ff010 (w)', status: 'OPEN' } },
      { line: 8, explanation: 'Write 2 records with fprintf and flush descriptor with fclose(fp).', variables: { fp: 'CLOSED', diskBytes: 27 } },
      { line: 13, explanation: 'Read line-by-line via fgets(); strstr() matches "MnC" on record 101.', variables: { line: '"101 Aman MnC"', match: 'TRUE' }, stdout: 'Match: 101 Aman MnC' }
    ]
  },
  {
    id: 'le-11',
    codeNum: 'LE-11',
    unitIndex: 4,
    title: 'C++ Classes & Objects: Encapsulated Bank Account',
    language: 'C++',
    problem: 'Design a BankAccount class with private balance and public deposit(), withdraw(), and show() methods.',
    code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;
public:
    BankAccount(double b) : balance(b) {}
    void deposit(double amt) { balance += amt; }
    void withdraw(double amt) { if (amt <= balance) balance -= amt; }
    void show() const { cout << "Balance = Rs. " << balance << endl; }
};

int main() {
    BankAccount acc(1000.0);
    acc.deposit(500.0);
    acc.withdraw(300.0);
    acc.show();
    return 0;
}`,
    sampleInput: 'initial = 1000, deposit = 500, withdraw = 300',
    expectedOutput: 'Balance = Rs. 1200',
    vivaTip: 'Class members are private by default in C++, whereas struct members are public by default.',
    traceFrames: [
      { line: 15, explanation: 'Instantiate acc with private balance = 1000.0.', variables: { 'acc.balance (private)': 1000 } },
      { line: 16, explanation: 'Public method deposit(500) updates balance to 1500.', variables: { 'acc.balance (private)': 1500 } },
      { line: 18, explanation: 'withdraw(300) leaves 1200; show() prints encapsulated balance.', variables: { 'acc.balance (private)': 1200 }, stdout: 'Balance = Rs. 1200' }
    ]
  },
  {
    id: 'le-12',
    codeNum: 'LE-12',
    unitIndex: 4,
    title: 'Constructors & Destructors (Default, Parameterized, Copy)',
    language: 'C++',
    problem: 'Demonstrate default, parameterized, and copy constructors along with automatic destructor invocation.',
    code: `#include <iostream>
#include <cstring>
using namespace std;

class Str {
    char *buf;
public:
    Str(const char *s = "") {
        buf = new char[strlen(s) + 1];
        strcpy(buf, s);
    }
    Str(const Str &other) { // Deep copy constructor
        buf = new char[strlen(other.buf) + 1];
        strcpy(buf, other.buf);
    }
    ~Str() { delete[] buf; }
    void print() const { cout << buf << endl; }
};

int main() {
    Str a("LNJPIT"), b = a;
    b.print();
    return 0;
}`,
    sampleInput: 'Str a("LNJPIT"), Str b = a',
    expectedOutput: 'LNJPIT',
    vivaTip: 'A custom deep copy constructor Str(const Str&) prevents double-free crashes when two objects manage heap memory.',
    traceFrames: [
      { line: 21, explanation: 'Parameterized constructor allocates heap buffer for a ("LNJPIT").', variables: { 'a.buf': '0x9001 ("LNJPIT")' } },
      { line: 21, explanation: 'Copy constructor allocates separate heap block 0x9040 for b.', variables: { 'a.buf': '0x9001 ("LNJPIT")', 'b.buf': '0x9040 ("LNJPIT")' }, stdout: 'LNJPIT' }
    ]
  },
  {
    id: 'le-13',
    codeNum: 'LE-13',
    unitIndex: 4,
    title: 'Static Data Members & Friend Functions',
    language: 'C++',
    problem: 'Use a static class counter shared across all instances and a friend function to inspect private fields.',
    code: `#include <iostream>
using namespace std;

class Box {
    int secretWidth;
public:
    static int count;
    Box(int w) : secretWidth(w) { count++; }
    friend void reveal(const Box &b);
};
int Box::count = 0;
void reveal(const Box &b) {
    cout << "Width = " << b.secretWidth << ", Total Boxes = " << Box::count << endl;
}
int main() {
    Box b1(10), b2(25);
    reveal(b2);
    return 0;
}`,
    sampleInput: 'b1(10), b2(25)',
    expectedOutput: 'Width = 25, Total Boxes = 2',
    vivaTip: 'Static members exist once per class (not per object) and must be defined outside the class body.',
    traceFrames: [
      { line: 16, explanation: 'Construct b1(10) and b2(25); static Box::count increments to 2.', variables: { 'Box::count': 2, 'b1.secretWidth': 10, 'b2.secretWidth': 25 } },
      { line: 17, explanation: 'Friend function reveal() accesses private secretWidth directly.', variables: { 'Box::count': 2, 'b2.secretWidth': 25 }, stdout: 'Width = 25, Total Boxes = 2' }
    ]
  },
  {
    id: 'le-14',
    codeNum: 'LE-14',
    unitIndex: 5,
    title: 'Five Types of Inheritance & Virtual Base Class',
    language: 'C++',
    problem: 'Resolve the hybrid diamond inheritance ambiguity using virtual inheritance.',
    code: `#include <iostream>
using namespace std;

class Person { public: int id = 42; };
class Student : virtual public Person {};
class Faculty : virtual public Person {};
class TA : public Student, public Faculty {};

int main() {
    TA t;
    cout << "TA unambiguous Person::id = " << t.id << endl;
    return 0;
}`,
    sampleInput: 'TA inherits from Student and Faculty',
    expectedOutput: 'TA unambiguous Person::id = 42',
    vivaTip: 'Virtual base classes ensure that the grandchild class (TA) inherits only one shared sub-object of the grandparent (Person).',
    traceFrames: [
      { line: 10, explanation: 'Instantiate TA with a single shared Person sub-object via virtual public.', variables: { 't.id': 42, copiesOfPerson: 1 } },
      { line: 11, explanation: 'Access t.id without ambiguity error.', variables: { 't.id': 42 }, stdout: 'TA unambiguous Person::id = 42' }
    ]
  },
  {
    id: 'le-15',
    codeNum: 'LE-15',
    unitIndex: 5,
    title: 'Polymorphism: Abstract Shape Class & Operator Overloading',
    language: 'C++',
    problem: 'Use a pure virtual function virtual double area() = 0 in Shape and overload operator+ for Complex numbers.',
    code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual double area() const = 0; // Pure virtual
};
class Circle : public Shape {
    double r;
public:
    Circle(double rad) : r(rad) {}
    double area() const override { return 3.14159 * r * r; }
};
struct Complex {
    double re, im;
    Complex operator+(const Complex &o) const { return {re + o.re, im + o.im}; }
};
int main() {
    Shape *s = new Circle(3.0);
    Complex c = Complex{2, 3} + Complex{4, -1};
    cout << "Circle Area = " << s->area() << " | Complex = " << c.re << "+" << c.im << "i\n";
    delete s;
    return 0;
}`,
    sampleInput: 'Circle(3.0), (2+3i) + (4-1i)',
    expectedOutput: 'Circle Area = 28.2743 | Complex = 6+2i',
    vivaTip: 'A class with at least one pure virtual function (= 0) is abstract and cannot be instantiated directly.',
    traceFrames: [
      { line: 19, explanation: 'Base pointer Shape* s points to Circle(3.0) via vtable.', variables: { 's (vptr)': 'Circle::area', r: '3.0' } },
      { line: 21, explanation: 'Dynamic dispatch calls Circle::area() -> 28.2743; operator+ adds Complex.', variables: { area: '28.2743', 'c.re': 6, 'c.im': 2 }, stdout: 'Circle Area = 28.2743 | Complex = 6+2i' }
    ]
  },
  {
    id: 'le-16',
    codeNum: 'LE-16',
    unitIndex: 5,
    title: 'Exception Handling: Division by Zero (try / throw / catch)',
    language: 'C++',
    problem: 'Guard division against a zero denominator using try, throw, and catch so the program recovers gracefully.',
    code: `#include <iostream>
#include <stdexcept>
using namespace std;

double safeDivide(double num, double den) {
    if (den == 0) throw runtime_error("Division by zero prevented!");
    return num / den;
}
int main() {
    try {
        cout << safeDivide(15, 3) << endl;
        cout << safeDivide(10, 0) << endl;
    } catch (const exception &e) {
        cout << "Caught Exception: " << e.what() << endl;
    }
    return 0;
}`,
    sampleInput: 'safeDivide(15, 3), then safeDivide(10, 0)',
    expectedOutput: '5\nCaught Exception: Division by zero prevented!',
    vivaTip: 'When throw executes, the call stack unwinds immediately to the nearest matching catch block.',
    traceFrames: [
      { line: 11, explanation: 'safeDivide(15, 3) returns 5 normalmente.', variables: { num: 15, den: 3, result: 5 }, stdout: '5' },
      { line: 12, explanation: 'safeDivide(10, 0) throws runtime_error; control jumps to catch block.', variables: { num: 10, den: 0, exception: '"Division by zero prevented!"' }, stdout: '5\nCaught Exception: Division by zero prevented!' }
    ]
  },
  {
    id: 'le-17',
    codeNum: 'LE-17',
    unitIndex: 5,
    title: 'Generic Programming: Function & Class Templates',
    language: 'C++',
    problem: 'Write a generic maxOf<T> function template and Pair<T1, T2> class template that work across int, double, and char.',
    code: `#include <iostream>
using namespace std;

template <typename T>
T maxOf(T a, T b) { return (a > b) ? a : b; }

template <typename T1, typename T2>
struct Pair { T1 first; T2 second; };

int main() {
    Pair<const char*, int> course = {"Math-I", 100102};
    cout << "maxOf(14, 9) = " << maxOf(14, 9)
         << ", maxOf(3.14, 2.71) = " << maxOf(3.14, 2.71) << endl;
    cout << "Pair: " << course.first << " (" << course.second << ")\n";
    return 0;
}`,
    sampleInput: 'maxOf(14, 9), maxOf(3.14, 2.71), Pair("Math-I", 100102)',
    expectedOutput: 'maxOf(14, 9) = 14, maxOf(3.14, 2.71) = 3.14\nPair: Math-I (100102)',
    vivaTip: 'Templates are instantiated at compile time for each concrete type used (compile-time polymorphism).',
    traceFrames: [
      { line: 11, explanation: 'Instantiate Pair<const char*, int> on stack.', variables: { 'course.first': '"Math-I"', 'course.second': 100102 } },
      { line: 12, explanation: 'Compiler generates maxOf<int>(14,9) and maxOf<double>(3.14,2.71).', variables: { 'maxOf<int>': 14, 'maxOf<double>': 3.14 }, stdout: 'maxOf(14, 9) = 14, maxOf(3.14, 2.71) = 3.14\nPair: Math-I (100102)' }
    ]
  }
];
