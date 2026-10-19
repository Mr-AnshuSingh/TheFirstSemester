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

/* ---------- EIC UNIT 4 TOPIC CONTENT (7 Topics) ---------- */
export const EIC_UNIT4_TOPICS: Record<string, TopicContent> = {
  'eic:4:0': {
    explain: [
      'Article 368 in Part XX grants constituent power to Parliament to amend the Constitution by addition, variation, or repeal.',
      'Three distinct amendment pathways balance constitutional rigidity and flexibility: Simple Majority (provisions outside Art. 368), Special Majority of Parliament (2/3 present and voting + majority of total membership), and Special Majority with Ratification by at least 50% of the State Legislatures (federal provisions).',
      'Under the landmark Basic Structure Doctrine (Kesavananda Bharati, 1973), Parliament’s amending power is legally limited; it cannot destroy the fundamental architecture of the Constitution.',
    ],
    definition:
      'The amendment procedure under Article 368 codifies the constituent mechanism enabling constitutional evolution through calibrated legislative thresholds, checked by the judicial Basic Structure doctrine.',
    formula: '\\text{Art. 368: } \\text{Special Majority } (\\ge 50\\% \\text{ Total} + \\ge \\frac{2}{3} \\text{ Present}) \\; [+\\text{Ratification by } \\ge 50\\% \\text{ States}]',
    steps: [
      'Introduction: Bill may originate in either House of Parliament; cannot be introduced in state legislatures; no prior Presidential sanction required.',
      'Separate House Approval: Each House must pass the bill independently by a special majority; there is no provision for a joint sitting under Article 368.',
      'Federal Ratification: Amendments altering the federal balance (presidential elections, Supreme Court/High Courts, legislative distribution) require resolution by half the states.',
      'Presidential Assent: The President is constitutionally bound to give assent to a constitutional amendment bill and cannot return or withhold it.',
      'Basic Structure Boundary: Judicial review can strike down any amendment violating judicial independence, democracy, rule of law, or secularism.',
    ],
    examAnswer: [
      'Detail the three procedural routes for amending the Indian Constitution.',
      'Define the exact formula for a "Special Majority" under Article 368.',
      'List at least 4 constitutional provisions that require federal ratification by 50% of the States.',
      'Explain the Basic Structure doctrine enunciated in the Kesavananda Bharati case (1973).',
    ],
    slip: 'Assuming a joint sitting of Parliament can resolve a deadlock on a Constitutional Amendment Bill; under Article 368, each House must pass the bill separately.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 3 AMENDMENT PATHWAYS (ART. 368)', 'ta') +
          // Path 1
          R(20, 32, 320, 30) +
          T(35, 48, '1. Simple Majority:', 'ta') +
          T(150, 48, 'Outside Art. 368 (New states, citizenship)', 't') +
          // Path 2
          R(20, 68, 320, 34, 'fa') +
          T(35, 84, '2. Special Majority:', 'ta') +
          T(150, 84, '2/3 Present & Voting + >50% Total (FR, DPSP)', 'ta') +
          // Path 3
          R(20, 108, 320, 42) +
          T(35, 124, '3. Federal Ratification:', 'ta') +
          T(165, 124, 'Special Majority + Ratification by 50% States', 't') +
          T(35, 140, '(Federal provisions: SC/HC, Art 368, Executive power)', 't') +
          // Bottom check
          R(20, 156, 320, 24, 'fa') +
          T(180, 172, 'Judicial Check: Cannot violate the Basic Structure (1973)', 'ta', 'middle')
      ),
      caption:
        'Figure 4.0: The three constitutional amendment mechanisms under Article 368 subject to the Basic Structure doctrine.',
    },
  },

  'eic:4:1': {
    explain: [
      'The 42nd Constitutional Amendment Act of 1976 is termed the "Mini-Constitution" due to its sweeping structural revisions enacted during the National Emergency.',
      'It amended the Preamble for the first and only time, inserting the words "Socialist", "Secular", and "Integrity".',
      'It introduced Part IV-A (Article 51A), codifying 10 Fundamental Duties on the recommendations of the Swaran Singh Committee.',
      'It added three pivotal Directive Principles: Article 39A (Free legal aid), Article 43A (Worker participation in industrial management), and Article 48A (Protection of environment, forests, and wildlife).',
      'It transferred five subjects from the State List to the Concurrent List: Education, Forests, Weights and Measures, Protection of wild animals and birds, and Administration of justice.',
    ],
    definition:
      'The 42nd Constitutional Amendment Act of 1976 ("Mini-Constitution") enacted extensive structural revisions across the Preamble, Fundamental Duties, Directive Principles, and federal distribution of legislative lists.',
    formula: '\\text{42nd CAA (1976)} = \\text{Preamble ("Socialist", "Secular", "Integrity")} + \\text{Part IV-A (Duties)} + \\text{Arts 39A, 43A, 48A}',
    steps: [
      'Preamble Modifications: Changed the characterization from "Sovereign Democratic Republic" to "Sovereign Socialist Secular Democratic Republic" and "unity of the Nation" to "unity and integrity of the Nation".',
      'Fundamental Duties: Codified 10 civic duties in Part IV-A (Article 51A).',
      'Environmental & Labor Directives: Added Article 48A commanding the state to preserve ecology, and Article 43A for industrial democracy.',
      'Concurrent List Expansions: Shifted Education and Forests to the Concurrent List, empowering Parliament to pass national environmental and education laws.',
      'Judicial Review Limits: Attempted to curb judicial review of constitutional amendments (subsequently nullified in the Minerva Mills case).',
    ],
    examAnswer: [
      'Why is the 42nd Constitutional Amendment Act commonly referred to as the "Mini-Constitution"?',
      'Name the three words inserted into the Preamble by the 42nd Amendment.',
      'Explain the addition of Part IV-A (Fundamental Duties) and Directive Principles 39A, 43A, and 48A.',
      'Enumerate the 5 subjects transferred from the State List to the Concurrent List.',
    ],
    slip: 'Ignoring the progressive environmental and legal-aid provisions of the 42nd Amendment (Articles 48A and 39A), focusing solely on its emergency political aspects.',
    diagram: {
      svg: S(
        360,
        190,
        T(10, 18, 'THE 42ND AMENDMENT (1976) "MINI-CONSTITUTION"', 'ta') +
          // Central Hub
          C(180, 105, 36, 'fa') +
          T(180, 102, '42nd CAA', 'ta', 'middle') +
          T(180, 114, '1976', 'ta', 'middle') +
          // 4 Satellite Nodes
          R(15, 36, 120, 32) +
          T(75, 52, 'Preamble Amended', 'ta', 'middle') +
          T(75, 63, 'Socialist · Secular · Integrity', 't', 'middle') +
          R(225, 36, 120, 32) +
          T(285, 52, 'Part IV-A Added', 'ta', 'middle') +
          T(285, 63, '10 Fundamental Duties', 't', 'middle') +
          R(15, 142, 120, 32) +
          T(75, 158, 'DPSPs: 39A, 43A, 48A', 'ta', 'middle') +
          T(75, 169, 'Legal Aid · Environment', 't', 'middle') +
          R(225, 142, 120, 32) +
          T(285, 158, 'Concurrent List Shift', 'ta', 'middle') +
          T(285, 169, 'Education · Forests', 't', 'middle') +
          // Spokes
          L(75, 68, 150, 95, 'd') +
          L(285, 68, 210, 95, 'd') +
          L(75, 142, 150, 115, 'd') +
          L(285, 142, 210, 115, 'd')
      ),
      caption:
        'Figure 4.1: The multi-faceted scope of the 42nd Amendment across the Preamble, Fundamental Duties, DPSPs, and federal jurisdiction.',
    },
  },

  'eic:4:2': {
    explain: [
      'The 44th Constitutional Amendment Act of 1978 was enacted by the Janata Party government under Morarji Desai to dismantle autocratic distortions introduced during the Emergency and safeguard democratic civil liberties.',
      'It deleted the Right to Property from the list of Fundamental Rights (repealing Article 19(1)(f) and Article 31) and relocated it as a constitutional/legal right under Article 300A in Part XII.',
      'It introduced stringent safeguards against the abuse of Article 352 (National Emergency): substituted the ambiguous term "internal disturbance" with "armed rebellion", and required the written advice of the Union Cabinet.',
      'It guaranteed that Article 20 (protection against retrospective criminal law/double jeopardy) and Article 21 (right to life and personal liberty) can never be suspended during a National Emergency.',
    ],
    definition:
      'The 44th Constitutional Amendment Act of 1978 was a democratic restoration enactment that repealed emergency excesses, eliminated the Right to Property from Part III to Article 300A, and made Articles 20 and 21 non-suspendable.',
    formula: '\\text{44th CAA (1978)} = \\text{Property } \\to \\text{Art. 300A} + \\text{"Armed Rebellion"} + \\text{Arts 20 \\& 21 Inviolable}',
    steps: [
      'Demotion of Property: Removed Article 31 and Article 19(1)(f); created Article 300A: "No person shall be deprived of his property save by authority of law."',
      'Emergency Reform (Article 352): Replaced "internal disturbance" with "armed rebellion"; mandated written recommendation of the Union Cabinet.',
      'Inviolable Civil Liberties: Guaranteed that Articles 20 and 21 cannot be suspended even when an Emergency is proclaimed under Article 352.',
      'Restoration of Legislative Tenures: Restored normal 5-year terms for Lok Sabha and State Legislative Assemblies (reversing the 6-year extension).',
      'Restoration of Judicial Independence: Fully revived the writ jurisdiction and constitutional review powers of High Courts and the Supreme Court.',
    ],
    examAnswer: [
      'Explain the democratic background and primary goals of the 44th Constitutional Amendment Act (1978).',
      'Detail the deletion of the Right to Property from Part III and its relocation to Article 300A.',
      'Enumerate the safeguards introduced into Article 352 to prevent misuse of National Emergency provisions.',
      'Explain why Articles 20 and 21 were made non-suspendable during a National Emergency.',
    ],
    slip: 'Believing that property rights were abolished entirely; the right to property remains a valid constitutional right under Article 300A, preventing unlawful state confiscation.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 44TH AMENDMENT (1978) DEMOCRATIC SHIELD', 'ta') +
          // Property Shift
          R(20, 35, 150, 60) +
          T(95, 52, 'Right to Property', 'ta', 'middle') +
          T(95, 68, 'Part III (Art. 31) DELETED', 't', 'middle') +
          LA(95, 75, 95, 90, 'a') +
          T(95, 88, 'Moved to Art. 300A (Legal Right)', 'ta', 'middle') +
          // Emergency Reforms
          R(190, 35, 150, 60, 'fa') +
          T(265, 52, 'Emergency Reforms', 'ta', 'middle') +
          T(265, 68, '"Armed Rebellion" replaces', 't', 'middle') +
          T(265, 82, '"Internal Disturbance"', 'ta', 'middle') +
          // Inviolable Rights Box
          R(20, 105, 320, 48, 'fa') +
          T(180, 122, 'ARTICLES 20 & 21 CANNOT BE SUSPENDED IN EMERGENCY', 'ta', 'middle') +
          T(180, 138, 'Life & Personal Liberty (Art. 21) are permanently inviolable', 't', 'middle') +
          // Bottom
          T(180, 178, 'Restored 5-year terms for Lok Sabha & State Assemblies', 'ta', 'middle')
      ),
      caption:
        'Figure 4.2: The democratic corrective measures of the 44th Amendment: property right relocation and permanent protection for Articles 20 and 21.',
    },
  },

  'eic:4:3': {
    explain: [
      'The 74th Constitutional Amendment Act of 1992 granted constitutional status to Urban Local Bodies (Municipalities / Nagarpalikas), coming into effect on 1 June 1993.',
      'It added Part IX-A (Articles 243P to 243ZG) and the Twelfth Schedule to the Constitution, containing 18 functional items devolved to urban local governments (urban planning, water supply, public health, fire services).',
      'It established a three-tier municipal system: Nagar Panchayats for transitional areas, Municipal Councils for smaller urban areas, and Municipal Corporations for large metropolitan areas.',
      'It mandated regular democratic elections every 5 years conducted by an independent State Election Commission, and reserved at least 1/3 of all seats for women.',
    ],
    definition:
      'The 74th Constitutional Amendment Act of 1992 constitutionalized democratic decentralization in urban governance through Part IX-A and the Twelfth Schedule, establishing three tiers of Municipalities with mandatory 5-year elections and 1/3 reservation for women.',
    formula: '\\text{74th CAA (1992)} = \\text{Part IX-A (Arts 243P-243ZG)} + \\text{12th Schedule (18 Functions)} + \\ge \\frac{1}{3} \\text{ Women Seats}',
    steps: [
      'Constitutional Recognition: Formally empowered Urban Local Bodies as democratic units of local self-government.',
      'Three-Tier Classification: Nagar Panchayat (rural-to-urban transition), Municipal Council (small city), Municipal Corporation (metropolis).',
      'Twelfth Schedule (18 Items): Devolved urban planning, road/bridge construction, water supply, sanitation, fire services, and slum upgrading.',
      'Democratic Mandate: Fixed 5-year tenure; fresh elections must occur within 6 months if a municipal body is dissolved.',
      'State Finance & Election Commissions: Mandates State Finance Commissions every 5 years for revenue sharing, and independent State Election Commissions for conducting elections.',
    ],
    examAnswer: [
      'Explain the primary objectives and salient features of the 74th Constitutional Amendment Act (1992).',
      'Detail the three tiers of Urban Local Bodies codified under Part IX-A.',
      'List at least 5 functional matters listed under the Twelfth Schedule of the Constitution.',
      'Explain the roles of the State Finance Commission and State Election Commission under the 74th Amendment.',
    ],
    slip: 'Confusing the 73rd Amendment (Panchayati Raj / Rural, Eleventh Schedule) with the 74th Amendment (Municipalities / Urban, Twelfth Schedule).',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 74TH AMENDMENT: URBAN LOCAL BODIES', 'ta') +
          // 3 Tiers
          R(15, 34, 100, 52) +
          T(65, 52, 'Nagar Panchayat', 'ta', 'middle') +
          T(65, 68, 'Transitional Areas', 't', 'middle') +
          R(130, 34, 100, 52) +
          T(180, 52, 'Municipal Council', 'ta', 'middle') +
          T(180, 68, 'Smaller Urban', 't', 'middle') +
          R(245, 34, 100, 52, 'fa') +
          T(295, 52, 'Corporation', 'ta', 'middle') +
          T(295, 68, 'Metropolitan Area', 'ta', 'middle') +
          // Connecting line
          L(65, 86, 295, 86, 'd') +
          // Twelfth Schedule and Mandates
          R(15, 100, 330, 48) +
          T(180, 116, 'PART IX-A · TWELFTH SCHEDULE (18 FUNCTIONS)', 'ta', 'middle') +
          T(180, 134, 'Urban Planning · Water Supply · Sanitation · Fire Services · Slum Upgrading', 't', 'middle') +
          // Footer
          T(180, 178, 'Mandatory 5-Year Elections · State Election & Finance Commissions · ≥ 1/3 Women', 'ta', 'middle')
      ),
      caption:
        'Figure 4.3: The three tiers of municipal governance and democratic decentralization mandates established by the 74th Amendment.',
    },
  },

  'eic:4:4': {
    explain: [
      'The 76th Constitutional Amendment Act was enacted in 1994 to protect Tamil Nadu’s 69% reservation law from judicial invalidation.',
      'Context: In the landmark Indra Sawhney v. Union of India case (1992), the Supreme Court ruled that total reservations in public employment and education cannot exceed a 50% ceiling limit.',
      'Tamil Nadu had an existing state law providing 69% reservation (backward classes, SCs, STs).',
      'The 76th Amendment inserted the Tamil Nadu Backward Classes, Scheduled Castes and Scheduled Tribes (Reservation of Seats in Educational Institutions and of Appointments or Posts in the Services under the State) Act, 1993 into the Ninth Schedule as Entry 257A.',
      'Under Article 31B, laws placed in the Ninth Schedule are shielded from judicial challenge on the grounds of violating Fundamental Rights.',
    ],
    definition:
      'The 76th Constitutional Amendment Act of 1994 placed the Tamil Nadu 69% reservation statute into the Ninth Schedule under Article 31B to immunize it from the 50% reservation ceiling established in Indra Sawhney.',
    formula: '\\text{76th CAA (1994)} \\implies \\text{Tamil Nadu 69\\% Reservation Act } \\xrightarrow{\\text{Placed in}} \\text{Ninth Schedule (Entry 257A)}',
    steps: [
      'Indra Sawhney Landmark (1992): The 9-judge Supreme Court bench capped total affirmative action reservations at 50%.',
      'Tamil Nadu State Act: The state passed a dedicated act in 1993 continuing its historical 69% reservation framework.',
      'Constitutional Amendment: Parliament enacted the 76th Amendment inserting the state act into the Ninth Schedule under Article 31B.',
      'Ninth Schedule Shield: Designed to prevent courts from declaring the law void for violating Article 14 or Article 16.',
      'Subsequent Judicial Clarification (I.R. Coelho Case, 2007): The Supreme Court ruled that all Ninth Schedule laws inserted after 24 April 1973 remain subject to judicial review against the Basic Structure.',
    ],
    examAnswer: [
      'Explain the constitutional context and primary objective of the 76th Constitutional Amendment Act (1994).',
      'Describe the 50% reservation ceiling established by the Supreme Court in the Indra Sawhney case (1992).',
      'Explain how the Ninth Schedule and Article 31B operate to protect state statutes.',
      'Discuss the significance of the landmark I.R. Coelho verdict (2007) regarding judicial review of Ninth Schedule laws.',
    ],
    slip: 'Assuming Ninth Schedule laws enjoy total immunity from judicial review; post-2007 (I.R. Coelho case), any Ninth Schedule law violating the Basic Structure can be struck down by the Supreme Court.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 76TH AMENDMENT & NINTH SCHEDULE SHIELD', 'ta') +
          // Indra Sawhney 50% Rule (Left)
          R(15, 34, 155, 60) +
          T(92, 52, 'Indra Sawhney (1992)', 'ta', 'middle') +
          T(92, 68, '50% Reservation Ceiling', 't', 'middle') +
          T(92, 82, 'Declared by Supreme Court', 't', 'middle') +
          // Tamil Nadu 69% Act (Right)
          R(190, 34, 155, 60, 'fa') +
          T(267, 52, 'Tamil Nadu Act (1993)', 'ta', 'middle') +
          T(267, 68, '69% Total Reservation', 'ta', 'middle') +
          T(267, 82, 'Exceeds 50% ceiling', 't', 'middle') +
          // 76th Amendment Shield (Bottom)
          LA(267, 94, 267, 110, 'a') +
          R(30, 110, 300, 48, 'fa') +
          T(180, 126, '76TH CONSTITUTIONAL AMENDMENT (1994)', 'ta', 'middle') +
          T(180, 142, 'Placed Act into Ninth Schedule (Entry 257A) under Art. 31B Shield', 't', 'middle') +
          // I.R. Coelho note
          T(180, 178, 'I.R. Coelho (2007): Still subject to Basic Structure judicial review', 'ta', 'middle')
      ),
      caption:
        'Figure 4.4: The 76th Amendment shielded Tamil Nadu’s 69% reservation law by placing it into the Ninth Schedule.',
    },
  },

  'eic:4:5': {
    explain: [
      'The 86th Constitutional Amendment Act of 2002 is one of the most celebrated social-welfare amendments in Indian constitutional history.',
      'It established education as a Fundamental Right by inserting Article 21A in Part III: "The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine."',
      'It modified Article 45 in Part IV (Directive Principles) to focus on early childhood care and education for children below the age of six years.',
      'It added clause (k) to Article 51A in Part IV-A (Fundamental Duties), obligating every parent or guardian to provide educational opportunities to children between 6 and 14 years.',
      'It culminated in the historic Right of Children to Free and Compulsory Education (RTE) Act of 2009.',
    ],
    definition:
      'The 86th Constitutional Amendment Act of 2002 enacted a tripartite constitutional mandate for education by inserting Article 21A (Fundamental Right for ages 6–14), amending Article 45 (Early childhood DPSP), and adding Article 51A(k) (Parental duty).',
    formula: '\\text{86th CAA (2002)} = \\text{Art. 21A (FR: 6-14 Free Edu)} + \\text{Art. 45 (DPSP: <6 Care)} + \\text{Art. 51A(k) (Duty of Parents)}',
    steps: [
      'Judicial Foundation: Built upon the Unni Krishnan v. State of A.P. (1993) verdict recognizing the right to education as implicit in Article 21.',
      'Insertion of Article 21A: Made free and compulsory education an explicit, enforceable Fundamental Right for children aged 6 to 14 years.',
      'Substitution of Article 45: Reoriented the DPSP to direct state care and education for early childhood (under 6 years of age).',
      'Addition of 11th Fundamental Duty: Inserted Article 51A(k) charging parents and guardians with the civic duty of sending children to school.',
      'Statutory Realization: Parliament enacted the Right to Education (RTE) Act in 2009, mandating 25% quota in private schools for disadvantaged groups.',
    ],
    examAnswer: [
      'Explain the tripartite educational transformation brought by the 86th Constitutional Amendment Act (2002).',
      'Detail the constitutional wording, age brackets, and significance of Article 21A.',
      'Explain the amendments made to Article 45 (Part IV) and Article 51A (Part IV-A).',
      'State the parliamentary statute enacted in 2009 to operationalize Article 21A.',
    ],
    slip: 'Confusing the age thresholds; Article 21A strictly covers children from 6 to 14 years, whereas Article 45 directs the state to focus on children below 6 years.',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 86TH AMENDMENT (2002) TRIPARTITE REFORM', 'ta') +
          // 3 Pillars
          // Pillar 1: Art 21A
          R(15, 34, 100, 105, 'fa') +
          T(65, 52, 'PART III (FR)', 'ta', 'middle') +
          T(65, 68, 'Article 21A', 'ta', 'middle') +
          T(65, 88, 'Free & Compulsory', 't', 'middle') +
          T(65, 102, 'Education for', 't', 'middle') +
          T(65, 116, 'Ages 6 to 14', 'ta', 'middle') +
          T(65, 130, '(Enforceable)', 't', 'middle') +
          // Pillar 2: Art 45
          R(130, 34, 100, 105) +
          T(180, 52, 'PART IV (DPSP)', 't', 'middle') +
          T(180, 68, 'Article 45', 'ta', 'middle') +
          T(180, 88, 'Early Childhood', 't', 'middle') +
          T(180, 102, 'Care & Education', 't', 'middle') +
          T(180, 116, 'Below Age 6', 'ta', 'middle') +
          T(180, 130, '(Directive)', 't', 'middle') +
          // Pillar 3: Art 51A(k)
          R(245, 34, 100, 105) +
          T(295, 52, 'PART IV-A (FD)', 't', 'middle') +
          T(295, 68, 'Art. 51A(k)', 'ta', 'middle') +
          T(295, 88, 'Duty of Parent', 't', 'middle') +
          T(295, 102, 'or Guardian for', 't', 'middle') +
          T(295, 116, 'Ages 6 to 14', 'ta', 'middle') +
          T(295, 130, '(Civic Duty)', 't', 'middle') +
          // Operational statute footer
          R(15, 150, 330, 26) +
          T(180, 167, 'Operationalized by Right to Education (RTE) Act, 2009', 'ta', 'middle')
      ),
      caption:
        'Figure 4.5: The tripartite architecture of the 86th Amendment harmonizing Fundamental Rights (21A), Directive Principles (45), and Fundamental Duties (51Ak).',
    },
  },

  'eic:4:6': {
    explain: [
      'The 91st Constitutional Amendment Act of 2003 targeted two persistent democratic governance problems: bloated "jumbo cabinets" and opportunistic political defections.',
      'Cabinet Size Ceiling (Articles 75 & 164): Capped the total number of Ministers (including PM / CM) to a maximum of 15% of the total strength of the Lok Sabha / State Legislative Assembly. For smaller states, a minimum floor of 12 ministers was established.',
      'Anti-Defection Tightening (Tenth Schedule): Deleted Paragraph 3 of the Tenth Schedule, which previously protected a "split" of one-third of a party’s legislators from disqualification.',
      'Disqualification Penalties: Mandates that any legislator disqualified under the Tenth Schedule is automatically disqualified from holding any remunerative ministerial office or political post for the duration of the assembly term.',
    ],
    definition:
      'The 91st Constitutional Amendment Act of 2003 capped the size of Union and State Councils of Ministers to 15% of the lower house strength and deleted the 1/3 split exemption in the Tenth Schedule Anti-Defection law.',
    formula: '\\text{Ministers (Union/State)} \\le 15\\% \\times \\text{Lower House Strength} \\quad (\\text{State Min } = 12); \\quad \\text{Split Exemption DELETED}',
    steps: [
      'Preventing Jumbo Cabinets: Disallows distributing ministerial portfolios as political inducements to maintain unstable governing coalitions.',
      '15% Numerical Cap: In Lok Sabha (543 seats), maximum ministers is $\\approx 81$; in Bihar Legislative Assembly (243 seats), maximum ministers is 36.',
      'Small State Safeguard: States with small assemblies (e.g. Goa, Sikkim) are allowed a minimum floor of 12 ministers.',
      'Deletion of Split Loophole: Prior to 2003, if 1/3 of legislators broke away, they were protected from disqualification; the 91st Amendment removed this exemption entirely.',
      'Bar on Remunerative Posts: Disqualified defecting legislators cannot be appointed as ministers or heads of state corporations until re-elected.',
    ],
    examAnswer: [
      'State the two primary governance reforms enacted by the 91st Constitutional Amendment Act (2003).',
      'Explain the 15% ceiling rule on Council of Ministers size under Articles 75 and 164, including the small state exception.',
      'Explain how the 91st Amendment closed the "split" loophole in the Tenth Schedule (Anti-Defection Law).',
      'Calculate the maximum ministerial berths permitted in the Lok Sabha (543 seats) and the Bihar Legislative Assembly (243 seats).',
    ],
    slip: 'Assuming the 15% limit is calculated against the total strength of both houses of Parliament; the 15% ceiling applies strictly to the membership of the LOWER house (Lok Sabha / State Legislative Assembly).',
    diagram: {
      svg: S(
        360,
        190,
        `<defs><marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" class="fa"/></marker></defs>` +
          T(10, 18, 'THE 91ST AMENDMENT (2003) TWIN REFORMS', 'ta') +
          // Reform 1: Cabinet Size
          R(15, 34, 155, 115, 'fa') +
          T(92, 52, '1. CABINET SIZE CAPPED', 'ta', 'middle') +
          T(92, 70, 'Max 15% of Lower House', 't', 'middle') +
          T(92, 84, 'Arts. 75(1A) & 164(1A)', 't', 'middle') +
          T(92, 102, 'Lok Sabha: Max 81', 'ta', 'middle') +
          T(92, 116, 'Bihar Assembly: Max 36', 'ta', 'middle') +
          T(92, 134, '(Min 12 for small states)', 't', 'middle') +
          // Reform 2: Anti-Defection
          R(190, 34, 155, 115) +
          T(267, 52, '2. ANTI-DEFECTION', 'ta', 'middle') +
          T(267, 70, 'Tenth Schedule Reform', 't', 'middle') +
          T(267, 84, '1/3 Split Loophole DELETED', 'ta', 'middle') +
          T(267, 102, 'Merger requires 2/3', 't', 'middle') +
          T(267, 116, 'Barred from ministerial', 't', 'middle') +
          T(267, 130, 'or remunerative posts', 't', 'middle') +
          // Summary Footer
          T(180, 178, 'Eliminated "Jumbo Cabinets" & opportunistic party splits', 'ta', 'middle')
      ),
      caption:
        'Figure 4.6: The dual governance reforms of the 91st Amendment: 15% ceiling on cabinet ministries and closure of the 1/3 anti-defection split loophole.',
    },
  },
};
