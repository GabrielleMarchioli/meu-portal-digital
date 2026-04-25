export const student = {
  ra: "20231235",
  password: "123456",
  name: "Danilo de Castro Barbiere",
  shortName: "Danilo",
  initials: "DCB",
  photo: "/danilo.jpeg",
  course: "Ciência da Computação",
  degree: "Bacharelado",
  campus: "Campus Central",
  shift: "Noturno",
  enrollmentDate: "15/08/2025",
  cardValidUntil: "31/12/2027",
  cardIssuedAt: "01/04/2026",
  status: "Aluno regular",
  email: "danilo.barbiere@univ.edu.br",
  cpf: "***.169.551-**",
  birth: "22/09/1988",
  currentSemester: 2,
  totalSemesters: 8,
  expectedGraduation: "Março / 2029",
  cr: 8.4,
  creditsDone: 540,
  creditsTotal: 3200,
};

export const subjects = [
  {
    code: "CC201",
    name: "Programação Estruturada",
    professor: "Prof. Me. Lucas Andrade",
    color: "bg-blue-600",
    grades: { p1: 9.0, p2: 9.5, work: 9.2 },
    average: 9.2,
    absences: 1,
    absenceLimit: 18,
    status: "Em curso",
    syllabus: "Funções, ponteiros, estruturas de dados, recursão e alocação dinâmica.",
  },
  {
    code: "MAT201",
    name: "Álgebra Linear",
    professor: "Prof.ª Fernanda Costa",
    color: "bg-rose-600",
    grades: { p1: 6.5, p2: 7.5, work: 7.0 },
    average: 7.0,
    absences: 4,
    absenceLimit: 18,
    status: "Em curso",
    syllabus: "Matrizes, determinantes, espaços vetoriais, autovalores e aplicações.",
  },
  {
    code: "CC202",
    name: "Lógica Matemática",
    professor: "Prof. Dr. Ricardo Silva",
    color: "bg-emerald-600",
    grades: { p1: 8.5, p2: 8.5, work: 8.5 },
    average: 8.5,
    absences: 2,
    absenceLimit: 18,
    status: "Em curso",
    syllabus: "Lógica proposicional, lógica de predicados, inferência e sistemas formais.",
  },
  {
    code: "CC203",
    name: "Sistemas Digitais",
    professor: "Prof. Dr. Carlos Mendes",
    color: "bg-amber-600",
    grades: { p1: 8.0, p2: 8.0, work: 8.0 },
    average: 8.0,
    absences: 3,
    absenceLimit: 18,
    status: "Em curso",
    syllabus: "Circuitos digitais, portas lógicas, multiplexadores, flip-flops e contadores.",
  },
  {
    code: "CC204",
    name: "Metodologia Científica",
    professor: "Prof.ª Mariana Alves",
    color: "bg-teal-600",
    grades: { p1: 8.5, p2: 8.5, work: 8.5 },
    average: 8.5,
    absences: 1,
    absenceLimit: 18,
    status: "Em curso",
    syllabus: "Método científico, pesquisa, redação acadêmica e apresentação de trabalhos.",
  },
];

type Slot = { code: string; room: string };
const slot = (code: string, room: string): Slot => ({ code, room });

export const schedule: Record<string, Record<string, Slot | null>> = {
  "19:00 - 20:30": {
    Seg: slot("CC201", "Lab 02"),
    Ter: slot("MAT201", "Sala 305"),
    Qua: slot("CC202", "Lab 03"),
    Qui: slot("CC203", "Sala 201"),
    Sex: slot("MAT202", "Sala 310"),
    Sab: null,
  },
  "20:40 - 22:10": {
    Seg: slot("CC202", "Lab 03"),
    Ter: slot("CC203", "Sala 201"),
    Qua: slot("CC201", "Lab 02"),
    Qui: slot("MAT202", "Sala 310"),
    Sex: slot("CC204", "Sala 215"),
    Sab: null,
  },
  "22:20 - 22:40": {
    Seg: null,
    Ter: null,
    Qua: null,
    Qui: null,
    Sex: null,
    Sab: null,
  },
};

