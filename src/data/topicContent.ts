import { TopicContent, UnitStory } from '@/types/syllabus';
import { PHY_TOPIC_CONTENT, PHY_UNIT_STORIES } from './topics/physics';

/* ---------- SVG Builder Helpers (matching notebook aesthetic) ---------- */
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
const AR = 'marker-end="url(#ar)"';
const LA = (a: number, b: number, c: number, d: number, k = 'a') =>
  `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${k}" marker-end="url(#ar)"/>`;

/* ---------- UNIT STORIES ---------- */
export const UNIT_STORIES: Record<string, UnitStory> = {
  ...PHY_UNIT_STORIES,
  'math:0': {
    whatItIs:
      'Linear algebra is the mathematics of straight lines, flat planes, and coordinate grids that stretch without bending. A matrix is an algebraic machine that takes in a vector and scales or rotates it into a new space.',
    whyItMatters:
      'Every computer graphics engine, search ranking algorithm, structural bridge load calculation, and system of linear equations relies on matrix rank and eigenvalues. Rank decides whether a solution exists, while eigenvalues reveal the natural vibration frequencies of physical systems.',
    howItWorks:
      'We use elementary row operations to tidy the matrix into a staircase (Echelon form) without changing the underlying truth. Counting the non-zero rows yields the rank, and setting |A − λI| = 0 uncovers the fundamental stretch factors of the transformation.',
  },
  'math:1': {
    whatItIs:
      'Single-variable differential calculus studies how functions change from instant to instant. It turns the steepness of a tangent line into a number and measures how tightly a curve bends.',
    whyItMatters:
      'All physical laws involve rates: acceleration is the derivative of velocity, current is the rate of charge flow, and power is the rate of energy transfer. Mean value theorems guarantee that average speed matches instantaneous speed at least once on any smooth trip.',
    howItWorks:
      'We differentiate repeatedly to study higher-order dynamics. Leibnitz expands derivatives of products using binomial coefficients. When limits produce 0/0 fractions, L’Hôpital resolves them by comparing the slopes of the numerator and denominator.',
  },
  'math:2': {
    whatItIs:
      'Multivariable calculus explores multidimensional landscapes where height depends on two or more inputs, z = f(x, y). A partial derivative freezes one dial while nudging another to measure directional slope.',
    whyItMatters:
      'Engineering systems rarely have only one variable. Thermodynamics balances temperature, pressure, and volume, while machine learning optimizes millions of parameters. Classifying peaks, valleys, and saddle points is fundamental to optimization.',
    howItWorks:
      'We locate stationary points where both partial slopes are zero, then test the discriminant rt − s² to classify the curvature. When restricted to a path g(x, y) = 0, Lagrange multipliers balance the gradients of the function and the constraint.',
  },
  'math:3': {
    whatItIs:
      'Integral calculus is the science of accumulation, adding together infinitely many paper-thin slices to compute total area, volume, mass, or work. Double and triple integrals sum quantities across surfaces and 3D solids.',
    whyItMatters:
      'Centroids, center of gravity, magnetic flux, and fluid pressure require double and triple integration. Slicing in the wrong coordinate system can lead to impossible algebra, while polar and spherical coordinates simplify round geometries.',
    howItWorks:
      'Always sketch the boundary curves first. When changing the order of integration, switch from vertical strips to horizontal strips and read the new limits from the diagram. Beta and Gamma functions act as fast analytical lookups for definite trigonometric integrals.',
  },
  'math:4': {
    whatItIs:
      'Vector calculus models spaces where every point contains either a magnitude (temperature scalar field) or an arrow (wind velocity or magnetic vector field). Gradient points uphill, divergence measures net outward flow, and curl measures local rotational spin.',
    whyItMatters:
      'Maxwell’s equations of electromagnetism and fluid dynamics are formulated entirely in vector calculus. The three integral theorems—Green, Stokes, and Gauss—form the foundation of continuum physics: what accumulates inside equals what crosses the boundary.',
    howItWorks:
      'We apply the del operator ∇. Green’s theorem translates a 2D closed loop into an area integral; Stokes’ theorem translates a 3D loop into a surface integral of curl; Gauss’ divergence theorem translates surface flux into a volume integral of divergence.',
  },
};

