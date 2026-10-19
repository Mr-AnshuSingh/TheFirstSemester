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

/* ---------- AI UNIT 1 TOPIC CONTENT (11 Topics) ---------- */
export const AI_UNIT1_TOPICS: Record<string, TopicContent> = {
  'ai:1:0': {
    explain: [
      'Problem formulation is the process of deciding what actions and states to consider, transforming an informal real-world problem into a formal 5-tuple mathematical definition.',
      'A state space graph has unique nodes for physical states, whereas a search tree can contain infinite redundant branches if loopy paths are not pruned with an explored set (closed list).',
    ],
    definition:
      'Problem formulation is the formal representation of a search problem as a 5-tuple: \\mathcal{P} = \\langle S_0, \\text{ACTIONS}, \\text{RESULT}, \\text{GOAL-TEST}, \\text{STEP-COST} \\rangle defining the state space reachable by an agent.',
    formula: '\\mathcal{P} = \\langle s_0, \\mathcal{A}(s), \\text{Result}(s, a), G(s), c(s, a, s\') \\rangle, \\quad g(n) = \\sum_{i=1}^k c(s_{i-1}, a_i, s_i)',
    steps: [
      'Initial State s_0: The state the agent starts in (e.g. In(Arad)).',
      'Actions(s): Set of legal actions executable from state s: \\mathcal{A}(s) = \\{a \\mid \\text{Legal}(s, a)\\}.',
      'Transition Model: Returns state resulting from doing action a in state s: s\' = \\text{Result}(s, a).',
      'Goal Test: Boolean predicate G(s) determining if s is a goal state (e.g. s == In(Bucharest)).',
      'Path Cost: Numerical cost function g(n); optimal solution has path cost g^*(n) = \\min_{\\pi} g(\\pi).',
    ],
    examAnswer: [
      'List all 5 formal problem components: Initial state, Actions, Transition model, Goal test, Step cost function.',
      'Define the State Space and distinguish between state space graph and search tree.',
      'Formulate the 8-puzzle problem completely using all 5 components with explicit mathematical expressions.',
      'State the definition of an optimal solution: A solution path having minimal path cost among all possible solutions.',
    ],
    slip: 'Do not confuse state space with search tree: the state space of the 8-puzzle has 9!/2 = 181,440 states, but an unpruned search tree is infinitely deep due to repeating reversible moves.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, '5-TUPLE PROBLEM FORMULATION', 'ta') +
          R(20, 32, 95, 45) +
          T(67, 50, '1. Initial State', 't', 'middle') +
          T(67, 66, 's_0', 'ta', 'middle') +
          R(130, 32, 100, 45) +
          T(180, 50, '2. Actions(s)', 't', 'middle') +
          T(180, 66, '{a_1, a_2, ...}', 'ta', 'middle') +
          R(245, 32, 95, 45) +
          T(292, 50, '3. Transition', 't', 'middle') +
          T(292, 66, 'Result(s, a)', 'ta', 'middle') +
          R(60, 90, 110, 45) +
          T(115, 108, '4. Goal Test', 't', 'middle') +
          T(115, 124, 'IsGoal(s) == true?', 'ta', 'middle') +
          R(190, 90, 110, 45) +
          T(245, 108, '5. Path Cost', 't', 'middle') +
          T(245, 124, 'c(s, a, s\') -> g(n)', 'ta', 'middle') +
          T(180, 168, 'Graph Search = Tree Search + Explored Set (Closed List)', 'ta', 'middle')
      ),
      caption: '5-tuple formal problem formulation and State Space vs Search Tree distinction.',
    },
  },

  'ai:1:1': {
    explain: [
      'Uninformed search strategies explore state spaces without domain-specific clues about how close a state is to the goal.',
      'Breadth-First Search (BFS) expands the shallowest unexpanded node using a FIFO queue; Depth-First Search (DFS) expands the deepest unexpanded node using a LIFO stack.',
    ],
    definition:
      'BFS and DFS are fundamental uninformed blind search algorithms parameterized by queue discipline: FIFO queue produces breadth-first level expansion, while LIFO stack produces depth-first tree traversal.',
    formula: '\\text{BFS: } \\mathcal{O}(b^d) \\text{ space, optimal (uniform cost)}; \\quad \\text{DFS: } \\mathcal{O}(bm) \\text{ space, linear memory}',
    steps: [
      'BFS: Enqueue root -> Test goal -> Pop FIFO -> Expand children -> Add to frontier and explored set. Test goal when child is generated.',
      'BFS Complexity: Level d has b^d nodes. Memory = O(b^d). For b=10, d=6, holds 10^6 nodes (~111 MB).',
      'DFS: Push root onto LIFO stack -> Pop stack -> Test goal -> Push children. Goal tested when popped.',
      'DFS Complexity: Path from root to leaf has m nodes; at each level, (b-1) siblings remain on stack. Space = O(bm).',
      'Comparison: Complete (BFS: Yes, DFS: No); Optimal (BFS: Yes for unit cost, DFS: No); Time (BFS: O(b^d), DFS: O(b^m)); Space (BFS: O(b^d), DFS: O(bm)).',
    ],
    examAnswer: [
      'State the data structure for each: Queue (FIFO) for BFS; Stack (LIFO) for DFS.',
      'Present the complete 4-criteria evaluation table: Completeness, Time complexity, Space complexity, Optimality.',
      'Trace an example graph or tree showing explicitly the sequence of expanded nodes and frontier contents.',
      'Explain why BFS is memory-prohibitive in practical applications compared to DFS.',
    ],
    slip: 'Remember: In BFS, goal test is applied when a node is GENERATED; in DFS and Uniform Cost Search, goal test is applied when a node is SELECTED FOR EXPANSION (popped). Applying goal test at generation in UCS ruins optimality.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'BFS (FIFO) VS DFS (LIFO) TRAVERSAL', 'ta') +
          L(90, 42, 50, 80) +
          L(90, 42, 130, 80) +
          L(50, 80, 30, 120) +
          L(50, 80, 70, 120) +
          L(130, 80, 110, 120) +
          L(130, 80, 150, 120) +
          C(90, 42, 11, 'fa') +
          T(90, 46, '1', 't', 'middle') +
          C(50, 80, 11) +
          T(50, 84, '2', 't', 'middle') +
          C(130, 80, 11) +
          T(130, 84, '3', 't', 'middle') +
          C(30, 120, 11) +
          T(30, 124, '4', 't', 'middle') +
          C(70, 120, 11) +
          T(70, 124, '5', 't', 'middle') +
          C(110, 120, 11) +
          T(110, 124, '6', 't', 'middle') +
          C(150, 120, 11) +
          T(150, 124, '7', 't', 'middle') +
          T(90, 150, 'BFS: 1 -> 2,3 -> 4,5,6,7', 'ta', 'middle') +
          L(270, 42, 230, 80) +
          L(270, 42, 310, 80) +
          L(230, 80, 210, 120) +
          L(230, 80, 250, 120) +
          L(310, 80, 290, 120) +
          L(310, 80, 330, 120) +
          C(270, 42, 11, 'fa') +
          T(270, 46, '1', 't', 'middle') +
          C(230, 80, 11) +
          T(230, 84, '2', 't', 'middle') +
          C(210, 120, 11) +
          T(210, 124, '3', 't', 'middle') +
          C(250, 120, 11) +
          T(250, 124, '4', 't', 'middle') +
          C(310, 80, 11) +
          T(310, 84, '5', 't', 'middle') +
          C(290, 120, 11) +
          T(290, 124, '6', 't', 'middle') +
          C(330, 120, 11) +
          T(330, 124, '7', 't', 'middle') +
          T(270, 150, 'DFS: 1 -> 2,3,4 -> 5,6,7', 'ta', 'middle') +
          T(180, 178, 'BFS uses Queue (O(b^d)); DFS uses Stack (O(bm))', 't', 'middle')
      ),
      caption: 'Traversal order comparison between BFS (level-by-level) and DFS (depth-first).',
    },
  },

  'ai:1:2': {
    explain: [
      'Uniform Cost Search (UCS) generalizes BFS to paths with arbitrary step costs by expanding the node with lowest path cost g(n).',
      'Iterative Deepening Search (IDS) calls Depth-Limited Search in a loop with increasing limits l = 0, 1, 2, ..., combining the optimal completeness of BFS with the linear memory efficiency of DFS.',
    ],
    definition:
      'Uniform Cost Search expands lowest path cost g(n) using a priority queue. Iterative Deepening Search (IDS) sequentially runs depth-limited searches with incrementally deeper cutoff thresholds l \\in \\{0, 1, 2, \\dots, d\\}.',
    formula: '\\text{IDS Space} = \\mathcal{O}(bd), \\quad N(\\text{IDS}) = \\sum_{i=1}^d (d - i + 1) b^i = \\mathcal{O}(b^d)',
    steps: [
      'UCS expands nodes along contours of equal cost g(n); requires c(s, a, s\') >= epsilon > 0 for optimality.',
      'Depth-Limited Search caps DFS at depth l; incomplete if goal depth d > l, and suboptimal if l > d.',
      'IDS runs DLS for limit l = 0, 1, 2, ..., d; frees memory after each depth iteration.',
      'IDS Work: For b=10, d=5, BFS generates 111,111 nodes; IDS generates 123,456 nodes (~11% overhead).',
      'IDS is optimal for uniform step costs and is the preferred uninformed search method when state space is large.',
    ],
    examAnswer: [
      'Explain Uniform Cost Search and why priority queue on g(n) guarantees optimality.',
      'Define Depth-Limited Search and show why choosing limit l is a critical dilemma.',
      'Formulate Iterative Deepening Search algorithm and write its pseudo-code loop.',
      'Derive the ratio of node expansions between IDS and BFS, showing that regeneration overhead is negligible (typically ~11% for b=10).',
    ],
    slip: 'Do not assume re-expanding upper levels makes IDS catastrophically slow; the exponential growth of trees means the bottom tier contains almost all total nodes anyway.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'ITERATIVE DEEPENING SEARCH (IDS)', 'ta') +
          R(20, 32, 95, 36) +
          T(67, 48, 'Limit = 0', 't', 'middle') +
          T(67, 62, 'Root only', 'ta', 'middle') +
          R(130, 32, 100, 36) +
          T(180, 48, 'Limit = 1', 't', 'middle') +
          T(180, 62, 'Root + Depth 1', 'ta', 'middle') +
          R(245, 32, 95, 36) +
          T(292, 48, 'Limit = 2', 't', 'middle') +
          T(292, 62, 'Down to Depth 2', 'ta', 'middle') +
          L(30, 95, 330, 95, 'd') +
          T(180, 114, 'Memory is freed after each iteration!', 'ta', 'middle') +
          R(30, 130, 140, 44) +
          T(100, 148, 'Space: O(bd)', 't', 'middle') +
          T(100, 164, 'Linear Memory!', 'ta', 'middle') +
          R(190, 130, 140, 44) +
          T(260, 148, 'Time: O(b^d)', 't', 'middle') +
          T(260, 164, 'Optimal & Complete', 'ta', 'middle')
      ),
      caption: 'Iterative Deepening Search expanding depth limits progressively with linear memory.',
    },
  },

  'ai:1:3': {
    explain: [
      'Greedy Best-First Search is an informed heuristic search strategy that expands the node that appears closest to the goal according to a heuristic function h(n), completely ignoring the accumulated path cost g(n).',
      'It greedily selects immediate apparent progress; it can easily be led down expensive detours or dead-end paths.',
    ],
    definition:
      'Greedy Best-First Search is an informed search algorithm that evaluates candidate nodes exclusively by heuristic estimation f(n) = h(n), prioritizing nodes that seem closest to the destination.',
    formula: 'f(n) = h(n), \\quad \\text{Incomplete, Suboptimal, Worst-case Space: } \\mathcal{O}(b^m)',
    steps: [
      'Frontier is a priority queue sorted in ascending order of h(n).',
      'Heuristic Example: Straight-Line Distance h_SLD(n) between cities in route finding.',
      'Suboptimality proof: S has children A (h=10, cost=100) and B (h=15, cost=5). Greedy picks A first because 10 < 15, committing to a suboptimal path.',
      'Incompleteness: Can get trapped in infinite loops in graph state spaces without an explored set.',
      'Worst-case time and space complexity is O(b^m).',
    ],
    examAnswer: [
      'State evaluation function f(n) = h(n) and define what h(n) represents.',
      'Differentiate Greedy Best-First Search from Uniform Cost Search.',
      'Provide a counter-example graph proving that Greedy Best-First Search is NOT optimal.',
      'State the time and space complexity in worst case: O(b^m).',
    ],
    slip: 'Do not state that Greedy Best-First is optimal; it is purely heuristic and can select arbitrarily worse paths because it ignores g(n).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'GREEDY BEST-FIRST SEARCH: f(n) = h(n)', 'ta') +
          C(50, 95, 14, 'fa') +
          T(50, 99, 'S', 't', 'middle') +
          C(180, 50, 14) +
          T(180, 54, 'A', 't', 'middle') +
          C(180, 140, 14) +
          T(180, 144, 'B', 't', 'middle') +
          C(310, 95, 14, 'fa') +
          T(310, 99, 'G', 't', 'middle') +
          L(64, 90, 166, 54) +
          T(110, 64, 'c=100', 'ta') +
          L(64, 100, 166, 136) +
          T(110, 132, 'c=5', 'ta') +
          L(194, 54, 296, 90) +
          T(245, 64, 'c=10', 'ta') +
          L(194, 136, 296, 100) +
          T(245, 132, 'c=10', 'ta') +
          T(180, 32, 'h(A) = 10', 'ta', 'middle') +
          T(180, 168, 'h(B) = 15', 't', 'middle') +
          T(180, 184, 'Greedy picks A (h=10 < 15), total cost=110 vs optimal B (15)', 'ta', 'middle')
      ),
      caption: 'Greedy Best-First Search following lowest h(n) into a suboptimal detour.',
    },
  },

  'ai:1:4': {
    explain: [
      'A* Search combines the cost-so-far g(n) from Uniform Cost Search with the estimated-cost-to-goal h(n) from Greedy Best-First Search into the combined evaluation function f(n) = g(n) + h(n).',
      'It expands the node with minimum f(n) from the frontier priority queue, guaranteeing completeness and optimality when h(n) is admissible and consistent.',
    ],
    definition:
      'A* search is an informed, best-first graph search algorithm that orders node expansion by f(n) = g(n) + h(n), guaranteeing completeness and path optimality when h(n) satisfies admissibility and consistency.',
    formula: 'f(n) = g(n) + h(n), \\quad f^*(n) = g^*(n) + h^*(n) = C^*',
    steps: [
      'Total Cost Decomposition: f(n) estimates the total cost of the cheapest solution path through node n.',
      'Optimality Proof: Let C* be optimal path cost. Suboptimal goal G_2 has f(G_2) = g(G_2) > C*.',
      'There is always some unexpanded node n on the optimal path on the frontier: f(n) = g(n) + h(n) <= C*.',
      'Since f(n) <= C* < f(G_2), A* will expand n before popping G_2.',
      'Optimally Efficient: No other optimal algorithm expanding the same heuristic can expand fewer nodes than A*.',
    ],
    examAnswer: [
      'State the formula f(n) = g(n) + h(n) with complete variable definitions.',
      'Provide the full proof of optimality for A* tree search under admissible heuristic.',
      'Trace an A* search problem given a table of step costs and heuristic values step-by-step.',
      'State the optimality condition for Graph Search (Consistency / Monotonicity).',
    ],
    slip: 'Do not declare a goal state found when it is generated; A* MUST wait until the goal node is POPPED from the priority queue to guarantee optimal path cost.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'A* EVALUATION: f(n) = g(n) + h(n)', 'ta') +
          C(40, 95, 14, 'fa') +
          T(40, 99, 'S', 't', 'middle') +
          C(160, 50, 14) +
          T(160, 54, 'A', 't', 'middle') +
          C(160, 140, 14) +
          T(160, 144, 'B', 't', 'middle') +
          C(290, 95, 14, 'fa') +
          T(290, 99, 'G', 't', 'middle') +
          L(54, 90, 146, 54) +
          T(95, 64, 'g=1', 't') +
          L(54, 100, 146, 136) +
          T(95, 132, 'g=4', 't') +
          L(174, 54, 276, 90) +
          T(235, 64, 'cost=5', 't') +
          L(174, 136, 276, 100) +
          T(235, 132, 'cost=1', 't') +
          T(160, 30, 'h(A)=5 -> f=1+5=6', 't', 'middle') +
          T(160, 172, 'h(B)=1 -> f=4+1=5', 'ta', 'middle') +
          T(180, 186, 'f(B)=5 < f(A)=6 -> Expand B first! (Optimal path: S-B-G = 5)', 'ta', 'middle')
      ),
      caption: 'A* evaluation f(n) = g(n) + h(n) balancing accumulated cost and heuristic estimate.',
    },
  },

  'ai:1:5': {
    explain: [
      'The performance and optimality of A* depend directly on heuristic design.',
      'An admissible heuristic never overestimates the true cost to reach the goal. A consistent (monotonic) heuristic obeys the triangle inequality, guaranteeing that f(n) never decreases along any path.',
    ],
    definition:
      'An admissible heuristic is a non-negative function satisfying h(n) \\le h^*(n). A consistent heuristic satisfies the triangle inequality h(n) \\le c(n, a, n\') + h(n\'), guaranteeing optimal graph search without re-opening closed nodes.',
    formula: '\\text{Admissible: } 0 \\le h(n) \\le h^*(n); \\quad \\text{Consistent: } h(n) \\le c(n, a, n\') + h(n\')',
    steps: [
      'Triangle Inequality: In metric spaces, direct distance to destination cannot exceed distance to intermediary plus distance to destination.',
      'Monotonicity proof: f(n\') = g(n\') + h(n\') = g(n) + c(n,a,n\') + h(n\') >= g(n) + h(n) = f(n).',
      'Consistency implies Admissibility by induction down to Goal where h(Goal) = 0.',
      'Graph search under consistent heuristic guarantees that the first time a node is expanded, the path found to it is optimal.',
      'Dominance: If h_2(n) >= h_1(n) for all n, h_2 dominates h_1 and expands fewer or equal nodes.',
    ],
    examAnswer: [
      'State the mathematical definition of Admissibility: 0 <= h(n) <= h*(n).',
      'State the mathematical definition of Consistency (Monotonicity): h(n) <= c(n, a, n\') + h(n\').',
      'Prove that consistency implies admissibility by setting n\' = Goal.',
      'Define Heuristic Dominance: If h2(n) >= h1(n) for all n, h2 dominates h1, leading to tighter bounds and fewer node expansions.',
    ],
    slip: 'Do not invent heuristics that overestimate cost (e.g. Euclidean distance multiplied by 2); an overestimating heuristic invalidates the mathematical proof of optimality.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CONSISTENCY TRIANGLE: h(n) <= c(n,a,n\') + h(n\')', 'ta') +
          C(60, 120, 14, 'fa') +
          T(60, 124, 'n', 't', 'middle') +
          C(180, 50, 14) +
          T(180, 54, 'n\'', 't', 'middle') +
          C(300, 120, 14, 'fa') +
          T(300, 124, 'Goal', 't', 'middle') +
          LA(74, 112, 166, 58, 'a') +
          T(110, 78, 'c(n, a, n\')', 'ta') +
          LA(194, 58, 286, 112, 'a') +
          T(255, 78, 'h(n\')', 'ta') +
          L(74, 124, 286, 124, 'd') +
          T(180, 144, 'h(n) <= c + h(n\')', 'ta', 'middle') +
          T(180, 172, 'Consistent => Monotonic non-decreasing f(n)', 't', 'middle')
      ),
      caption: 'Consistency triangle inequality: h(n) <= c(n, a, n\') + h(n\').',
    },
  },

  'ai:1:6': {
    explain: [
      'Local search algorithms operate using a single current state rather than multiple paths, moving only to neighboring states.',
      'Hill-Climbing (greedy local search) continually moves in the direction of increasing value (steepest ascent) without maintaining a search tree.',
    ],
    definition:
      'Hill-Climbing search is an iterative local search algorithm that continuously transitions to the neighbor state of highest objective value, terminating immediately when trapped at a peak where no neighbor is superior.',
    formula: 's_{t+1} = \\arg\\max_{s\' \\in \\text{Neighbors}(s_t)} f(s\'), \\quad \\text{Stops if } f(s_{t+1}) \\le f(s_t)',
    steps: [
      'Algorithm: loop: neighbor = highest_valued_successor(current); if value(neighbor) <= value(current) return current; current = neighbor.',
      'Space-efficient: Memory complexity is O(1) (stores only current state).',
      'Failure Mode 1 - Local Maxima: A peak higher than all neighboring states, but lower than the global maximum.',
      'Failure Mode 2 - Ridges: A series of local maxima connected along a diagonal; steepest ascent oscillates with minimal progress.',
      'Failure Mode 3 - Plateaus: Flat area where all neighbors have identical value, causing random drift.',
      'Random-Restart Hill Climbing: Runs k independent runs from random initial states; complete with probability approaching 1.',
    ],
    examAnswer: [
      'Define Hill Climbing (Greedy Local Search / Steepest Ascent).',
      'Draw the state space landscape labeling Global Maximum, Local Maximum, Ridge, and Plateau.',
      'Detail the 3 fundamental drawbacks: Local Maxima, Ridges, Flat Plateaus/Shoulders.',
      'Explain Random-Restart Hill Climbing as the standard method to achieve asymptotic completeness.',
    ],
    slip: 'Do not confuse hill climbing with gradient descent: hill climbing is a discrete/continuous greedy search that evaluates neighbors directly; gradient descent calculates mathematical partial derivatives.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'HILL CLIMBING STATE SPACE LANDSCAPE', 'ta') +
          P('M20 150 Q60 50 100 110 T180 110 Q220 20 260 110 T340 150', 'l') +
          C(100, 110, 4, 'fa') +
          T(100, 96, 'Local Max', 't', 'middle') +
          C(240, 44, 4, 'fa') +
          T(240, 32, 'Global Max', 'ta', 'middle') +
          L(135, 110, 185, 110, 'l') +
          T(160, 126, 'Plateau', 'ta', 'middle') +
          C(45, 130, 4) +
          LA(45, 130, 80, 112, 'a') +
          T(55, 150, 'Current', 't') +
          T(180, 178, 'Trapped when all neighbors have lower/equal values!', 'ta', 'middle')
      ),
      caption: 'State space landscape showing Global Maximum, Local Maximum, Plateau, and Ridge.',
    },
  },

  'ai:1:7': {
    explain: [
      'Simulated Annealing is an optimization algorithm inspired by the metallurgical process of heating metal and cooling it slowly to form stable crystal lattices.',
      'It escapes local maxima by allowing occasional downhill (worse) moves with a probability that decreases over time.',
    ],
    definition:
      'Simulated Annealing is a stochastic local search algorithm that escapes local maxima by accepting suboptimal transitions with Boltzmann probability P = \\exp(\\Delta E / T), controlled by a monotonically decreasing cooling schedule T(t).',
    formula: 'P(\\text{accept worse move}) = e^{\\frac{\\Delta E}{T}}, \\quad \\Delta E < 0, \\; T > 0',
    steps: [
      'If Delta E > 0: Always accept the move (strictly better state).',
      'If Delta E < 0: Accept with Boltzmann probability P = e^{Delta E / T}.',
      'When T is very large: P ~ 1; behaves like a random walk that freely jumps over barriers.',
      'When T is near zero: P ~ 0; converges to pure greedy steepest ascent.',
      'Asymptotic Optimality: If temperature schedule cools slowly enough, simulated annealing is mathematically guaranteed to find the global optimum.',
    ],
    examAnswer: [
      'Write down the Boltzmann acceptance probability formula P = exp(Delta E / T).',
      'Explain the role of temperature parameter T at both high T and near-zero T.',
      'Explain the metallurgical analogy: High thermal kinetic energy anneals into lowest-energy crystal lattice without brittle flaws.',
      'State the condition under which simulated annealing is guaranteed to converge to the global optimum.',
    ],
    slip: 'Do not write P = exp(Delta E * T); temperature T must be in the denominator so that as T decreases toward zero, the negative exponent magnitude grows and probability approaches 0.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'SIMULATED ANNEALING: P = exp(Delta E / T)', 'ta') +
          L(40, 140, 320, 140) +
          L(40, 140, 40, 30) +
          T(30, 26, 'P', 'ta') +
          T(325, 144, 'Time', 't') +
          P('M40 40 Q120 45 180 85 T310 138', 'l') +
          T(180, 60, 'High T: P ~ 1 (Random Walk)', 'ta', 'middle') +
          T(240, 110, 'Low T: P ~ 0 (Greedy Ascent)', 't') +
          R(60, 154, 240, 28) +
          T(180, 172, 'Gradual cooling guarantees global convergence!', 'ta', 'middle')
      ),
      caption: 'Simulated Annealing temperature schedule and Boltzmann downhill acceptance curve.',
    },
  },

  'ai:1:8': {
    explain: [
      'Adversarial search analyzes multi-agent competitive environments where two players (MAX and MIN) make alternating moves in a zero-sum game of perfect information.',
      'The Minimax algorithm calculates the optimal decision for MAX assuming MIN plays flawlessly.',
    ],
    definition:
      'The Minimax algorithm is a recursive adversarial game-tree evaluation strategy that computes optimal move choices for player MAX assuming an optimal opponent MIN minimizes MAX’s payoff at every turn.',
    formula: 'V(s) = \\begin{cases} \\text{Utility}(s) & \\text{if Terminal}(s) \\\\ \\max_{a} V(\\text{Result}(s, a)) & \\text{if Player}(s) = \\text{MAX} \\\\ \\min_{a} V(\\text{Result}(s, a)) & \\text{if Player}(s) = \\text{MIN} \\end{cases}',
    steps: [
      'Terminal Test: If terminal state, return utility value (e.g. +1 for win, -1 for loss, 0 for draw).',
      'Recursive DFS: Values propagate upward level-by-level.',
      'At MIN level: Parent takes minimum of child returns (opponent minimizes our payoff).',
      'At MAX level: Parent takes maximum of child returns (maximizing our guaranteed outcome).',
      'Complete DFS: Time complexity O(b^m); space complexity O(bm).',
    ],
    examAnswer: [
      'Define Minimax algorithm and specify its operating assumptions (two-player, zero-sum, perfect information).',
      'Write the piecewise recursive definition of minimax value V(s).',
      'Draw a 2-ply game tree and trace numerical values from terminal leaves to the root.',
      'State time complexity O(b^m) and space complexity O(bm).',
    ],
    slip: 'Do not evaluate MAX and MIN as if both players choose max; MIN always picks the minimum value of its children.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'MINIMAX GAME TREE (MAX / MIN)', 'ta') +
          R(160, 26, 40, 22) +
          T(180, 42, 'MAX=3', 't', 'middle') +
          L(170, 48, 90, 80) +
          L(190, 48, 270, 80) +
          R(70, 80, 40, 22) +
          T(90, 96, 'MIN=3', 't', 'middle') +
          R(250, 80, 40, 22) +
          T(270, 96, 'MIN=2', 't', 'middle') +
          L(80, 102, 50, 134) +
          L(100, 102, 130, 134) +
          L(260, 102, 230, 134) +
          L(280, 102, 310, 134) +
          C(50, 144, 10) +
          T(50, 148, '3', 'ta', 'middle') +
          C(130, 144, 10) +
          T(130, 148, '5', 't', 'middle') +
          C(230, 144, 10) +
          T(230, 148, '2', 't', 'middle') +
          C(310, 144, 10) +
          T(310, 148, '9', 't', 'middle') +
          T(180, 178, 'Left MIN chooses min(3,5)=3; Right MIN chooses min(2,9)=2 -> MAX picks max(3,2)=3', 'ta', 'middle')
      ),
      caption: 'Minimax game tree with MAX and MIN levels alternating to terminal utilities.',
    },
  },

  'ai:1:9': {
    explain: [
      'Alpha-Beta Pruning returns the exact same move as Minimax while eliminating branches that cannot influence the final decision.',
      'It maintains two bounds: alpha (highest score MAX is guaranteed) and beta (lowest score MIN is guaranteed), pruning whenever alpha >= beta.',
    ],
    definition:
      'Alpha-Beta pruning is a bounding algorithm applied to Minimax search that prunes game tree branches whenever the current player can guarantee a better score elsewhere, characterized by \\alpha \\ge \\beta.',
    formula: '\\text{Prune when } \\alpha \\ge \\beta, \\quad \\text{Best-Case Time Complexity: } \\mathcal{O}(b^{m/2})',
    steps: [
      'Alpha initialized to -infinity; Beta initialized to +infinity.',
      'At MAX node: v = max(v, child_value); alpha = max(alpha, v); if alpha >= beta: prune remaining children.',
      'At MIN node: v = min(v, child_value); beta = min(beta, v); if beta <= alpha: prune remaining children.',
      'Pruning never alters final minimax decision; it only trims provably irrelevant subtrees.',
      'Best Case Move Ordering: Time complexity drops from O(b^m) to O(b^{m/2}), effectively doubling searchable depth in chess.',
    ],
    examAnswer: [
      'Define alpha and beta clearly: alpha is highest MAX guarantee; beta is lowest MIN guarantee.',
      'State the precise pruning rule: prune whenever alpha >= beta.',
      'Trace an assigned tree step by step, explicitly recording alpha and beta updates at every node.',
      'State the best-case time complexity O(b^{m/2}) and explain why move ordering is critical.',
    ],
    slip: 'Do not prune when alpha > beta; pruning occurs as soon as alpha >= beta (equality is sufficient to prune because the parent already has an equally good or better choice).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'ALPHA-BETA PRUNING (alpha >= beta CUTOFF)', 'ta') +
          R(160, 26, 40, 22) +
          T(180, 42, 'MAX', 't', 'middle') +
          L(170, 48, 90, 80) +
          L(190, 48, 270, 80) +
          R(70, 80, 40, 22) +
          T(90, 96, 'MIN=3', 't', 'middle') +
          R(250, 80, 40, 22) +
          T(270, 96, 'MIN <= 2', 'ta', 'middle') +
          L(80, 102, 50, 134) +
          L(100, 102, 130, 134) +
          L(260, 102, 230, 134) +
          L(280, 102, 310, 134, 'd') +
          C(50, 144, 10) +
          T(50, 148, '3', 't', 'middle') +
          C(130, 144, 10) +
          T(130, 148, '5', 't', 'middle') +
          C(230, 144, 10) +
          T(230, 148, '2', 'ta', 'middle') +
          C(310, 144, 10, 'd') +
          T(310, 148, '?', 't', 'middle') +
          T(180, 178, 'MAX already has alpha=3. Since right MIN <= 2, alpha >= beta -> PRUNE “?”!', 'ta', 'middle')
      ),
      caption: 'Alpha-Beta pruning condition: when beta (<=2) drops below alpha (>=3), the remaining branch is pruned.',
    },
  },

  'ai:1:10': {
    explain: [
      'A Constraint Satisfaction Problem (CSP) represents states as collections of variables with values from specific domains, and finds an assignment that satisfies a set of mathematical constraints.',
      'Backtracking search is the standard baseline algorithm, enhanced with heuristics like MRV and Forward Checking.',
    ],
    definition:
      'A Constraint Satisfaction Problem (CSP) is a search problem defined by variables X_i, domain sets D_i, and constraint relations C_j, solved by depth-first backtracking search interleaved with constraint propagation.',
    formula: '\\text{CSP} = \\langle X, D, C \\rangle, \\quad C_j = \\langle \\text{scope}, \\text{rel} \\rangle',
    steps: [
      'Representation: Variables X, Domains D, Constraints C.',
      'Commutativity: Order of variable assignment does not matter; search tree branching factor is d at depth n.',
      'MRV (Most Constrained Variable): Chooses variable with fewest remaining legal domain values to detect failure fast.',
      'Degree Heuristic: Selects variable involved in largest number of constraints on remaining unassigned variables.',
      'Least Constraining Value (LCV): Prefers the value that rules out the fewest choices for neighboring variables.',
    ],
    examAnswer: [
      'Formally define CSP as a 3-tuple <X, D, C> with variables, domains, and constraints.',
      'Illustrate with Map Coloring or 8-Queens problem formulation.',
      'Define Backtracking Search and explain why it is vastly superior to standard uninformed search for CSP.',
      'State the 3 core heuristics: Minimum Remaining Values (MRV), Degree Heuristic, and Least Constraining Value (LCV).',
    ],
    slip: 'Do not confuse MRV with LCV: MRV selects WHICH VARIABLE to assign next (fail-first), whereas LCV selects WHICH VALUE to try first (fail-last).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CSP CONSTRAINT GRAPH (AUSTRALIA MAP COLORING)', 'ta') +
          C(50, 60, 18) +
          T(50, 64, 'WA', 't', 'middle') +
          C(140, 60, 18) +
          T(140, 64, 'NT', 't', 'middle') +
          C(140, 130, 18) +
          T(140, 134, 'SA', 't', 'middle') +
          C(230, 60, 18) +
          T(230, 64, 'Q', 't', 'middle') +
          C(230, 130, 18) +
          T(230, 134, 'NSW', 't', 'middle') +
          C(310, 130, 18) +
          T(310, 134, 'V', 't', 'middle') +
          L(68, 60, 122, 60) +
          L(59, 74, 126, 120) +
          L(140, 78, 140, 112) +
          L(158, 60, 212, 60) +
          L(154, 120, 216, 74) +
          L(158, 130, 212, 130) +
          L(230, 78, 230, 112) +
          L(248, 130, 292, 130) +
          T(180, 178, 'Variables=Nodes, Constraints=Edges, Domains={R, G, B}', 'ta', 'middle')
      ),
      caption: 'Constraint Graph for Map Coloring (Australia) and CSP Backtracking search.',
    },
  },
};
