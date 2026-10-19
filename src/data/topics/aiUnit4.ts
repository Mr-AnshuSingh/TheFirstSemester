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

/* ---------- AI UNIT 4 TOPIC CONTENT (9 Topics) ---------- */
export const AI_UNIT4_TOPICS: Record<string, TopicContent> = {
  'ai:4:0': {
    explain: [
      'Machine Learning builds mathematical models that improve their performance at tasks through experience.',
      'The field divides into three primary paradigms: Supervised Learning (labeled pairs), Unsupervised Learning (unlabeled pattern discovery), and Reinforcement Learning (reward-driven policies).',
    ],
    definition:
      'Machine Learning encompasses computational algorithms that optimize performance metrics on task experience E with respect to performance measure P, categorized into supervised, unsupervised, and reward-driven reinforcement paradigms.',
    formula: '\\text{Supervised: } \\min_\\theta \\sum L(f_\\theta(x_i), y_i); \\quad \\text{RL Return: } G_t = \\sum_{k=0}^\\infty \\gamma^k R_{t+k+1}',
    steps: [
      'Supervised: Labeled dataset D = {(x_i, y_i)}. Learns mapping f: X -> Y for classification (discrete) or regression (continuous).',
      'Unsupervised: Inputs only D = {x_i}. Learns clustering (k-means) or dimensionality reduction (PCA).',
      'Reinforcement Learning: Agent in Markov Decision Process observes state s_t, takes action a_t, receives reward r_{t+1}.',
      'RL Policy: Learns policy pi(s) maximizing cumulative discounted return G_t = sum gamma^k r.',
      'Exploration vs Exploitation: Balances exploiting known high rewards against exploring unknown actions.',
    ],
    examAnswer: [
      'Enumerate the 3 primary ML paradigms: Supervised, Unsupervised, and Reinforcement Learning.',
      'Construct a comparative table contrasting Data Input, Feedback Mechanism, and Goal for each.',
      'Give clear practical examples for each paradigm: Spam classification for Supervised, Customer segmentation for Unsupervised, Game playing (AlphaGo) for Reinforcement.',
      'Draw the Reinforcement Learning Agent-Environment feedback loop with State, Action, and Reward.',
    ],
    slip: 'Do not say reinforcement learning is supervised; reinforcement learning does NOT receive correct target actions from a teacher, only a scalar numerical evaluation (reward/penalty) after acting.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 3 PARADIGMS OF MACHINE LEARNING', 'ta') +
          R(20, 36, 95, 60) +
          T(67, 52, 'Supervised', 't', 'middle') +
          T(67, 68, 'Labeled Data (x, y)', 'ta', 'middle') +
          T(67, 84, 'Classify / Regress', 't', 'middle') +
          R(132, 36, 95, 60) +
          T(179, 52, 'Unsupervised', 't', 'middle') +
          T(179, 68, 'Unlabeled Data (x)', 'ta', 'middle') +
          T(179, 84, 'Clustering / PCA', 't', 'middle') +
          R(245, 36, 95, 60) +
          T(292, 52, 'Reinforcement', 't', 'middle') +
          T(292, 68, 'Reward Signal (r)', 'ta', 'middle') +
          T(292, 84, 'Policy Max Return', 't', 'middle') +
          R(30, 114, 300, 48) +
          T(180, 134, 'RL Loop: State s_t -> Action a_t -> Reward r_{t+1}', 't', 'middle') +
          T(180, 150, 'Agent optimizes cumulative return: G_t = sum gamma^k r', 'ta', 'middle') +
          T(180, 180, 'Key Challenge in RL: Exploration vs Exploitation dilemma', 'ta', 'middle')
      ),
      caption: 'The three fundamental paradigms of Machine Learning: Supervised, Unsupervised, and Reinforcement Learning.',
    },
  },

  'ai:4:1': {
    explain: [
      'Regression predicts continuous numerical quantities, while classification assigns discrete class labels.',
      'Linear Regression fits a best-fit hyperplane; k-NN uses instance-based neighbor voting; Decision Trees split feature space hierarchically using Shannon Information Gain.',
    ],
    definition:
      'Linear Regression fits optimal continuous weights minimizing squared error; k-NN classifies queries by local neighbor consensus; Decision Trees recursively partition feature space into pure subsets using Shannon Information Gain.',
    formula: 'H(S) = -\\sum_{i=1}^c p_i \\log_2 p_i, \\quad \\text{IG}(S, A) = H(S) - \\sum_{v \\in \\text{Values}(A)} \\frac{|S_v|}{|S|} H(S_v)',
    steps: [
      'Linear Regression: Minimizes MSE J(w,b) = (1/2m) sum (y_hat - y)^2 via gradient descent updates.',
      'k-NN: Lazy non-parametric learner; finds k nearest neighbors via Euclidean distance; predicts by majority vote.',
      'Shannon Entropy: H(S) = -sum p_i log_2(p_i); pure subset has H=0, equal binary mix has H=1.',
      'Information Gain: IG(S, A) measures expected reduction in entropy after splitting on attribute A.',
      'ID3 Algorithm: Greedily selects the attribute with highest Information Gain at each tree level.',
    ],
    examAnswer: [
      'Formulate the Linear Regression hypothesis and Mean Squared Error cost function.',
      'Explain the k-NN classification algorithm step-by-step; explain the effect of k (small k overfits to noise; large k oversmooths).',
      'State the Shannon Entropy formula and explain what H=0 and H=1 signify.',
      'Define Information Gain mathematically and show how it guides tree construction in the ID3 algorithm.',
    ],
    slip: 'In decision trees, do not choose attributes by raw entropy alone; you must choose by Information Gain (reduction in entropy from parent to weighted children).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'REGRESSION, k-NN & DECISION TREE', 'ta') +
          R(20, 36, 95, 80) +
          T(67, 52, 'Linear Reg', 't', 'middle') +
          L(30, 95, 105, 65, 'l') +
          C(45, 95, 3, 'fa') +
          C(60, 75, 3, 'fa') +
          C(85, 78, 3, 'fa') +
          T(67, 108, 'y = wx + b', 'ta', 'middle') +
          R(132, 36, 95, 80) +
          T(179, 52, 'k-NN (k=3)', 't', 'middle') +
          C(179, 80, 16, 'd') +
          C(179, 80, 3, 'fa') +
          C(172, 74, 3) +
          C(185, 72, 3) +
          C(176, 90, 3, 'fa') +
          T(179, 108, 'Majority Vote', 'ta', 'middle') +
          R(245, 36, 95, 80) +
          T(292, 52, 'Decision Tree', 't', 'middle') +
          C(292, 68, 7, 'fa') +
          L(288, 74, 268, 92) +
          L(296, 74, 316, 92) +
          T(268, 104, 'No', 't', 'middle') +
          T(316, 104, 'Yes', 't', 'middle') +
          T(292, 80, 'IG', 'ta', 'middle') +
          R(20, 126, 320, 48) +
          T(30, 144, 'Entropy: H(S) = - sum p_i log_2(p_i)', 'ta') +
          T(30, 162, 'Information Gain: IG(S, A) = H(S) - Remainder(A)', 't')
      ),
      caption: 'Linear Regression fit line, k-NN neighbor voting circle, and Decision Tree entropy split.',
    },
  },

  'ai:4:2': {
    explain: [
      'k-Means is the preeminent unsupervised clustering algorithm that partitions n unlabeled data points into k distinct clusters.',
      'It iteratively assigns each data point to its nearest centroid and then recalculates the centroid as the geometric mean of all assigned points.',
    ],
    definition:
      'k-Means is an unsupervised centroid-based clustering algorithm that iteratively alternates between Voronoi partitioning of data points to nearest centroids and centroid relocation to cluster sample means.',
    formula: 'J = \\sum_{j=1}^k \\sum_{x \\in S_j} ||x - \\mu_j||^2, \\quad \\mu_j = \\frac{1}{|S_j|} \\sum_{x \\in S_j} x',
    steps: [
      'Step 1 (Init): Select k initial centroids mu_1, ..., mu_k randomly.',
      'Step 2 (Assign): Assign each point x_i to nearest centroid: c^{(i)} = argmin_j ||x_i - mu_j||^2.',
      'Step 3 (Update): Recompute each centroid as mean of member points: mu_j = (1/|S_j|) sum x_i.',
      'Step 4 (Repeat): Loop until centroids stabilize or max iterations reached.',
      'Elbow Method: Plots inertia J vs k to locate the elbow point of diminishing returns.',
    ],
    examAnswer: [
      'State the objective function of k-means clustering (Within-Cluster Sum of Squares J).',
      'Detail the 4 sequential algorithmic steps of k-means.',
      'Prove why k-means is guaranteed to converge to a local minimum.',
      'Explain the Elbow Method for selecting the optimal number of clusters k.',
    ],
    slip: 'k-means does not guarantee finding the global optimum; it often converges to local minima depending on initial centroid placement, which is why multiple random restarts or k-means++ initialization is required.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'k-MEANS CLUSTERING & ELBOW METHOD', 'ta') +
          R(20, 36, 150, 95) +
          T(95, 52, 'Cluster Assignment', 't', 'middle') +
          C(60, 80, 5, 'fa') +
          T(60, 72, 'mu_1', 'ta', 'middle') +
          C(45, 90, 2) +
          C(55, 95, 2) +
          C(70, 85, 2) +
          C(130, 80, 5, 'fa') +
          T(130, 72, 'mu_2', 'ta', 'middle') +
          C(115, 90, 2) +
          C(135, 95, 2) +
          C(140, 85, 2) +
          L(95, 45, 95, 115, 'd') +
          T(95, 124, 'Nearest Centroid Partition', 'ta', 'middle') +
          R(190, 36, 150, 95) +
          T(265, 52, 'Elbow Method (Pick k)', 't', 'middle') +
          L(210, 110, 320, 110) +
          L(210, 110, 210, 60) +
          T(202, 64, 'J', 'ta') +
          T(325, 114, 'k', 't') +
          P('M215 65 Q235 95 255 102 T315 108', 'l') +
          C(255, 102, 4, 'fa') +
          T(255, 92, 'Elbow (k*)', 'ta', 'middle') +
          T(180, 155, 'Objective: Minimize WCSS J = sum sum ||x - mu_j||^2', 't', 'middle') +
          T(180, 175, '1. Init k centroids -> 2. Assign points -> 3. Mean update -> 4. Repeat', 'ta', 'middle')
      ),
      caption: 'k-Means 2-step iterative cycle: Voronoi assignment and centroid update, with the Elbow Method curve.',
    },
  },

  'ai:4:3': {
    explain: [
      'Artificial Neural Networks (ANNs) are computational models inspired by biological neural networks.',
      'The Perceptron is the foundational linear unit that calculates a weighted sum of inputs plus a bias and applies an activation function.',
      'Multi-Layer Perceptrons (MLPs) overcome the linear separability limitation of single perceptrons (such as XOR) using hidden layers and non-linear activations.',
    ],
    definition:
      'A Perceptron is an elementary artificial neuron that performs linear classification by computing a weighted combination of input features, thresholded through an activation function, updated by error-correcting delta learning.',
    formula: 'y = f\\left(\\sum_{i=1}^n w_i x_i + b\\right), \\quad w_i \\leftarrow w_i + \\eta (t - y) x_i',
    steps: [
      'Net Input: z = sum w_i x_i + b.',
      'Step Activation: y = 1 if z >= 0, else 0.',
      'Weight Update: Delta w_i = eta * (t - y) * x_i; Delta b = eta * (t - y).',
      'Perceptron Convergence Theorem: Guaranteed to find separating hyperplane in finite steps if data is linearly separable.',
      'XOR Inadequacy: No single straight line can separate (0,1),(1,0) from (0,0),(1,1), necessitating multi-layer networks.',
    ],
    examAnswer: [
      'Draw the Perceptron diagram showing inputs, weights, bias, summation, and activation.',
      'Write the mathematical formula for net input z and output y.',
      'State the Perceptron weight update rule with learning rate eta.',
      'Provide the mathematical proof of why a single perceptron cannot learn the XOR function.',
    ],
    slip: 'Do not forget the bias term b; without bias, the decision boundary is constrained to pass through the origin (0, 0), severely limiting expressive power.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'PERCEPTRON & XOR LINEAR INSEPARABILITY', 'ta') +
          T(20, 48, 'x_1', 't') +
          T(20, 95, 'x_2', 't') +
          T(20, 142, 'x_3', 't') +
          LA(38, 45, 120, 85, 't') +
          LA(38, 92, 120, 92, 't') +
          LA(38, 138, 120, 100, 't') +
          T(68, 56, 'w_1', 'ta') +
          T(68, 86, 'w_2', 'ta') +
          T(68, 126, 'w_3', 'ta') +
          C(145, 95, 25, 'fa') +
          T(145, 91, 'sum + b', 't', 'middle') +
          T(145, 105, 'step', 'ta', 'middle') +
          LA(170, 95, 210, 95, 'a') +
          T(215, 99, 'y', 't') +
          R(240, 36, 105, 115) +
          T(292, 52, 'XOR Problem', 'ta', 'middle') +
          L(250, 125, 335, 125) +
          L(250, 125, 250, 65) +
          C(265, 115, 3, 'fa') +
          T(265, 108, '0', 't', 'middle') +
          C(320, 80, 3, 'fa') +
          T(320, 73, '0', 't', 'middle') +
          C(265, 80, 3) +
          T(265, 73, '1', 'ta', 'middle') +
          C(320, 115, 3) +
          T(320, 108, '1', 'ta', 'middle') +
          T(292, 142, 'Cannot separate!', 'ta', 'middle') +
          T(180, 178, 'Perceptrons learn linearly separable data; MLPs solve XOR', 't', 'middle')
      ),
      caption: 'Perceptron mathematical model and linear separability vs XOR decision boundary.',
    },
  },

  'ai:4:4': {
    explain: [
      'Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language.',
      'The pipeline processes text through tokenization, normalization, POS tagging, and vectorization (TF-IDF), evolving into modern dense word embeddings and Transformer self-attention architectures.',
    ],
    definition:
      'Natural Language Processing (NLP) is the theoretical and applied AI discipline converting unstructured linguistic text into structured numerical representations for semantic comprehension and automated generation.',
    formula: '\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\log\\left(\\frac{|D|}{1 + |\\{d \\in D : t \\in d\\}|}\\right)',
    steps: [
      'Tokenization: Segments raw text strings into discrete word tokens.',
      'Normalization: Lowercasing, stop-word filtering, and Lemmatization.',
      'POS Tagging: Annotates tokens with grammatical categories (noun, verb, adjective).',
      'TF-IDF: Balances within-document term frequency against inverse corpus frequency.',
      'Word Embeddings: Maps words to dense vector spaces where semantic relationships reflect geometry (King - Man + Woman = Queen).',
    ],
    examAnswer: [
      'Detail the steps of the NLP preprocessing pipeline: Tokenization, Stop-word removal, Stemming vs Lemmatization.',
      'Define TF-IDF and write down its mathematical formula.',
      'Explain Word2Vec word embeddings and semantic vector arithmetic.',
      'Differentiate Stemming (heuristic suffix chopping) from Lemmatization (vocabulary and morphological dictionary analysis).',
    ],
    slip: 'Do not confuse stemming with lemmatization: stemming uses crude heuristic rules (e.g. Porter stemmer chops "studies" to "studi"), while lemmatization uses dictionary lemmas ("studies" to "study").',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'NATURAL LANGUAGE PROCESSING PIPELINE', 'ta') +
          R(20, 36, 70, 44) +
          T(55, 52, 'Raw Text', 't', 'middle') +
          T(55, 68, '"AI rocks"', 'ta', 'middle') +
          LA(90, 58, 110, 58, 'a') +
          R(110, 36, 75, 44) +
          T(147, 52, 'Tokenize', 't', 'middle') +
          T(147, 68, '["AI","rocks"]', 'ta', 'middle') +
          LA(185, 58, 205, 58, 'a') +
          R(205, 36, 70, 44) +
          T(240, 52, 'Lemmatize', 't', 'middle') +
          T(240, 68, '"rock"', 'ta', 'middle') +
          LA(275, 58, 295, 58, 'a') +
          R(295, 36, 50, 44, 'fa') +
          T(320, 52, 'POS', 't', 'middle') +
          T(320, 68, 'NN/VB', 'ta', 'middle') +
          R(30, 105, 300, 44) +
          T(180, 122, 'Vectorization: TF-IDF & Word2Vec Embeddings', 'ta', 'middle') +
          T(180, 138, 'King - Man + Woman = Queen (Semantic Vector Arithmetic)', 't', 'middle') +
          T(180, 175, 'Modern NLP: Transformers & Multi-Head Self-Attention', 'ta', 'middle')
      ),
      caption: 'Natural Language Processing text preprocessing pipeline from raw text to TF-IDF vectors.',
    },
  },

  'ai:4:5': {
    explain: [
      'Computer Vision enables machines to extract high-level semantic understanding from digital images and video streams.',
      'While classical vision relied on hand-crafted convolution kernels, modern vision utilizes Convolutional Neural Networks (CNNs) to automatically learn hierarchical visual features.',
    ],
    definition:
      'Computer Vision is the computational discipline enabling algorithmic extraction, processing, and understanding of visual structure from digital imagery, dominated by Convolutional Neural Networks (CNNs).',
    formula: 'S(i, j) = (I * K)(i, j) = \\sum_m \\sum_n I(i-m, j-n) K(m, n), \\quad \\text{Max-Pool: } P(i,j) = \\max_{m,n} X(2i+m, 2j+n)',
    steps: [
      'Image Matrix: Digital grid of pixels (Grayscale HxWx1, RGB HxWx3).',
      'Convolutional Layer: Slides learnable filter kernel across image calculating feature dot products.',
      'Output Size: O = floor((W - K + 2P)/S) + 1.',
      'Max Pooling: Downsamples feature maps by taking maximum values, halving spatial dimensions.',
      'Feature Hierarchy: Early layers detect edges/lines; deeper layers identify composite objects and faces.',
    ],
    examAnswer: [
      'Explain the role of Convolution layers, ReLU activation, and Max Pooling layers in a CNN.',
      'Write the output size formula O = (W - K + 2P)/S + 1 and define each parameter.',
      'Explain why CNNs are vastly superior to traditional Multi-Layer Perceptrons for images (parameter sharing, local receptive fields).',
      'Differentiate Image Classification, Object Detection, and Semantic Segmentation.',
    ],
    slip: 'Do not confuse convolution with pooling: convolution extracts learnable spatial features using weighted filters; pooling performs fixed downsampling (max/average) with zero learnable parameters.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CONVOLUTIONAL NEURAL NETWORK (CNN)', 'ta') +
          R(20, 40, 50, 50) +
          T(45, 68, 'Input Image', 't', 'middle') +
          T(45, 82, '32x32', 'ta', 'middle') +
          LA(70, 65, 95, 65, 'a') +
          R(95, 45, 40, 40, 'fa') +
          T(115, 68, 'Conv', 't', 'middle') +
          T(115, 80, 'Filter', 'ta', 'middle') +
          LA(135, 65, 160, 65, 'a') +
          R(160, 50, 30, 30) +
          T(175, 68, 'Pool', 't', 'middle') +
          LA(190, 65, 215, 65, 'a') +
          R(215, 42, 35, 46, 'fa') +
          T(232, 68, 'Conv2', 't', 'middle') +
          LA(250, 65, 275, 65, 'a') +
          R(275, 36, 18, 58) +
          T(284, 68, 'FC', 'ta', 'middle') +
          LA(293, 65, 315, 65, 'a') +
          T(325, 68, 'Softmax', 't') +
          T(180, 126, 'Hierarchical: Edges -> Textures -> Parts -> Objects', 'ta', 'middle') +
          R(20, 142, 320, 36) +
          T(30, 164, 'Max-Pool halves resolution: reduces computation & yields spatial invariance', 't')
      ),
      caption: 'Convolutional Neural Network (CNN) architecture: Conv, ReLU, Pooling, and Dense classification.',
    },
  },

  'ai:4:6': {
    explain: [
      'An Expert System is a domain-specific computer program that emulates the decision-making ability of a human expert.',
      'It combines a structured Knowledge Base of domain rules with an independent Inference Engine and an Explanation Facility.',
    ],
    definition:
      'An Expert System is an AI software system that captures human expert heuristics within a declarative knowledge base, using an inference engine and explanation facility to solve complex consultation problems.',
    formula: '\\text{Expert System} = \\text{Knowledge Base (Rules)} + \\text{Inference Engine} + \\text{Explanation Facility}',
    steps: [
      'Separation of Knowledge and Control: Knowledge Base stores rules; Inference Engine executes deduction.',
      'Working Memory: Stores transient case-specific findings and dynamic facts.',
      'Explanation Facility: Answers "WHY" (displays active rule goal) and "HOW" (traces fired rule chain).',
      'Knowledge Acquisition Bottleneck: Extracting implicit heuristics from experts is tedious and error-prone.',
      'Classic examples: MYCIN (medical blood infection diagnosis) and DENDRAL (chemical spectrometry).',
    ],
    examAnswer: [
      'Draw the complete block diagram of an Expert System with all 5 core modules.',
      'Explain the significance of separating the Knowledge Base from the Inference Engine.',
      'Explain the function of the Explanation Facility ("WHY" and "HOW" queries).',
      'Cite classic historical systems: MYCIN (medical diagnosis) and DENDRAL (mass spectrometry).',
    ],
    slip: 'Do not claim expert systems learn automatically; classic expert systems possess zero automated learning and depend entirely on manual rule engineering via knowledge engineers.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'EXPERT SYSTEM ARCHITECTURE', 'ta') +
          R(20, 36, 85, 48) +
          T(62, 54, 'Human User', 't', 'middle') +
          T(62, 70, '(Consultation)', 'ta', 'middle') +
          LA(105, 60, 135, 60, 'a') +
          R(135, 36, 90, 48) +
          T(180, 54, 'User Interface', 't', 'middle') +
          T(180, 70, '& Explanation', 'ta', 'middle') +
          LA(225, 60, 255, 60, 'a') +
          R(255, 36, 85, 48, 'fa') +
          T(297, 54, 'Inference', 't', 'middle') +
          T(297, 70, 'Engine', 'ta', 'middle') +
          LA(297, 84, 297, 114, 'a') +
          R(240, 114, 110, 48) +
          T(295, 134, 'Knowledge Base', 't', 'middle') +
          T(295, 150, '(IF-THEN Rules)', 'ta', 'middle') +
          R(100, 114, 110, 48) +
          T(155, 134, 'Working Memory', 't', 'middle') +
          T(155, 150, '(Current Case Data)', 'ta', 'middle') +
          LA(240, 138, 210, 138, 'a') +
          T(180, 182, 'Strict separation: Knowledge Base (Data) vs Inference Engine (Control)', 'ta', 'middle')
      ),
      caption: 'Modular architecture of an Expert System showing separation of Knowledge Base and Inference Engine.',
    },
  },

  'ai:4:7': {
    explain: [
      'Robotics is the science of embodied physical agents that perceive the physical world through sensors and manipulate it through actuators.',
      'Intelligent robotics merges AI planning and perception with mechanical kinematics and real-time feedback control loops.',
    ],
    definition:
      'Robotics integrates AI perception, spatial planning, and feedback control onto physical mechanical platforms to execute autonomous manipulation and navigation tasks within dynamic environments.',
    formula: '\\text{Forward Kinematics: } \\mathbf{x} = f(\\boldsymbol{\\theta}), \\quad \\text{Inverse Kinematics: } \\boldsymbol{\\theta} = f^{-1}(\\mathbf{x})',
    steps: [
      'Sense-Plan-Act Paradigm: Sensors feed state to AI planner, which sends commands to motor actuators.',
      'Proprioceptive vs Exteroceptive: Internal joint sensors (encoders, IMUs) vs external environment sensors (LiDAR, cameras).',
      'Forward Kinematics: Computes end-effector Cartesian pose (x, y, z) from joint angles theta.',
      'Inverse Kinematics: Computes required joint angles theta to reach target Cartesian pose.',
      'SLAM: Simultaneous Localization and Mapping builds environment map while simultaneously tracking robot position.',
    ],
    examAnswer: [
      'Draw the Sense-Plan-Act robotic feedback loop.',
      'Differentiate Proprioceptive sensors (encoders, IMU) from Exteroceptive sensors (LiDAR, cameras).',
      'Define Forward Kinematics vs Inverse Kinematics clearly with mathematical mapping notation.',
      'Define SLAM (Simultaneous Localization and Mapping) and state why it is fundamental for autonomous mobile robots.',
    ],
    slip: 'Do not think inverse kinematics is as straightforward as forward kinematics; forward kinematics is a simple unique matrix multiplication, whereas inverse kinematics is non-linear, computationally expensive, and can have multiple or zero solutions.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'ROBOTICS: SENSE-PLAN-ACT & KINEMATICS', 'ta') +
          R(30, 36, 80, 44) +
          T(70, 54, 'Sensors', 't', 'middle') +
          T(70, 70, '(LiDAR, IMU)', 'ta', 'middle') +
          LA(110, 58, 140, 58, 'a') +
          R(140, 36, 80, 44, 'fa') +
          T(180, 54, 'AI Planner', 't', 'middle') +
          T(180, 70, '(Trajectory)', 'ta', 'middle') +
          LA(220, 58, 250, 58, 'a') +
          R(250, 36, 80, 44) +
          T(290, 54, 'Actuators', 't', 'middle') +
          T(290, 70, '(Motors/Gears)', 'ta', 'middle') +
          LA(290, 80, 290, 110, 'a') +
          R(100, 110, 160, 30) +
          T(180, 128, 'Physical Environment', 't', 'middle') +
          LA(100, 125, 70, 80, 'a') +
          T(180, 162, 'Forward: Joint angles theta -> End-effector (x, y, z)', 'ta', 'middle') +
          T(180, 178, 'Inverse Kinematics: Target (x, y, z) -> Required angles theta', 't', 'middle')
      ),
      caption: 'Sense-Plan-Act robotic control loop and Forward vs Inverse Kinematics.',
    },
  },

  'ai:4:8': {
    explain: [
      'As AI systems scale into criminal justice, healthcare, hiring, and finance, ethical and societal implications become paramount.',
      'Core challenges include algorithmic bias, opacity of black-box models, data privacy breaches, and automation labor disruption, counterbalanced by tremendous positive alignment with UN Sustainable Development Goals (SDGs).',
    ],
    definition:
      'Responsible AI encompasses the ethical, legal, and sociological principles governing algorithmic fairness, model transparency, data privacy, safety alignment, and beneficial societal contribution aligned with UN Sustainable Development Goals.',
    formula: '\\text{Responsible AI} = \\text{Fairness} + \\text{Transparency (XAI)} + \\text{Privacy} + \\text{Accountability} + \\text{Safety}',
    steps: [
      'Algorithmic Bias: Models replicate and amplify historical sampling biases in training data.',
      'Explainable AI (XAI): Requires interpretable models or post-hoc attribution (SHAP/LIME) for auditability.',
      'Data Privacy: Differential Privacy and Federated Learning preserve privacy without centralizing raw data.',
      'Safety and Alignment: Ensuring autonomous objectives strictly match human intent without reward hacking.',
      'UN SDGs: Accelerating Clean Energy (SDG 7), Healthcare diagnostics (SDG 3), and Climate Action (SDG 13).',
    ],
    examAnswer: [
      'Explain how algorithmic bias enters AI systems through biased training data.',
      'Define Explainable AI (XAI) and why interpretability is legally mandatory in healthcare and lending.',
      'State the core principles of Responsible AI: Fairness, Transparency, Privacy, Accountability, and Safety.',
      'Detail at least three UN Sustainable Development Goals (SDGs) actively accelerated by AI technologies.',
    ],
    slip: 'Do not claim an AI algorithm is automatically "unbiased" because it does not include sensitive attributes (e.g. race, gender); proxy variables (such as zip code or browsing habits) easily leak protected attributes into the model.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'RESPONSIBLE AI & UN SUSTAINABLE DEVELOPMENT GOALS', 'ta') +
          R(20, 36, 95, 52) +
          T(67, 54, 'Fairness', 't', 'middle') +
          T(67, 72, 'Mitigate Bias', 'ta', 'middle') +
          R(132, 36, 95, 52) +
          T(179, 54, 'XAI / Transparency', 't', 'middle') +
          T(179, 72, 'Audit Black-Box', 'ta', 'middle') +
          R(245, 36, 95, 52) +
          T(292, 54, 'Privacy', 't', 'middle') +
          T(292, 72, 'Diff Privacy', 'ta', 'middle') +
          R(30, 102, 300, 44) +
          T(180, 120, 'UN SDGs: Clean Energy (7) · Health (3) · Climate (13)', 'ta', 'middle') +
          T(180, 136, 'Algorithmic alignment with human welfare and sustainability', 't', 'middle') +
          T(180, 172, 'Core Mandate: Accurate, Explainable, Fair, and Secure', 'ta', 'middle')
      ),
      caption: 'Ethical AI governance framework and alignment with UN Sustainable Development Goals.',
    },
  },
};