/* ---------- TOPIC CONTENT ---------- */
export const TOPIC_CONTENT: Record<string, TopicContent> = {
  ...PHY_TOPIC_CONTENT,
  // ==========================================
  // MATHEMATICS-I (math) - 5 Units, 40 Topics
  // ==========================================

  // --- UNIT 0: Basic Linear Algebra (8 Topics) ---
  'math:0:0': {
    explain: [
      'Elementary row operations allow us to transform any matrix into a neat staircase shape called Row Echelon Form.',
      'Row operations never alter the solution to a system of equations; they simply clarify the relationships between rows.',
      'The rank of the matrix is simply the count of non-zero rows remaining in row echelon form.',
    ],
    definition: 'A matrix is in Row Echelon Form if all zero rows are at the bottom and each leading non-zero entry (pivot) sits strictly to the right of the pivot above it.',
    formula: '\\text{Rank}(A) = \\text{number of non-zero rows in Echelon form}',
    steps: [
      '1. Choose a non-zero pivot in column 1; swap rows if necessary.',
      '2. Use elementary row operations R_i \\to R_i - c \\cdot R_1 to clear all entries below the pivot.',
      '3. Repeat for subsequent columns until the staircase pattern is complete.',
      '4. Count the number of non-zero rows; this is Rank(A).',
    ],
    examAnswer: [
      'Write each row operation explicitly next to the step (e.g., R_2 -> R_2 - 2R_1).',
      'Circle the pivots in the final echelon matrix.',
      'State: "Since there are r non-zero rows, Rank(A) = r."',
    ],
    slip: 'Arithmetic slip when subtracting rows with negative numbers; carry signs carefully.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'ROW ECHELON FORM & PIVOTS', 'ta') +
        T(10, 48, '[ 2   1  -1 ]') + T(10, 68, '[ 0   3   4 ]') + T(10, 88, '[ 0   0   5 ]') +
        C(18, 44, 8, 'fa') + C(56, 64, 8, 'fa') + C(94, 84, 8, 'fa') +
        P('M 6 36 L 40 36 L 40 56 L 78 56 L 78 76 L 118 76', 'a') +
        LA(128, 68, 175, 68) + T(185, 64, '3 non-zero rows', 'ta') +
        T(185, 82, 'Rank = 3 pivots', 't') +
        T(10, 130, '• Row operations: R_i <-> R_j, cR_i, R_i + cR_j', 'd') +
        T(10, 150, '• Zeros below each pivot lead to staircase', 't')
      ),
      caption: 'Row Echelon Form: count the leading pivots in non-zero rows to find the rank.',
    },
  },

  'math:0:1': {
    explain: [
      'Normal Form (canonical form) uses both row operations and column operations to simplify the matrix completely.',
      'Any m x n matrix of rank r can be reduced into a standard block form containing an r x r identity matrix surrounded by zeros.',
      'Because column operations are permitted, finding rank by Normal Form is often faster and less prone to fractions.',
    ],
    definition: 'The Normal Form of an m x n matrix of rank r is the block matrix [I_r 0; 0 0], obtained using elementary row and column transformations.',
    formula: 'A \\sim \\begin{bmatrix} I_r & 0 \\\\ 0 & 0 \\end{bmatrix} \\implies \\text{Rank}(A) = r',
    steps: [
      '1. Reduce to Echelon form using elementary row operations.',
      '2. Make each leading pivot entry equal to 1 by dividing the row by the pivot value.',
      '3. Use column operations (C_j -> C_j - c * C_1) to clear all entries to the right of each pivot.',
      '4. The resulting matrix has block form [I_r 0; 0 0], where r is the rank.',
    ],
    examAnswer: [
      'State both row and column transformations used at every transition.',
      'Express the final matrix clearly in block identity notation [I_r 0; 0 0].',
      'Conclude with: "Hence Rank(A) = r."',
    ],
    slip: 'Using column operations when solving linear systems AX=B is invalid; column operations are only allowed for rank/normal form.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'NORMAL FORM: [ I_r  0 ; 0  0 ]', 'ta') +
        R(30, 36, 120, 100, 'fa') +
        L(30, 96, 150, 96, 'd') + L(90, 36, 90, 136, 'd') +
        T(60, 70, 'I_r', 'ta', 'middle') + T(120, 70, '0', 't', 'middle') +
        T(60, 118, '0', 't', 'middle') + T(120, 118, '0', 't', 'middle') +
        LA(160, 86, 215, 86) +
        T(225, 78, 'Rank = order of I_r = r', 'ta') +
        T(225, 98, 'Row + Column operations', 't') +
        T(30, 160, 'Identity block I_r isolated at top-left', 'd')
      ),
      caption: 'Normal Form isolates an identity block I_r; rank equals the order of I_r.',
    },
  },

  'math:0:2': {
    explain: [
      'A set of vectors is linearly dependent if at least one vector can be built as a combination of the others.',
      'If vectors are independent, no vector in the set is redundant; each points into a genuinely new dimension.',
      'To test independence, place the vectors as rows of a matrix and calculate the rank.',
    ],
    definition: 'Vectors v_1, ..., v_k are linearly independent if c_1 v_1 + ... + c_k v_k = 0 implies c_1 = ... = c_k = 0.',
    formula: 'c_1 v_1 + c_2 v_2 + \\dots + c_k v_k = 0 \\iff c_1 = c_2 = \\dots = c_k = 0',
    steps: [
      '1. Form the vector equation c_1 v_1 + c_2 v_2 + ... + c_k v_k = 0.',
      '2. Assemble the vectors as columns (or rows) into a coefficient matrix A.',
      '3. Row reduce A to Echelon form.',
      '4. If Rank(A) = k (full rank), the vectors are linearly independent. If Rank(A) < k, they are dependent.',
    ],
    examAnswer: [
      'Write the linear combination equation c_1 v_1 + c_2 v_2 + ... = 0.',
      'Show the determinant or echelon rank.',
      'State explicitly: "Since only the trivial solution c_i = 0 exists, the vectors are linearly independent."',
    ],
    slip: 'Forgetting that if the number of vectors exceeds dimension n in R^n, they are automatically dependent.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'LINEAR INDEPENDENCE IN R²', 'ta') +
        L(40, 140, 160, 140, 'l') + L(40, 140, 40, 30, 'l') +
        LA(40, 140, 120, 60) + T(125, 60, 'v₁', 'ta') +
        LA(40, 140, 60, 50) + T(65, 48, 'v₂', 'ta') +
        T(100, 160, 'Independent (span plane)', 't', 'middle') +
        L(220, 140, 330, 140, 'l') + L(220, 140, 220, 30, 'l') +
        LA(220, 140, 290, 70) + T(295, 68, 'v₁', 'ta') +
        LA(220, 140, 325, 35, 'a') + T(330, 32, 'v₂ = 2v₁', 'ta') +
        T(275, 160, 'Dependent (collinear line)', 'd', 'middle')
      ),
      caption: 'Independent vectors span new directions; dependent vectors lie along existing lines or planes.',
    },
  },

  'math:0:3': {
    explain: [
      'A system of equations AX = B is consistent if there is at least one solution, and inconsistent if no solution exists.',
      'Rouché-Capelli Theorem: Consistency depends entirely on comparing the rank of A with the rank of the augmented matrix [A|B].',
      'If rank(A) = rank([A|B]) = n (unknowns), the solution is unique; if rank < n, infinitely many solutions exist.',
    ],
    definition: 'AX = B is consistent iff Rank(A) = Rank([A|B]). If Rank = n: unique solution; if Rank < n: infinite solutions; if Rank(A) != Rank([A|B]): no solution.',
    formula: '\\text{Consistent} \\iff \\text{Rank}(A) = \\text{Rank}([A|B])',
    steps: [
      '1. Form the augmented matrix [A|B].',
      '2. Apply elementary row operations to reduce [A|B] to Echelon form.',
      '3. Read Rank(A) from the coefficient part and Rank([A|B]) from the full matrix.',
      '4. If Rank(A) < Rank([A|B]), declare Inconsistent. Otherwise, back-substitute to find solutions.',
    ],
    examAnswer: [
      'Show the reduced augmented matrix clearly.',
      'State Rank(A) and Rank([A|B]) explicitly.',
      'State whether the system is consistent, and give the parameter count (n - r) for free variables.',
    ],
    slip: 'A row like [0 0 0 | 5] means 0 = 5, which immediately signals an inconsistent system.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'CONSISTENCY DECISION TREE', 'ta') +
        R(110, 26, 140, 28, 'fa') + T(180, 44, 'Compare r(A) & r([A|B])', 't', 'middle') +
        LA(140, 54, 80, 85) + LA(220, 54, 280, 85) +
        T(80, 102, 'r(A) ≠ r([A|B])', 'ta', 'middle') +
        T(80, 120, 'INCONSISTENT (no sol)', 'd', 'middle') +
        T(280, 102, 'r(A) = r([A|B]) = r', 'ta', 'middle') +
        LA(280, 126, 230, 155) + LA(280, 126, 330, 155) +
        T(220, 172, 'r = n: Unique', 'ta', 'middle') +
        T(330, 172, 'r < n: Infinite', 't', 'middle')
      ),
      caption: 'Consistency flow: compare coefficient rank r(A) against augmented rank r([A|B]).',
    },
  },

  'math:0:4': {
    explain: [
      'An eigenvector of matrix A is a special direction that does not change angle when multiplied by A; it only gets scaled.',
      'The factor by which the eigenvector stretches or shrinks is its eigenvalue λ.',
      'Eigenvalues are found by solving the characteristic equation det(A − λI) = 0.',
    ],
    definition: 'For a square matrix A, a non-zero vector X is an eigenvector with eigenvalue λ if AX = λX, or (A − λI)X = 0.',
    formula: 'A X = \\lambda X \\iff |A - \\lambda I| = 0',
    steps: [
      '1. Set up the characteristic equation det(A - λI) = 0.',
      '2. Expand the determinant into a polynomial in λ and solve for the roots λ_i.',
      '3. For each eigenvalue λ_i, substitute back into (A - λ_i I)X = 0.',
      '4. Solve the homogeneous system to find the corresponding eigenvector direction X_i.',
    ],
    examAnswer: [
      'Show the characteristic determinant |A - λI| explicitly.',
      'List all eigenvalues and check: sum(λ) = trace(A) and prod(λ) = det(A).',
      'For each λ, show the row-reduced matrix and write the eigenvector in parametric form.',
    ],
    slip: 'Eigenvectors cannot be the zero vector; X = 0 is trivial and invalid.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'EIGENVECTOR: DIRECTION UNCHANGED', 'ta') +
        L(40, 150, 200, 150, 'l') + L(40, 150, 40, 30, 'l') +
        LA(40, 150, 100, 90, 'l') + T(105, 95, 'X', 't') +
        LA(40, 150, 160, 30, 'a') + T(165, 30, 'AX = λX (λ=2)', 'ta') +
        L(40, 150, 180, 10, 'd') +
        T(230, 70, 'Matrix A stretches X', 't') +
        T(230, 90, 'by factor λ without', 't') +
        T(230, 110, 'rotating its line!', 'ta') +
        T(230, 140, '|A − λI| = 0', 'fa')
      ),
      caption: 'Eigenvector transformation: vector X stays along the same directional ray, scaled by λ.',
    },
  },

  'math:0:5': {
    explain: [
      'The Cayley–Hamilton Theorem states that every square matrix satisfies its own characteristic equation.',
      'If the characteristic equation is λ³ − 6λ² + 11λ − 6 = 0, then A³ − 6A² + 11A − 6I = 0.',
      'This theorem provides an efficient method to compute matrix inverses and high powers A^n without direct multiplication.',
    ],
    definition: 'Every square matrix A satisfies its characteristic polynomial P(λ) = |A − λI| = 0, meaning P(A) = 0.',
    formula: '|A - \\lambda I| = 0 \\implies A^n + c_{n-1}A^{n-1} + \\dots + c_0 I = 0',
    steps: [
      '1. Find the characteristic equation |A - λI| = 0: λ^n + c_{n-1}λ^{n-1} + ... + c_0 = 0.',
      '2. Substitute matrix A for λ: A^n + c_{n-1}A^{n-1} + ... + c_0 I = 0.',
      '3. To find A⁻¹, multiply through by A⁻¹: A^{n-1} + c_{n-1}A^{n-2} + ... + c_0 A⁻¹ = 0.',
      '4. Isolate A⁻¹ = (-1/c_0) [A^{n-1} + c_{n-1}A^{n-2} + ...].',
    ],
    examAnswer: [
      'Write down the characteristic polynomial P(λ).',
      'Compute A², A³ explicitly and substitute into P(A) to show it equals the zero matrix O.',
      'Multiply by A⁻¹ to extract the inverse matrix formula clearly.',
    ],
    slip: 'Forgetting to replace the scalar constant term c_0 with c_0 * I when substituting matrix A.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'CAYLEY–HAMILTON THEOREM & INVERSE', 'ta') +
        R(20, 36, 170, 70, 'fa') +
        T(30, 60, 'P(λ) = |A − λI| = 0', 't') +
        T(30, 85, 'λ³ − 4λ² + 5λ − 2 = 0', 'ta') +
        LA(195, 71, 240, 71) +
        T(250, 60, 'Replace λ -> A:', 't') +
        T(250, 85, 'A³ − 4A² + 5A − 2I = 0', 'ta') +
        T(20, 140, 'Multiply by A⁻¹:', 't') +
        T(20, 165, 'A⁻¹ = ½ (A² − 4A + 5I)', 'ta')
      ),
      caption: 'Cayley–Hamilton: replace λ with matrix A to obtain matrix equations and inverse formulas.',
    },
  },

  'math:0:6': {
    explain: [
      'Diagonalizing a matrix means finding a basis where the matrix behaves simply as diagonal scaling along coordinate axes.',
      'If matrix A has n linearly independent eigenvectors, we can place them into a modal matrix P such that P⁻¹AP = D.',
      'The diagonal matrix D contains the eigenvalues of A along its main diagonal.',
    ],
    definition: 'Matrix A is diagonalizable if there exists an invertible matrix P such that P⁻¹AP = D = diag(λ_1, ..., λ_n), where columns of P are eigenvectors.',
    formula: 'P^{-1} A P = D = \\text{diag}(\\lambda_1, \\lambda_2, \\dots, \\lambda_n)',
    steps: [
      '1. Find all n eigenvalues λ_1, ..., λ_n of A.',
      '2. Find n linearly independent eigenvectors X_1, ..., X_n.',
      '3. Construct matrix P = [X_1 X_2 ... X_n].',
      '4. Verify P is invertible (det(P) != 0) and compute D = P⁻¹AP.',
    ],
    examAnswer: [
      'List eigenvalues and their corresponding eigenvectors.',
      'Form matrix P and compute det(P) to prove invertibility.',
      'State: "P⁻¹AP = D where D has eigenvalues on the diagonal."',
    ],
    slip: 'The order of columns in P must strictly match the order of eigenvalues on the diagonal of D.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'MATRIX DIAGONALIZATION: P⁻¹ A P = D', 'ta') +
        R(20, 40, 90, 70, 'l') + T(65, 75, 'A', 'ta', 'middle') + T(65, 95, '(coupled)', 't', 'middle') +
        LA(115, 75, 175, 75) + T(145, 65, 'P⁻¹AP', 't', 'middle') +
        R(180, 40, 150, 70, 'fa') +
        T(255, 65, '[ λ₁  0   0 ]', 'ta', 'middle') +
        T(255, 85, '[ 0   λ₂  0 ]', 'ta', 'middle') +
        T(255, 105, '[ 0   0   λ₃]', 'ta', 'middle') +
        T(20, 150, 'Columns of P = eigenvectors of A', 't') +
        T(20, 170, 'Diagonal D uncouples system into independent scalar modes', 'd')
      ),
      caption: 'Diagonalization uncouples a matrix transformation into pure diagonal stretch factors.',
    },
  },

  'math:0:7': {
    explain: [
      'A quadratic form is a homogeneous polynomial of second degree, like Q = ax² + 2bxy + cy².',
      'Every quadratic form can be written compactly as X^T A X, where A is a symmetric matrix.',
      'By an orthogonal transformation X = PY, we can eliminate cross-product terms and express Q in canonical form as a sum of squares.',
    ],
    definition: 'A quadratic form Q = X^T A X is positive definite if Q > 0 for all X != 0 (all eigenvalues λ_i > 0); negative definite if all λ_i < 0; indefinite if eigenvalues have mixed signs.',
    formula: 'Q(X) = X^T A X \\xrightarrow{X=PY} \\lambda_1 y_1^2 + \\lambda_2 y_2^2 + \\dots + \\lambda_n y_n^2',
    steps: [
      '1. Form the symmetric coefficient matrix A: a_ii = coeff(x_i^2), a_ij = a_ji = 1/2 coeff(x_i x_j).',
      '2. Find the eigenvalues λ_i of A.',
      '3. Write the canonical form: Q = λ_1 y_1² + λ_2 y_2² + ... + λ_n y_n².',
      '4. Classify nature: Positive definite (all λ > 0), negative definite (all λ < 0), or indefinite.',
    ],
    examAnswer: [
      'Write the symmetric matrix A correctly.',
      'Show eigenvalue calculations or leading principal minors.',
      'State signature, index, and classification (positive definite, indefinite, etc.).',
    ],
    slip: 'Off-diagonal entries a_ij must be HALF of the coefficient of x_i x_j in the polynomial.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'QUADRATIC FORMS & CANONICAL SUM OF SQUARES', 'ta') +
        T(20, 48, 'Q = ax² + 2bxy + cy²  =  Xᵀ A X', 'ta') +
        LA(100, 60, 100, 95) + T(110, 80, 'Rotate to principal axes (X = PY)', 't') +
        R(20, 105, 320, 40, 'fa') +
        T(180, 130, 'Canonical Form: λ₁ y₁² + λ₂ y₂²', 'ta', 'middle') +
        T(20, 165, '• Elliptic bowl if λ₁, λ₂ > 0 (Pos Definite)', 't') +
        T(20, 180, '• Saddle surface if λ₁ > 0, λ₂ < 0 (Indefinite)', 'd')
      ),
      caption: 'Canonical transformation rotates coordinates to align with principal axes, eliminating cross terms.',
    },
  },

  // --- UNIT 1: Differential Calculus: Single Variable (8 Topics) ---
  'math:1:0': {
    explain: [
      'Successive differentiation means differentiating a function repeatedly to find its second, third, or n-th derivative.',
      'In engineering, y is displacement, y\' is velocity, y\'\' is acceleration, and y\'\'\' is jerk.',
      'We spot recurring algebraic patterns in standard functions to write general formulas for y^(n).',
    ],
    definition: 'The n-th derivative of y = f(x), denoted y^(n) or d^n y / dx^n, represents the rate of change of the (n-1)-th derivative.',
    formula: 'y = (ax+b)^m \\implies y^{(n)} = m(m-1)\\dots(m-n+1)a^n(ax+b)^{m-n}',
    steps: [
      '1. Differentiate the function once, twice, and three times.',
      '2. Inspect the progression of signs, coefficients, and exponents.',
      '3. Formulate the general expression for y^(n) using factorials and powers.',
      '4. Prove the formula by mathematical induction if required.',
    ],
    examAnswer: [
      'Write the first three derivatives explicitly.',
      'State the pattern for signs (-1)^n, powers a^n, and factorials.',
      'Write the standard compact formula for y^(n).',
    ],
    slip: 'Forgetting the chain rule factor a^n when differentiating functions of (ax + b).',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'SUCCESSIVE DIFFERENTIATION CASCADE', 'ta') +
        R(20, 35, 70, 30, 'l') + T(55, 55, 'y = f(x)', 't', 'middle') +
        LA(95, 50, 135, 50) +
        R(140, 35, 70, 30, 'l') + T(175, 55, "y' = dy/dx", 't', 'middle') +
        LA(215, 50, 255, 50) +
        R(260, 35, 70, 30, 'fa') + T(295, 55, "y'' = d²y/dx²", 'ta', 'middle') +
        LA(295, 70, 295, 100) +
        T(295, 125, 'y⁽ⁿ⁾ general form', 'ta', 'middle') +
        T(20, 150, '• y = sin(ax+b) -> y⁽ⁿ⁾ = aⁿ sin(ax + b + nπ/2)', 't') +
        T(20, 170, '• y = eᵃˣ -> y⁽ⁿ⁾ = aⁿ eᵃˣ', 'd')
      ),
      caption: 'Successive differentiation: repeating differentiation reveals systematic patterns in y^(n).',
    },
  },

  'math:1:1': {
    explain: [
      'Leibnitz’s Theorem provides a direct formula for the n-th derivative of the product of two functions, u(x) · v(x).',
      'It mirrors the Binomial Theorem, using combinatorial coefficients nCr.',
      'Choose v as the function whose derivatives vanish after a few steps (like x²), making the infinite sum terminate quickly.',
    ],
    definition: 'If u and v are n-times differentiable, (uv)_n = u_n v + nC1 u_{n-1} v_1 + nC2 u_{n-2} v_2 + ... + u v_n.',
    formula: '(uv)_n = \\sum_{r=0}^n \\binom{n}{r} u_{n-r} v_r',
    steps: [
      '1. Identify u (differentiable indefinitely, like sin ax or e^ax) and v (polynomial like x²).',
      '2. Calculate derivatives of v: v_1, v_2, v_3 = 0.',
      '3. Write Leibnitz expansion keeping only non-zero terms.',
      '4. Substitute u_n, u_{n-1}, u_{n-2} and simplify algebraic terms.',
    ],
    examAnswer: [
      'State the Leibnitz formula explicitly in the first step.',
      'Show which function is chosen as u and which as v.',
      'List derivatives of v until they terminate at 0.',
    ],
    slip: 'Choosing the polynomial as u instead of v; always set v as the polynomial so derivatives terminate.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'LEIBNITZ THEOREM PRODUCT EXPANSION', 'ta') +
        R(20, 36, 320, 45, 'fa') +
        T(180, 62, '(uv)ₙ = uₙv + ⁿC₁ uₙ₋₁ v₁ + ⁿC₂ uₙ₋₂ v₂ + …', 'ta', 'middle') +
        T(20, 105, 'Pick v as polynomial (e.g. v = x²):', 't') +
        T(40, 125, 'v₁ = 2x,   v₂ = 2,   v₃ = 0  (terminates!)', 'ta') +
        T(20, 155, 'Only first 3 terms survive in the expansion', 'd') +
        T(20, 175, 'Marks given for binomial coefficient setup: n, n(n-1)/2', 't')
      ),
      caption: 'Leibnitz Theorem: product differentiation terminates when v is chosen as a finite-degree polynomial.',
    },
  },

  'math:1:2': {
    explain: [
      'Rolle’s Theorem states that if a smooth curve starts and ends at the exact same height, it must flatten out somewhere in between.',
      'At that crest or trough, the tangent line is completely horizontal, so f\'(c) = 0.',
      'It is the foundational theorem upon which all other Mean Value Theorems are built.',
    ],
    definition: 'If f(x) is continuous on [a,b], differentiable on (a,b), and f(a) = f(b), then there exists at least one c in (a,b) where f\'(c) = 0.',
    formula: 'f(a) = f(b) \\implies \\exists c \\in (a, b) \\text{ such that } f\'(c) = 0',
    steps: [
      '1. Verify continuity of f(x) on the closed interval [a, b].',
      '2. Verify differentiability of f(x) on the open interval (a, b).',
      '3. Verify that f(a) = f(b).',
      '4. Compute f\'(x), set f\'(c) = 0, solve for c, and check that a < c < b.',
    ],
    examAnswer: [
      'State all three conditions: continuous on [a,b], differentiable on (a,b), f(a)=f(b).',
      'Differentiate f(x) and set f\'(c) = 0.',
      'Solve for c and verify explicitly that c belongs to (a, b).',
    ],
    slip: 'Finding a root c of f\'(c)=0 that lies outside the interval (a,b); reject roots outside the range.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'ROLLE’S THEOREM: HORIZONTAL TANGENT', 'ta') +
        L(30, 150, 330, 150, 'l') +
        P('M 50 120 C 100 40, 170 40, 220 120', 'l') +
        L(50, 120, 220, 120, 'd') +
        C(135, 60, 4, 'fa') +
        L(90, 60, 180, 60, 'a') +
        T(135, 45, "f'(c) = 0 (horizontal tangent)", 'ta', 'middle') +
        T(50, 168, 'x = a', 't', 'middle') + T(220, 168, 'x = b', 't', 'middle') +
        T(135, 168, 'x = c', 'ta', 'middle') +
        L(135, 60, 135, 150, 'd')
      ),
      caption: 'Rolle’s Theorem: between equal endpoints f(a)=f(b), the tangent line must become horizontal.',
    },
  },

  'math:1:3': {
    explain: [
      'Lagrange’s Mean Value Theorem generalizes Rolle’s Theorem to curves where the start and end points have different heights.',
      'It guarantees that somewhere along the journey, your instantaneous speed matches your average speed.',
      'Geometrically, there is at least one point c where the tangent line is parallel to the chord connecting (a, f(a)) and (b, f(b)).',
    ],
    definition: 'If f is continuous on [a,b] and differentiable on (a,b), then exists c in (a,b) such that f\'(c) = [f(b) − f(a)] / (b − a).',
    formula: 'f\'(c) = \\frac{f(b) - f(a)}{b - a}, \\quad c \\in (a, b)',
    steps: [
      '1. Confirm f(x) is continuous on [a, b] and differentiable on (a, b).',
      '2. Calculate average slope m = [f(b) - f(a)] / (b - a).',
      '3. Differentiate f(x) to find f\'(x).',
      '4. Solve f\'(c) = m and verify that c lies strictly inside (a, b).',
    ],
    examAnswer: [
      'State continuity and differentiability conditions.',
      'Calculate the slope of the chord [f(b) - f(a)] / (b - a).',
      'Equate f\'(c) to the chord slope and isolate c.',
    ],
    slip: 'Dividing by (a - b) instead of (b - a) in the chord slope formula.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'LAGRANGE LMVT: TANGENT PARALLEL TO CHORD', 'ta') +
        L(30, 150, 330, 150, 'l') +
        P('M 50 130 C 110 50, 200 60, 290 80', 'l') +
        L(50, 130, 290, 80, 'd') +
        C(155, 75, 4, 'fa') +
        L(100, 88, 210, 62, 'a') +
        T(155, 55, 'Tangent ∥ Chord', 'ta', 'middle') +
        T(50, 168, 'a', 't', 'middle') + T(290, 168, 'b', 't', 'middle') +
        T(155, 168, 'c', 'ta', 'middle') +
        L(155, 75, 155, 150, 'd')
      ),
      caption: 'Lagrange’s MVT: instantaneous slope f\'(c) equals the average chord slope between endpoints.',
    },
  },

  'math:1:4': {
    explain: [
      'Cauchy’s Mean Value Theorem extends Lagrange’s theorem to two functions, f(x) and g(x), graphed parametrically.',
      'It compares the relative rates of change of f and g over the same interval [a, b].',
      'Setting g(x) = x immediately returns standard Lagrange MVT as a special case.',
    ],
    definition: 'If f and g are continuous on [a,b], differentiable on (a,b), and g\'(x) != 0, then [f(b)−f(a)] / [g(b)−g(a)] = f\'(c) / g\'(c) for some c in (a,b).',
    formula: '\\frac{f(b) - f(a)}{g(b) - g(a)} = \\frac{f\'(c)}{g\'(c)}, \\quad c \\in (a, b)',
    steps: [
      '1. Verify continuity and differentiability for both f(x) and g(x).',
      '2. Ensure g\'(x) != 0 on (a, b) so denominator never vanishes.',
      '3. Evaluate LHS = [f(b) - f(a)] / [g(b) - g(a)].',
      '4. Set equal to f\'(c) / g\'(c) and solve for c in (a, b).',
    ],
    examAnswer: [
      'Define auxiliary function F(x) = f(x) - k*g(x) where k = [f(b)-f(a)]/[g(b)-g(a)].',
      'Apply Rolle’s theorem to F(x) on [a, b].',
      'Deduce F\'(c) = 0 => f\'(c) / g\'(c) = k.',
    ],
    slip: 'Applying Cauchy MVT when g(b) = g(a), which would cause division by zero.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'CAUCHY MEAN VALUE THEOREM (PARAMETRIC)', 'ta') +
        L(40, 150, 300, 150, 'l') + L(40, 150, 40, 30, 'l') +
        T(40, 20, 'y = f(t)', 't') + T(310, 155, 'x = g(t)', 't') +
        P('M 70 120 C 110 50, 210 60, 270 40', 'l') +
        L(70, 120, 270, 40, 'd') +
        C(170, 68, 4, 'fa') +
        L(120, 88, 220, 48, 'a') +
        T(170, 45, "Slope dy/dx = f'(c)/g'(c)", 'ta', 'middle') +
        T(70, 138, 't = a', 't') + T(270, 30, 't = b', 't')
      ),
      caption: 'Cauchy MVT: tangent slope to the parametric curve (g(t), f(t)) equals the chord slope.',
    },
  },

  'math:1:5': {
    explain: [
      'When calculating limits of fractions that yield undefined 0/0 or ∞/∞ forms, L’Hôpital’s Rule evaluates the ratio of their derivatives.',
      'It replaces the fraction f(x)/g(x) with f\'(x)/g\'(x) because near the limit, both functions are well approximated by their tangent slopes.',
      'Other indeterminate forms (0 · ∞, ∞ − ∞, 1^∞, 0^0, ∞^0) must be converted into 0/0 or ∞/∞ before applying the rule.',
    ],
    definition: 'If lim f(x)/g(x) yields 0/0 or ∞/∞, then lim [f(x)/g(x)] = lim [f\'(x)/g\'(x)], provided the latter limit exists.',
    formula: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)} \\quad (\\text{for } \\tfrac{0}{0} \\text{ or } \\tfrac{\\infty}{\\infty})',
    steps: [
      '1. Check the form: confirm by direct substitution that it is genuinely 0/0 or ∞/∞.',
      '2. Differentiate f(x) and g(x) separately (do NOT use quotient rule).',
      '3. Re-evaluate the limit of f\'(x) / g\'(x).',
      '4. If still indeterminate, repeat the procedure.',
    ],
    examAnswer: [
      'State the indeterminate form clearly (e.g. "Form: 0/0").',
      'State: "Applying L’Hôpital’s Rule, differentiate numerator and denominator separately."',
      'Evaluate the resulting expression and show the final limit value.',
    ],
    slip: 'Accidentally using the quotient rule [g f\' - f g\'] / g²; differentiate numerator and denominator independently.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'L’HÔPITAL: RATIO OF SLOPES AT 0/0', 'ta') +
        L(40, 140, 200, 140, 'l') + L(40, 140, 40, 30, 'l') +
        P('M 40 140 L 160 60', 'a') + T(165, 58, 'f(x) slope f\'(a)', 'ta') +
        P('M 40 140 L 160 100', 'l') + T(165, 102, 'g(x) slope g\'(a)', 't') +
        C(40, 140, 4, 'fa') + T(40, 155, 'x = a (0/0)', 't', 'middle') +
        R(220, 50, 120, 60, 'fa') +
        T(280, 75, 'lim f(x)/g(x)', 't', 'middle') +
        T(280, 95, "= f'(a) / g'(a)", 'ta', 'middle')
      ),
      caption: 'L’Hôpital’s rule: zoom in to the origin; curves behave as lines whose ratio is the ratio of slopes.',
    },
  },

  'math:1:6': {
    explain: [
      'The tangent line touches a curve at a single point with matching slope, while the normal line is perpendicular to the tangent.',
      'In Cartesian coordinates, tangent slope is dy/dx and normal slope is −1/(dy/dx).',
      'In polar coordinates (r, θ), the angle φ between the radius vector and tangent satisfies tan φ = r (dθ/dr).',
    ],
    definition: 'Tangent equation at (x_1, y_1): y − y_1 = m(x − x_1) where m = dy/dx. Normal equation: y − y_1 = (−1/m)(x − x_1). Polar relation: tan φ = r dθ/dr.',
    formula: 'y - y_1 = m(x - x_1), \\quad m_N = -\\frac{1}{m}, \\quad \\tan \\phi = r \\frac{d\\theta}{dr}',
    steps: [
      '1. Find dy/dx by implicit or parametric differentiation.',
      '2. Substitute point (x_1, y_1) to compute tangent slope m.',
      '3. Write tangent equation y - y_1 = m(x - x_1) and normal equation y - y_1 = (-1/m)(x - x_1).',
      '4. For polar curves r = f(θ), compute dr/dθ and evaluate tan φ = r / (dr/dθ).',
    ],
    examAnswer: [
      'Show slope m = dy/dx evaluated at the given point.',
      'Write tangent and normal line formulas.',
      'For polar problems, state tan φ = r dθ/dr and compute angle φ explicitly.',
    ],
    slip: 'Confusing the polar angle θ with the angle φ between radius vector and tangent.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'TANGENT, NORMAL & POLAR ANGLE φ', 'ta') +
        L(30, 150, 330, 150, 'l') + L(30, 150, 30, 30, 'l') +
        P('M 50 140 C 120 120, 180 50, 260 40', 'l') +
        C(160, 80, 4, 'fa') + T(165, 75, 'P(x,y)', 't') +
        L(80, 120, 240, 40, 'a') + T(245, 40, 'Tangent (slope m)', 'ta') +
        L(120, 0, 200, 160, 'd') + T(205, 155, 'Normal (slope -1/m)', 'd') +
        L(90, 115, 95, 125, 'l') + L(95, 125, 85, 130, 'l') +
        T(240, 100, 'tan φ = r dθ/dr', 'fa')
      ),
      caption: 'Tangent and normal lines are perpendicular at P; polar angle φ measures deviation from radius vector.',
    },
  },

  'math:1:7': {
    explain: [
      'Curvature κ measures how sharply a curve bends at a given point: a tight hairpin turn has high curvature, while a straight road has zero curvature.',
      'The radius of curvature ρ is the radius of the circle (osculating circle) that best hugs the curve at that point.',
      'Radius of curvature is the reciprocal of curvature: ρ = 1/κ.',
    ],
    definition: 'Curvature κ = |dψ/ds| = |y\'\'| / [1 + (y\')²]^(3/2). The radius of curvature is ρ = 1/κ.',
    formula: '\\kappa = \\frac{|y\'\'|}{[1 + (y\')^2]^{3/2}}, \\quad \\rho = \\frac{[1 + (y\')^2]^{3/2}}{|y\'\'|}',
    steps: [
      '1. Compute the first derivative y\' = dy/dx.',
      '2. Compute the second derivative y\'\' = d²y/dx².',
      '3. Substitute y\' and y\'\' into the Cartesian formula ρ = [1 + (y\')²]^(3/2) / |y\'\'|.',
      '4. Evaluate at the designated point (x, y).',
    ],
    examAnswer: [
      'Show y\' and y\'\' clearly.',
      'State the Cartesian radius of curvature formula ρ = [1 + (y\')²]^(3/2) / y\'\'.',
      'Substitute numerical values and state ρ with positive magnitude.',
    ],
    slip: 'Omitting the 3/2 power in the numerator [1 + (y\')²]^(3/2).',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'CURVATURE & OSCULATING CIRCLE', 'ta') +
        P('M 40 140 C 120 130, 160 50, 280 40', 'l') +
        C(200, 100, 45, 'fa') +
        C(175, 68, 4, 'ta') + T(180, 60, 'Point P', 't') +
        C(200, 100, 3, 'ta') + T(205, 105, 'Center C', 'ta') +
        L(200, 100, 175, 68, 'a') + T(195, 84, 'ρ', 'ta') +
        T(20, 160, '• Curvature κ = 1/ρ', 't') +
        T(20, 175, '• Sharp bend -> Small circle ρ -> Large curvature κ', 'd')
      ),
      caption: 'Osculating circle: the best-fitting tangent circle whose radius ρ is the radius of curvature.',
    },
  },

  // --- UNIT 2: Differential Calculus: Several Variables (7 Topics) ---
  'math:2:0': {
    explain: [
      'When a quantity depends on multiple independent inputs z = f(x, y), a partial derivative measures the rate of change with respect to one variable while holding all other variables constant.',
      '∂f/∂x treats y as a fixed constant number, while ∂f/∂y treats x as a fixed constant.',
      'Geometrically, partial derivatives represent the slopes of curves cut by vertical planes parallel to the coordinate axes.',
    ],
    definition: '∂f/∂x = lim_{h->0} [f(x+h, y) − f(x, y)] / h, with y held constant.',
    formula: '\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h, y) - f(x, y)}{h}',
    steps: [
      '1. To compute ∂f/∂x, treat every instance of y, z, etc., as ordinary constants.',
      '2. Differentiate with respect to x using standard single-variable rules.',
      '3. To compute ∂f/∂y, treat x as constant and differentiate with respect to y.',
      '4. Higher-order mixed derivatives ∂²f/∂x∂y satisfy equality under smoothness (Schwarz theorem).',
    ],
    examAnswer: [
      'State explicitly: "Differentiating partially with respect to x, treating y as constant."',
      'Show each term differentiated cleanly.',
      'Verify mixed partial derivatives ∂²f/∂x∂y = ∂²f/∂y∂x if requested.',
    ],
    slip: 'Treating y as a dependent function of x like implicit differentiation; in partial differentiation, inputs are strictly independent.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'PARTIAL DERIVATIVES AS SURFACE SLICES', 'ta') +
        L(40, 140, 160, 140, 'l') + L(40, 140, 40, 40, 'l') + L(40, 140, 10, 165, 'l') +
        T(165, 142, 'x', 't') + T(40, 30, 'z', 't') + T(5, 175, 'y', 't') +
        P('M 60 120 C 90 70, 140 80, 170 60', 'l') +
        P('M 60 120 C 80 145, 110 150, 130 135', 'd') +
        LA(80, 100, 140, 75) + T(145, 72, 'Slope ∂f/∂x (y fixed)', 'ta') +
        T(200, 80, 'Slice surface by plane', 't') +
        T(200, 100, 'y = constant -> slope ∂f/∂x', 'ta') +
        T(200, 120, 'x = constant -> slope ∂f/∂y', 't')
      ),
      caption: 'Partial derivatives: slicing the 3D surface with planes y=const and x=const isolates 1D slopes.',
    },
  },

  'math:2:1': {
    explain: [
      'A homogeneous function scales cleanly: if you double all inputs, the output multiplies by 2^n.',
      'Euler’s Theorem proves that multiplying each variable by its partial derivative and summing them gives exactly n times the function.',
      'It converts difficult multivariable derivative combinations into a single multiplication by degree n.',
    ],
    definition: 'If f(x, y) is homogeneous of degree n, then x(∂f/∂x) + y(∂f/∂y) = n · f(x, y). For second derivatives: x² f_xx + 2xy f_xy + y² f_yy = n(n−1)f.',
    formula: 'x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\cdot u',
    steps: [
      '1. Test homogeneity: substitute x = tx, y = ty and show f(tx, ty) = t^n f(x, y) to find degree n.',
      '2. If u = f(x, y) is not homogeneous but g(u) is, find degree n of g(u).',
      '3. Apply extended Euler theorem: x u_x + y u_y = n · g(u) / g\'(u).',
      '4. Simplify the resulting trigonometric or algebraic expression.',
    ],
    examAnswer: [
      'Check homogeneity: show f(tx, ty) = t^n f(x, y) and state degree n explicitly.',
      'State Euler’s Theorem: x(∂u/∂x) + y(∂u/∂y) = n · u.',
      'For second order: state x²u_xx + 2xy u_xy + y²u_yy = n(n-1)u.',
    ],
    slip: 'When u = sin⁻¹[(x+y)/(√x+√y)], u is NOT homogeneous; sin(u) is homogeneous. Use the modified Euler form.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'EULER’S THEOREM ON HOMOGENEOUS FUNCTIONS', 'ta') +
        L(30, 150, 180, 150, 'l') + L(30, 150, 30, 30, 'l') +
        P('M 30 150 L 150 50', 'd') +
        C(70, 117, 3, 'l') + T(75, 117, '(x, y)', 't') +
        C(130, 67, 4, 'fa') + T(135, 65, '(tx, ty)', 'ta') +
        T(200, 60, 'Radial scaling by t:', 't') +
        T(200, 85, 'f(tx, ty) = tⁿ f(x, y)', 'ta') +
        R(195, 110, 155, 45, 'fa') +
        T(272, 137, 'x uₓ + y uᵧ = n · u', 'ta', 'middle')
      ),
      caption: 'Euler’s theorem: homogeneous functions scale along rays from the origin by power t^n.',
    },
  },

  'math:2:2': {
    explain: [
      'A multivariable limit lim_{(x,y)->(0,0)} f(x,y) exists only if the function approaches the exact same value along EVERY possible path.',
      'If two different approach paths (e.g., along y = mx or along y = kx²) give different answers, the limit does not exist.',
      'Continuity requires that the limit exists and equals the exact function value at that point.',
    ],
    definition: 'f(x,y) is continuous at (a,b) if lim_{(x,y)->(a,b)} f(x,y) = f(a,b). The limit exists iff it is independent of the approach path.',
    formula: '\\lim_{(x,y) \\to (0,0)} f(x, y) = L \\iff \\forall \\text{ paths } y = g(x), \\text{ limit} = L',
    steps: [
      '1. Test path y = mx: substitute y = mx into f(x, y) and evaluate limit as x -> 0.',
      '2. If the result depends on m, stop: the limit does not exist.',
      '3. If result is independent of m, test parabolic path y = kx² or higher degree balancing powers.',
      '4. If limit still appears unique, prove using polar coordinates (x = r cos θ, y = r sin θ) as r -> 0.',
    ],
    examAnswer: [
      'State approach path 1: "Along path y = mx, limit = ..."',
      'Show that the value depends on slope m.',
      'Conclude: "Since the limit is path-dependent, lim_{(x,y)->(0,0)} f(x,y) does not exist."',
    ],
    slip: 'Testing only y = mx is not enough; if numerator has x²y and denominator has x⁴ + y², path y = mx² gives m/(1+m²).',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'PATH-DEPENDENT MULTIVARIABLE LIMITS', 'ta') +
        L(30, 100, 230, 100, 'l') + L(130, 170, 130, 30, 'l') +
        C(130, 100, 5, 'fa') + T(135, 115, '(0,0)', 't') +
        LA(60, 60, 120, 95) + T(50, 55, 'y = m₁x (L₁)', 'ta') +
        LA(60, 140, 120, 105) + T(50, 150, 'y = m₂x (L₂)', 't') +
        P('M 50 40 Q 90 90, 120 98', 'a') + T(45, 30, 'y = kx² (L₃)', 'd') +
        T(240, 80, 'If L₁ ≠ L₂ ≠ L₃', 'ta') +
        T(240, 105, '-> Limit DOES NOT', 't') +
        T(240, 125, 'exist at (0,0)!', 'ta')
      ),
      caption: 'Multivariable limits: approaching along different directions (lines or parabolas) must yield the same value.',
    },
  },

  'math:2:3': {
    explain: [
      'Taylor’s Theorem expresses a smooth two-variable function as a polynomial series around a reference point (a, b).',
      'The first-order terms give the tangent plane approximation, while the second-order terms model local parabolic curvature.',
      'The remainder term captures the exact truncation error between the polynomial approximation and the true function.',
    ],
    definition: 'f(a+h, b+k) = f(a,b) + [h f_x + k f_y] + (1/2!) [h² f_xx + 2hk f_xy + k² f_yy] + ... + R_n.',
    formula: 'f(a+h, b+k) = \\sum_{m=0}^n \\frac{1}{m!} \\left( h \\frac{\\partial}{\\partial x} + k \\frac{\\partial}{\\partial y} \\right)^m f(a, b) + R_n',
    steps: [
      '1. Evaluate f(a, b) at the expansion center.',
      '2. Compute first partial derivatives f_x, f_y at (a, b).',
      '3. Compute second partial derivatives f_xx, f_xy, f_yy at (a, b).',
      '4. Assemble terms into Taylor series: f(a,b) + [h f_x + k f_y] + 1/2 [h² f_xx + 2hk f_xy + k² f_yy] + ...',
    ],
    examAnswer: [
      'List all required partial derivatives up to the requested order.',
      'Evaluate each partial derivative at the given center point (a, b).',
      'Substitute cleanly into the Taylor series formula and group terms by degree.',
    ],
    slip: 'Forgetting the factor 2 in the mixed term 2hk f_xy in the second-order expansion.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'TAYLOR EXPANSION: LOCAL SURFACE FIT', 'ta') +
        P('M 40 140 C 100 80, 180 80, 260 40', 'l') +
        C(130, 85, 4, 'fa') + T(135, 80, '(a, b)', 't') +
        L(60, 115, 200, 55, 'a') + T(205, 50, '1st order: Tangent Plane', 'ta') +
        P('M 80 120 Q 130 75, 190 60', 'd') + T(195, 75, '2nd order: Paraboloid', 'd') +
        T(20, 165, 'f(a+h, b+k) = f + (h fₓ + k fᵧ) + ½(h² fₓₓ + 2hk fₓᵧ + k² fᵧᵧ) + …', 'fa')
      ),
      caption: 'Taylor series approximates the surface: 1st order fits a tangent plane, 2nd order fits a paraboloid.',
    },
  },

  'math:2:4': {
    explain: [
      'Maclaurin’s Theorem is simply the Taylor series expansion centered at the origin (0, 0).',
      'It turns multivariable expressions into power series of x and y with constant numerical coefficients.',
      'It is widely used to approximate nonlinear physics potentials near equilibrium.',
    ],
    definition: 'Maclaurin expansion: f(x, y) = f(0,0) + [x f_x(0,0) + y f_y(0,0)] + 1/2! [x² f_xx(0,0) + 2xy f_xy(0,0) + y² f_yy(0,0)] + ...',
    formula: 'f(x, y) = f(0,0) + \\sum_{m=1}^n \\frac{1}{m!} \\left( x \\frac{\\partial}{\\partial x} + y \\frac{\\partial}{\\partial y} \\right)^m f(0,0)',
    steps: [
      '1. Evaluate f(0, 0).',
      '2. Calculate f_x(0,0) and f_y(0,0).',
      '3. Calculate second partial derivatives f_xx(0,0), f_xy(0,0), f_yy(0,0).',
      '4. Substitute into Maclaurin formula and group by degree powers x^p y^q.',
    ],
    examAnswer: [
      'Compute all partial derivatives evaluated at (0, 0).',
      'Write the expansion formula with center (0, 0).',
      'State terms up to degree 2 or 3 as asked in the question.',
    ],
    slip: 'Substituting variables instead of evaluating derivatives at (0,0) before building series terms.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'MACLAURIN EXPANSION CENTERED AT (0,0)', 'ta') +
        L(40, 130, 240, 130, 'l') + L(140, 170, 140, 30, 'l') +
        C(140, 130, 5, 'fa') + T(145, 145, '(0,0)', 't') +
        P('M 80 150 Q 140 100, 200 60', 'l') +
        T(20, 45, 'f(x,y) ≈ f(0,0) + x fₓ(0,0) + y fᵧ(0,0)', 't') +
        T(40, 68, '+ ½ [ x² fₓₓ + 2xy fₓᵧ + y² fᵧᵧ ]', 'ta') +
        T(20, 175, 'Direct polynomial approximation near the coordinate origin', 'd')
      ),
      caption: 'Maclaurin expansion: polynomial approximation centered directly at the coordinate origin (0, 0).',
    },
  },

  'math:2:5': {
    explain: [
      'To find maxima and minima of a surface z = f(x, y), first find stationary points where both partial derivatives are zero: f_x = 0 and f_y = 0.',
      'Next, calculate second derivatives r = f_xx, s = f_xy, t = f_yy and evaluate the discriminant rt − s².',
      'If rt − s² > 0 and r < 0: local maximum (hilltop). If rt − s² > 0 and r > 0: local minimum (valley). If rt − s² < 0: saddle point.',
    ],
    definition: 'Stationary points satisfy f_x = 0, f_y = 0. Discriminant D = rt − s². D > 0, r < 0 => Max; D > 0, r > 0 => Min; D < 0 => Saddle; D = 0 => Test fails.',
    formula: 'D = rt - s^2, \\quad r = f_{xx}, \\; s = f_{xy}, \\; t = f_{yy}',
    steps: [
      '1. Solve system f_x = 0 and f_y = 0 simultaneously to find all stationary points (a, b).',
      '2. Calculate second partial derivatives r = f_xx, s = f_xy, t = f_yy.',
      '3. At each point, compute D = rt - s².',
      '4. If D > 0 and r < 0 -> Maximum; if D > 0 and r > 0 -> Minimum; if D < 0 -> Saddle point.',
    ],
    examAnswer: [
      'List stationary points found from f_x = 0 and f_y = 0.',
      'Show table with columns: Point, r, s, t, rt - s², Conclusion.',
      'State maximum or minimum value by plugging point back into f(x, y).',
    ],
    slip: 'If rt − s² = 0, the test is inconclusive; do NOT write "saddle point". Check higher order terms.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'SECOND DERIVATIVE TEST FOR MAXIMA/MINIMA', 'ta') +
        R(20, 36, 95, 65, 'fa') +
        T(67, 58, 'rt − s² > 0', 'ta', 'middle') +
        T(67, 75, 'r < 0', 'ta', 'middle') +
        T(67, 92, 'MAXIMUM', 't', 'middle') +
        R(130, 36, 95, 65, 'l') +
        T(177, 58, 'rt − s² > 0', 'ta', 'middle') +
        T(177, 75, 'r > 0', 'ta', 'middle') +
        T(177, 92, 'MINIMUM', 't', 'middle') +
        R(240, 36, 95, 65, 'l') +
        T(287, 58, 'rt − s² < 0', 'ta', 'middle') +
        T(287, 75, 'any r', 't', 'middle') +
        T(287, 92, 'SADDLE', 'd', 'middle') +
        T(20, 135, 'r = fₓₓ,   s = fₓᵧ,   t = f_yy', 't') +
        T(20, 155, 'rt − s² = 0  ->  Test is INCONCLUSIVE (test fails)', 'd')
      ),
      caption: 'Classification: rt - s² > 0 gives peaks or valleys; rt - s² < 0 gives saddle surfaces.',
    },
  },

  'math:2:6': {
    explain: [
      'Lagrange Multipliers find the highest or lowest point of a function f(x, y, z) when constrained to stay on a surface g(x, y, z) = c.',
      'At the constrained extremum, the contour lines of f are tangent to the constraint curve g = c.',
      'This means their gradient vectors are parallel: ∇f = λ ∇g, where λ is the Lagrange multiplier.',
    ],
    definition: 'To extremize f(x,y,z) subject to g(x,y,z) = c, build auxiliary function F = f + λ(g − c) and solve ∇F = 0 alongside g = c.',
    formula: '\\nabla f = \\lambda \\nabla g, \\quad g(x, y, z) = c',
    steps: [
      '1. Form the Lagrangian function F(x, y, z, λ) = f(x, y, z) + λ(c - g(x, y, z)).',
      '2. Take partial derivatives and set to zero: F_x = 0, F_y = 0, F_z = 0, F_λ = 0.',
      '3. Eliminate λ from the equations to establish relations between x, y, and z.',
      '4. Substitute into the constraint equation g = c to find the optimal point coordinates.',
    ],
    examAnswer: [
      'Write the Lagrangian F = f + λ(g - c).',
      'Set F_x = 0, F_y = 0, F_z = 0 and constraint g = c.',
      'Solve for x, y, z, and substitute back into f to report maximum/minimum value.',
    ],
    slip: 'Forgetting to substitute the coordinates back into the objective function f to compute the actual extremum value.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'LAGRANGE MULTIPLIERS: TANGENT CONTOURS', 'ta') +
        P('M 50 140 C 90 90, 170 80, 230 110', 'a') + T(235, 115, 'Constraint g(x,y) = c', 'ta') +
        C(140, 100, 30, 'd') + T(140, 65, 'f = c₁', 'd', 'middle') +
        C(140, 100, 50, 'l') + T(140, 45, 'f = c₂', 't', 'middle') +
        C(130, 85, 4, 'fa') + T(135, 80, 'Extremum P', 't') +
        LA(130, 85, 110, 55) + T(90, 50, '∇f', 'ta') +
        LA(130, 85, 150, 115) + T(155, 125, '∇g', 'ta') +
        T(20, 170, '∇f ∥ ∇g  ->  ∇f = λ ∇g at the constrained optimum', 'fa')
      ),
      caption: 'Lagrange multipliers: at the optimum, contour lines of f touch constraint curve g=c tangentially (∇f ∥ ∇g).',
    },
  },

  // --- UNIT 3: Integral Calculus (10 Topics) ---
  'math:3:0': {
    explain: [
      'Leibnitz’s Rule allows you to differentiate a definite integral with respect to a parameter x that appears inside the integrand and in the limits.',
      'The derivative equals the integral of the partial derivative plus boundary terms from the moving endpoints.',
      'It is widely used in physics and engineering to differentiate energy integrals across moving boundaries.',
    ],
    definition: 'd/dx ∫_{a(x)}^{b(x)} f(x,t) dt = ∫_{a(x)}^{b(x)} (∂f/∂x) dt + f(x, b(x)) · b\'(x) − f(x, a(x)) · a\'(x).',
    formula: '\\frac{d}{dx} \\int_{a(x)}^{b(x)} f(x,t) dt = \\int_{a(x)}^{b(x)} \\frac{\\partial f}{\\partial x} dt + f(x, b) b\'(x) - f(x, a) a\'(x)',
    steps: [
      '1. Differentiate the integrand partially with respect to x: ∂f/∂x.',
      '2. Substitute upper limit t = b(x) into f(x, t) and multiply by b\'(x).',
      '3. Substitute lower limit t = a(x) into f(x, t) and multiply by a\'(x).',
      '4. Combine: ∫ (∂f/∂x) dt + f(x, b)·b\'(x) − f(x, a)·a\'(x).',
    ],
    examAnswer: [
      'Write out the three parts of Leibnitz’s rule explicitly.',
      'Compute the interior integral and boundary evaluations separately.',
      'Sum all three terms and simplify algebraic powers.',
    ],
    slip: 'Forgetting the chain rule derivatives b\'(x) and a\'(x) when multiplying boundary terms.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'LEIBNITZ RULE: DIFFERENTIATION UNDER INTEGRAL', 'ta') +
        R(20, 36, 320, 48, 'fa') +
        T(180, 55, 'd/dx ∫ₐ₍ₓ₎^b₍ₓ₎ f(x,t)dt', 't', 'middle') +
        T(180, 75, '= ∫ (∂f/∂x) dt  +  f(x,b)·b\'(x)  −  f(x,a)·a\'(x)', 'ta', 'middle') +
        L(40, 140, 180, 140, 'l') +
        P('M 60 140 Q 110 80, 160 140', 'l') +
        L(60, 140, 60, 105, 'd') + T(60, 155, 'a(x)', 't', 'middle') +
        L(160, 140, 160, 105, 'd') + T(160, 155, 'b(x)', 't', 'middle') +
        T(200, 115, '1. Area changes inside', 't') +
        T(200, 135, '2. Right boundary moves: +f(b)b\'', 'ta') +
        T(200, 155, '3. Left boundary moves: −f(a)a\'', 'd')
      ),
      caption: 'Leibnitz rule: derivative combines changing area under curve with moving boundary endpoints.',
    },
  },

  'math:3:1': {
    explain: [
      'A double integral ∬_R f(x, y) dA sums up values over a 2D planar region R.',
      'If f(x, y) = 1, the double integral computes the area of R. If f(x, y) > 0, it computes the 3D volume under the surface z = f(x, y).',
      'The integral is evaluated as an iterated integral: integrate with respect to one variable, then the other.',
    ],
    definition: '∬_R f(x, y) dA = ∫_a^b [∫_{y_1(x)}^{y_2(x)} f(x, y) dy] dx.',
    formula: '\\iint_R f(x, y) \\, dA = \\int_{x=a}^b \\left( \\int_{y=y_1(x)}^{y_2(x)} f(x, y) \\, dy \\right) dx',
    steps: [
      '1. Sketch the boundary curves of the region R in the xy-plane.',
      '2. Draw a vertical strip to find y-limits: y runs from lower curve y_1(x) to upper curve y_2(x).',
      '3. Determine x-limits: x runs from minimum value a to maximum value b.',
      '4. Integrate inside with respect to y, then integrate outside with respect to x.',
    ],
    examAnswer: [
      'Draw the 2D region R with axes and boundary intersections labelled.',
      'Write the integral limits clearly before evaluating.',
      'Perform inner integration first, substitute limits, then evaluate outer integral.',
    ],
    slip: 'Outer integral limits must ALWAYS be constant numbers; only inner limits can contain variables.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'DOUBLE INTEGRAL AS AREA / VOLUME SUM', 'ta') +
        L(30, 150, 180, 150, 'l') + L(30, 150, 30, 30, 'l') +
        P('M 50 130 C 80 80, 120 70, 150 110', 'l') +
        P('M 50 130 C 80 145, 120 140, 150 110', 'l') +
        R(95, 82, 12, 55, 'fa') + T(101, 75, 'dy', 'ta', 'middle') +
        L(50, 150, 50, 130, 'd') + T(50, 165, 'x=a', 't', 'middle') +
        L(150, 150, 150, 110, 'd') + T(150, 165, 'x=b', 't', 'middle') +
        T(200, 70, 'Vertical strip runs from', 't') +
        T(200, 90, 'lower curve y₁(x) to', 'ta') +
        T(200, 110, 'upper curve y₂(x)', 'ta') +
        T(200, 140, 'Volume = ∬ f(x,y) dy dx', 'fa')
      ),
      caption: 'Double integral: sum vertical strips dy from curve y_1 to y_2, then sweep dx from a to b.',
    },
  },

  'math:3:2': {
    explain: [
      'Changing the order of integration means evaluating with respect to x first instead of y, or vice versa.',
      'Some integrals are impossible in their original order (like ∫ e^(x²) dx) but become simple once the order is reversed.',
      'Never just swap the dx and dy symbols: always draw the region first, then switch from vertical strips to horizontal strips.',
    ],
    definition: 'Changing order converts ∫_a^b ∫_{y_1(x)}^{y_2(x)} f dy dx into ∫_c^d ∫_{x_1(y)}^{x_2(y)} f dx dy by re-slicing the same region.',
    formula: '\\int_0^a \\int_{x}^a f(x,y) \\, dy \\, dx = \\int_0^a \\int_0^y f(x,y) \\, dx \\, dy',
    steps: [
      '1. Read the given limits and sketch all bounding curves.',
      '2. Shade the enclosed region and label all intersection points.',
      '3. Switch slicing direction: if original used vertical strips, draw horizontal strips.',
      '4. Read new limits: x runs from left curve x_1(y) to right curve x_2(y); y runs from y_min to y_max.',
    ],
    examAnswer: [
      'Draw the original region with bounding equations.',
      'State the old limits and write the newly derived limits clearly.',
      'Evaluate the integral in the new order step by step.',
    ],
    slip: 'Writing variable limits on the outer integral after changing order; outer limits must always be constants.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'CHANGE ORDER: VERTICAL TO HORIZONTAL STRIPS', 'ta') +
        L(30, 140, 160, 140, 'l') + L(30, 140, 30, 30, 'l') +
        P('M 30 140 L 130 40 L 130 140 Z', 'l') +
        R(75, 95, 10, 45, 'fa') + T(80, 85, 'dy dx', 't', 'middle') +
        T(80, 160, '1. Vertical strip', 't', 'middle') +
        LA(165, 85, 205, 85) +
        L(215, 140, 345, 140, 'l') + L(215, 140, 215, 30, 'l') +
        P('M 215 140 L 315 40 L 315 140 Z', 'l') +
        R(255, 80, 60, 10, 'fa') + T(285, 75, 'dx dy', 'ta', 'middle') +
        T(280, 160, '2. Horizontal strip', 'ta', 'middle')
      ),
      caption: 'Change order of integration: re-slice the exact same region from vertical strips to horizontal strips.',
    },
  },

  'math:3:3': {
    explain: [
      'When boundaries are circles, sectors, or spirals, polar coordinates (r, θ) make integration much simpler than Cartesian (x, y).',
      'The Cartesian area element dx dy transforms into the polar area element r dr dθ.',
      'The extra factor of r represents the widening wedge area as you move farther from the origin.',
    ],
    definition: 'In polar coordinates, x = r cos θ, y = r sin θ, x² + y² = r², and the area differential is dx dy = r dr dθ.',
    formula: '\\iint_R f(x, y) \\, dx \\, dy = \\iint_R f(r\\cos\\theta, r\\sin\\theta) \\, r \\, dr \\, d\\theta',
    steps: [
      '1. Substitute x = r cos θ, y = r sin θ, and dx dy = r dr dθ.',
      '2. Convert the boundary equations: circles x² + y² = a² become r = a.',
      '3. Determine limits: r sweeps from 0 to R(θ); θ sweeps through the angular range [θ_1, θ_2].',
      '4. Integrate with respect to r first, then with respect to θ.',
    ],
    examAnswer: [
      'State conversion: x = r cos θ, y = r sin θ, dx dy = r dr dθ.',
      'Sketch the circular boundary and identify r and θ ranges.',
      'Remember to include the Jacobian factor r inside the integrand.',
    ],
    slip: 'Forgetting the extra factor of r in the differential (writing dr dθ instead of r dr dθ).',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'POLAR AREA ELEMENT: r dr dθ', 'ta') +
        L(30, 150, 180, 150, 'l') + L(30, 150, 30, 30, 'l') +
        P('M 30 150 L 140 70', 'd') + P('M 30 150 L 120 50', 'd') +
        P('M 90 105 A 75 75 0 0 1 80 90', 'l') +
        P('M 120 85 A 105 105 0 0 1 105 65', 'l') +
        P('M 90 105 L 120 85 L 105 65 L 80 90 Z', 'fa') +
        T(100, 80, 'r dr dθ', 'ta') +
        T(200, 70, 'x = r cos θ', 't') +
        T(200, 90, 'y = r sin θ', 't') +
        T(200, 115, 'dx dy -> r dr dθ', 'ta') +
        T(200, 140, 'x² + y² -> r²', 'd')
      ),
      caption: 'Polar area element: sector geometry produces the area element dA = r dr dθ.',
    },
  },

  'math:3:4': {
    explain: [
      'A triple integral ∭_V f(x, y, z) dV sums quantities throughout a 3D solid volume V.',
      'If f(x, y, z) = 1, it calculates the volume of the solid; if f is density, it calculates the total mass.',
      'It is evaluated as three nested iterated integrals: dz, then dy, then dx.',
    ],
    definition: '∭_V f(x, y, z) dV = ∫_a^b ∫_{y_1(x)}^{y_2(x)} ∫_{z_1(x,y)}^{z_2(x,y)} f(x, y, z) dz dy dx.',
    formula: '\\iiint_V f(x, y, z) \\, dV = \\int_{x=a}^b \\int_{y_1(x)}^{y_2(x)} \\int_{z_1(x,y)}^{z_2(x,y)} f(x, y, z) \\, dz \\, dy \\, dx',
    steps: [
      '1. Find z-limits: shoot an arrow in the +z direction through the solid from bottom surface z_1(x,y) to top surface z_2(x,y).',
      '2. Project the solid down onto the xy-plane to find the shadow region R.',
      '3. Set up the double integral limits over the 2D projection R for y and x.',
      '4. Integrate innermost dz first, then dy, and finally dx.',
    ],
    examAnswer: [
      'State upper and lower bounding surfaces for z.',
      'Draw the 2D projection shadow on the xy-plane.',
      'Integrate inside out: dz -> dy -> dx.',
    ],
    slip: 'The outermost limits must be constant numbers; never leave variables in the final outer integral.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'TRIPLE INTEGRAL: 3D SLICING', 'ta') +
        L(30, 150, 150, 150, 'l') + L(30, 150, 30, 30, 'l') + L(30, 150, 10, 175, 'l') +
        R(60, 60, 60, 50, 'fa') +
        L(60, 60, 80, 45, 'd') + L(120, 60, 140, 45, 'd') + L(120, 110, 140, 95, 'd') +
        L(80, 45, 140, 45, 'd') + L(140, 45, 140, 95, 'd') +
        T(85, 90, 'dV', 'ta') +
        T(180, 60, '1. z runs from z₁(x,y) to z₂(x,y)', 't') +
        T(180, 85, '2. Project onto xy-plane: R', 'ta') +
        T(180, 110, '3. y runs from y₁(x) to y₂(x)', 't') +
        T(180, 135, '4. x runs from a to b', 't') +
        T(180, 160, 'dV = dx dy dz', 'd')
      ),
      caption: 'Triple integral: z runs from lower to upper surface; projection on xy-plane determines y and x limits.',
    },
  },

  'math:3:5': {
    explain: [
      'For cylindrical shapes (pipes, cylinders), use cylindrical coordinates: dV = r dr dθ dz.',
      'For spheres and cones, use spherical polar coordinates: dV = r² sin φ dr dφ dθ.',
      'These coordinate transformations eliminate square roots like √(a² − x² − y²) from the integration limits.',
    ],
    definition: 'Cylindrical: x=r cos θ, y=r sin θ, z=z, dV=r dr dθ dz. Spherical: x=r sin θ cos φ, y=r sin θ sin φ, z=r cos θ, dV=r² sin θ dr dθ dφ.',
    formula: '\\text{Cylindrical: } dV = r \\, dr \\, d\\theta \\, dz; \\quad \\text{Spherical: } dV = r^2 \\sin\\theta \\, dr \\, d\\theta \\, d\\phi',
    steps: [
      '1. Identify symmetry: choose cylindrical for circular cylinders/prisms; spherical for spheres/cones.',
      '2. Substitute appropriate coordinate transformations and volume element dV.',
      '3. Determine limits: for full sphere of radius a, r in [0, a], θ in [0, π], φ in [0, 2π].',
      '4. Separate independent integrals and evaluate.',
    ],
    examAnswer: [
      'State chosen coordinate system and its volume element dV.',
      'State limits clearly (e.g. for octant: r ∈ [0,a], θ ∈ [0,π/2], φ ∈ [0,π/2]).',
      'Separate into product of single integrals when limits and integrands factor.',
    ],
    slip: 'Forgetting the r² sin θ factor in spherical volume element (writing dr dθ dφ instead of r² sin θ dr dθ dφ).',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'CYLINDRICAL & SPHERICAL VOLUME ELEMENTS', 'ta') +
        R(20, 36, 150, 95, 'l') +
        T(95, 55, 'CYLINDRICAL', 'ta', 'middle') +
        T(95, 75, 'dV = r dr dθ dz', 't', 'middle') +
        T(95, 95, 'x = r cos θ, y = r sin θ', 'd', 'middle') +
        T(95, 115, 'z = z', 'd', 'middle') +
        R(190, 36, 150, 95, 'fa') +
        T(265, 55, 'SPHERICAL', 'ta', 'middle') +
        T(265, 75, 'dV = r² sin θ dr dθ dφ', 'ta', 'middle') +
        T(265, 95, 'x = r sin θ cos φ', 't', 'middle') +
        T(265, 115, 'z = r cos θ', 't', 'middle') +
        T(20, 155, 'Sphere: r ∈ [0, a],  θ ∈ [0, π],  φ ∈ [0, 2π]', 't') +
        T(20, 175, 'Volume = ∫∫∫ r² sin θ dr dθ dφ = 4/3 π a³', 'fa')
      ),
      caption: 'Curvilinear volume elements: cylindrical uses r dr dθ dz; spherical uses r² sin θ dr dθ dφ.',
    },
  },

  'math:3:6': {
    explain: [
      'The Beta function B(m, n) is a definite integral that evaluates products of powers of x and (1 − x) over [0, 1].',
      'It is closely linked to combinations, factorials, and probabilities.',
      'Its trigonometric form evaluates powers of sine and cosine over [0, π/2] instantly.',
    ],
    definition: 'B(m, n) = ∫_0^1 x^(m-1) (1 − x)^(n-1) dx = 2 ∫_0^(π/2) sin^(2m-1) θ cos^(2n-1) θ dθ, for m > 0, n > 0.',
    formula: 'B(m, n) = \\int_0^1 x^{m-1} (1 - x)^{n-1} dx = 2 \\int_0^{\\pi/2} \\sin^{2m-1}\\theta \\cos^{2n-1}\\theta \\, d\\theta',
    steps: [
      '1. Match the given integral to ∫_0^1 x^(p) (1 - x)^(q) dx.',
      '2. Identify m = p + 1 and n = q + 1.',
      '3. In trigonometric form ∫_0^(π/2) sin^p θ cos^q θ dθ, set 2m - 1 = p and 2n - 1 = q.',
      '4. Compute B(m, n) = 1/2 · [Γ(m)Γ(n) / Γ(m+n)].',
    ],
    examAnswer: [
      'State the Beta integral formula used.',
      'Identify m and n parameters explicitly.',
      'Convert to Gamma functions and evaluate the final fraction.',
    ],
    slip: 'The powers in the definition are (m - 1) and (n - 1); do not forget to add 1 when reading m and n.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'BETA FUNCTION B(m, n) INTEGRAL', 'ta') +
        R(20, 36, 320, 48, 'fa') +
        T(180, 56, 'B(m, n) = ∫₀¹ xᵐ⁻¹ (1 − x)ⁿ⁻¹ dx', 'ta', 'middle') +
        T(180, 74, '= 2 ∫₀^(π/2) sin^(2m-1)θ cos^(2n-1)θ dθ', 't', 'middle') +
        L(40, 150, 200, 150, 'l') + L(40, 150, 40, 95, 'l') +
        P('M 40 150 Q 120 90, 200 150', 'l') +
        T(40, 165, 'x = 0', 't', 'middle') + T(200, 165, 'x = 1', 't', 'middle') +
        T(120, 140, 'xᵐ⁻¹(1-x)ⁿ⁻¹', 'ta', 'middle') +
        T(220, 110, '• Symmetric: B(m,n) = B(n,m)', 't') +
        T(220, 130, '• B(1, 1) = 1', 't') +
        T(220, 150, '• Evaluated via Gamma', 'ta')
      ),
      caption: 'Beta function: integrates power products over [0,1]; trigonometric form integrates over [0, π/2].',
    },
  },

  'math:3:7': {
    explain: [
      'The Gamma function Γ(n) generalizes the factorial function to non-integer and real numbers.',
      'For positive integers, Γ(n + 1) = n!, making Γ(5) = 4! = 24.',
      'The most famous non-integer value is Γ(1/2) = √π, which arises frequently in Gaussian probability and physics.',
    ],
    definition: 'Γ(n) = ∫_0^∞ x^(n-1) e^(−x) dx for n > 0. Recurrence: Γ(n + 1) = n Γ(n). Special value: Γ(1/2) = √π.',
    formula: '\\Gamma(n) = \\int_0^\\infty x^{n-1} e^{-x} dx, \\quad \\Gamma(n+1) = n \\Gamma(n) = n!, \\quad \\Gamma(1/2) = \\sqrt{\\pi}',
    steps: [
      '1. Apply the reduction formula Γ(n + 1) = n Γ(n).',
      '2. For positive integer n, compute Γ(n + 1) = n!.',
      '3. For half-integers, step down repeatedly: Γ(5/2) = (3/2)(1/2) Γ(1/2).',
      '4. Substitute Γ(1/2) = √π to obtain the final radical value.',
    ],
    examAnswer: [
      'Write the recurrence relation Γ(n + 1) = n Γ(n).',
      'Show each step-down factor explicitly.',
      'Substitute Γ(1/2) = √π and simplify the fraction.',
    ],
    slip: 'Γ(n) for integer n is (n - 1)!, NOT n!. For example, Γ(4) = 3! = 6, not 24.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'GAMMA FUNCTION & CONTINUOUS FACTORIAL', 'ta') +
        L(30, 150, 200, 150, 'l') + L(30, 150, 30, 30, 'l') +
        P('M 35 40 Q 60 145, 100 135 T 190 35', 'l') +
        C(70, 137, 4, 'fa') + T(75, 135, 'Γ(1) = 0! = 1', 't') +
        C(110, 137, 4, 'fa') + T(115, 135, 'Γ(2) = 1! = 1', 't') +
        C(150, 110, 4, 'fa') + T(155, 105, 'Γ(3) = 2! = 2', 't') +
        T(215, 60, 'Γ(n+1) = n Γ(n)', 'ta') +
        T(215, 85, 'For integer n: Γ(n+1) = n!', 't') +
        T(215, 110, 'Γ(½) = √π', 'fa') +
        T(215, 135, 'Γ(5/2) = (3/2)(1/2)√π = 3√π/4', 'd')
      ),
      caption: 'Gamma function: smooth interpolation of the factorial function where Γ(n+1) = n! and Γ(1/2) = √π.',
    },
  },

  'math:3:8': {
    explain: [
      'An elliptic integral is an integral containing the square root of a cubic or quartic polynomial that cannot be evaluated in terms of elementary functions.',
      'They first arose when calculating the exact arc length of an ellipse and the exact period of a large-angle pendulum.',
      'They are classified into First, Second, and Third kinds in standard Legendre form.',
    ],
    definition: 'Complete Elliptic Integral of First Kind: K(k) = ∫_0^(π/2) dθ / √(1 − k² sin² θ). Second Kind: E(k) = ∫_0^(π/2) √(1 − k² sin² θ) dθ.',
    formula: 'K(k) = \\int_0^{\\pi/2} \\frac{d\\theta}{\\sqrt{1 - k^2 \\sin^2\\theta}}, \\quad E(k) = \\int_0^{\\pi/2} \\sqrt{1 - k^2 \\sin^2\\theta} \\, d\\theta',
    steps: [
      '1. Express the physical problem (arc length of ellipse x²/a² + y²/b² = 1 or pendulum motion).',
      '2. Set up the differential element ds = √(1 + (dy/dx)²) dx.',
      '3. Transform using trigonometric substitution x = a sin θ to isolate the radical √(1 − k² sin² θ).',
      '4. Express the solution in terms of standard Legendre elliptic integrals K(k) and E(k).',
    ],
    examAnswer: [
      'Write the integral setup and show the radical √(1 − k² sin² θ).',
      'State modulus k = e = √(1 − b²/a²).',
      'Write the final arc length as 4a E(k).',
    ],
    slip: 'Trying to integrate √(1 − k² sin² θ) with standard substitutions; it has no elementary antiderivative.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'ELLIPTIC INTEGRALS: ARC LENGTH & PENDULUM', 'ta') +
        C(100, 95, 60, 'd') +
        P('M 40 95 A 60 35 0 1 0 160 95 A 60 35 0 1 0 40 95', 'l') +
        T(100, 75, 'Ellipse', 'ta', 'middle') +
        T(100, 170, 'Perimeter = 4a E(k)', 'fa', 'middle') +
        T(180, 60, 'Cannot be solved by elementary', 't') +
        T(180, 80, 'functions; requires Legendre forms:', 't') +
        T(180, 105, 'K(k) = ∫ dθ / √(1 − k²sin²θ)', 'ta') +
        T(180, 130, 'E(k) = ∫ √(1 − k²sin²θ) dθ', 'ta')
      ),
      caption: 'Elliptic integrals: required for perimeter of ellipse and exact nonlinear pendulum periods.',
    },
  },

  'math:3:9': {
    explain: [
      'The relation B(m, n) = Γ(m)Γ(n) / Γ(m + n) bridges the Beta and Gamma functions.',
      'It converts difficult definite Beta integrals into simple factorial ratios.',
      'It allows rapid evaluation of trigonometric integrals of the form ∫_0^(π/2) sin^p θ cos^q θ dθ.',
    ],
    definition: 'B(m, n) = [Γ(m) · Γ(n)] / Γ(m + n). Consequently: ∫_0^(π/2) sin^p θ cos^q θ dθ = [Γ((p+1)/2) · Γ((q+1)/2)] / [2 · Γ((p+q+2)/2)].',
    formula: 'B(m, n) = \\frac{\\Gamma(m)\\Gamma(n)}{\\Gamma(m+n)}, \\quad \\int_0^{\\pi/2} \\sin^p\\theta \\cos^q\\theta \\, d\\theta = \\frac{\\Gamma(\\frac{p+1}{2})\\Gamma(\\frac{q+1}{2})}{2\\Gamma(\\frac{p+q+2}{2})}',
    steps: [
      '1. Express Γ(m) and Γ(n) as exponential integrals with variables x² and y².',
      '2. Multiply them to form a double integral in the first quadrant of the xy-plane.',
      '3. Transform to polar coordinates (x = r cos θ, y = r sin θ, dx dy = r dr dθ).',
      '4. Separate into an r-integral yielding Γ(m+n) and a θ-integral yielding 1/2 B(m, n).',
    ],
    examAnswer: [
      'State B(m, n) = Γ(m)Γ(n) / Γ(m+n).',
      'Identify p and q in the trigonometric integral.',
      'Substitute into the formula and evaluate using Γ(1/2) = √π and Γ(n+1) = n!.',
    ],
    slip: 'Forgetting the factor 2 in the denominator 2 · Γ((p+q+2)/2).',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'BETA–GAMMA FUNDAMENTAL CONNECTION', 'ta') +
        R(20, 36, 320, 50, 'fa') +
        T(180, 58, 'B(m, n) = Γ(m) · Γ(n) / Γ(m + n)', 'ta', 'middle') +
        T(180, 76, '∫₀^(π/2) sinᵖθ cos^qθ dθ = Γ((p+1)/2) Γ((q+1)/2) / [2 Γ((p+q+2)/2)]', 't', 'middle') +
        T(20, 115, 'Example: ∫₀^(π/2) sin⁴θ cos²θ dθ', 't') +
        T(40, 135, 'p = 4, q = 2 -> Γ(5/2) Γ(3/2) / [2 Γ(4)]', 'ta') +
        T(40, 155, '= (3√π/4)(√π/2) / [2 · 6] = π / 32', 'fa')
      ),
      caption: 'Beta–Gamma relation converts trigonometric power integrals directly into Gamma factorials.',
    },
  },

  // --- UNIT 4: Vector Calculus (7 Topics) ---
  'math:4:0': {
    explain: [
      'A scalar field assigns a single number to each point (like temperature T), while a vector field assigns an arrow (like wind velocity V).',
      'The gradient of a scalar field, ∇φ, produces a vector field that points in the direction of steepest uphill increase.',
      'The length of ∇φ is the maximum rate of change, and ∇φ is always perpendicular (normal) to the contour lines or level surfaces.',
    ],
    definition: 'Gradient: ∇φ = (∂φ/∂x) i + (∂φ/∂y) j + (∂φ/∂z) k. ∇φ is normal to the level surface φ(x,y,z) = c.',
    formula: '\\nabla \\phi = \\frac{\\partial \\phi}{\\partial x}\\mathbf{i} + \\frac{\\partial \\phi}{\\partial y}\\mathbf{j} + \\frac{\\partial \\phi}{\\partial z}\\mathbf{k}',
    steps: [
      '1. Compute partial derivatives ∂φ/∂x, ∂φ/∂y, ∂φ/∂z.',
      '2. Assemble the vector ∇φ = (∂φ/∂x) i + (∂φ/∂y) j + (∂φ/∂z) k.',
      '3. To find the unit normal vector n̂ to surface φ = c, compute n̂ = ∇φ / |∇φ|.',
      '4. Evaluate at the designated point P(x, y, z).',
    ],
    examAnswer: [
      'Write ∇φ with partial derivatives evaluated at the given point.',
      'State: "∇φ is orthogonal to the level surface φ = c."',
      'Compute unit normal n̂ = ∇φ / |∇φ| if asked.',
    ],
    slip: 'Gradient turns a scalar into a vector; do NOT write a dot or cross product when applying ∇ to scalar φ.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'GRADIENT ∇φ IS PERPENDICULAR TO CONTOURS', 'ta') +
        P('M 40 140 C 90 90, 180 80, 260 120', 'l') + T(265, 120, 'φ = c₁', 't') +
        P('M 40 100 C 90 50, 180 40, 260 80', 'l') + T(265, 80, 'φ = c₂', 't') +
        C(130, 72, 4, 'fa') + T(135, 85, 'P', 't') +
        LA(130, 72, 105, 25) + T(80, 25, '∇φ (steepest uphill)', 'ta') +
        L(122, 60, 134, 55, 'l') + L(134, 55, 139, 66, 'l') +
        T(20, 165, '• Direction: Maximum rate of increase', 't') +
        T(20, 180, '• Magnitude |∇φ|: Maximum slope', 'd')
      ),
      caption: 'Gradient ∇φ points in the direction of steepest increase and is strictly perpendicular to contour curves.',
    },
  },

  'math:4:1': {
    explain: [
      'Divergence ∇ · F measures whether a vector field is expanding outward like a faucet (positive div) or draining inward like a sink (negative div).',
      'Curl ∇ × F measures whether a tiny paddle-wheel placed in the field would spin; its direction is the axis of rotation.',
      'A field with ∇ · F = 0 is solenoidal (incompressible); a field with ∇ × F = 0 is irrotational (conservative).',
    ],
    definition: 'Divergence: ∇ · F = ∂F_1/∂x + ∂F_2/∂y + ∂F_3/∂z. Curl: ∇ × F = det([i j k; ∂/∂x ∂/∂y ∂/∂z; F_1 F_2 F_3]). Solenoidal iff ∇ · F = 0; Irrotational iff ∇ × F = 0.',
    formula: '\\nabla \\cdot \\mathbf{F} = \\frac{\\partial F_1}{\\partial x} + \\frac{\\partial F_2}{\\partial y} + \\frac{\\partial F_3}{\\partial z}, \\quad \\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ F_1 & F_2 & F_3 \\end{vmatrix}',
    steps: [
      '1. Compute divergence ∇ · F by summing partial derivatives ∂F_1/∂x + ∂F_2/∂y + ∂F_3/∂z.',
      '2. If ∇ · F = 0, state: "Field F is solenoidal."',
      '3. Compute curl ∇ × F using the 3x3 determinant.',
      '4. If ∇ × F = 0, state: "Field F is irrotational and conservative (F = ∇φ)."',
    ],
    examAnswer: [
      'Show ∇ · F calculation clearly; state "solenoidal" if 0.',
      'Show 3x3 determinant expansion for ∇ × F; state "irrotational" if 0.',
      'If irrotational, find scalar potential φ such that F = ∇φ.',
    ],
    slip: 'Divergence produces a scalar; Curl produces a vector. Never confuse their dot and cross notation.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'PHYSICAL MEANING: DIVERGENCE & CURL', 'ta') +
        C(70, 95, 25, 'fa') +
        LA(70, 95, 110, 95) + LA(70, 95, 30, 95) + LA(70, 95, 70, 55) + LA(70, 95, 70, 135) +
        T(70, 155, '∇ · F > 0 (Source / Tap)', 'ta', 'middle') +
        C(230, 95, 35, 'd') +
        P('M 210 65 A 30 30 0 0 1 255 75', 'a') +
        P('M 255 115 A 30 30 0 0 1 210 125', 'a') +
        L(205, 95, 255, 95, 'l') + L(230, 70, 230, 120, 'l') +
        T(230, 155, '∇ × F ≠ 0 (Paddle-wheel spins)', 'fa', 'middle')
      ),
      caption: 'Divergence measures outward flux expansion from a point; curl measures paddle-wheel vortex circulation.',
    },
  },

  'math:4:2': {
    explain: [
      'The directional derivative measures the rate of change of a scalar function φ when moving in the direction of an arbitrary unit vector u.',
      'It is computed as the dot product: D_u φ = ∇φ · u.',
      'It is maximized when moving directly parallel to the gradient u = ∇φ / |∇φ|, where the slope equals |∇φ|.',
    ],
    definition: 'Directional derivative of φ in direction a is D_a φ = ∇φ · â, where â = a / |a| is the unit direction vector.',
    formula: 'D_{\\hat{u}} \\phi = \\nabla \\phi \\cdot \\hat{\\mathbf{u}} = |\\nabla \\phi| \\cos\\theta',
    steps: [
      '1. Compute the gradient vector ∇φ at the point P.',
      '2. Convert the given direction vector a into a unit vector: â = a / |a|.',
      '3. Calculate the dot product D_a φ = ∇φ · â.',
      '4. Maximum directional derivative equals |∇φ|, occurring in the direction of ∇φ.',
    ],
    examAnswer: [
      'Calculate ∇φ and evaluate at point P.',
      'Normalize the direction vector: â = a / |a|.',
      'Show the dot product calculation ∇φ · â.',
    ],
    slip: 'Forgetting to normalize the direction vector a into a unit vector â before taking the dot product.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'DIRECTIONAL DERIVATIVE: D_u φ = ∇φ · û', 'ta') +
        C(80, 110, 4, 'fa') + T(75, 125, 'Point P', 't') +
        LA(80, 110, 170, 50) + T(175, 45, '∇φ (steepest)', 'ta') +
        LA(80, 110, 180, 110) + T(185, 115, 'û (chosen direction)', 't') +
        P('M 120 110 A 40 40 0 0 0 115 85', 'd') + T(130, 95, 'θ', 'ta') +
        T(20, 160, '• D_û φ = |∇φ| cos θ', 't') +
        T(20, 175, '• Maximum slope = |∇φ| when θ = 0 (along gradient)', 'fa')
      ),
      caption: 'Directional derivative: projection of the gradient vector onto the unit direction vector (∇φ · û).',
    },
  },

  'math:4:3': {
    explain: [
      'A line integral ∫_C F · dr computes work done by a vector force moving along curve C.',
      'A surface integral ∬_S F · n̂ dS calculates the total outward flux of fluid or electromagnetic field flowing through surface S.',
      'A volume integral ∭_V ρ dV integrates density over a solid volume to compute total mass or charge.',
    ],
    definition: 'Line: ∫_C F · dr = ∫ (F_1 dx + F_2 dy + F_3 dz). Surface flux: ∬_S F · n̂ dS. Volume: ∭_V f dV.',
    formula: 'W = \\int_C \\mathbf{F} \\cdot d\\mathbf{r}, \\quad \\Phi = \\iint_S \\mathbf{F} \\cdot \\hat{\\mathbf{n}} \\, dS, \\quad M = \\iiint_V \\rho \\, dV',
    steps: [
      '1. For line integrals, parameterize the curve r(t) = [x(t), y(t), z(t)] and compute dr = r\'(t) dt.',
      '2. Substitute into ∫ F(r(t)) · r\'(t) dt and integrate over [t_1, t_2].',
      '3. For surface integrals, find the unit normal n̂ = ∇g / |∇g| and project dS = dx dy / |n̂ · k|.',
      '4. Evaluate the resulting 2D double integral.',
    ],
    examAnswer: [
      'Parameterize the curve or surface explicitly.',
      'Substitute parameter equations into F and the differential element.',
      'Evaluate the integral from initial parameter value to final parameter value.',
    ],
    slip: 'Direction of line integration matters: reversing the path from B to A changes the sign of the work integral.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'LINE, SURFACE & VOLUME INTEGRALS', 'ta') +
        P('M 30 130 C 60 70, 90 120, 120 80', 'l') +
        LA(70, 95, 90, 80) + T(80, 70, 'F', 'ta') +
        T(65, 145, '1. Line ∫ F·dr (Work)', 't', 'middle') +
        R(150, 60, 60, 50, 'fa') +
        LA(180, 85, 180, 45) + T(185, 45, 'n̂', 'ta') +
        T(180, 145, '2. Surface ∬ F·n̂ dS (Flux)', 'ta', 'middle') +
        R(260, 65, 50, 45, 'l') +
        L(260, 65, 275, 50, 'd') + L(310, 65, 325, 50, 'd') + L(310, 110, 325, 95, 'd') +
        L(275, 50, 325, 50, 'd') + L(325, 50, 325, 95, 'd') +
        T(290, 145, '3. Volume ∭ dV', 'd', 'middle')
      ),
      caption: 'Hierarchy of integration: 1D work along a path, 2D flux across a surface, 3D accumulation in a volume.',
    },
  },

  'math:4:4': {
    explain: [
      'Green’s Theorem relates a line integral around a closed 2D boundary curve C to a double integral over the enclosed area R.',
      'Circulation around the perimeter equals the sum of microscopic rotational swirls inside the area.',
      'It is the 2D version of Stokes’ Theorem and simplifies work integrals around closed loops.',
    ],
    definition: '∮_C (M dx + N dy) = ∬_R (∂N/∂x − ∂M/∂y) dA, where C is traversed counterclockwise.',
    formula: '\\oint_C (M \\, dx + N \\, dy) = \\iint_R \\left( \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} \\right) dA',
    steps: [
      '1. Identify M(x, y) and N(x, y) from the line integral ∮ (M dx + N dy).',
      '2. Compute partial derivatives ∂N/∂x and ∂M/∂y.',
      '3. Form the difference (∂N/∂x - ∂M/∂y).',
      '4. Set up limits for the double integral over the 2D region R and evaluate.',
    ],
    examAnswer: [
      'To verify: compute LHS line integral along each boundary segment separately and sum them.',
      'Compute RHS double integral ∬ (∂N/∂x - ∂M/∂y) dA.',
      'Show LHS = RHS and conclude: "Hence Green’s theorem is verified."',
    ],
    slip: 'The formula has ∂N/∂x FIRST, then minus ∂M/∂y; reversing them flips the sign of the answer.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'GREEN’S THEOREM IN THE PLANE', 'ta') +
        P('M 70 140 C 40 80, 110 40, 170 70 C 220 100, 180 150, 110 150 Z', 'fa') +
        LA(80, 60, 120, 50) + LA(195, 110, 165, 140) +
        T(115, 100, '∬ (∂N/∂x − ∂M/∂y) dA', 'ta', 'middle') +
        T(180, 45, 'Boundary loop C (∮)', 't') +
        T(20, 175, '∮_C (M dx + N dy) = ∬_R (∂N/∂x − ∂M/∂y) dA', 'fa')
      ),
      caption: 'Green’s Theorem: counterclockwise circulation around boundary C equals net vorticity over region R.',
    },
  },

  'math:4:5': {
    explain: [
      'Stokes’ Theorem relates the circulation of a vector field around any 3D closed loop C to the surface integral of its curl over any open surface S bounded by C.',
      'It shows that line circulation depends only on the perimeter loop, regardless of which "soap bubble" surface S caps the loop.',
      'If curl ∇ × F = 0 everywhere, the line integral around every closed loop is zero, proving the field is conservative.',
    ],
    definition: '∮_C F · dr = ∬_S (∇ × F) · n̂ dS, where C is the boundary curve of open surface S oriented by the right-hand rule.',
    formula: '\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\hat{\\mathbf{n}} \\, dS',
    steps: [
      '1. Compute curl ∇ × F using the determinant.',
      '2. Determine the unit normal vector n̂ to the surface S.',
      '3. Compute dot product (∇ × F) · n̂.',
      '4. Project dS onto a coordinate plane and evaluate the double integral.',
    ],
    examAnswer: [
      'To verify: compute LHS line integral ∮ F · dr along boundary C.',
      'Compute RHS surface integral ∬ (∇ × F) · n̂ dS.',
      'Compare LHS and RHS values and state: "LHS = RHS, hence Stokes’ Theorem is verified."',
    ],
    slip: 'The boundary loop C must be oriented using the right-hand rule with respect to the chosen normal n̂.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'STOKES’ THEOREM: LOOP TO SURFACE CURL', 'ta') +
        P('M 50 120 C 70 60, 170 50, 210 100', 'l') +
        P('M 50 120 C 90 145, 170 140, 210 100', 'd') +
        P('M 60 115 C 80 50, 160 40, 200 95 C 160 130, 90 135, 60 115 Z', 'fa') +
        LA(80, 65, 130, 52) + T(135, 48, 'Loop C', 'ta') +
        LA(130, 90, 130, 40) + T(135, 38, 'n̂', 't') +
        T(130, 105, '∬ (∇ × F) · n̂ dS', 'ta', 'middle') +
        T(20, 175, '∮_C F · dr = ∬_S (∇ × F) · n̂ dS', 'fa')
      ),
      caption: 'Stokes’ theorem: circulation around boundary loop C equals total curl flux through any capping surface S.',
    },
  },

  'math:4:6': {
    explain: [
      'Gauss’ Divergence Theorem relates the total outward flux of a vector field through a closed 3D surface S to the volume integral of divergence inside V.',
      'It states that the net amount of fluid or electric field bursting out through a closed balloon equals the sum of all sources inside the balloon.',
      'It converts difficult curved 2D surface flux integrals into straightforward 3D volume integrals.',
    ],
    definition: '∯_S F · n̂ dS = ∭_V (∇ · F) dV, where S is a closed surface enclosing volume V and n̂ is the outward unit normal.',
    formula: '\\oiint_S \\mathbf{F} \\cdot \\hat{\\mathbf{n}} \\, dS = \\iiint_V (\\nabla \\cdot \\mathbf{F}) \\, dV',
    steps: [
      '1. Compute divergence ∇ · F = ∂F_1/∂x + ∂F_2/∂y + ∂F_3/∂z.',
      '2. If ∇ · F is constant, the RHS volume integral is simply (∇ · F) × Volume(V).',
      '3. To evaluate LHS directly: calculate flux ∬ F · n̂ dS over each face of the closed surface and sum them.',
      '4. Show that total surface flux equals the volume integral.',
    ],
    examAnswer: [
      'To verify: compute outward flux across every face (top, bottom, sides) and sum them to obtain LHS.',
      'Compute RHS ∭ (∇ · F) dV using volume limits.',
      'Show LHS = RHS and conclude: "Hence Gauss Divergence Theorem is verified."',
    ],
    slip: 'The normal n̂ must point OUTWARD on every surface; pointing inward flips the flux sign.',
    diagram: {
      svg: S(360, 190,
        T(8, 16, 'GAUSS DIVERGENCE THEOREM: FLUX TO VOLUME', 'ta') +
        R(50, 55, 90, 80, 'fa') +
        LA(95, 55, 95, 25) + LA(95, 135, 95, 165) +
        LA(50, 95, 20, 95) + LA(140, 95, 170, 95) +
        T(95, 95, '∭ (∇ · F) dV', 'ta', 'middle') +
        T(180, 75, 'Total outward flux', 't') +
        T(180, 95, 'through closed skin S', 'ta') +
        T(180, 115, '= net volume source', 't') +
        T(20, 180, '∯_S F · n̂ dS = ∭_V (∇ · F) dV', 'fa')
      ),
      caption: 'Gauss Divergence Theorem: total outward surface flux equals the volume accumulation of divergence.',
    },
  },
};

export const getTopicContent = (subjectId: string, unitIndex: number, topicIndex: number): TopicContent | undefined => {
  return TOPIC_CONTENT[`${subjectId}:${unitIndex}:${topicIndex}`];
};

export const getUnitStory = (subjectId: string, unitIndex: number): UnitStory | undefined => {
  return UNIT_STORIES[`${subjectId}:${unitIndex}`];
};
