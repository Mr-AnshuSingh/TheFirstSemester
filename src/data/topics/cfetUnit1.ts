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

/* ---------- CFET UNIT 1 TOPIC CONTENT (8 Topics) ---------- */
export const CFET_UNIT1_TOPICS: Record<string, TopicContent> = {
  'cfet:1:0': {
    explain: [
      'Data representation is the binary encoding system that translates numerical and alphanumeric values into physical two-state digital voltages.',
      'Positional number systems express quantities through a base (radix) r, where each digit’s value depends on its face value and its positional power of r.',
    ],
    definition:
      'A positional number system represents numeric values as an ordered sequence of coefficients of powers of a given radix r, spanning Decimal (r=10), Binary (r=2), Octal (r=8), and Hexadecimal (r=16).',
    formula: 'N = \\sum_{i=-m}^{n-1} d_i \\cdot r^i = d_{n-1} r^{n-1} + \\dots + d_0 r^0 + d_{-1} r^{-1} + \\dots + d_{-m} r^{-m}',
    steps: [
      'Decimal (Base 10): Digits {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}; human standard.',
      'Binary (Base 2): Digits {0, 1}; native hardware representation corresponding to low and high voltage thresholds.',
      'Octal (Base 8): Digits {0 to 7}; shorthand grouping 3 binary bits ($2^3 = 8$).',
      'Hexadecimal (Base 16): Digits {0 to 9, A=10, B=11, C=12, D=13, E=14, F=15}; shorthand grouping 4 binary bits ($2^4 = 16$).',
      'Positional weighting: Value of 101 in base 2 is $1(4) + 0(2) + 1(1) = 5_{10}$, whereas in base 10 it is $100 + 0 + 1 = 101_{10}$.',
    ],
    examAnswer: [
      'Define positional number system with the general polynomial expansion formula.',
      'List the 4 primary number systems used in computing with their base r and allowable digit sets.',
      'Explain why binary is the fundamental language of physical computing hardware (noise tolerance of two distinct voltage levels).',
      'State the hex equivalents of numbers 10 through 15 (A, B, C, D, E, F).',
    ],
    slip: 'Do not forget that hex digits continue from 10 as A, B, C, D, E, F; writing 10 instead of A causes catastrophic calculation errors.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 4 COMPUTING NUMBER SYSTEMS', 'ta') +
          R(20, 36, 70, 70) +
          T(55, 56, 'Binary', 't', 'middle') +
          T(55, 72, 'Base 2', 'ta', 'middle') +
          T(55, 92, '{0, 1}', 't', 'middle') +
          R(100, 36, 70, 70) +
          T(135, 56, 'Octal', 't', 'middle') +
          T(135, 72, 'Base 8', 'ta', 'middle') +
          T(135, 92, '{0..7}', 't', 'middle') +
          R(180, 36, 70, 70) +
          T(215, 56, 'Decimal', 't', 'middle') +
          T(215, 72, 'Base 10', 'ta', 'middle') +
          T(215, 92, '{0..9}', 't', 'middle') +
          R(260, 36, 80, 70, 'fa') +
          T(300, 56, 'Hexadecimal', 't', 'middle') +
          T(300, 72, 'Base 16', 'ta', 'middle') +
          T(300, 92, '{0..9, A..F}', 't', 'middle') +
          R(20, 120, 320, 50) +
          T(30, 140, 'Positional Weights: N = d_n r^n + ... + d_1 r^1 + d_0 r^0', 'ta') +
          T(30, 158, '1 Byte = 8 bits = 2 Hex characters (e.g. 1111 1111_2 = FF_16)', 't')
      ),
      caption: 'The four fundamental number systems in computer architecture and their allowed digit alphabets.',
    },
  },

  'cfet:1:1': {
    explain: [
      'Conversion between decimal and binary is the foundational arithmetic skill in computer science.',
      'Decimal integers are converted to binary by successive division by 2 (reading remainders bottom-up), while fractional parts are converted by successive multiplication by 2 (reading integer overflow top-down).',
    ],
    definition:
      'Decimal to binary conversion is the algorithmic decomposition of base-10 integers and fractions into base-2 bit strings through repeated division and multiplication by radix 2.',
    formula: '(N)_{10} \\xrightarrow{\\div 2} (\\text{remainders} \\uparrow)_2, \\quad (0.F)_{10} \\xrightarrow{\\times 2} (\\text{integers} \\downarrow)_2',
    steps: [
      'Integer Part: Divide number by 2; record remainder (0 or 1); quotient becomes new dividend; repeat until quotient is 0; read remainders from bottom to top (LSB to MSB).',
      'Fractional Part: Multiply fraction by 2; record integer part (0 or 1); remaining fraction becomes new multiplicand; repeat until fraction is 0 or desired precision; read integer parts from top to bottom.',
      'Worked Example (45_{10}): 45/2=22 r1, 22/2=11 r0, 11/2=5 r1, 5/2=2 r1, 2/2=1 r0, 1/2=0 r1. Reading upward: 101101_2.',
      'Worked Fraction (0.625_{10}): 0.625 * 2 = 1.25 (1), 0.25 * 2 = 0.50 (0), 0.50 * 2 = 1.0 (1). Reading downward: 0.101_2.',
      'Binary to Decimal: Multiply each bit by $2^k$ where k is the positional index and sum results: $1\\cdot 32 + 0\\cdot 16 + 1\\cdot 8 + 1\\cdot 4 + 0\\cdot 2 + 1\\cdot 1 = 45$.',
    ],
    examAnswer: [
      'Show complete long-division working for integer decimal-to-binary conversion.',
      'Explicitly draw the upward arrow showing that the final remainder is the Most Significant Bit (MSB).',
      'Show successive multiplication working for fractional parts with a downward arrow.',
      'Verify the answer by converting the binary result back to decimal using positional powers of 2.',
    ],
    slip: 'The most fatal exam mistake is reading integer remainders from top to bottom instead of from bottom to top (MSB is the last remainder).',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'DECIMAL TO BINARY CONVERSION (45 -> 101101)', 'ta') +
          T(20, 42, '45 / 2 = 22  rem 1 (LSB)', 't') +
          T(20, 58, '22 / 2 = 11  rem 0', 't') +
          T(20, 74, '11 / 2 =  5  rem 1', 't') +
          T(20, 90, ' 5 / 2 =  2  rem 1', 't') +
          T(20, 106, ' 2 / 2 =  1  rem 0', 't') +
          T(20, 122, ' 1 / 2 =  0  rem 1 (MSB)', 't') +
          LA(185, 122, 185, 42, 'a') +
          T(195, 82, 'Read Upward!', 'ta') +
          R(210, 100, 130, 40, 'fa') +
          T(275, 118, '45_10 = 101101_2', 't', 'middle') +
          T(275, 132, '32+8+4+1 = 45', 'ta', 'middle') +
          T(180, 172, 'Fractions: multiply by 2 and read integers downward (top to bottom)', 'ta', 'middle')
      ),
      caption: 'Successive division by 2 with upward remainder reading for integer conversion.',
    },
  },

  'cfet:1:2': {
    explain: [
      'Binary numbers are lengthy and prone to human transcription errors. Octal (base 8) and Hexadecimal (base 16) serve as compact shorthand notations.',
      'Because $2^3 = 8$ and $2^4 = 16$, conversions between binary, octal, and hexadecimal require zero division—they are performed simply by grouping bits into triplets (octal) or nibbles (hex).',
    ],
    definition:
      'Radix grouping is the direct bit-chunking technique where binary strings are partitioned into 3-bit groups for octal conversion and 4-bit groups for hexadecimal conversion, starting from the binary radix point.',
    formula: '1 \\text{ Octal Digit} \\iff 3 \\text{ Bits} \\; (2^3=8); \\quad 1 \\text{ Hex Digit} \\iff 4 \\text{ Bits} \\; (2^4=16)',
    steps: [
      'Binary to Octal: Group bits in sets of 3 starting from the right (pad leading zeros on left if needed); replace each triplet with its octal digit (0-7).',
      'Binary to Hexadecimal: Group bits in sets of 4 starting from the right (pad leading zeros); replace each nibble with its hex character (0-9, A-F).',
      'Fractional Grouping: For fractions, group bits starting from the radix point moving to the right, padding trailing zeros on the right.',
      'Octal to Hexadecimal: Convert octal to intermediate binary (expand each digit to 3 bits), then regroup binary into 4-bit nibbles to get hex.',
      'Worked Example: $101101_2$ -> Octal: $101 \\; 101_2 = 55_8$. Hex: $0010 \\; 1101_2 = 2D_{16}$.',
    ],
    examAnswer: [
      'State the grouping rule: 3 bits per octal digit, 4 bits per hexadecimal digit.',
      'Show bit regrouping with spacing and explicit zero-padding: e.g. 101101_2 -> 0010 1101_2 = 2D_16.',
      'Convert an octal number to hex by passing through intermediate binary.',
      'Demonstrate fractional conversion showing padding to the right of the fractional point.',
    ],
    slip: 'When grouping for hexadecimal, always group from the binary point outward (to the left for integers, to the right for fractions); grouping from the left edge of an integer corrupts the positional weights.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'RADIX REGROUPING: BINARY <-> OCTAL & HEX', 'ta') +
          T(20, 48, 'Binary: 1 0 1 1 0 1', 't') +
          R(20, 60, 140, 50) +
          T(90, 78, 'Octal: Group by 3', 'ta', 'middle') +
          T(90, 96, '[101] [101] -> 5 5_8', 't', 'middle') +
          R(180, 60, 160, 50, 'fa') +
          T(260, 78, 'Hex: Group by 4', 'ta', 'middle') +
          T(260, 96, '[0010] [1101] -> 2 D_16', 't', 'middle') +
          R(20, 126, 320, 45) +
          T(30, 146, 'Octal to Hex Shortcut: Octal -> Binary (3 bits) -> Hex (4 bits)', 'ta') +
          T(30, 162, 'Example: 73_8 = 111 011_2 = 0011 1011_2 = 3B_16', 't')
      ),
      caption: 'Direct grouping of binary bits into 3-bit triplets (octal) and 4-bit nibbles (hexadecimal).',
    },
  },

  'cfet:1:3': {
    explain: [
      'Binary arithmetic is the fundamental computational engine executed by the Arithmetic Logic Unit (ALU).',
      'It obeys the exact same place-value carry and borrow rules as decimal arithmetic, but simplified by operating exclusively with digits 0 and 1.',
    ],
    definition:
      'Binary arithmetic encompasses addition, subtraction, multiplication, and division over base-2 operands using Boolean logic rules and binary carry/borrow propagation.',
    formula: '1 + 1 = 10_2 \\; (\\text{Sum}=0, \\text{Carry}=1); \\quad 0 - 1 = 1_2 \\; (\\text{Difference}=1, \\text{Borrow}=1)',
    steps: [
      'Addition Rules: $0+0=0$; $0+1=1$; $1+0=1$; $1+1=10_2$ (sum 0, carry 1); $1+1+1=11_2$ (sum 1, carry 1).',
      'Subtraction Rules: $0-0=0$; $1-0=1$; $1-1=0$; $0-1=1$ (difference 1 with borrow 1 from next higher column).',
      'Worked Addition ($1011_2 + 0110_2$): $11 + 6 = 17_{10} = 10001_2$. Column carries: 1110.',
      'Worked Subtraction ($1101_2 - 0110_2$): $13 - 6 = 7_{10} = 0111_2$.',
      'ALU Implementation: Half Adder (adds 2 bits) -> Full Adder (adds 2 bits plus carry-in) -> Ripple Carry Adder chain.',
    ],
    examAnswer: [
      'State all 4 fundamental rules of binary addition and all 4 rules of binary subtraction.',
      'Show column-by-column binary addition with carry bits explicitly written above each column.',
      'Show column-by-column binary subtraction with borrow tracking.',
      'Verify all binary results by converting operands and answers to decimal.',
    ],
    slip: 'Forgetting the incoming carry when $1 + 1 + \\text{carry } 1 = 11_2$; the result is sum 1 with carry 1.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'BINARY ARITHMETIC RULES & ADDITION', 'ta') +
          R(20, 36, 150, 75) +
          T(95, 54, 'Addition Rules', 'ta', 'middle') +
          T(30, 72, '0+0=0, 0+1=1', 't') +
          T(30, 88, '1+1=10 (sum 0, carry 1)', 't') +
          T(30, 102, '1+1+1=11 (sum 1, carry 1)', 'ta') +
          R(190, 36, 150, 75) +
          T(265, 54, 'Subtraction Rules', 'ta', 'middle') +
          T(200, 72, '0-0=0, 1-0=1, 1-1=0', 't') +
          T(200, 88, '0-1=1 (with borrow 1)', 't') +
          T(200, 102, 'Borrow halves weight of 2^k', 'ta') +
          R(40, 120, 280, 52, 'fa') +
          T(60, 138, 'Carries:  1 1 1 0', 'ta') +
          T(60, 154, '        1 0 1 1 (11) + 0 1 1 0 (6) = 1 0 0 0 1 (17)', 't')
      ),
      caption: 'Fundamental rules of binary addition/subtraction and column carry propagation.',
    },
  },

  'cfet:1:4': {
    explain: [
      'Signed number representations allow digital computers to encode both positive and negative integers in fixed-width binary registers.',
      'In 1’s complement representation, positive numbers begin with sign bit 0, while negative numbers are formed by inverting (flipping) every bit of the positive magnitude.',
    ],
    definition:
      '1’s complement is a signed binary number representation where a negative number is formed by bitwise complementing (NOT operation) all bits of its positive equivalent.',
    formula: '\\text{1\'s Comp}(N) = (2^n - 1) - N, \\quad \\text{Range: } [-(2^{n-1} - 1), \\; +(2^{n-1} - 1)]',
    steps: [
      'Most Significant Bit (MSB): Acts as the sign bit: 0 indicates positive, 1 indicates negative.',
      'Positive Representation: Same as standard unsigned binary with leading sign bit 0 (e.g. $+5 = 0000\\;0101_2$ in 8 bits).',
      'Negative Representation: Flip every bit: $0 \\to 1$ and $1 \\to 0$. $-5 = 1111\\;1010_2$.',
      'Dual Zeros Flaw: 1’s complement suffers from two representations of zero: $+0 = 0000\\;0000_2$ and $-0 = 1111\\;1111_2$.',
      'End-Around Carry: When adding numbers in 1’s complement, any carry out of the MSB must be wrapped around and added to the LSB.',
    ],
    examAnswer: [
      'Define 1’s complement and state how it is obtained (bitwise bit inversion).',
      'State the valid numeric range for an n-bit 1’s complement register: $-(2^{n-1} - 1)$ to $+(2^{n-1} - 1)$.',
      'Explain the Dual Zeros problem (+0 and -0) and why it complicates hardware equality comparators.',
      'Explain End-Around Carry in 1’s complement addition with a worked example.',
    ],
    slip: 'Do not forget the End-Around Carry: in 1’s complement addition, a carry out of the MSB must NOT be discarded; it must be added back into the least significant bit.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, '1’S COMPLEMENT REPRESENTATION', 'ta') +
          R(20, 36, 150, 80) +
          T(95, 54, '+5 in 8 bits', 'ta', 'middle') +
          T(95, 74, '0 0 0 0 0 1 0 1', 't', 'middle') +
          T(95, 96, 'MSB = 0 (Positive)', 't', 'middle') +
          LA(170, 74, 190, 74, 'a') +
          R(190, 36, 150, 80, 'fa') +
          T(265, 54, '-5 in 1’s Comp', 'ta', 'middle') +
          T(265, 74, '1 1 1 1 1 0 1 0', 't', 'middle') +
          T(265, 96, 'All bits inverted!', 't', 'middle') +
          R(20, 126, 320, 48) +
          T(30, 144, 'Critical Flaw: Two Zeros! +0 (00000000) and -0 (11111111)', 'ta') +
          T(30, 160, 'Requires "End-Around Carry" during addition -> replaced by 2’s Comp', 't')
      ),
      caption: '1’s complement bit inversion and the architectural drawback of dual zero representations.',
    },
  },

  'cfet:1:5': {
    explain: [
      '2’s complement is the universal standard for representing signed integers in modern computer processors.',
      'It completely eliminates the dual-zero problem of 1’s complement and allows subtraction to be performed using identical adder hardware without needing separate subtractor circuits.',
    ],
    definition:
      '2’s complement is a signed number system where a negative value is formed by inverting all bits of the positive magnitude and adding 1, yielding a single unique zero and an asymmetrical range.',
    formula: '\\text{2\'s Comp}(N) = \\text{1\'s Comp}(N) + 1 = 2^n - N, \\quad \\text{Range: } [-2^{n-1}, \\; 2^{n-1} - 1]',
    steps: [
      'Rule to form 2’s complement: Take 1’s complement (flip all bits), then add 1 to the least significant bit.',
      'Fast Shortcut: Scan bits from right to left; copy all bits up to and including the first 1; invert all remaining bits to the left.',
      'Single Unique Zero: In 8 bits, $+0 = 0000\\;0000$. Flipping gives $1111\\;1111$; adding 1 gives $1\\;0000\\;0000$. Discarding 9th bit leaves $0000\\;0000$ (unique 0).',
      'Subtraction via Addition: $A - B = A + (\\text{2\'s complement of } B)$. Discard the end carry out of the MSB.',
      '8-Bit Range: $-128$ to $+127$. Note that $-128$ ($1000\\;0000_2$) has no positive counterpart.',
    ],
    examAnswer: [
      'Define 2’s complement and state the mathematical relationship: 2’s comp = 1’s comp + 1.',
      'Perform signed subtraction A - B using 2’s complement: Convert B to 2’s comp, add to A, discard carry.',
      'State the n-bit range: $[-2^{n-1}, +2^{n-1} - 1]$ and contrast with 1’s complement.',
      'Explain why 2’s complement is universally preferred in CPU hardware (single zero, unified adder/subtractor circuit).',
    ],
    slip: 'In 2’s complement subtraction, DO NOT add the carry back to the LSB (that is 1’s complement); in 2’s complement, the end carry out of the MSB is simply discarded.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, '2’S COMPLEMENT & SUBTRACTION PIPELINE', 'ta') +
          T(20, 48, '+5   = 0000 0101', 't') +
          LA(60, 56, 60, 74, 'a') +
          T(70, 68, 'Flip all bits (1’s comp)', 't') +
          T(20, 90, '       1111 1010', 't') +
          LA(60, 98, 60, 116, 'a') +
          T(70, 110, 'Add 1', 'ta') +
          T(20, 132, '−5   = 1111 1011', 'ta') +
          R(180, 40, 160, 100, 'fa') +
          T(260, 60, 'SUBTRACTION: A - B', 'ta', 'middle') +
          T(260, 80, 'A + (2’s Comp of B)', 't', 'middle') +
          T(260, 102, 'Drop the end carry!', 'ta', 'middle') +
          T(260, 124, '8-bit Range: -128..+127', 't', 'middle') +
          T(180, 172, 'Zero is unique (0000 0000); same hardware adder computes A + (-B)', 'ta', 'middle')
      ),
      caption: 'Forming 2’s complement (flip + 1) and executing binary subtraction via addition.',
    },
  },

  'cfet:1:6': {
    explain: [
      'Alphanumeric characters, punctuation marks, and control symbols must be encoded into binary numbers for computer storage and transmission.',
      'ASCII is the historical 7-bit standard encoding Western Latin characters, whereas Unicode is the modern global standard capable of encoding all world scripts and emojis.',
    ],
    definition:
      'ASCII and Unicode are standardized character encoding character-set specifications that map textual glyphs to discrete integer code points for digital processing.',
    formula: '\\text{ASCII: } 7 \\text{ bits } (2^7 = 128 \\text{ chars}); \\quad \\text{Unicode UTF-8: Variable } 1 \\text{ to } 4 \\text{ bytes } (>1.1\\times 10^6 \\text{ code points})',
    steps: [
      'Standard ASCII: 7-bit encoding covering 128 characters (0-127): 33 control characters (0-31, 127) and 95 printable characters (32-126).',
      'Key ASCII Landmarks: \'0\' = 48 ($0110000_2$), \'A\' = 65 ($1000001_2$), \'a\' = 97 ($1100001_2$); Note: \'a\' - \'A\' = 32 (toggle 6th bit).',
      'Extended ASCII: 8-bit encoding (256 characters); includes accented European letters and box-drawing graphical symbols.',
      'Unicode Consortium: Overcame the fragmentation of incompatible language code pages by assigning a universal code point (U+XXXX) to every character in every living and historic language.',
      'UTF-8 Encoding: Variable-length format (1 to 4 bytes); 100% backward compatible with ASCII (bytes 0-127 are identical); dominant web standard (>98% of websites).',
    ],
    examAnswer: [
      'Define ASCII and state its bit-width (7-bit, 128 characters).',
      'State the ASCII decimal codes for \'0\' (48), \'A\' (65), and \'a\' (97).',
      'Explain the limitations of ASCII and why Unicode was developed.',
      'Explain UTF-8 variable-length encoding and its backward compatibility with ASCII.',
    ],
    slip: 'Do not confuse character encoding with font; encoding maps a character to an abstract binary number code point, whereas a font defines how that glyph visually renders on screen.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'CHARACTER ENCODINGS: ASCII VS UNICODE', 'ta') +
          R(20, 36, 140, 75) +
          T(90, 54, 'ASCII (7-bit)', 'ta', 'middle') +
          T(90, 72, '128 Characters', 't', 'middle') +
          T(90, 88, '\'A\'=65, \'a\'=97, \'0\'=48', 't', 'middle') +
          T(90, 102, 'English only', 'ta', 'middle') +
          R(190, 36, 150, 75, 'fa') +
          T(265, 54, 'Unicode (UTF-8)', 'ta', 'middle') +
          T(265, 72, '1 to 4 Bytes Variable', 't', 'middle') +
          T(265, 88, 'All World Scripts + Emojis', 't', 'middle') +
          T(265, 102, '100% ASCII Compatible', 'ta', 'middle') +
          R(20, 124, 320, 48) +
          T(30, 144, 'Landmark Conversion: \'a\' (97) - \'A\' (65) = 32 = 0010 0000_2', 'ta') +
          T(30, 160, 'Flipping bit 5 instantly converts between uppercase and lowercase!', 't')
      ),
      caption: 'Comparison between historical 7-bit ASCII and universal variable-length Unicode UTF-8.',
    },
  },

  'cfet:1:7': {
    explain: [
      'In physical computer memory, raw bits are aggregated into standardized data units: Nibble (4 bits), Byte (8 bits), and Words (16, 32, or 64 bits).',
      'When multi-byte words are stored across contiguous memory addresses, byte-ordering conventions (Endianness) dictate whether the most significant or least significant byte is stored first.',
    ],
    definition:
      'Data representation in memory defines how primitive data types and multi-byte words are structured, aligned, and addressed across physical RAM cells, governed by Big-Endian or Little-Endian conventions.',
    formula: '\\text{1 Byte} = 8 \\text{ bits}; \\quad \\text{Big-Endian: MSB at } A_0; \\quad \\text{Little-Endian: LSB at } A_0',
    steps: [
      'Units: Bit (0/1) -> Nibble (4 bits) -> Byte (8 bits) -> Word (processor architecture register size, typically 32 or 64 bits).',
      'Word Alignment: Memory is addressed in byte increments, but CPUs access 32-bit/64-bit words at memory addresses that are multiples of word size for efficiency.',
      'Big-Endian Architecture: Most Significant Byte (MSB) is stored at the lowest memory address (natural reading order; used in network protocols / TCP/IP "network byte order").',
      'Little-Endian Architecture: Least Significant Byte (LSB) is stored at the lowest memory address (used in x86/x64 and ARM processors).',
      'Numerical Example (0x12345678 at address 1000): Big-Endian: [1000: 12, 1001: 34, 1002: 56, 1003: 78]. Little-Endian: [1000: 78, 1001: 56, 1002: 34, 1003: 12].',
    ],
    examAnswer: [
      'Define Nibble, Byte, and Word with exact bit capacities.',
      'Differentiate between Big-Endian and Little-Endian byte ordering.',
      'Illustrate with a 4-byte hex value (e.g. 0x12345678) stored across addresses 1000 to 1003 for both endians.',
      'Explain "Network Byte Order": Standardized on Big-Endian for TCP/IP packet headers.',
    ],
    slip: 'Endianness describes the order of BYTES within a word, NOT the order of bits within a byte; bit 7 remains the most significant bit of each individual byte.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'MEMORY ENDIANNESS: 0x12345678 AT ADDR 1000', 'ta') +
          T(20, 45, 'Big-Endian (MSB at Lowest Addr):', 'ta') +
          R(30, 52, 60, 26) +
          T(60, 69, '1000: 12', 't', 'middle') +
          R(90, 52, 60, 26) +
          T(120, 69, '1001: 34', 't', 'middle') +
          R(150, 52, 60, 26) +
          T(180, 69, '1002: 56', 't', 'middle') +
          R(210, 52, 60, 26) +
          T(240, 69, '1003: 78', 't', 'middle') +
          T(20, 105, 'Little-Endian (LSB at Lowest Addr - x86):', 'ta') +
          R(30, 112, 60, 26, 'fa') +
          T(60, 129, '1000: 78', 't', 'middle') +
          R(90, 112, 60, 26) +
          T(120, 129, '1001: 56', 't', 'middle') +
          R(150, 112, 60, 26) +
          T(180, 129, '1002: 34', 't', 'middle') +
          R(210, 112, 60, 26) +
          T(240, 129, '1003: 12', 't', 'middle') +
          T(180, 168, 'Network Protocols (IP/TCP) mandate Big-Endian format', 'ta', 'middle')
      ),
      caption: 'Big-Endian vs Little-Endian multi-byte ordering in contiguous memory addresses.',
    },
  },
};
