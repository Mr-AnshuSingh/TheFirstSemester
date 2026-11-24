"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  BookOpen,
  CheckCircle2,
  XCircle,
  Award,
  Target,
  HelpCircle,
  FileText,
  Zap,
  Printer,
  ArrowLeft,
  Calculator,
  Sparkles,
  Filter,
  CheckSquare,
  Square,
  Cpu,
  Layers,
  Play,
  RotateCcw,
  Lightbulb,
  Search,
  Check,
  ChevronRight,
  BookmarkCheck,
  AlertCircle,
  Compass,
  Maximize2,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import {
  MIDSEM_DATA,
  BEU_REAL_PAPERS_2026,
  MidsemCourse,
  MidsemUnit,
  BeuPaper,
} from '@/data/midsemNotes';
import { MIDSEM_MCQS, MidsemMcq } from '@/data/midsemMCQs';
import { MIDSEM_DIAGRAMS, MidsemDiagram } from '@/data/midsemDiagrams';
import { LNJPIT_EXAM_SITTINGS, LNJPIT_EXAM_NOTICE, ExamSitting } from '@/data/midsemTimetable';
import { MIDSEM_PRACTICE_QUESTIONS, MidsemPracticeItem } from '@/data/midsemPracticeQues';
import { KatexText } from '@/components/study/KatexRenderer';

// Safe Math Text wrapper
const MathText: React.FC<{ text: string | null | undefined; className?: string }> = ({ text, className }) => (
  <KatexText htmlOrText={text} className={`whitespace-pre-wrap ${className || ''}`} />
);

type ViewTab = 'notes' | 'practice' | 'mcq' | 'papers' | 'diagrams' | 'chapters' | 'simulator' | 'predictor' | 'calculator';

// Comprehensive Chapter & Syllabus Topic Mapping for BEU 1st Sem M&C
interface ChapterMapping {
  subjectCode: string;
  subjectShort: string;
  subjectTitle: string;
  unitNo: number;
  unitTitle: string;
  chapters: {
    chapterNo: number;
    title: string;
    topics: string[];
    weightage: string;
    examTips: string;
  }[];
}

