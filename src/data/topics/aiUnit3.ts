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

/* ---------- AI UNIT 3 TOPIC CONTENT (5 Topics) ---------- */
export const AI_UNIT3_TOPICS: Record<string, TopicContent> = {
  'ai:3:0': {
    explain: [
      'In the real world, agents rarely possess complete, noiseless knowledge.',
      'Sources of uncertainty include partial observability, sensor errors, non-deterministic actions, laziness (too complex to enumerate all exceptions), and theoretical ignorance.',
      'Probability theory provides the formal mathematical calculus for reasoning rationally under uncertainty, governed by Kolmogorov axioms.',
    ],
    definition:
      'Probability theory is the mathematical framework for quantifying degrees of belief in propositions given incomplete information, governed by Kolmogorov’s axioms and conditional conditioning.',
    formula: 'P(A \\mid B) = \\frac{P(A \\land B)}{P(B)}, \\quad P(A \\lor B) = P(A) + P(B) - P(A \\land B)',
    steps: [
      'Axiom 1: 0 <= P(A) <= 1 for every proposition A.',
      'Axiom 2: P(True) = 1, P(False) = 0.',
      'Axiom 3 (Additivity): For disjoint events, P(A or B) = P(A) + P(B).',
      'Complement: P(not A) = 1 - P(A).',
      'Conditional Probability: P(A | B) = P(A and B) / P(B); restricts sample space to outcomes where B is true.',
    ],
    examAnswer: [
      'List the primary causes of uncertainty in AI agents: Laziness, Ignorance, Sensor Noise, Non-determinism.',
      'State the three Kolmogorov Axioms of Probability.',
      'State the definition of Conditional Probability and the Product Rule.',
      'Explain why full joint distributions are computationally intractable (2^n exponential explosion in variables).',
    ],
    slip: 'Do not confuse conditional probability P(A|B) with causal implication; conditioning simply updates a subjective degree of belief when new information arrives.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'PROBABILITY: P(A|B) = P(A & B) / P(B)', 'ta') +
          R(30, 36, 300, 110) +
          T(40, 52, 'Total Sample Space S [P(S)=1]', 't') +
          C(140, 95, 38) +
          T(115, 99, 'A', 't', 'middle') +
          C(210, 95, 38, 'fa') +
          T(235, 99, 'B', 't', 'middle') +
          T(175, 99, 'A & B', 'ta', 'middle') +
          T(180, 166, 'Conditioning on B shrinks effective sample space to circle B', 'ta', 'middle') +
          T(180, 182, 'P(A|B) is the fraction of B that overlaps with A', 't', 'middle')
      ),
      caption: 'Venn diagram illustrating conditional probability P(A|B) as the restricted sample space.',
    },
  },

  'ai:3:1': {
    explain: [
      'Bayes’ Theorem is the fundamental law of probabilistic inference, allowing an agent to invert conditional probabilities.',
      'It computes the probability of a hidden hypothesis given observable evidence by multiplying prior belief by causal likelihood and normalizing by marginal evidence.',
    ],
    definition:
      'Bayes’ Theorem calculates the posterior probability of a hypothesis H conditioned on observed evidence E by scaling the prior probability P(H) by the causal likelihood P(E|H) normalized by marginal evidence P(E).',
    formula: 'P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)} = \\frac{P(E \\mid H) \\cdot P(H)}{\\sum_{i} P(E \\mid H_i) \\cdot P(H_i)}',
    steps: [
      'Product Rule derivation: P(H and E) = P(H|E) P(E) = P(E|H) P(H).',
      'Equating both gives: P(H|E) = [P(E|H) * P(H)] / P(E).',
      'Law of Total Probability: P(E) = sum_i P(E|H_i) P(H_i).',
      'Components: Prior P(H), Likelihood P(E|H), Evidence/Marginal P(E), Posterior P(H|E).',
      'Rare disease calculation: Low prior base rate P(Disease) ensures posterior remains modest despite positive test accuracy.',
    ],
    examAnswer: [
      'Write Bayes’ Theorem and state the formal name of all 4 terms (Prior, Likelihood, Evidence/Marginal, Posterior).',
      'State and expand the Law of Total Probability for P(E).',
      'Derive Bayes’ theorem mathematically from the product rule of probability.',
      'Solve a full numerical exam problem (e.g. Rare disease diagnosis given test sensitivity and false positive rate).',
    ],
    slip: 'Do not confuse P(Disease | Test Positive) with P(Test Positive | Disease); failing to account for the low base rate (prior) is the single most common statistical exam error (Base Rate Fallacy).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'BAYES’ THEOREM: POSTERIOR INVERSION', 'ta') +
          R(20, 36, 90, 44) +
          T(65, 54, 'Prior P(H)', 't', 'middle') +
          T(65, 70, '(Initial Belief)', 'ta', 'middle') +
          T(125, 62, 'x', 't') +
          R(140, 36, 90, 44) +
          T(185, 54, 'Likelihood', 't', 'middle') +
          T(185, 70, 'P(E | H)', 'ta', 'middle') +
          LA(230, 58, 260, 58, 'a') +
          R(260, 36, 80, 44, 'fa') +
          T(300, 54, 'Posterior', 't', 'middle') +
          T(300, 70, 'P(H | E)', 'ta', 'middle') +
          L(30, 98, 330, 98, 'd') +
          T(180, 116, 'Denominator / Normalization: P(E) = sum_i P(E|H_i) P(H_i)', 'ta', 'middle') +
          R(30, 132, 300, 44) +
          T(180, 150, 'Example: P(Disease | Positive Test) << 100% when', 't', 'middle') +
          T(180, 166, 'the disease is rare (low prior dominates false positives)!', 'ta', 'middle')
      ),
      caption: 'Bayes’ Theorem structure: Prior multiplied by Likelihood yields Posterior belief.',
    },
  },

  'ai:3:2': {
    explain: [
      'A Bayesian Network (Belief Network) is a probabilistic graphical model that represents conditional dependencies among variables using a Directed Acyclic Graph (DAG) and local Conditional Probability Tables (CPTs).',
      'It compresses joint probability distributions from exponential O(2^n) storage to compact linear/polynomial complexity.',
    ],
    definition:
      'A Bayesian Network is a Directed Acyclic Graph (DAG) whose nodes represent random variables and whose edges encode conditional dependencies, factorizing the joint distribution into local conditional probability distributions.',
    formula: 'P(x_1, \\dots, x_n) = \\prod_{i=1}^n P(x_i \\mid \\text{Parents}(X_i))',
    steps: [
      'Nodes represent random variables; directed arcs from X to Y encode direct causal influence.',
      'DAG property: Must contain no directed cycles.',
      'Conditional Independence: Each variable is conditionally independent of non-descendants given its parents.',
      'Master Factorization: P(x_1, ..., x_n) = prod P(x_i | Parents(X_i)).',
      'Alarm Network calculation: P(B, ~E, A, J, ~M) = P(B) P(~E) P(A|B,~E) P(J|A) P(~M|A).',
    ],
    examAnswer: [
      'Define Bayesian Network formally as a DAG with local conditional probability tables (CPTs).',
      'Write the master joint distribution factorization formula: P(x1...xn) = prod P(xi | Parents(Xi)).',
      'Draw the complete Burglary-Alarm network graph with all 5 nodes and directed edges.',
      'Compute a complete manual probability query given a numerical CPT table.',
    ],
    slip: 'Do not create cycles in a Bayesian network; it MUST be a Directed Acyclic Graph (DAG) for the probabilistic factorization to be mathematically valid.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'BAYESIAN NETWORK (ALARM TOPOLOGY)', 'ta') +
          C(80, 45, 18) +
          T(80, 49, 'Burg (B)', 't', 'middle') +
          C(280, 45, 18) +
          T(280, 49, 'Earth (E)', 't', 'middle') +
          C(180, 100, 20, 'fa') +
          T(180, 104, 'Alarm (A)', 't', 'middle') +
          LA(94, 57, 164, 90, 'a') +
          LA(266, 57, 196, 90, 'a') +
          C(90, 155, 18) +
          T(90, 159, 'John (J)', 't', 'middle') +
          C(270, 155, 18) +
          T(270, 159, 'Mary (M)', 't', 'middle') +
          LA(166, 114, 104, 142, 'a') +
          LA(194, 114, 256, 142, 'a') +
          T(180, 184, 'P(B,E,A,J,M) = P(B) P(E) P(A|B,E) P(J|A) P(M|A)', 'ta', 'middle')
      ),
      caption: 'Classic Alarm Bayesian Network with DAG topology and joint probability factorization.',
    },
  },

  'ai:3:3': {
    explain: [
      'Fuzzy Logic, introduced by Lotfi Zadeh (1965), generalizes classical Boolean logic to handle vagueness and partial truth.',
      'While classical crisp sets require binary membership (mu in {0, 1}), fuzzy sets assign a continuous degree of membership mu(x) in [0, 1].',
    ],
    definition:
      'Fuzzy Logic is a multi-valued logic that formalizes approximate reasoning by mapping domain values to real-valued continuous degrees of membership \\mu_A(x) \\in [0, 1], governed by max/min fuzzy set operations.',
    formula: '\\mu_{A \\cup B} = \\max(\\mu_A, \\mu_B), \\quad \\mu_{A \\cap B} = \\min(\\mu_A, \\mu_B), \\quad \\mu_{\\bar{A}} = 1 - \\mu_A',
    steps: [
      'Crisp vs Fuzzy: Crisp set has sharp boundary {0, 1}; fuzzy set has gradual membership in [0, 1].',
      'Linguistic Variables: Natural language labels (e.g. Temperature = {Cold, Warm, Hot}).',
      'Zadeh Set Operations: Union = max(mu_A, mu_B); Intersection = min(mu_A, mu_B); Complement = 1 - mu_A.',
      'Mamdani Inference: Fuzzification -> Rule evaluation (min/max) -> Aggregation -> Defuzzification.',
      'Centroid Defuzzification: Computes center of gravity x* = [int x * mu(x) dx] / [int mu(x) dx].',
    ],
    examAnswer: [
      'Differentiate Crisp sets from Fuzzy sets with explicit mathematical notations.',
      'Define Linguistic Variables and draw Triangular/Trapezoidal membership functions.',
      'State Zadeh’s fuzzy operators for Union (max), Intersection (min), and Complement (1 - mu).',
      'Write down the Centroid formula used for defuzzification in fuzzy controllers.',
    ],
    slip: 'Do not confuse fuzzy logic with probability; probability measures the likelihood that an event occurs, while fuzzy logic measures the degree of truth/vagueness of an event that has occurred.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'FUZZY SETS: CONTINUOUS MEMBERSHIP mu in [0, 1]', 'ta') +
          L(30, 140, 330, 140) +
          L(30, 140, 30, 30) +
          T(20, 26, 'mu', 'ta') +
          T(20, 40, '1.0', 't') +
          T(20, 140, '0.0', 't') +
          T(335, 144, 'x', 't') +
          P('M30 40 L80 40 L130 140', 'l') +
          T(70, 70, 'Cold', 'ta') +
          P('M80 140 L150 40 L220 140', 'l') +
          T(150, 60, 'Warm', 'ta', 'middle') +
          P('M170 140 L240 40 L320 40', 'l') +
          T(255, 70, 'Hot', 'ta') +
          L(30, 90, 330, 90, 'd') +
          T(335, 92, '0.5', 't') +
          T(180, 168, 'Union = max(A, B) · Intersection = min(A, B) · Not = 1 - mu', 't', 'middle') +
          T(180, 184, 'Defuzzification: Centroid Method x* = sum(x*mu) / sum(mu)', 'ta', 'middle')
      ),
      caption: 'Triangular fuzzy membership functions and Zadeh logical operators.',
    },
  },

  'ai:3:4': {
    explain: [
      'Certainty Factors (CF) were introduced in the MYCIN medical expert system as an intuitive, computationally lightweight heuristic method to manage uncertainty in rule-based systems.',
      'They avoid requiring complete joint probability distributions by balancing Measure of Belief (MB) against Measure of Disbelief (MD).',
    ],
    definition:
      'A Certainty Factor (CF) is a numerical metric within [-1, +1] developed for rule-based expert systems to quantify the balance between belief and disbelief in a hypothesis conditioned on evidence.',
    formula: 'CF(H, E) = MB(H, E) - MD(H, E), \\quad CF \\in [-1, +1]',
    steps: [
      'Scale: +1 indicates absolute certainty of truth; -1 indicates absolute disbelief/falsehood; 0 indicates complete ignorance.',
      'Measure of Belief MB in [0, 1] and Measure of Disbelief MD in [0, 1]: CF = MB - MD.',
      'Parallel Positive Combination: CF_comb = CF_1 + CF_2 - (CF_1 * CF_2).',
      'Parallel Negative Combination: CF_comb = CF_1 + CF_2 + (CF_1 * CF_2).',
      'Rule Chaining: CF(H) = CF(E) * CF_rule where CF(E) is confidence in premise.',
    ],
    examAnswer: [
      'Define Certainty Factor (CF) and write its formula in terms of MB and MD.',
      'State the range of CF [-1, +1] and explain what +1, 0, and -1 represent.',
      'Write down the 3 combination rules for parallel evidence (both positive, both negative, opposite signs).',
      'Explain how uncertainty propagates through chained rules: CF(H) = CF(E) * CF_rule.',
    ],
    slip: 'Do not multiply CFs directly when combining parallel evidence; use the combination formula CF_1 + CF_2 - CF_1 * CF_2 for positive parallel inputs.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'MYCIN CERTAINTY FACTOR SCALE: CF in [-1, +1]', 'ta') +
          L(30, 80, 330, 80) +
          C(30, 80, 6, 'fa') +
          T(30, 68, '-1.0 (False)', 't', 'middle') +
          C(180, 80, 6, 'fa') +
          T(180, 68, '0.0 (Ignorance)', 'ta', 'middle') +
          C(330, 80, 6, 'fa') +
          T(330, 68, '+1.0 (True)', 't', 'middle') +
          R(20, 105, 320, 60) +
          T(30, 122, 'Parallel Combination (both positive):', 'ta') +
          T(30, 138, 'CF_comb = CF_1 + CF_2 - (CF_1 * CF_2)', 't') +
          T(30, 154, 'Chained Rule: CF(H) = CF(E) * CF_rule', 't') +
          T(180, 180, 'CF = MB - MD (Belief minus Disbelief)', 'ta', 'middle')
      ),
      caption: 'MYCIN Certainty Factor spectrum from -1 (false) to +1 (true) and combination formulas.',
    },
  },
};