export const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export const history = [
  {
    semester: 1,
    period: "2025.2",
    status: "concluido" as const,
    average: 8.6,
    credits: 400,
    subjects: [
      { name: "Algoritmos e Lógica", grade: 9.0 },
      { name: "Cálculo I", grade: 7.5 },
      { name: "Geometria Analítica", grade: 8.0 },
      { name: "Introdução à Computação", grade: 9.5 },
      { name: "Português Instrumental", grade: 8.8 },
    ],
  },
  {
    semester: 2,
    period: "2026.1 (atual)",
    status: "atual" as const,
    average: 8.2,
    credits: 140,
    subjects: [
      { name: "Programação Estruturada", grade: 9.2 },
      { name: "Álgebra Linear", grade: 7.0 },
      { name: "Lógica Matemática", grade: 8.5 },
      { name: "Sistemas Digitais", grade: 8.0 },
      { name: "Metodologia Científica", grade: 8.5 },
    ],
  },
  {
    semester: 3,
    period: "2026.2",
    status: "futuro" as const,
    average: 8.3,
    credits: 0,
    subjects: [
      { name: "Estatística", grade: 8.0 },
      { name: "Sistemas Operacionais I", grade: 8.5 },
      { name: "Engenharia de Software", grade: 9.0 },
      { name: "Redes de Computadores I", grade: 7.5 },
      { name: "Ética e Sociedade", grade: 8.5 },
    ],
  },
  { semester: 4, period: "2027.1", status: "futuro" as const, credits: 0 },
  { semester: 5, period: "2027.2", status: "futuro" as const, credits: 0 },
  { semester: 6, period: "2028.1", status: "futuro" as const, credits: 0 },
  { semester: 7, period: "2028.2", status: "futuro" as const, credits: 0 },
  { semester: 8, period: "2029.1", status: "futuro" as const, credits: 0 },
];

export const upcomingSubjects = [
  "Estatística",
  "Sistemas Operacionais I",
  "Engenharia de Software",
  "Redes de Computadores I",
  "Ética e Sociedade",
];

export const calendar = [
  { date: "28/04/2026", type: "Prova", title: "P1 — Álgebra Linear", desc: "Sala 305 — 20h40" },
  { date: "05/05/2026", type: "Trabalho", title: "Entrega: Projeto Programação Estruturada", desc: "Lab 02" },
  { date: "12/05/2026", type: "Prova", title: "P1 — Lógica Matemática", desc: "Sala 201 — 19h" },
  { date: "20/05/2026", type: "Evento", title: "Semana Acadêmica 2026", desc: "Auditório principal" },
  { date: "01/06/2026", type: "Feriado", title: "Recesso Escolar", desc: "Sem aulas" },
  { date: "15/06/2026", type: "Prova", title: "P2 — Sistemas Digitais", desc: "Sala 310 — 20h40" },
  { date: "30/06/2026", type: "Matrícula", title: "Renovação 2026.2", desc: "Portal acadêmico" },
];

export const announcements = [
  {
    id: 1,
    author: "Coordenação de Computação",
    date: "24/04/2026",
    title: "Semana Acadêmica 2026 — Inscrições abertas",
    body: "Estão abertas as inscrições para a Semana Acadêmica de Ciência da Computação 2026. Palestras, minicursos e hackathon. Inscreva-se até 10/05.",
    isNew: true,
  },
  {
    id: 2,
    author: "Prof. Dr. Carlos Silva",
    date: "23/04/2026",
    title: "Lista de exercícios — Programação Estruturada",
    body: "A lista 02 de exercícios sobre estruturas de dados já está disponível. Entrega até 05/05.",
    isNew: true,
  },
  {
    id: 3,
    author: "Prof.ª Fernanda Costa",
    date: "20/04/2026",
    title: "Monitoria de Álgebra Linear",
    body: "Monitoria toda segunda e quarta, das 18h às 19h, na sala 310. Esclareça suas dúvidas!",
    isNew: true,
  },
  {
    id: 4,
    author: "Secretaria Acadêmica",
    date: "18/04/2026",
    title: "Atualização cadastral",
    body: "Atualize seus dados cadastrais no portal até 30/04 para evitar pendências na próxima matrícula.",
    isNew: false,
  },
];

export const documents = [
  { name: "Histórico Escolar", desc: "Documento oficial com todas as disciplinas cursadas.", date: "10/04/2026" },
  { name: "Declaração de Matrícula", desc: "Comprovante de vínculo com a instituição.", date: "15/02/2026" },
  { name: "Comprovante de Pagamento", desc: "Mensalidade — Abril/2026.", date: "05/04/2026" },
  { name: "Ementa das Disciplinas", desc: "Conteúdo programático do semestre atual.", date: "01/02/2026" },
  { name: "Calendário Acadêmico 2026", desc: "Datas oficiais do ano letivo.", date: "15/01/2026" },
];
