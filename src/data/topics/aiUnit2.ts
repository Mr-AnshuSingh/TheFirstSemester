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

/* ---------- AI UNIT 2 TOPIC CONTENT (8 Topics) ---------- */
export const AI_UNIT2_TOPICS: Record<string, TopicContent> = {
  'ai:2:0': {
    explain: [
      'Knowledge Representation and Reasoning formalizes domain facts into computational symbols so inference algorithms can deduce new truths.',
      'Propositional logic is the fundamental declarative language based on Boolean atomic propositions connected by logical operators, governed by truth table semantics and model entailment.',
    ],
    definition:
      'Propositional Logic is a monotonic, declarative knowledge representation language where atomic propositions represent true/false facts connected by Boolean operators, with logical consequence governed by model entailment.',
    formula: 'KB \\models \\alpha \\iff M(KB) \\subseteq M(\\alpha) \\iff (KB \\land \\neg \\alpha) \\text{ is unsatisfiable}',
    steps: [
      'Syntax: Proposition symbols P, Q, R... connected by \\neg, \\land, \\lor, \\implies, \\iff.',
      'Truth Table Semantics: P \\implies Q \\equiv \\neg P \\lor Q; P \\iff Q \\equiv (P \\implies Q) \\land (Q \\implies P).',
      'Model Checking: Truth-table enumeration enumerates all 2^n valuations. Sound and complete, but O(2^n) exponential.',
      'Soundness: An inference algorithm \\vdash is sound if whenever KB \\vdash \\alpha, KB \\models \\alpha.',
      'Completeness: An inference algorithm \\vdash is complete if whenever KB \\models \\alpha, KB \\vdash \\alpha.',
    ],
    examAnswer: [
      'Define Knowledge Base, Entailment (KB |= alpha), Soundness, and Completeness.',
      'Write the truth table definition of implication P => Q (false only when P is true and Q is false).',
      'Define Valid sentence (tautology), Satisfiable sentence, and Unsatisfiable sentence.',
      'State the deduction theorem: KB |= alpha if and only if (KB => alpha) is valid.',
    ],
    slip: 'Do not confuse implication (=>, a connective inside a sentence) with entailment (|=, a meta-mathematical relation between sentences).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'ENTAILMENT: KB |= alpha  [M(KB) subset M(alpha)]', 'ta') +
          R(30, 36, 300, 120) +
          T(40, 52, 'All Possible Models (2^n)', 't') +
          C(200, 96, 48, 'fa') +
          T(200, 68, 'Models of alpha', 'ta', 'middle') +
          C(200, 105, 24) +
          T(200, 108, 'M(KB)', 't', 'middle') +
          T(180, 178, 'KB |= alpha means alpha is true in EVERY model where KB is true!', 'ta', 'middle')
      ),
      caption: 'Logical Entailment: M(KB) is a subset of M(\\alpha).',
    },
  },

  'ai:2:1': {
    explain: [
      'Resolution is an elegant, sound, and refutation-complete inference algorithm for propositional logic.',
      'To prove KB |= alpha, resolution converts KB and ~alpha into Conjunctive Normal Form (CNF) and repeatedly resolves complementary literals until deriving the empty clause (contradiction).',
    ],
    definition:
      'Resolution is a rule of inference that yields a sound and refutation-complete proof system by iteratively canceling complementary literals from clauses in Conjunctive Normal Form until an empty contradiction (⊥) is produced.',
    formula: '\\frac{l_1 \\lor \\dots \\lor l_k, \\quad m_1 \\lor \\dots \\lor m_n}{l_1 \\lor \\dots \\lor l_{i-1} \\lor l_{i+1} \\lor \\dots \\lor l_k \\lor m_1 \\lor \\dots \\lor m_{j-1} \\lor m_{j+1} \\lor \\dots \\lor m_n} \\quad (l_i \\equiv \\neg m_j)',
    steps: [
      'Step 1: Eliminate \\iff: (A \\iff B) \\to (A \\implies B) \\land (B \\implies A).',
      'Step 2: Eliminate \\implies: (A \\implies B) \\to (\\neg A \\lor B).',
      'Step 3: De Morgan’s Laws: move \\neg inward; eliminate double negation \\neg\\neg A \\to A.',
      'Step 4: Distribute \\lor over \\land: (A \\lor (B \\land C)) \\to (A \\lor B) \\land (A \\lor C).',
      'Step 5 (Refutation): Add \\neg \\alpha to the clause set. Pair complementary literals until deriving empty clause ⊥.',
    ],
    examAnswer: [
      'State the resolution inference rule precisely with complementary literals.',
      'List the 4 algorithmic steps to convert any proposition into Conjunctive Normal Form (CNF).',
      'State the proof-by-refutation principle: To prove KB |= alpha, show KB and ~alpha is unsatisfiable.',
      'Perform a complete step-by-step resolution refutation derivation on paper until reaching empty clause ⊥.',
    ],
    slip: 'Do not forget to negate the goal before adding it to the clause set! Resolving KB directly without negating the goal does not constitute a refutation proof.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'RESOLUTION REFUTATION TREE', 'ta') +
          R(20, 36, 80, 24) +
          T(60, 52, 'P v Q', 't', 'middle') +
          R(120, 36, 80, 24) +
          T(160, 52, '~P v R', 't', 'middle') +
          L(60, 60, 110, 84) +
          L(160, 60, 110, 84) +
          R(70, 84, 80, 24) +
          T(110, 100, 'Q v R', 'ta', 'middle') +
          R(240, 84, 80, 24) +
          T(280, 100, '~Q v R', 't', 'middle') +
          L(110, 108, 195, 132) +
          L(280, 108, 195, 132) +
          R(160, 132, 70, 24) +
          T(195, 148, 'R', 'ta', 'middle') +
          R(280, 132, 70, 24) +
          T(315, 148, '~R (neg goal)', 't', 'middle') +
          L(195, 156, 255, 172) +
          L(315, 156, 255, 172) +
          R(240, 168, 30, 18, 'fa') +
          T(255, 181, '[]', 'ta', 'middle')
      ),
      caption: 'Resolution Refutation tree deriving empty clause (contradiction).',
    },
  },

  'ai:2:2': {
    explain: [
      'First-Order Predicate Logic (FOL) overcomes propositional logic’s inability to scale to domains with objects and relations.',
      'It represents the world using Objects (constants/terms), Relations (predicates), Functions, and Quantifiers (Universal ∀ and Existential ∃).',
    ],
    definition:
      'First-Order Predicate Logic (FOL) is a formal expressive language that extends propositional logic with predicates representing relationships over domain objects, quantified universally (\\forall) or existentially (\\exists).',
    formula: '\\forall x, [P(x) \\implies Q(x)] \\quad \\text{vs} \\quad \\exists x, [P(x) \\land Q(x)]',
    steps: [
      'Term: A logical expression that refers to an object (constant, variable, or function applied to terms).',
      'Atomic Sentence: Formed from a predicate symbol applied to a tuple of terms: Predicate(term_1, ..., term_n).',
      'Universal Quantification: \\forall x P(x) is equivalent to P(obj_1) \\land P(obj_2) \\land \\dots for all objects.',
      'Existential Quantification: \\exists x P(x) is equivalent to P(obj_1) \\lor P(obj_2) \\lor \\dots for all objects.',
      'Classic Mistake: Pairing \\forall with \\land asserts that EVERY object in the universe satisfies both sides (rocks and chairs included).',
    ],
    examAnswer: [
      'Enumerate all syntactic elements of FOL: Constants, Variables, Predicates, Functions, Connectives, Quantifiers.',
      'Explain why Universal quantifier pairs with implication and Existential quantifier pairs with conjunction.',
      'Translate English sentences into FOL: e.g. "Every student loves some subject" -> \\forall x (Student(x) => \\exists y (Subject(y) & Loves(x,y))).',
      'State the duality equivalence relations between \\forall and \\exists under negation.',
    ],
    slip: 'Never pair \\forall with \\land unless you explicitly intend that every single entity in the universe satisfies the premise; never pair \\exists with \\implies because false premises make implications vacuously true.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'FIRST-ORDER LOGIC QUANTIFIERS & PAIRINGS', 'ta') +
          R(20, 36, 150, 60) +
          T(95, 54, 'Universal (\\forall)', 't', 'middle') +
          T(95, 72, 'Pairs with \\implies', 'ta', 'middle') +
          T(95, 86, '\\forall x, Dog(x) => Mammal(x)', 't', 'middle') +
          R(190, 36, 150, 60) +
          T(265, 54, 'Existential (\\exists)', 't', 'middle') +
          T(265, 72, 'Pairs with \\land', 'ta', 'middle') +
          T(265, 86, '\\exists x, Dog(x) & White(x)', 't', 'middle') +
          R(20, 110, 320, 40) +
          T(30, 126, 'Duality:', 'ta') +
          T(85, 126, '~\\forall x P(x)  ==  \\exists x ~P(x)', 't') +
          T(85, 142, '~\\exists x P(x)  ==  \\forall x ~P(x)', 't') +
          T(180, 178, 'Quantifier order matters: \\forall x \\exists y Loves(x,y) != \\exists y \\forall x Loves(x,y)', 'ta', 'middle')
      ),
      caption: 'First-Order Logic quantifier pairing conventions and duality rules.',
    },
  },

  'ai:2:3': {
    explain: [
      'Forward Chaining is a data-driven, bottom-up inference algorithm for Definite Horn Clauses.',
      'Starting from known ground facts, it matches rule premises, fires satisfied rules to infer conclusions, adds new conclusions to the knowledge base, and repeats until the target goal is derived.',
    ],
    definition:
      'Forward Chaining is an inference algorithm that applies Modus Ponens iteratively to Horn clauses in a data-driven manner, accumulating new inferred facts until no more rules can fire or the query is established.',
    formula: '\\text{Modus Ponens: } \\frac{\\alpha_1, \\quad \\dots, \\quad \\alpha_n, \\quad \\alpha_1 \\land \\dots \\land \\alpha_n \\implies \\beta}{\\beta}',
    steps: [
      'Count Initialization: For every rule, initialize count to number of premises.',
      'Queue of Facts: Enqueue all known initial atomic facts.',
      'Loop: Pop fact p. If p == goal, return true. Otherwise decrement premise counts of rules where p appears.',
      'Fire Rule: If premise count reaches 0, infer conclusion and add to queue.',
      'Linear Time: Sound and complete for propositional Horn KBs in O(size of KB).',
    ],
    examAnswer: [
      'Define Definite Horn Clause: Clause with exactly one positive literal ((P & Q) => R).',
      'State the generalized Modus Ponens rule of inference.',
      'Explain the forward chaining algorithm with premise counters.',
      'Trace an assigned KB given ground facts step by step, showing queue contents and newly derived facts.',
    ],
    slip: 'Do not use forward chaining when you only have a specific query in a huge KB; forward chaining derives every possible fact, generating vast irrelevant knowledge.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'FORWARD CHAINING (DATA-DRIVEN HORN INFERENCE)', 'ta') +
          R(20, 36, 90, 40) +
          T(65, 52, 'Facts Base', 't', 'middle') +
          T(65, 68, '{A, B}', 'ta', 'middle') +
          LA(110, 56, 150, 56, 'a') +
          R(150, 36, 100, 40) +
          T(200, 52, 'Rule Match', 't', 'middle') +
          T(200, 68, 'A & B => C', 'ta', 'middle') +
          LA(250, 56, 280, 56, 'a') +
          R(280, 36, 60, 40) +
          T(310, 60, 'Infer C', 'ta', 'middle') +
          LA(310, 76, 310, 106, 'a') +
          R(220, 106, 120, 40) +
          T(280, 122, 'Rule Match 2', 't', 'middle') +
          T(280, 138, 'C => Goal Q', 'ta', 'middle') +
          LA(220, 126, 140, 126, 'a') +
          R(40, 106, 100, 40, 'fa') +
          T(90, 128, 'GOAL DERIVED!', 't', 'middle') +
          T(180, 178, 'Linear Time O(n) · Bottom-Up Data Driven', 'ta', 'middle')
      ),
      caption: 'Forward chaining pipeline: Fact matching, rule firing, and goal derivation.',
    },
  },

  'ai:2:4': {
    explain: [
      'Backward Chaining is a goal-driven, top-down inference algorithm for Horn clauses.',
      'Starting from the query goal, it finds rules whose conclusions match the goal, and recursively establishes the premises of those rules as sub-goals.',
    ],
    definition:
      'Backward Chaining is a goal-directed recursive search algorithm that proves a target query by matching it against rule heads and recursively proving the required antecedents as sub-goals.',
    formula: '\\text{Query } Q \\longrightarrow \\text{Find rule: } (P_1 \\land \\dots \\land P_k \\implies Q) \\longrightarrow \\text{Prove subgoals } P_1, \\dots, P_k',
    steps: [
      'Algorithm: If goal is in known facts, return true.',
      'Find all rules whose conclusion matches goal: premise_1 & ... & premise_k => goal.',
      'Recursively prove each premise: call BC(KB, premise_i).',
      'If all premises hold, return true (goal proved).',
      'Goal-directed efficiency: Only touches rules causally relevant to the query; ignores irrelevant branches.',
    ],
    examAnswer: [
      'Define Backward Chaining as a goal-directed, top-down inference procedure.',
      'Compare Forward vs Backward Chaining: Forward is data-driven (good for monitoring), Backward is goal-driven (good for diagnosis and query-answering).',
      'Illustrate with a query decomposition tree showing sub-goals and base fact matching.',
      'Explain how memoization (caching) prevents repeating redundant proofs in backward chaining.',
    ],
    slip: 'Beware of cyclic rules: A => B and B => A can cause infinite loops in naive backward chaining without an explored goal stack.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'BACKWARD CHAINING (GOAL-DRIVEN TOP-DOWN)', 'ta') +
          R(130, 26, 100, 30, 'fa') +
          T(180, 44, 'Goal: Q ?', 't', 'middle') +
          LA(180, 56, 180, 80, 'a') +
          R(110, 80, 140, 26) +
          T(180, 96, 'Rule: C & D => Q', 'ta', 'middle') +
          LA(140, 106, 90, 130, 'a') +
          LA(220, 106, 270, 130, 'a') +
          R(40, 130, 100, 26) +
          T(90, 146, 'Subgoal: C ?', 't', 'middle') +
          R(220, 130, 100, 26) +
          T(270, 146, 'Subgoal: D ?', 't', 'middle') +
          T(90, 172, 'Fact: C (OK)', 'ta', 'middle') +
          T(270, 172, 'Fact: D (OK)', 'ta', 'middle') +
          T(180, 184, 'Recursively proves premises -> Goal Q is TRUE', 'ta', 'middle')
      ),
      caption: 'Backward chaining goal tree decomposing query into sub-goals.',
    },
  },

  'ai:2:5': {
    explain: [
      'Resolution in First-Order Logic generalizes propositional resolution by incorporating Unification—finding variable substitutions that make different logical expressions identical.',
      'First-order sentences are converted to CNF via Skolemization before resolving.',
    ],
    definition:
      'First-Order Resolution is a refutation-complete inference procedure that applies Most General Unifiers (MGU) to align differing predicate arguments, canceling complementary literals in Skolemized CNF clauses.',
    formula: '\\text{UNIFY}(P(x, g(x)), P(A, y)) = \\{x / A, \\; y / g(A)\\}',
    steps: [
      'Step 1: Eliminate implications: \\alpha \\implies \\beta \\to \\neg \\alpha \\lor \\beta.',
      'Step 2: Move \\neg inward (De Morgan for quantifiers).',
      'Step 3: Standardize variables apart across quantifiers.',
      'Step 4: Skolemize: Replace existential variables with Skolem functions of enclosing universal variables.',
      'Step 5: Drop universal quantifiers and distribute \\lor over \\land to obtain clauses; resolve using UNIFY.',
    ],
    examAnswer: [
      'Define Unification and the Most General Unifier (MGU).',
      'Explain the "Occurs Check" problem in unification.',
      'Define Skolemization: Explain when to use a Skolem constant vs a Skolem function.',
      'Demonstrate First-Order Resolution on a 2-clause example, showing substitution theta and the derived resolvent.',
    ],
    slip: 'Never introduce a Skolem constant when an existential quantifier is within the scope of a universal quantifier; you MUST use a Skolem function f(x) that captures the dependency on the universal variable.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'FIRST-ORDER LOGIC RESOLUTION & UNIFICATION', 'ta') +
          R(20, 36, 140, 32) +
          T(90, 56, 'Knows(John, x)', 't', 'middle') +
          R(200, 36, 140, 32) +
          T(270, 56, '~Knows(y, Jane) v Likes(y, Jane)', 't', 'middle') +
          L(90, 68, 180, 100) +
          L(270, 68, 180, 100) +
          R(80, 100, 200, 34, 'fa') +
          T(180, 116, 'UNIFY: {y / John, x / Jane}', 'ta', 'middle') +
          T(180, 128, 'MGU theta substitution', 't', 'middle') +
          LA(180, 134, 180, 154, 'a') +
          R(100, 154, 160, 26) +
          T(180, 170, 'Resolvent: Likes(John, Jane)', 'ta', 'middle')
      ),
      caption: 'First-Order Unification and Resolution cancelling complementary literals.',
    },
  },

  'ai:2:6': {
    explain: [
      'Semantic Networks and Frames are graph-based, object-centered knowledge representation formalisms that organize concepts taxonomically.',
      'They enable efficient property inheritance along IS-A and HAS-A relational hierarchies.',
    ],
    definition:
      'Semantic Networks represent knowledge as directed graphs of conceptual nodes linked by relational arcs. Frames represent structured concepts via collections of slot-filler pairs with built-in taxonomic inheritance and procedural demons.',
    formula: '\\text{Inheritance: } C \\xrightarrow{\\text{IS-A}} B \\xrightarrow{\\text{IS-A}} A \\implies \\text{Properties}(A) \\subseteq \\text{Properties}(C)',
    steps: [
      'Nodes: Represent concepts, generic classes, or individual instances (tokens).',
      'Arcs: Represent binary predicates (e.g. CanFly(Bird), Color(Canary, Yellow)).',
      'Inheritance Algorithm: Recursively search up the IS-A hierarchy until property is found.',
      'Default Overrides: Local properties take precedence over inherited generalities (e.g. Penguin -> CanFly: False).',
      'Frames: Collections of slots and fillers with procedural triggers (if-needed, if-added demons).',
    ],
    examAnswer: [
      'Define Semantic Networks (nodes and labeled edges) and Frames (slots and fillers).',
      'Explain property inheritance along IS-A links.',
      'Illustrate default reasoning and exception overrides (e.g. Birds fly, but Penguins do not).',
      'Explain procedural attachments in frames: if-needed and if-added demons.',
    ],
    slip: 'Do not use semantic networks for complex quantification; semantic networks handle unary and binary relationships well, but struggle to represent disjunction (A or B) and general first-order quantifiers.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'SEMANTIC NETWORK (IS-A INHERITANCE)', 'ta') +
          R(130, 26, 100, 26) +
          T(180, 42, 'Animal', 't', 'middle') +
          T(240, 42, 'Alive: True', 'ta') +
          LA(180, 52, 180, 80, 'a') +
          T(195, 68, 'IS-A', 't') +
          R(130, 80, 100, 26) +
          T(180, 96, 'Bird', 't', 'middle') +
          T(240, 96, 'Wings: 2, CanFly: Yes', 'ta') +
          LA(150, 106, 80, 134, 'a') +
          T(95, 122, 'IS-A', 't') +
          LA(210, 106, 280, 134, 'a') +
          T(260, 122, 'IS-A', 't') +
          R(30, 134, 100, 30) +
          T(80, 150, 'Robin', 't', 'middle') +
          T(80, 160, '(CanFly=Yes)', 'ta', 'middle') +
          R(230, 134, 100, 30) +
          T(280, 150, 'Penguin', 't', 'middle') +
          T(280, 160, '(CanFly=No override)', 'ta', 'middle') +
          T(180, 182, 'Inheritance travels upward; local overrides take precedence', 'ta', 'middle')
      ),
      caption: 'Semantic Network showing taxonomic IS-A inheritance and property propagation.',
    },
  },

  'ai:2:7': {
    explain: [
      'A Rule-Based (Production) System is an expert system architecture consisting of a set of IF-THEN production rules, a Working Memory of current facts, and an Inference Engine.',
      'It executes a continuous Match-Resolve-Act cycle over dynamic working memory.',
    ],
    definition:
      'A Rule-Based Production System is a cognitive computational model that represents domain expertise through condition-action production rules, executing an automated Match-Resolve-Act cycle over a dynamic Working Memory.',
    formula: '\\text{Cycle: } \\text{Working Memory} \\xrightarrow{\\text{Match}} \\text{Conflict Set} \\xrightarrow{\\text{Resolve}} \\text{Fire Rule} \\xrightarrow{\\text{Act}} \\Delta(\\text{Working Memory})',
    steps: [
      'Working Memory (WM): Stores known facts, assertions, and current problem state.',
      'Match Phase: Evaluates rule LHS conditions against WM to generate Conflict Set.',
      'Conflict Resolution: Chooses a single winning rule using strategies like Refractoriness, Recency, Specificity, or Priority.',
      'Act Phase: Executes RHS actions: asserts new facts, retracts obsolete facts, or performs actions.',
      'RETE Algorithm: Compiles rule conditions into a discrimination network, eliminating redundant pattern evaluations.',
    ],
    examAnswer: [
      'Draw the complete architectural diagram: Working Memory, Rule Base, Inference Engine.',
      'Detail the 3 steps of the Recognize-Act cycle: Match, Conflict Resolution, Act.',
      'List and define 4 conflict resolution strategies: Refractoriness, Recency, Specificity, Rule Priority.',
      'Mention the RETE algorithm as the standard optimization for multi-pattern multi-object matching.',
    ],
    slip: 'Do not confuse the Rule Base (static long-term domain rules) with the Working Memory (dynamic short-term facts that change on every cycle).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'PRODUCTION SYSTEM ARCHITECTURE (MATCH-RESOLVE-ACT)', 'ta') +
          R(20, 36, 100, 50) +
          T(70, 56, 'Working Memory', 't', 'middle') +
          T(70, 72, '(Dynamic Facts)', 'ta', 'middle') +
          R(240, 36, 100, 50) +
          T(290, 56, 'Production Rules', 't', 'middle') +
          T(290, 72, '(IF-THEN Base)', 'ta', 'middle') +
          LA(120, 50, 160, 50, 'a') +
          LA(240, 50, 200, 50, 'a') +
          R(140, 36, 80, 50, 'fa') +
          T(180, 56, 'Match', 't', 'middle') +
          T(180, 72, '(RETE Net)', 'ta', 'middle') +
          LA(180, 86, 180, 110, 'a') +
          R(120, 110, 120, 28) +
          T(180, 128, 'Conflict Resolution', 't', 'middle') +
          LA(180, 138, 180, 154, 'a') +
          R(140, 154, 80, 24) +
          T(180, 170, 'Act (Fire)', 'ta', 'middle') +
          P('M140 166 L50 166 L50 86', 'd') +
          T(54, 130, 'Update WM', 'ta')
      ),
      caption: 'Rule-Based Production System architecture and Match-Resolve-Act execution cycle.',
    },
  },
};