const SYLLABUS_CHAPTER_MAPPINGS: ChapterMapping[] = [
  // --- CFET (100108) ---
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 1,
    unitTitle: 'Fundamentals of Computing & Architecture',
    chapters: [
      {
        chapterNo: 1,
        title: 'Computer Evolution & Stored Program Concept',
        topics: ['Evolution of Computers (Generations 1-5)', 'Von Neumann Architecture Principle', 'Harvard vs Von Neumann Architecture', 'Von Neumann Bottleneck & Mitigations'],
        weightage: '4 Marks (Compulsory subparts or Q2)',
        examTips: 'Always draw the 4-box block diagram: CPU (ALU + CU + Registers), Memory, I/O, and System Bus.'
      },
      {
        chapterNo: 2,
        title: 'CPU Internal Organization & Registers',
        topics: ['Arithmetic Logic Unit (ALU)', 'Control Unit (Hardwired vs Microprogrammed)', 'Internal Registers: PC, MAR, MDR, IR, Accumulator', 'Fetch-Decode-Execute Cycle'],
        weightage: '4 Marks (Frequent)',
        examTips: 'Explain PC increment step and differentiate between MAR and MDR clearly.'
      },
      {
        chapterNo: 3,
        title: 'Memory Architecture & Memory Hierarchy',
        topics: ['Memory Pyramid (Speed vs Cost vs Capacity)', 'Cache Memory & Multi-Level Cache (L1, L2, L3)', 'Locality of Reference (Temporal & Spatial)', 'Average Memory Access Time (T_avg) Formula', 'Primary vs Secondary Storage'],
        weightage: '4 Marks (Numerical or Theory)',
        examTips: 'Memorize T_avg = h * t_c + (1 - h) * t_m. Show numerical substitution step-by-step.'
      },
    ]
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 2,
    unitTitle: 'Data Representation & Signed Arithmetic',
    chapters: [
      {
        chapterNo: 1,
        title: 'Number Systems & Base Conversions',
        topics: ['Binary, Octal, Decimal, Hexadecimal Radixes', 'Integer Radix Conversion (Repeated Division)', 'Fractional Radix Conversion (Repeated Multiplication)', 'Direct Binary-Octal (3-bit) and Binary-Hex (4-bit) Grouping'],
        weightage: '4 Marks (Guaranteed in Mid-Sem)',
        examTips: 'Group 3 bits from radix point for octal and 4 bits for hex. Always specify subscripts like (365.125)₁₀.'
      },
      {
        chapterNo: 2,
        title: 'Signed Numbers & 2&apos;s Complement Arithmetic',
        topics: ['Signed-Magnitude representation', '1\'s Complement Representation', '2&apos;s Complement Subtraction Arithmetic', 'End-Around Carry Rules', 'Hardware Overflow Detection (V = Cin XOR Cout)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'For 2&apos;s complement subtraction (+A) - (+B), compute 2&apos;s complement of B, add to A, and discard end carry.'
      },
      {
        chapterNo: 3,
        title: 'Floating Point & Character Encoding',
        topics: ['IEEE 754 32-Bit Single Precision Format (1s, 8e, 23m)', 'Normalized Scientific Representation', 'ASCII (7-bit & 8-bit)', 'Unicode & UTF-8 Encoding'],
        weightage: '1-4 Marks',
        examTips: 'Remember exponent bias for 32-bit single precision is 127.'
      },
    ]
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 3,
    unitTitle: 'Digital Logic & Operating Systems',
    chapters: [
      {
        chapterNo: 1,
        title: 'Boolean Algebra & Universal Gates',
        topics: ['Boolean Axioms & De Morgan\'s Laws', 'Canonical SOP and POS Forms', 'Universal Gate Proof: NAND Only Implementations', 'Universal Gate Proof: NOR Only Implementations'],
        weightage: '4 Marks',
        examTips: 'Show how NOT, AND, OR are each constructed using NAND and NOR gates.'
      },
      {
        chapterNo: 2,
        title: 'K-Map Minimization & Combinational Adders',
        topics: ['3-Variable and 4-Variable Karnaugh Maps', 'Gray Code Cell Addressing (00, 01, 11, 10)', 'Grouping Rules: Pairs, Quads, Octets with Don\'t Care (d)', 'Half Adder Design (XOR + AND)', 'Full Adder Design (2 Half Adders + 1 OR gate)'],
        weightage: '4 Marks',
        examTips: 'Clearly circle your groupings in the K-Map and write the factored minimal SOP expression.'
      },
      {
        chapterNo: 3,
        title: 'Operating System Principles',
        topics: ['OS as Resource Manager (CPU, Memory, File, I/O)', 'Kernel Architecture & System Calls Interface', 'Process vs Program Comparison', '5-State Process Lifecycle (New, Ready, Running, Waiting, Terminated)'],
        weightage: '4 Marks',
        examTips: 'Draw the 5-state transition diagram with dispatch, interrupt, I/O wait, and exit arrows.'
      },
    ]
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 4,
    unitTitle: 'Computer Networks & Topologies',
    chapters: [
      {
        chapterNo: 1,
        title: 'Transmission Media & Topologies',
        topics: ['Guided Media: Twisted Pair (UTP/STP), Coaxial, Optical Fibre', 'Topologies: Star, Bus, Ring, Full Mesh Comparison', 'Fault Tolerance & Cabling Formulas (N(N-1)/2 for Mesh)', 'Campus Network Medium Selection'],
        weightage: '4 Marks',
        examTips: 'Highlight why Optical Fibre is ideal between university campus buildings (high bandwidth, zero EMI).'
      },
      {
        chapterNo: 2,
        title: 'Network Protocols & OSI Layers',
        topics: ['TCP vs UDP Comparison (Reliability vs Latency)', 'TCP 3-Way Handshake (SYN, SYN-ACK, ACK)', 'DNS (Domain Name Resolution)', 'OSI 7-Layer vs TCP/IP 5-Layer Hierarchy'],
        weightage: '4 Marks',
        examTips: 'Draw the 3-Way Handshake timing diagram with Seq = x, Seq = y, Ack = x+1, Ack = y+1.'
      },
    ]
  },
  {
    subjectCode: '100108',
    subjectShort: 'CFET',
    subjectTitle: 'Computer Fundamentals & Emerging Technologies',
    unitNo: 5,
    unitTitle: 'Cybersecurity & Emerging Technologies',
    chapters: [
      {
        chapterNo: 1,
        title: 'Cybersecurity & The CIA Triad',
        topics: ['Confidentiality (AES-256 Encryption, Access Control)', 'Integrity (SHA-256 Hashing, Digital Signatures)', 'Availability (Redundancy, Backups, DDoS Mitigation)', 'Common Cyber Threats (Phishing, Ransomware, MITM)'],
        weightage: '4 Marks',
        examTips: 'Provide a real-world banking example for every leg of the CIA triangle.'
      },
      {
        chapterNo: 2,
        title: 'Blockchain & AI Overview',
        topics: ['Blockchain Immutability via Cryptographic Hashing', 'Previous Block Hash Pointer & Distributed Consensus', 'AI & Machine Learning Paradigms (Supervised, Unsupervised, Reinforcement)'],
        weightage: '4 Marks',
        examTips: 'Explain the avalanche effect: changing 1 bit in Block N invalidates hashes across the entire forward chain.'
      },
    ]
  },

  // --- BEEE (100111) ---
  {
    subjectCode: '100111',
    subjectShort: 'BEEE',
    subjectTitle: 'Basic Electrical & Electronics Engineering',
    unitNo: 1,
    unitTitle: 'DC Circuits & Network Theorems',
    chapters: [
      {
        chapterNo: 1,
        title: 'Circuit Fundamentals & Mesh/Nodal Analysis',
        topics: ['Ohm\'s Law, KCL and KVL', 'Independent and Dependent Sources', 'Mesh Current Analysis Matrix Equations', 'Node Voltage Analysis with Supernodes'],
        weightage: '4 Marks',
        examTips: 'Carefully maintain sign conventions (+ to - is voltage drop) when writing loop KVL.'
      },
      {
        chapterNo: 2,
        title: 'Thevenin\'s & Norton\'s Theorems',
        topics: ['Thevenin Equivalent Circuit (V_th and R_th)', 'Norton Equivalent Circuit (I_N and R_th)', 'Source Transformation (I_N = V_th / R_th)', 'Superposition Theorem Application Rules'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Remember to deactivate sources when finding R_th: open-circuit current sources and short-circuit voltage sources.'
      },
      {
        chapterNo: 3,
        title: 'Maximum Power Transfer Theorem',
        topics: ['Condition for Maximum Power (R_L = R_th)', 'Mathematical Derivation of P_max = V_th² / (4 R_th)', 'Efficiency under Maximum Power Transfer (exactly 50%)'],
        weightage: '4 Marks (Guaranteed Numerical)',
        examTips: 'State the theorem, calculate V_th and R_th, set R_L = R_th, and compute P_max with units (Watts).'
      },
    ]
  },
  {
    subjectCode: '100111',
    subjectShort: 'BEEE',
    subjectTitle: 'Basic Electrical & Electronics Engineering',
    unitNo: 2,
    unitTitle: 'AC Circuits & Resonance',
    chapters: [
      {
        chapterNo: 1,
        title: 'Single-Phase AC Fundamentals',
        topics: ['Sinusoidal AC Waveforms & Phasor Representation', 'Average and RMS Value Derivations', 'Form Factor (k_f = 1.11) and Peak Factor (k_p = 1.414)', 'Active Power (P = VI cos φ), Reactive Power (Q), Apparent Power (S)'],
        weightage: '4 Marks',
        examTips: 'Show the calculus integration steps for RMS: V_rms = sqrt((1/2π) ∫ V_m² sin²θ dθ) = V_m / √2.'
      },
      {
        chapterNo: 2,
        title: 'Series RLC Circuit & Resonance',
        topics: ['Series RLC Impedance Z = R + j(X_L - X_C)', 'Resonant Frequency Derivation (f_0 = 1 / [2π √(LC)])', 'Impedance at Resonance (Z = R minimum, Unity Power Factor)', 'Quality Factor Q = (1/R) √(L/C) and Bandwidth BW = f_0 / Q'],
        weightage: '4 Marks (High Probability Numerical)',
        examTips: 'At resonance, reactive components cancel completely. Current is maximum I_0 = V / R.'
      },
      {
        chapterNo: 3,
        title: 'Balanced Three-Phase Systems',
        topics: ['Star (Y) Connection: Line vs Phase Relations (V_L = √3 V_ph, I_L = I_ph)', 'Delta (Δ) Connection: Line vs Phase Relations (V_L = V_ph, I_L = √3 I_ph)', 'Three-Phase Power Formula P = √3 V_L I_L cos φ'],
        weightage: '4 Marks',
        examTips: 'Draw the star connection phasor diagram showing the 30° phase shift between line and phase voltages.'
      },
    ]
  },
  {
    subjectCode: '100111',
    subjectShort: 'BEEE',
    subjectTitle: 'Basic Electrical & Electronics Engineering',
    unitNo: 3,
    unitTitle: 'Semiconductor Diodes & Transistors',
    chapters: [
      {
        chapterNo: 1,
        title: 'Semiconductor Materials & P-N Junction',
        topics: ['Intrinsic vs Extrinsic Semiconductors', 'N-Type (Pentavalent) vs P-Type (Trivalent) Doping', 'Law of Mass Action (n * p = n_i²)', 'P-N Junction Depletion Layer & Barrier Potential (0.7V Si, 0.3V Ge)', 'Forward and Reverse Bias V-I Characteristics'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Sketch the complete diode V-I curve showing forward knee voltage and reverse breakdown voltage.'
      },
      {
        chapterNo: 2,
        title: 'Rectifiers & Voltage Regulators',
        topics: ['Half-Wave Rectifier Derivations (V_dc = Vm/π, η = 40.6%, γ = 1.21)', 'Full-Wave Bridge Rectifier Derivations (V_dc = 2Vm/π, η = 81.2%, γ = 0.482)', 'Zener Diode vs Avalanche Breakdown Mechanisms', 'Zener Diode as Shunt Voltage Regulator (Series Resistor R_s Calculation)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'For Zener regulator numericals, calculate R_s = (V_in(min) - V_Z) / (I_Z(min) + I_L(max)).'
      },
      {
        chapterNo: 3,
        title: 'Bipolar Junction Transistor (BJT)',
        topics: ['BJT Structure: Emitter, Base, Collector Roles & Doping Levels', 'Common Emitter (CE) Configuration & Characteristic Curves', 'Operating Regions: Cutoff, Active, and Saturation', 'Current Gain Relationship Proof: β = α / (1 - α)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Begin from KCL: I_E = I_B + I_C. Substitute I_E = I_C/α and I_B = I_C/β to derive the formula.'
      },
    ]
  },

  // --- Mathematics-I (100102) ---
  {
    subjectCode: '100102',
    subjectShort: 'Math-I',
    subjectTitle: 'Engineering Mathematics-I',
    unitNo: 1,
    unitTitle: 'Matrices & Linear Algebra',
    chapters: [
      {
        chapterNo: 1,
        title: 'Matrix Rank & Canonical Normal Form',
        topics: ['Elementary Row and Column Operations', 'Row Echelon Form', 'Reduction to Normal Canonical Form [I_r, 0; 0, 0]', 'Determination of Rank ρ(A)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Remember that column operations can only be used when reducing to Normal Form, NOT for finding inverse or solving AX = B.'
      },
      {
        chapterNo: 2,
        title: 'System of Linear Equations',
        topics: ['Matrix Equation AX = B & Augmented Matrix [A|B]', 'Rouche-Capelli Consistency Criteria', 'Unique Solution (ρ(A) = ρ(A|B) = n)', 'Infinitely Many Solutions (ρ(A) = ρ(A|B) < n)', 'Homogeneous System AX = O Non-Trivial Solution (|A| = 0)'],
        weightage: '4 Marks',
        examTips: 'Check consistency first before applying back substitution to solve for x, y, z.'
      },
      {
        chapterNo: 3,
        title: 'Eigenvalues & Cayley-Hamilton Theorem',
        topics: ['Characteristic Equation |A - λI| = 0', 'Eigenvalues and Eigenvectors Computation', 'Properties: Trace = Sum of Eigenvalues, Det = Product of Eigenvalues', 'Cayley-Hamilton Theorem Statement & Verification', 'Computation of A⁻¹ and A³ using Cayley-Hamilton Equation'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'To find A⁻¹, multiply the characteristic matrix polynomial by A⁻¹ and solve for A⁻¹ directly.'
      },
    ]
  },
  {
    subjectCode: '100102',
    subjectShort: 'Math-I',
    subjectTitle: 'Engineering Mathematics-I',
    unitNo: 2,
    unitTitle: 'Single Variable Differential Calculus',
    chapters: [
      {
        chapterNo: 1,
        title: 'Mean Value Theorems & Series Expansions',
        topics: ['Rolle\'s Theorem Conditions and Geometric Meaning', 'Lagrange\'s Mean Value Theorem (LMVT)', 'Cauchy\'s Mean Value Theorem (CMVT)', 'Taylor\'s and Maclaurin\'s Series Expansions', 'Indeterminate Forms & L\'Hopital\'s Rule'],
        weightage: '4 Marks',
        examTips: 'For Rolle\'s theorem, verify continuity on [a,b], differentiability on (a,b), and f(a) = f(b) before solving f\'(c) = 0.'
      },
      {
        chapterNo: 2,
        title: 'Successive Differentiation & Leibnitz Theorem',
        topics: ['n-th Order Derivatives of Standard Functions', 'Leibnitz\'s Theorem for n-th Derivative of a Product (u * v)', 'Proof of (1 - x²) y_{n+2} - (2n + 1)x y_{n+1} - n² y_n = 0 for y = (sin⁻¹ x)²', 'Radius of Curvature ρ = [1 + y₁²]^(3/2) / y₂'],
        weightage: '4 Marks (Guaranteed Topper Question)',
        examTips: 'Differentiate y twice to obtain (1 - x²) y₂ - x y₁ - 2 = 0, then apply Leibnitz theorem term-by-term.'
      },
    ]
  },
  {
    subjectCode: '100102',
    subjectShort: 'Math-I',
    subjectTitle: 'Engineering Mathematics-I',
    unitNo: 3,
    unitTitle: 'Multivariable Calculus & Extrema',
    chapters: [
      {
        chapterNo: 1,
        title: 'Partial Differentiation & Euler\'s Theorem',
        topics: ['First and Second Order Partial Derivatives', 'Homogeneous Functions Definition', 'Euler\'s Theorem 1st Order: x u_x + y u_y = n u', 'Euler\'s Theorem 2nd Order: x² u_xx + 2xy u_xy + y² u_yy = n(n-1)u', 'Application to composite inverse trigonometric functions'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'For u = sin⁻¹[(x+y)/(√x+√y)], let z = sin u. Find degree n = 1/2 of z, apply Euler to z, then divide by cos u.'
      },
      {
        chapterNo: 2,
        title: 'Maxima, Minima & Saddle Points',
        topics: ['Stationary Points (f_x = 0 and f_y = 0)', 'Second Derivative Quantities: r = f_xx, s = f_xy, t = f_yy', 'Discriminant rt - s² > 0 with r < 0 (Maximum) vs r > 0 (Minimum)', 'Saddle Point Condition (rt - s² < 0)', 'Lagrange\'s Method of Multipliers'],
        weightage: '4 Marks',
        examTips: 'List stationary points in a table and evaluate r, s, t, rt - s² to classify each point.'
      },
    ]
  },

  // --- Physics (100104) ---
  {
    subjectCode: '100104',
    subjectShort: 'Physics',
    subjectTitle: 'Engineering Physics',
    unitNo: 1,
    unitTitle: 'Wave Optics (Interference & Diffraction)',
    chapters: [
      {
        chapterNo: 1,
        title: 'Interference & Newton\'s Rings',
        topics: ['Thin Film Interference & Cosine Law', 'Stokes\' Phase Shift (λ/2 path change at denser boundary)', 'Newton\'s Rings: Proof of Central Dark Spot', 'Dark Ring Diameters D_n² = 4nλR', 'Determination of Light Wavelength λ and Liquid Refractive Index μ'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'State the path difference Δ = 2t + λ/2. At center t = 0, Δ = λ/2 (destructive interference), proving it is always dark.'
      },
      {
        chapterNo: 2,
        title: 'Diffraction & Resolving Power',
        topics: ['Fraunhofer Single-Slit Diffraction: Minima Condition (a sin θ = m λ)', 'Central Maximum Angular Width (2λ / a)', 'Plane Transmission Diffraction Grating', 'Resolving Power of Grating (RP = n * N)'],
        weightage: '4 Marks',
        examTips: 'Distinguish between interference (superposition of waves from 2 coherent sources) and diffraction (superposition of secondary wavelets from same wavefront).'
      },
    ]
  },
  {
    subjectCode: '100104',
    subjectShort: 'Physics',
    subjectTitle: 'Engineering Physics',
    unitNo: 2,
    unitTitle: 'Lasers & Fiber Optics',
    chapters: [
      {
        chapterNo: 1,
        title: 'Lasers & He-Ne Gas Laser',
        topics: ['Stimulated vs Spontaneous Emission & Einstein Coefficients A_21, B_21', 'Population Inversion & Metastable States', 'He-Ne Gas Laser Construction & Gas Ratio (10:1 He:Ne)', 'Resonant Energy Transfer & 632.8 nm Red Output Transition'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Draw the 4-level energy diagram showing 20.61 eV He* transfer to 3s Ne level, followed by 3s -> 2p lasing transition.'
      },
      {
        chapterNo: 2,
        title: 'Optical Fibers & Propagation',
        topics: ['Total Internal Reflection in Step-Index Fiber', 'Numerical Aperture Derivation: NA = √(n₁² - n₂²)', 'Acceptance Angle θ_a = sin⁻¹(NA)', 'Normalized Frequency (V-Number) & Single-Mode Condition (V < 2.405)'],
        weightage: '4 Marks (Guaranteed Numerical)',
        examTips: 'Apply Snell\'s law at entrance: n_0 sin θ_a = n_1 cos θ_c, with sin θ_c = n_2 / n_1.'
      },
    ]
  },
  {
    subjectCode: '100104',
    subjectShort: 'Physics',
    subjectTitle: 'Engineering Physics',
    unitNo: 3,
    unitTitle: 'Electromagnetism & Magnetic Materials',
    chapters: [
      {
        chapterNo: 1,
        title: 'Maxwell\'s Equations & Displacement Current',
        topics: ['Maxwell\'s 4 Field Equations (Differential & Integral Forms)', 'Inconsistency in Ampere\'s Law with Charge Continuity', 'Displacement Current Density J_d = ε_0 (∂E/∂t)', 'Electromagnetic Wave Velocity in Vacuum c = 1 / √(μ_0 ε_0)'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Take divergence of curl H: div(curl H) = 0 = div J. Compare with continuity div J = -∂ρ/∂t to prove displacement current.'
      },
      {
        chapterNo: 2,
        title: 'Poynting Vector & Magnetic Materials',
        topics: ['Poynting Vector S = E × H (Energy flux density in W/m²)', 'Diamagnetism, Paramagnetism, Ferromagnetism Comparison', 'Curie-Weiss Law χ = C / (T - θ)', 'B-H Hysteresis Loop & Magnetic Energy Loss per Cycle'],
        weightage: '4 Marks',
        examTips: 'Poynting vector S points in direction of wave propagation with magnitude equal to power per unit area.'
      },
    ]
  },

  // --- Introduction to AI (100105) ---
  {
    subjectCode: '100105',
    subjectShort: 'IAI',
    subjectTitle: 'Introduction to Artificial Intelligence',
    unitNo: 1,
    unitTitle: 'Intelligent Agents & Environments',
    chapters: [
      {
        chapterNo: 1,
        title: 'Intelligent Agents & PEAS Framework',
        topics: ['Definition of Rational Agent', 'PEAS Framework (Performance Measure, Environment, Actuators, Sensors)', 'Case Studies: Autonomous Vehicle, Medical Diagnosis System, Vacuum Cleaner', 'Agent Architectures: Reflex, Goal-Based, Utility-Based, Learning Agent'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Construct the 4-column PEAS table with exact bullet points for car actuators, sensors, and safety metrics.'
      },
      {
        chapterNo: 2,
        title: 'Environment Classification',
        topics: ['Fully vs Partially Observable', 'Deterministic vs Stochastic', 'Episodic vs Sequential', 'Static vs Dynamic vs Semi-Dynamic', 'Discrete vs Continuous', 'Single-Agent vs Multi-Agent (Chess vs Driving)'],
        weightage: '4 Marks',
        examTips: 'Classify driving as partially observable, stochastic, sequential, dynamic, continuous, and multi-agent.'
      },
    ]
  },
  {
    subjectCode: '100105',
    subjectShort: 'IAI',
    subjectTitle: 'Introduction to Artificial Intelligence',
    unitNo: 2,
    unitTitle: 'Problem Solving & Heuristic Search',
    chapters: [
      {
        chapterNo: 1,
        title: 'Uninformed Search Algorithms',
        topics: ['State Space Formulation (State, Action, Transition, Goal, Path Cost)', 'Breadth-First Search (BFS): Completeness, Optimality, O(b^d) Exponential Space', 'Depth-First Search (DFS): Linear O(b*m) Space, Incompleteness on infinite trees', 'Uniform Cost Search (UCS / Dijkstra\'s Algorithm)'],
        weightage: '4 Marks',
        examTips: 'Emphasize that BFS memory consumption O(b^d) is its biggest practical limitation.'
      },
      {
        chapterNo: 2,
        title: 'Heuristic Search & A* Optimality',
        topics: ['Evaluation Function f(n) = g(n) + h(n)', 'Greedy Best-First Search vs A* Search', 'Admissible Heuristics (0 ≤ h(n) ≤ h*(n))', 'Consistent (Monotonic) Heuristics (Triangle Inequality)', 'Mathematical Proof of A* Tree-Search Optimality'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Prove by contradiction: assume suboptimal goal G_2 is selected; show ancestor node n on frontier has f(n) ≤ C* < f(G_2).'
      },
    ]
  },
  {
    subjectCode: '100105',
    subjectShort: 'IAI',
    subjectTitle: 'Introduction to Artificial Intelligence',
    unitNo: 3,
    unitTitle: 'Adversarial Games & Pruning',
    chapters: [
      {
        chapterNo: 1,
        title: 'Game Trees & Minimax Algorithm',
        topics: ['Two-Player Zero-Sum Deterministic Games', 'Minimax Value Computation at MAX and MIN Nodes', 'Time Complexity O(b^m) and Space Complexity O(b*m)'],
        weightage: '4 Marks',
        examTips: 'Show bottom-up backup values from terminal leaves to the root node.'
      },
      {
        chapterNo: 2,
        title: 'Alpha-Beta Pruning',
        topics: ['Alpha (Best choice for MAX) and Beta (Best choice for MIN)', 'Cutoff Condition: Prune when α ≥ β', 'Move Ordering Impact: Optimal branching drops time complexity to O(b^(m/2))'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Walk through an example game tree, maintain [α, β] intervals at each node, and mark pruned branches with a strike.'
      },
    ]
  },

  // --- Universal Human Values (100109) ---
  {
    subjectCode: '100109',
    subjectShort: 'UHV',
    subjectTitle: 'Universal Human Values',
    unitNo: 1,
    unitTitle: 'Introduction to Value Education',
    chapters: [
      {
        chapterNo: 1,
        title: 'Human Aspirations & Priorities',
        topics: ['Continuous Happiness (Sukha) and Prosperity (Samridhi)', 'The 3 Priorities: 1. Right Understanding -> 2. Relationships -> 3. Physical Facilities', 'Physical Facilities: Necessary but NOT Sufficient for human beings', 'Animal Consciousness (Only Physical Facilities) vs Human Consciousness'],
        weightage: '4 Marks',
        examTips: 'Contrast animal living (needs fulfilled by facilities alone) with human living (needs right understanding and relationships).'
      },
      {
        chapterNo: 2,
        title: 'Process of Self-Exploration',
        topics: ['Self-Exploration Definition & Purpose', 'Natural Acceptance (Sahaj Svikriti): Invariant with time, place, and person', 'Experiential Validation: Living in accordance and verifying results', 'Living in Harmony at 4 Levels (Individual, Family, Society, Nature)'],
        weightage: '4 Marks',
        examTips: 'Explain that Natural Acceptance is not belief or conditioning; it is intrinsic to all human beings.'
      },
    ]
  },
  {
    subjectCode: '100109',
    subjectShort: 'UHV',
    subjectTitle: 'Universal Human Values',
    unitNo: 2,
    unitTitle: 'Harmony in the Human Being (Self & Body)',
    chapters: [
      {
        chapterNo: 1,
        title: 'Co-existence of Self (\'I\') and Body',
        topics: ['Conscious Self (\'I\') vs Material Body', 'Needs: Qualitative & Continuous in \'I\' vs Quantitative & Temporary in Body', 'Activities: Desiring, Thinking, Expecting in \'I\' vs Physiological in Body', 'Responses: Knowing, Assuming, Recognizing, Fulfilling in \'I\' vs Only Recognizing & Fulfilling in Body'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Create the 6-row comparison table between Self (\'I\') and Body.'
      },
      {
        chapterNo: 2,
        title: 'Sanyama and Swasthya',
        topics: ['Sanyama: Feeling of responsibility in \'I\' for nurturing, protecting, rightly utilizing Body', 'Swasthya: Health of Body, organs functioning in mutual harmony', 'Correct Appraisal of Physical Needs (Eliminating unlimited consumerism)'],
        weightage: '4 Marks',
        examTips: 'Show that Swasthya is the natural physical outcome when the conscious Self maintains Sanyama.'
      },
    ]
  },
  {
    subjectCode: '100109',
    subjectShort: 'UHV',
    subjectTitle: 'Universal Human Values',
    unitNo: 3,
    unitTitle: 'Harmony in Family & Society',
    chapters: [
      {
        chapterNo: 1,
        title: 'Trust (Vishwas): Foundational Value',
        topics: ['Trust on Intention vs Trust on Competence', 'The Human Error: Evaluating self by intention, evaluating others by competence', 'How Doubting Intention Causes Irritation, Anger, and Broken Relationships', 'Resolution: Unconditional Trust on Intention + Helping Competence'],
        weightage: '4 Marks (Guaranteed)',
        examTips: 'Explain clearly that everybody naturally intends mutual happiness; mistakes occur solely from lack of competence.'
      },
      {
        chapterNo: 2,
        title: 'Respect (Samman) & The 9 Values',
        topics: ['Respect Definition: Right Evaluation (Yathartha Mulyankan)', 'Disrespect Modes: Over-evaluation, Under-evaluation, Otherwise-evaluation', 'Nine Values in Relationships: Trust, Respect, Affection, Care, Guidance, Reverence, Glory, Gratitude, Love (Purna Mulya)', 'Comprehensive Human Goals: Samadhan, Samridhi, Abhay, Sah-astitva'],
        weightage: '4 Marks',
        examTips: 'Define Respect as Right Evaluation. Differentiate between Differentiation (based on body, wealth, beliefs) and Respect.'
      },
    ]
  },
];

const READINESS_PILLARS = [
  { id: 'p1', label: 'Unit 1 Fundamentals & Definitions Memorized', weight: 6 },
  { id: 'p2', label: 'Unit 2 Core Derivations & Analytical Formulas Ready', weight: 7 },
  { id: 'p3', label: 'Unit 3 (Electronics/Multivariable/Magnetism/Logic/AI) Mastered', weight: 8 },
  { id: 'p4', label: 'Pencil Diagram Practice (Newton Rings, Bridge Rectifier, Saddle Surface, BJT)', weight: 7 },
  { id: 'p5', label: '4-Box Numericals Format (Given, Formula, Calculation, Units)', weight: 7 },
  { id: 'p6', label: 'Objective MCQs: 100% Accuracy on Standard BEU 1-Markers', weight: 7 },
  { id: 'p7', label: 'Thevenin / Norton & Series RLC Resonance Numericals Solved', weight: 6 },
  { id: 'p8', label: 'Eigenvalues & Cayley-Hamilton Inverse A⁻¹ Steps Clear', weight: 7 },
  { id: 'p9', label: 'Leibnitz Theorem Proof for (sin⁻¹ x)² or Standard Forms', weight: 7 },
  { id: 'p10', label: 'Euler Theorem & Extrema rt - s² Multi-variable Rules', weight: 6 },
  { id: 'p11', label: 'Maxwell 4 Equations & Displacement Current Derivation Memorized', weight: 7 },
  { id: 'p12', label: 'AI Search Comparison (BFS vs DFS vs A* Admissibility)', weight: 6 },
  { id: 'p13', label: 'Alpha-Beta Pruning Cutoff Condition (α ≥ β) Trace Ready', weight: 6 },
  { id: 'p14', label: 'CFET 4-Variable K-Map & Number System Conversions Practiced', weight: 6 },
  { id: 'p15', label: 'UHV Trust on Intention vs Competence & 9 Values Articulated', weight: 5 },
];

export default function MidsemRevisionPage() {
  const [activeSubjectCode, setActiveSubjectCode] = useState<string>('100111'); // BEEE is 1st exam
  const [activeUnitNo, setActiveUnitNo] = useState<number>(0); // 0 = All Units
  const [activeTab, setActiveTab] = useState<ViewTab>('notes');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // MCQ state
  // Diagram states
  const [diagramModal, setDiagramModal] = useState<MidsemDiagram | null>(null);
  const [hideLabels, setHideLabels] = useState<Record<string, boolean>>({});
  const [globalHideLabels, setGlobalHideLabels] = useState<boolean>(false);

  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [onlyMissed, setOnlyMissed] = useState<boolean>(false);

  // 15-Pillar Score Predictor state
  const [readinessChecks, setReadinessChecks] = useState<Record<string, boolean>>({
    p1: true,
    p2: true,
    p3: true,
  });

  // Calculators state
  const [rlcL, setRlcL] = useState<number>(0.1);
  const [rlcC, setRlcC] = useState<number>(10);
  const [thevV, setThevV] = useState<number>(24);
  const [thevR, setThevR] = useState<number>(6);
  const [thevRl, setThevRl] = useState<number>(6);
  const [fiberN1, setFiberN1] = useState<number>(1.55);
  const [fiberN2, setFiberN2] = useState<number>(1.50);
  const [cacheH, setCacheH] = useState<number>(0.95);
  const [cacheTc, setCacheTc] = useState<number>(2);
  const [cacheTm, setCacheTm] = useState<number>(50);

  // Timed Mock Simulator state
  const [mockRunning, setMockRunning] = useState<boolean>(false);
  const [mockSecondsLeft, setMockSecondsLeft] = useState<number>(900); // 15 mins
  const [mockUserAnswers, setMockUserAnswers] = useState<Record<string, number>>({});
  const [mockSubmitted, setMockSubmitted] = useState<boolean>(false);

  // Countdown timer to Nov 27 11:00 AM
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date('2026-11-27T11:00:00+05:30').getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeUntilNext('Exams in progress!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilNext(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer tick for Mock Simulator
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mockRunning && mockSecondsLeft > 0 && !mockSubmitted) {
      timer = setInterval(() => {
        setMockSecondsLeft((prev) => {
          if (prev <= 1) {
            setMockSubmitted(true);
            setMockRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mockRunning, mockSecondsLeft, mockSubmitted]);

  // Current course
  const currentCourse: MidsemCourse = useMemo(() => {
    return (
      MIDSEM_DATA.courses.find((c) => c.code === activeSubjectCode || activeSubjectCode.includes(c.code)) ||
      MIDSEM_DATA.courses[0]
    );
  }, [activeSubjectCode]);

  // Filtered units
  const displayedUnits: MidsemUnit[] = useMemo(() => {
    if (activeUnitNo === 0) return currentCourse.units;
    return currentCourse.units.filter((u) => u.unitNo === activeUnitNo);
  }, [currentCourse, activeUnitNo]);

  // Filtered MCQs
  const filteredMcqs: MidsemMcq[] = useMemo(() => {
    return MIDSEM_MCQS.filter((m) => {
      const matchSubject = m.courseCode === currentCourse.code || m.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || m.unitNo === activeUnitNo;
      if (!matchSubject || !matchUnit) return false;
      if (searchFilter.trim()) {
        const qText = (m.q + ' ' + m.topic + ' ' + m.explanation).toLowerCase();
        if (!qText.includes(searchFilter.toLowerCase())) return false;
      }
      if (onlyMissed) {
        const userAns = userAnswers[m.id];
        return userAns !== undefined && userAns !== m.ans;
      }
      return true;
    });
  }, [currentCourse, activeUnitNo, onlyMissed, userAnswers, searchFilter]);

  // Practice Questions
  const filteredPractice: MidsemPracticeItem[] = useMemo(() => {
    return MIDSEM_PRACTICE_QUESTIONS.filter((p) => {
      const matchSubject = p.courseCode === currentCourse.code || p.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || p.unitNo === activeUnitNo;
      if (!matchSubject || !matchUnit) return false;
      if (searchFilter.trim()) {
        const text = (p.title + ' ' + p.question + ' ' + p.stepByStepSolution).toLowerCase();
        if (!text.includes(searchFilter.toLowerCase())) return false;
      }
      return true;
    });
  }, [currentCourse, activeUnitNo, searchFilter]);

  // Chapter Mappings for current course
  const currentChapterMappings: ChapterMapping[] = useMemo(() => {
    return SYLLABUS_CHAPTER_MAPPINGS.filter((m) => {
      const matchSubject = m.subjectCode === currentCourse.code || m.subjectShort === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || m.unitNo === activeUnitNo;
      return matchSubject && matchUnit;
    });
  }, [currentCourse, activeUnitNo]);

  // MCQ Stats
  const mcqStats = useMemo(() => {
    const totalAttempted = Object.keys(userAnswers).filter((id) =>
      MIDSEM_MCQS.some((m) => m.id === id && (m.courseCode === currentCourse.code || m.subject === currentCourse.short))
    ).length;
    let correct = 0;
    Object.entries(userAnswers).forEach(([id, ans]) => {
      const q = MIDSEM_MCQS.find((m) => m.id === id);
      if (q && q.ans === ans && (q.courseCode === currentCourse.code || q.subject === currentCourse.short)) {
        correct++;
      }
    });
    return {
      attempted: totalAttempted,
      correct,
      pct: totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0,
    };
  }, [userAnswers, currentCourse]);

  // Filtered diagrams
  const currentDiagrams: MidsemDiagram[] = useMemo(() => {
    return MIDSEM_DIAGRAMS.filter((d) => {
      const matchSubject = d.subjectCode === currentCourse.code || d.subject === currentCourse.short;
      const matchUnit = activeUnitNo === 0 || d.unitNo === activeUnitNo;
      return matchSubject && matchUnit;
    });
  }, [currentCourse, activeUnitNo]);

  // Real paper for current course
  const currentPaper: BeuPaper | undefined = useMemo(() => {
    return BEU_REAL_PAPERS_2026.find(
      (p) => p.code === currentCourse.code || p.subject === currentCourse.short || currentCourse.code.includes(p.code)
    );
  }, [currentCourse]);

  // Sitting for current course
  const currentSitting: ExamSitting | undefined = useMemo(() => {
    return LNJPIT_EXAM_SITTINGS.find(
      (s) => s.subjectCode.includes(currentCourse.code) || currentCourse.code.includes(s.subjectCode) || s.subjectShort === currentCourse.short
    );
  }, [currentCourse]);

  // Readiness Score
  const totalPillarsScore = useMemo(() => {
    let score = 0;
    READINESS_PILLARS.forEach((p) => {
      if (readinessChecks[p.id]) score += p.weight;
    });
    return Math.min(100, score);
  }, [readinessChecks]);

  // Calculator computations
  const rlcResonantFreq = useMemo(() => {
    if (rlcL <= 0 || rlcC <= 0) return '0.00';
    const cFarads = rlcC * 1e-6;
    return (1 / (2 * Math.PI * Math.sqrt(rlcL * cFarads))).toFixed(2);
  }, [rlcL, rlcC]);

  const theveninPower = useMemo(() => {
    if (thevR + thevRl <= 0) return { il: '0.000', pl: '0.000' };
    const il = thevV / (thevR + thevRl);
    const pl = il * il * thevRl;
    return { il: il.toFixed(3), pl: pl.toFixed(3) };
  }, [thevV, thevR, thevRl]);

  const fiberParams = useMemo(() => {
    if (fiberN1 <= fiberN2) return { na: 'N/A (n1 must > n2)', thetaA: 'N/A', thetaC: 'N/A' };
    const naVal = Math.sqrt(fiberN1 * fiberN1 - fiberN2 * fiberN2);
    const thetaA = (Math.asin(Math.min(1, naVal)) * 180) / Math.PI;
    const thetaC = (Math.asin(fiberN2 / fiberN1) * 180) / Math.PI;
    return {
      na: naVal.toFixed(4),
      thetaA: `${thetaA.toFixed(2)}°`,
      thetaC: `${thetaC.toFixed(2)}°`,
    };
  }, [fiberN1, fiberN2]);

  const cacheTavg = useMemo(() => {
    return (cacheH * cacheTc + (1 - cacheH) * cacheTm).toFixed(3);
  }, [cacheH, cacheTc, cacheTm]);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased pb-24 selection:bg-accentGold/20">
      {/* TOP COMMAND HUD */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper2/95 backdrop-blur-md px-4 py-3 shadow-sketchy">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-ink bg-paper text-ink text-sm font-bold shadow-sketchy hover:bg-paper3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to 3D Notebook</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-accentRed font-bold">
                  LNJPIT Chapra · BEU Mid-Sem
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-ink text-xs font-bold bg-accentTeal/15 text-accentTeal">
                  <BookmarkCheck className="w-3 h-3" /> Group A: M&amp;C
                </span>
              </div>
              <h1 className="font-hand text-2xl md:text-3xl font-bold text-ink leading-tight">
                Mid-Semester Exam Portal 2026
              </h1>
            </div>
          </div>

          {/* Countdown & Quick Action HUD */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-accentRed bg-accentRed/10 text-accentRed text-xs font-mono font-bold">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Exams: 27 Nov · {timeUntilNext}</span>
            </div>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg border-2 border-ink bg-paper text-ink hover:bg-paper3 shadow-sketchy text-xs font-bold"
              title="Print Revision Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        {/* EXAM NOTICE BANNER */}
        <div className="border-2 border-ink bg-paper2 rounded-xl p-4 shadow-sketch mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-accentRed uppercase">
                <AlertCircle className="w-4 h-4" /> Official LNJPIT Timetable (Ref: {LNJPIT_EXAM_NOTICE.refNo})
              </div>
              <p className="text-sm text-dim mt-1">
                Mid-Sem Examination begins <strong>27-11-2026</strong>. 20 Marks Official BEU Pattern (Q1 Compulsory 4×1M + Any 4 of Q2-Q6 4×4M = 20M).
              </p>
            </div>
            {currentSitting && (
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg border-2 border-ink bg-paper3 text-xs font-mono">
                <div>
                  <div className="text-dim">Next Sitting:</div>
                  <div className="font-bold text-ink text-sm">{currentSitting.date} · {currentSitting.sitting}</div>
                  <div className="text-accentTeal font-bold">{currentSitting.timing}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 6 SUBJECT SELECTION BAR */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-dim font-bold mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-accentTeal" /> Select Examination Subject (Group A M&amp;C)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {MIDSEM_DATA.courses.map((c) => {
              const isSelected = c.code === activeSubjectCode || activeSubjectCode.includes(c.code);
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    setActiveSubjectCode(c.code);
                    setActiveUnitNo(0);
                  }}
                  className={`p-3 rounded-xl border-2 text-left transition-all relative ${
                    isSelected
                      ? 'border-ink bg-accentTeal text-paper shadow-sketch font-bold scale-[1.02]'
                      : 'border-ink/40 bg-paper2 text-ink hover:bg-paper3 shadow-sketchy hover:border-ink'
                  }`}
                >
                  <div className={`text-xs font-mono ${isSelected ? 'text-paper/80' : 'text-accentRed'} font-bold`}>
                    {c.code}
                  </div>
                  <div className="font-hand text-xl font-bold leading-tight mt-0.5 truncate">
                    {c.short}
                  </div>
                  <div className={`text-[11px] truncate ${isSelected ? 'text-paper/90' : 'text-dim'}`}>
                    {c.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8 STUDY TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b-2 border-hair">
          {[
            { id: 'notes', label: '📖 High-Yield Notes', badge: `${displayedUnits.length} Units` },
            { id: 'practice', label: '📝 Solved Practice', badge: `${filteredPractice.length} Qs` },
            { id: 'mcq', label: '🎯 CBT MCQ Bank', badge: `${filteredMcqs.length} MCQs` },
            { id: 'papers', label: '📑 BEU Papers 2026', badge: '20M Solved' },
            { id: 'diagrams', label: '📐 Exam Diagrams', badge: `${currentDiagrams.length} Schematics` },
            { id: 'chapters', label: '🗺️ Chapter Index', badge: 'All Units' },
            { id: 'simulator', label: '⏱️ Mock Test', badge: '15 Min CBT' },
            { id: 'predictor', label: '📊 15-Pillar Score', badge: `${totalPillarsScore}%` },
            { id: 'calculator', label: '🧮 Calculators', badge: '4 Tools' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ViewTab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 flex items-center gap-2 ${
                  isActive
                    ? 'border-ink bg-paper3 text-ink shadow-sketch scale-[1.01]'
                    : 'border-transparent text-dim hover:text-ink hover:bg-paper2 hover:border-ink/30'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                  isActive ? 'border-ink bg-paper text-ink font-bold' : 'border-ink/20 bg-paper3/60 text-dim'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* UNIT FILTER CHIPS & SEARCH BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-paper2 p-3 rounded-xl border-2 border-ink shadow-sketchy">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono uppercase text-dim font-bold mr-1">Unit:</span>
            {[0, 1, 2, 3, 4, 5].map((u) => {
              // Only render units that exist in this course
              if (u !== 0 && !currentCourse.units.some((cu) => cu.unitNo === u)) return null;
              const isSelected = activeUnitNo === u;
              return (
                <button
                  key={u}
                  onClick={() => setActiveUnitNo(u)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border-2 transition-all ${
                    isSelected
                      ? 'border-ink bg-accentGold text-paper shadow-sketchy font-bold'
                      : 'border-ink/30 bg-paper text-ink hover:bg-paper3'
                  }`}
                >
                  {u === 0 ? 'All Units' : `Unit ${u}`}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-dim absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts, formulas, topics..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border-2 border-ink bg-paper text-ink text-xs focus:outline-none focus:ring-2 focus:ring-accentTeal"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: HIGH-YIELD NOTES */}
        {/* ========================================================================= */}
        {/* TAB 1: HIGH-YIELD NOTES */}
        {/* ========================================================================= */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {displayedUnits.map((unit) => (
              <div key={unit.unitNo} className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-hair pb-3 mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-accentRed font-bold">
                      Unit {unit.unitNo} · {currentCourse.short}
                    </span>
                    <h2 className="font-hand text-3xl font-bold text-ink mt-0.5">
                      {unit.title}
                    </h2>
                  </div>
                  <div className="text-xs font-mono font-bold text-accentTeal bg-accentTeal/10 px-3 py-1 rounded-full border border-accentTeal/30">
                    {unit.topics.length} Core Topics Mapped
                  </div>
                </div>

                <p className="text-xs text-dim italic mb-4">{unit.summary}</p>

                {/* Topics Cards */}
                <div className="space-y-4">
                  {unit.topics.map((top, tIdx) => (
                    <div key={tIdx} className="border-2 border-ink/40 bg-paper rounded-xl p-4 shadow-sketchy">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-base text-ink flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full border-2 border-ink bg-accentGold/20 text-ink text-xs font-bold inline-flex items-center justify-center font-mono">
                            {tIdx + 1}
                          </span>
                          {top.heading}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full border border-accentRed bg-accentRed/10 text-accentRed text-[11px] font-mono font-bold">
                          ★ High Yield
                        </span>
                      </div>

                      {/* Explanation with KaTeX */}
                      <div className="text-sm text-ink/90 leading-relaxed font-sans prose prose-sm max-w-none">
                        <MathText text={top.plainExplanation} />
                      </div>

                      {/* Key Formula */}
                      {top.keyFormula && (
                        <div className="mt-3 p-3 rounded-lg border-2 border-ink bg-paper3">
                          <div className="text-xs font-mono uppercase tracking-wider text-accentTeal font-bold mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> High-Yield Formula Sheet
                          </div>
                          <div className="text-xs font-mono text-ink bg-paper p-2 rounded border border-ink/30">
                            <MathText text={top.keyFormula} />
                          </div>
                        </div>
                      )}

                      {/* Exam Pro-Tip */}
                      {top.examTip && (
                        <div className="mt-2 text-xs font-sans text-dim italic flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-accentGold shrink-0" />
                          <span><strong>Topper Tip:</strong> {top.examTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Standard Solved Problems for this unit */}
                {unit.standardProblems && unit.standardProblems.length > 0 && (
                  <div className="mt-6 pt-4 border-t-2 border-hair">
                    <h3 className="font-hand text-2xl font-bold text-ink mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-accentRed" />
                      Unit {unit.unitNo} Standard Exam Numericals &amp; Solutions
                    </h3>
                    <div className="space-y-3">
                      {unit.standardProblems.map((prob, pIdx) => (
                        <div key={pIdx} className="border border-ink/40 bg-paper rounded-lg p-3">
                          <div className="font-bold text-xs text-ink mb-1">
                            Q{pIdx + 1}: <MathText text={prob.q} />
                          </div>
                          <div className="p-2.5 bg-paper3 rounded border border-ink/20 text-xs">
                            <strong className="text-accentTeal font-mono text-[11px] block mb-1">Standard Solution:</strong>
                            <MathText text={prob.solution} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="border-2 border-ink bg-paper2 rounded-xl p-4 shadow-sketch flex items-center justify-between">
              <div>
                <h2 className="font-hand text-2xl font-bold text-ink">
                  {currentCourse.short} Solved Practice Questions ({filteredPractice.length})
                </h2>
                <p className="text-xs text-dim mt-0.5">
                  Full step-by-step topper solutions covering derivations, numericals, 2&apos;s complements, K-Maps, and proofs.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-accentTeal px-3 py-1 bg-accentTeal/10 rounded-full border border-accentTeal/30">
                4 Marks Each
              </span>
            </div>

            {filteredPractice.map((p, idx) => (
              <div key={p.id} className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-hair pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg border-2 border-ink bg-accentTeal text-paper text-xs font-bold font-mono inline-flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-mono font-bold text-accentRed uppercase">
                        Unit {p.unitNo} · {p.category}
                      </span>
                      <h3 className="font-bold text-base text-ink">{p.title}</h3>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-ink bg-paper3 px-2 py-0.5 rounded border border-ink/40">
                    {p.marks} Marks
                  </span>
                </div>

                {/* Problem Statement */}
                <div className="border-2 border-ink/30 bg-paper p-3.5 rounded-lg text-sm font-sans text-ink leading-relaxed mb-4">
                  <MathText text={p.question} />
                </div>

                {/* Step-by-Step Solution */}
                <div className="border-2 border-ink bg-paper3 p-4 rounded-lg">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accentTeal mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Official Step-by-Step Topper Solution
                  </div>
                  <div className="text-sm font-sans text-ink leading-relaxed prose prose-sm max-w-none">
                    <MathText text={p.stepByStepSolution} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CBT MCQ BANK (137 Tickable Questions) */}
        {/* ========================================================================= */}
        {activeTab === 'mcq' && (
          <div className="space-y-6">
            {/* MCQ Stats Bar */}
            <div className="border-2 border-ink bg-paper2 rounded-xl p-4 shadow-sketch flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-hand text-2xl font-bold text-ink">
                  {currentCourse.short} Objective MCQ Bank ({filteredMcqs.length} Questions)
                </h2>
                <p className="text-xs text-dim">
                  Authentic BEU Compulsory 1-Mark format. Instant feedback, 0-based option checking, and detailed explanations.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-mono bg-paper p-2 rounded-lg border border-ink/40">
                  <span>Score: </span>
                  <strong className="text-accentTeal">{mcqStats.correct}</strong> / {mcqStats.attempted} ({mcqStats.pct}%)
                </div>
                <button
                  onClick={() => setOnlyMissed(!onlyMissed)}
                  className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold font-mono transition-all ${
                    onlyMissed
                      ? 'border-accentRed bg-accentRed text-paper shadow-sketchy'
                      : 'border-ink/40 bg-paper text-ink hover:bg-paper3'
                  }`}
                >
                  {onlyMissed ? 'Showing Missed' : 'Show Missed Only'}
                </button>
                <button
                  onClick={() => setUserAnswers({})}
                  className="p-1.5 rounded-lg border-2 border-ink bg-paper hover:bg-paper3 text-xs"
                  title="Reset Answers"
                >
                  <RotateCcw className="w-4 h-4 text-dim" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredMcqs.map((mcq, idx) => {
                const userAns = userAnswers[mcq.id];
                const isAnswered = userAns !== undefined;
                const isCorrect = userAns === mcq.ans;

                return (
                  <div key={mcq.id} className="border-2 border-ink bg-paper2 rounded-xl p-4 shadow-sketch">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full border-2 border-ink bg-paper text-ink text-xs font-mono font-bold inline-flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono uppercase text-dim font-bold">
                          Unit {mcq.unitNo} · {mcq.topic}
                        </span>
                      </div>
                      {isAnswered && (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-bold font-mono ${
                          isCorrect
                            ? 'border-accentTeal bg-accentTeal/15 text-accentTeal'
                            : 'border-accentRed bg-accentRed/15 text-accentRed'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Correct +1' : 'Incorrect 0'}
                        </span>
                      )}
                    </div>

                    {/* Question text */}
                    <div className="text-sm font-bold text-ink mb-3 leading-relaxed">
                      <MathText text={mcq.q} />
                    </div>

                    {/* 4 Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {mcq.options.map((opt, oIdx) => {
                        const isChosen = userAns === oIdx;
                        const isThisCorrect = oIdx === mcq.ans;

                        let optStyle = 'border-ink/30 bg-paper text-ink hover:bg-paper3';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            optStyle = 'border-2 border-accentTeal bg-accentTeal/20 text-accentTeal font-bold shadow-sketchy';
                          } else if (isChosen && !isCorrect) {
                            optStyle = 'border-2 border-accentRed bg-accentRed/20 text-accentRed line-through';
                          } else {
                            optStyle = 'border-ink/20 bg-paper/60 text-dim opacity-70';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => setUserAnswers((prev) => ({ ...prev, [mcq.id]: oIdx }))}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2.5 ${optStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-ink/40 inline-flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1"><MathText text={opt} /></span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                      <div className="mt-3 p-3 rounded-lg border-2 border-ink bg-paper3 text-xs leading-relaxed">
                        <strong className="text-accentTeal font-mono uppercase block mb-1">
                          Explanation:
                        </strong>
                        <MathText text={mcq.explanation} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

                {/* ========================================================================= */}
        {/* TAB 4: REAL BEU PAPERS 2026 (20 Marks Format) */}
                {/* ========================================================================= */}
        {/* TAB 5: HAND-DRAWN EXAM DIAGRAMS STUDIO */}
        {/* ========================================================================= */}
        {activeTab === 'diagrams' && (
          <div className="space-y-6">
            {/* Studio Header */}
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg border-2 border-ink bg-accentTeal/20 text-accentTeal inline-flex items-center justify-center font-bold">
                    📐
                  </span>
                  <h2 className="font-hand text-3xl font-bold text-ink">
                    {currentCourse.short} Hand-Drawn Exam Schematics ({currentDiagrams.length})
                  </h2>
                </div>
                <p className="text-xs text-dim mt-1">
                  Master compulsory 4-mark pencil diagrams. Toggle labels to test active recall before entering the exam hall.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setGlobalHideLabels(!globalHideLabels)}
                  className={`px-3 py-1.5 rounded-lg border-2 text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    globalHideLabels
                      ? 'border-accentRed bg-accentRed text-paper shadow-sketchy'
                      : 'border-ink bg-paper text-ink hover:bg-paper3'
                  }`}
                >
                  {globalHideLabels ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {globalHideLabels ? 'Labels Hidden (Testing Recall)' : 'Hide All Labels (Test Recall)'}
                </button>
                <div className="text-xs font-mono bg-paper px-3 py-1.5 rounded-lg border border-ink/40 font-bold text-accentTeal">
                  Unit {activeUnitNo === 0 ? 'All' : activeUnitNo} Schematics
                </div>
              </div>
            </div>

            {/* Diagrams Grid */}
            {currentDiagrams.length === 0 ? (
              <div className="border-2 border-dashed border-ink/40 bg-paper2 rounded-xl p-8 text-center text-dim text-xs font-mono">
                No diagrams found matching current subject and search filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentDiagrams.map((d) => {
                  const isLabelHidden = globalHideLabels || hideLabels[d.id] || false;
                  return (
                    <div
                      key={d.id}
                      className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch flex flex-col justify-between"
                    >
                      <div>
                        {/* Diagram Card Header */}
                        <div className="flex items-center justify-between border-b-2 border-hair pb-2 mb-3">
                          <div>
                            <span className="text-xs font-mono uppercase tracking-wider text-accentRed font-bold">
                              Unit {d.unitNo} · {d.subject}
                            </span>
                            <h3 className="font-bold text-base text-ink mt-0.5">
                              {d.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => setDiagramModal(d)}
                            className="p-1.5 rounded-lg border-2 border-ink bg-paper hover:bg-paper3 text-ink transition-all"
                            title="Zoom Diagram"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* SVG Drawing Canvas */}
                        <div
                          className={`relative border-2 border-ink rounded-xl bg-paper overflow-hidden p-2 shadow-inner transition-all ${
                            isLabelHidden ? '[&_text]:opacity-0 hover:[&_text]:opacity-100' : ''
                          }`}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: d.svg }}
                            className="w-full flex items-center justify-center select-none"
                          />
                          {isLabelHidden && (
                            <div className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-accentRed text-paper px-2 py-0.5 rounded shadow">
                              Hover to reveal labels
                            </div>
                          )}
                        </div>

                        {/* Caption */}
                        <p className="text-xs text-dim mt-3 leading-relaxed">
                          <strong>Principle &amp; Analysis:</strong> {d.caption}
                        </p>

                        {/* 3-Minute Exam Sketching Guide */}
                        <div className="mt-3 p-3 rounded-lg border border-ink/30 bg-paper3 text-xs leading-relaxed">
                          <strong className="text-accentTeal font-mono uppercase text-[11px] block mb-1">
                            ✏️ 3-Minute Exam Sketching Technique:
                          </strong>
                          <ul className="list-disc list-inside space-y-0.5 text-ink/90 text-[11px]">
                            <li>Always sketch with sharp 2B pencil; write axis labels &amp; values in neat ink.</li>
                            <li>Mark coordinates, direction arrows, and cutoff boundaries before shading.</li>
                            <li>State the governing formula alongside the sketch to guarantee full 4 marks.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-4 pt-3 border-t border-hair flex items-center justify-between gap-2">
                        <button
                          onClick={() =>
                            setHideLabels((prev) => ({ ...prev, [d.id]: !isLabelHidden }))
                          }
                          className="px-3 py-1.5 rounded-lg border border-ink/40 bg-paper text-xs font-mono font-bold text-ink hover:bg-paper3 transition-all flex items-center gap-1.5"
                        >
                          {isLabelHidden ? <Eye className="w-3.5 h-3.5 text-accentTeal" /> : <EyeOff className="w-3.5 h-3.5 text-accentRed" />}
                          {isLabelHidden ? 'Show Labels' : 'Hide Labels (Recall Test)'}
                        </button>
                        <button
                          onClick={() => setDiagramModal(d)}
                          className="px-3 py-1.5 rounded-lg border-2 border-ink bg-accentTeal text-paper text-xs font-bold shadow-sketchy hover:bg-accentTeal/90 transition-all flex items-center gap-1.5"
                        >
                          <Maximize2 className="w-3.5 h-3.5" /> Full Size
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

{/* ========================================================================= */}
        {activeTab === 'papers' && currentPaper && (
          <div className="space-y-6">
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
              <div className="text-center border-b-2 border-ink pb-4 mb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-accentRed">
                  Bihar Engineering University, Patna · LNJPIT Chapra
                </div>
                <h2 className="font-hand text-3xl font-bold text-ink mt-1">
                  B.Tech 1st Semester Mid-Term Examination 2026
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-dim mt-2">
                  <span><strong>Subject:</strong> {currentPaper.subject} ({currentPaper.code})</span>
                  <span><strong>Branch:</strong> Mathematics &amp; Computing</span>
                  <span><strong>Time:</strong> {currentPaper.timeHours} Hours</span>
                  <span><strong>Max Marks:</strong> {currentPaper.fullMarks}</span>
                </div>
                <p className="text-xs font-sans text-dim italic mt-2">
                  Instructions: {currentPaper.instructions}
                </p>
              </div>

              {/* Sections with Questions */}
              <div className="space-y-6">
                {currentPaper.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    <div className="font-mono text-xs font-bold text-accentTeal uppercase tracking-wider border-b-2 border-hair pb-1">
                      {sec.name}
                    </div>
                    {sec.questions.map((q) => (
                      <div key={q.qNum} className="border-2 border-ink/40 bg-paper rounded-xl p-4 shadow-sketchy">
                        <div className="flex items-center justify-between border-b border-hair pb-2 mb-2">
                          <span className="font-mono text-xs font-bold text-accentRed">
                            Question {q.qNum} {q.co ? `[${q.co}${q.bl ? ' · ' + q.bl : ''}]` : ''}
                          </span>
                          <span className="font-mono text-xs font-bold text-ink bg-paper3 px-2 py-0.5 rounded border border-ink/30">
                            {q.marks} Marks
                          </span>
                        </div>

                        <div className="text-sm font-bold text-ink mb-3 leading-relaxed">
                          <MathText text={q.q} />
                        </div>

                        {/* Topper Solution Box */}
                        <div className="border-2 border-ink bg-paper3 p-3.5 rounded-lg text-xs leading-relaxed">
                          <strong className="text-accentTeal font-mono uppercase block mb-1.5 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5" /> Topper Model Solution:
                          </strong>
                          <div className="prose prose-sm max-w-none text-ink">
                            <MathText text={q.sol} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CHAPTER & SYLLABUS TOPIC BREAKDOWN */}
        {/* ========================================================================= */}
        {activeTab === 'chapters' && (
          <div className="space-y-6">
            <div className="border-2 border-ink bg-paper2 rounded-xl p-4 shadow-sketch flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="font-hand text-2xl font-bold text-ink flex items-center gap-2">
                  <Compass className="w-6 h-6 text-accentTeal" />
                  {currentCourse.short} Chapter &amp; Topic Syllabus Breakdown
                </h2>
                <p className="text-xs text-dim mt-0.5">
                  Detailed mapping of every teacher-guess concept, derivation, and numerical to its exact Unit and Chapter.
                </p>
              </div>
              <div className="text-xs font-mono bg-paper px-3 py-1.5 rounded-lg border border-ink/40 font-bold text-accentTeal">
                {currentChapterMappings.length} Units Mapped
              </div>
            </div>

            {currentChapterMappings.map((mapItem) => (
              <div key={mapItem.unitNo} className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
                <div className="border-b-2 border-hair pb-2 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-accentRed font-bold">
                      Unit {mapItem.unitNo}
                    </span>
                    <h3 className="font-hand text-2xl font-bold text-ink">
                      {mapItem.unitTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-dim bg-paper3 px-2.5 py-1 rounded-md border border-ink/30">
                    {mapItem.chapters.length} Chapters
                  </span>
                </div>

                <div className="space-y-4">
                  {mapItem.chapters.map((ch) => (
                    <div key={ch.chapterNo} className="border-2 border-ink/40 bg-paper rounded-xl p-4 shadow-sketchy">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hair pb-2 mb-2">
                        <h4 className="font-bold text-sm text-ink flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md border border-ink bg-accentTeal text-paper text-xs font-mono font-bold inline-flex items-center justify-center">
                            Ch {ch.chapterNo}
                          </span>
                          {ch.title}
                        </h4>
                        <span className="text-xs font-mono font-bold text-accentRed bg-accentRed/10 px-2 py-0.5 rounded border border-accentRed/30">
                          {ch.weightage}
                        </span>
                      </div>

                      {/* Topics bullet chips */}
                      <div className="mb-3">
                        <div className="text-xs font-mono uppercase text-dim font-bold mb-1.5">
                          Syllabus Concepts &amp; Derivations:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {ch.topics.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md border border-ink/30 bg-paper3 text-xs text-ink font-medium"
                            >
                              • {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Exam Strategy */}
                      <div className="p-2.5 rounded-lg border border-ink/30 bg-paper2 text-xs text-dim">
                        <strong className="text-ink font-bold">Exam Preparation Strategy: </strong>
                        {ch.examTips}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: TIMED MOCK SIMULATOR (15-Min CBT) */}
        {/* ========================================================================= */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-hair pb-3 mb-4">
                <div>
                  <h2 className="font-hand text-3xl font-bold text-ink">
                    Timed 15-Minute Mock Exam Simulator
                  </h2>
                  <p className="text-xs text-dim">
                    Test your speed and accuracy under authentic BEU exam clock pressure. 15 randomized questions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`text-lg font-mono font-bold px-4 py-1.5 rounded-xl border-2 ${
                    mockSecondsLeft < 180 ? 'border-accentRed bg-accentRed/15 text-accentRed animate-pulse' : 'border-ink bg-paper text-ink shadow-sketchy'
                  }`}>
                    {Math.floor(mockSecondsLeft / 60)}:{(mockSecondsLeft % 60).toString().padStart(2, '0')}
                  </div>

                  {!mockRunning && !mockSubmitted && (
                    <button
                      onClick={() => {
                        setMockRunning(true);
                        setMockSecondsLeft(900);
                        setMockUserAnswers({});
                        setMockSubmitted(false);
                      }}
                      className="px-4 py-2 rounded-xl border-2 border-ink bg-accentTeal text-paper font-bold text-xs shadow-sketch hover:bg-accentTeal/90 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-4 h-4" /> Start Simulator
                    </button>
                  )}

                  {mockRunning && (
                    <button
                      onClick={() => {
                        setMockSubmitted(true);
                        setMockRunning(false);
                      }}
                      className="px-4 py-2 rounded-xl border-2 border-ink bg-accentGold text-paper font-bold text-xs shadow-sketch hover:bg-accentGold/90 transition-all"
                    >
                      Submit Mock Exam
                    </button>
                  )}

                  {mockSubmitted && (
                    <button
                      onClick={() => {
                        setMockRunning(true);
                        setMockSecondsLeft(900);
                        setMockUserAnswers({});
                        setMockSubmitted(false);
                      }}
                      className="px-4 py-2 rounded-xl border-2 border-ink bg-paper text-ink font-bold text-xs shadow-sketchy hover:bg-paper3 transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" /> Retake Mock
                    </button>
                  )}
                </div>
              </div>

              {/* Mock Questions List */}
              <div className="space-y-4">
                {filteredMcqs.slice(0, 15).map((mcq, idx) => {
                  const userAns = mockUserAnswers[mcq.id];
                  const isSubmitted = mockSubmitted;
                  const isCorrect = userAns === mcq.ans;

                  return (
                    <div key={mcq.id} className="border-2 border-ink/40 bg-paper rounded-xl p-4 shadow-sketchy">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-accentRed">
                          Question {idx + 1} of 15
                        </span>
                        {isSubmitted && (
                          <span className={`text-xs font-mono font-bold ${isCorrect ? 'text-accentTeal' : 'text-accentRed'}`}>
                            {isCorrect ? '✓ Correct' : '✗ Missed'}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold text-ink mb-3">
                        <MathText text={mcq.q} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mcq.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            disabled={!mockRunning || isSubmitted}
                            onClick={() => setMockUserAnswers((prev) => ({ ...prev, [mcq.id]: oIdx }))}
                            className={`p-2 rounded-lg border text-left text-xs transition-all ${
                              userAns === oIdx
                                ? 'border-2 border-accentTeal bg-accentTeal/20 font-bold text-accentTeal'
                                : 'border-ink/20 bg-paper2 text-ink hover:bg-paper3'
                            }`}
                          >
                            <strong>{String.fromCharCode(65 + oIdx)}.</strong> <MathText text={opt} />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: 15-PILLAR READINESS PREDICTOR */}
        {/* ========================================================================= */}
        {activeTab === 'predictor' && (
          <div className="space-y-6">
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-hair pb-4 mb-4">
                <div>
                  <h2 className="font-hand text-3xl font-bold text-ink">
                    15-Pillar Mid-Sem Marks Predictor
                  </h2>
                  <p className="text-xs text-dim">
                    Check off each preparation pillar to compute your predicted score out of 20 marks.
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-hand text-4xl font-bold text-accentTeal">
                    {Math.round((totalPillarsScore / 100) * 20)} / 20 Marks
                  </div>
                  <div className="text-xs font-mono text-dim">
                    Preparedness: {totalPillarsScore}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-paper rounded-full border-2 border-ink overflow-hidden mb-6 p-0.5">
                <div
                  className="h-full bg-accentTeal rounded-full transition-all duration-500"
                  style={{ width: `${totalPillarsScore}%` }}
                />
              </div>

              {/* Checkboxes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {READINESS_PILLARS.map((p) => {
                  const isChecked = readinessChecks[p.id] || false;
                  return (
                    <button
                      key={p.id}
                      onClick={() =>
                        setReadinessChecks((prev) => ({ ...prev, [p.id]: !isChecked }))
                      }
                      className={`p-3 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-accentTeal bg-accentTeal/15 shadow-sketchy'
                          : 'border-ink/30 bg-paper hover:bg-paper3'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-accentTeal shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-5 h-5 text-dim shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className={`text-xs font-bold ${isChecked ? 'text-ink' : 'text-dim'}`}>
                          {p.label}
                        </div>
                        <div className="text-[11px] font-mono text-dim">
                          Weight: +{p.weight}% readiness
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: FORMULA CALCULATORS */}
        {/* ========================================================================= */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RLC Series Resonance Calculator */}
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
              <h3 className="font-hand text-2xl font-bold text-ink mb-1 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accentTeal" />
                RLC Series Resonance Calculator
              </h3>
              <p className="text-xs text-dim mb-3">Formula: f_0 = 1 / [2π √(LC)]</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-dim block">Inductance L (Henries):</label>
                  <input
                    type="number"
                    value={rlcL}
                    step="0.01"
                    onChange={(e) => setRlcL(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-dim block">Capacitance C (Microfarads µF):</label>
                  <input
                    type="number"
                    value={rlcC}
                    step="1"
                    onChange={(e) => setRlcC(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                  />
                </div>
                <div className="p-3 bg-paper3 rounded-lg border-2 border-ink">
                  <div className="text-xs font-mono text-dim">Resonant Frequency f_0:</div>
                  <div className="font-mono text-xl font-bold text-accentTeal">{rlcResonantFreq} Hz</div>
                </div>
              </div>
            </div>

            {/* Thevenin Maximum Power Calculator */}
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
              <h3 className="font-hand text-2xl font-bold text-ink mb-1 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accentRed" />
                Thevenin &amp; Max Power Calculator
              </h3>
              <p className="text-xs text-dim mb-3">P_max = V_th² / (4 R_th) when R_L = R_th</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-mono text-dim block">V_th (Volts):</label>
                    <input
                      type="number"
                      value={thevV}
                      onChange={(e) => setThevV(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-dim block">R_th (Ohms):</label>
                    <input
                      type="number"
                      value={thevR}
                      onChange={(e) => setThevR(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-dim block">Load Resistance R_L (Ohms):</label>
                  <input
                    type="number"
                    value={thevRl}
                    onChange={(e) => setThevRl(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                  />
                </div>
                <div className="p-3 bg-paper3 rounded-lg border-2 border-ink flex justify-between">
                  <div>
                    <div className="text-xs font-mono text-dim">Load Current I_L:</div>
                    <div className="font-mono text-lg font-bold text-ink">{theveninPower.il} A</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-dim">Power P_L:</div>
                    <div className="font-mono text-lg font-bold text-accentRed">{theveninPower.pl} W</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optical Fiber NA & Acceptance Angle */}
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
              <h3 className="font-hand text-2xl font-bold text-ink mb-1 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accentGold" />
                Optical Fiber NA Calculator
              </h3>
              <p className="text-xs text-dim mb-3">NA = √(n₁² - n₂²), θ_a = sin⁻¹(NA)</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-mono text-dim block">Core Index n₁:</label>
                    <input
                      type="number"
                      step="0.01"
                      value={fiberN1}
                      onChange={(e) => setFiberN1(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-dim block">Cladding Index n₂:</label>
                    <input
                      type="number"
                      step="0.01"
                      value={fiberN2}
                      onChange={(e) => setFiberN2(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="p-3 bg-paper3 rounded-lg border-2 border-ink grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-[11px] font-mono text-dim">NA:</div>
                    <div className="font-mono text-sm font-bold text-accentTeal">{fiberParams.na}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-dim">θ_a:</div>
                    <div className="font-mono text-sm font-bold text-ink">{fiberParams.thetaA}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-dim">θ_c:</div>
                    <div className="font-mono text-sm font-bold text-accentGold">{fiberParams.thetaC}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cache Memory Access Time Calculator */}
            <div className="border-2 border-ink bg-paper2 rounded-xl p-5 shadow-sketch">
              <h3 className="font-hand text-2xl font-bold text-ink mb-1 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accentTeal" />
                Cache Memory Access Time
              </h3>
              <p className="text-xs text-dim mb-3">T_avg = h * t_c + (1 - h) * t_m</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-dim block">Hit Ratio h (0 to 1):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={cacheH}
                    onChange={(e) => setCacheH(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-mono text-dim block">Cache Access t_c (ns):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={cacheTc}
                      onChange={(e) => setCacheTc(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-dim block">Main Memory t_m (ns):</label>
                    <input
                      type="number"
                      step="1"
                      value={cacheTm}
                      onChange={(e) => setCacheTm(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border-2 border-ink rounded-lg bg-paper text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="p-3 bg-paper3 rounded-lg border-2 border-ink">
                  <div className="text-xs font-mono text-dim">Average Access Time T_avg:</div>
                  <div className="font-mono text-xl font-bold text-accentTeal">{cacheTavg} ns</div>
                </div>
              </div>
            </div>
          </div>
        )}
      {/* DIAGRAM LIGHTBOX MODAL */}
      {diagramModal && (
        <div
          className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setDiagramModal(null)}
        >
          <div
            className="border-2 border-ink bg-paper rounded-2xl max-w-4xl w-full p-6 shadow-sketch relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-hair pb-3 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-accentRed font-bold">
                  Unit {diagramModal.unitNo} · {diagramModal.subject}
                </span>
                <h3 className="font-hand text-3xl font-bold text-ink">
                  {diagramModal.title}
                </h3>
              </div>
              <button
                onClick={() => setDiagramModal(null)}
                className="p-2 rounded-xl border-2 border-ink bg-paper2 hover:bg-paper3 text-ink transition-all"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-2 border-ink rounded-xl bg-paper2 p-4 shadow-inner mb-4 flex items-center justify-center overflow-x-auto">
              <div
                dangerouslySetInnerHTML={{ __html: diagramModal.svg }}
                className="w-full max-w-2xl select-none"
              />
            </div>

            <div className="p-4 rounded-xl border-2 border-ink bg-paper3 text-xs leading-relaxed space-y-2">
              <p><strong>Technical Analysis:</strong> {diagramModal.caption}</p>
              <p className="text-dim">
                <strong>BEU Exam Scoring Advice:</strong> Use sharp pencil for circuits &amp; curves, write all labels horizontally in neat script, and always write the governing formula directly beneath the diagram to score full 4/4 marks.
              </p>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}
