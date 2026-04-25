
# Portal do Aluno — Danilo de Castro Barbiere

Um portal acadêmico completo e mockado, com visual **acadêmico clássico em azul institucional**, navegação por sidebar e todos os dados pré-preenchidos.

## 🎨 Identidade visual
- Paleta azul institucional (azul marinho como primária, dourado/âmbar como accent para destaques)
- Tipografia serifada nos títulos para reforçar o ar acadêmico, sans-serif no corpo
- Layout com sidebar colapsável + header fixo com nome do aluno e botão de sair
- Cards com bordas sutis, sombras leves, sensação de portal universitário oficial

## 🔐 Tela de Login (`/login`)
- Card central com logotipo "Universidade" e título "Portal do Aluno"
- Campos: **RA** e **Senha**
- Caixa de aviso visível mostrando as credenciais de teste:
  - **RA:** `20231234`
  - **Senha:** `123456`
- Validação: só entra com essas credenciais; erro amigável caso contrário
- Sessão persistida em localStorage; rotas internas protegidas por um wrapper que redireciona pro login

## 🏠 Dashboard (`/`)
Tela inicial com visão geral em cards:
- **Boas-vindas**: "Olá, Danilo 👋" + curso e semestre atual
- **Próxima aula**: matéria, sala, horário
- **Progresso do curso**: barra mostrando 3/8 semestres (37,5%) + "faltam 5 semestres pra formar"
- **Média geral**: nota agregada com mini gráfico
- **Faltas no semestre**: total e alerta se alguma matéria passar de 75% do limite
- **Próximos eventos**: 3 itens do calendário acadêmico
- Atalhos rápidos pra Carteirinha, Grade, Notas

## 🪪 Carteirinha Digital (`/carteirinha`)
Cartão estilizado em formato de credencial física (frente e verso, ou apenas frente bem caprichada):
- **Foto** (avatar placeholder estilizado com iniciais "DCB")
- **Nome:** Danilo de Castro Barbiere
- **Curso:** Ciência da Computação
- **Matrícula (RA):** 20231234
- **Tipo:** Aluno regular
- **Validade:** 31/12/2026
- **Selo "VÁLIDA"** em verde + data de emissão
- **QR code** decorativo (gerado mockado)
- Brasão/logo da universidade no topo
- Botão "Baixar PDF" (mockado, mostra toast "em breve")

## 📅 Grade de Horários (`/grade`)
Tabela semanal (Segunda a Sábado) com blocos de aulas coloridos por matéria:
- Horários típicos da manhã e noite (ex.: 19h–22h40 distribuídos)
- Cada bloco mostra: nome da disciplina, sigla, sala, professor
- Legenda de cores por disciplina
- No mobile: vira lista por dia com cards empilhados
- Disciplinas do 3º semestre de Ciência da Computação:
  - Estrutura de Dados
  - Cálculo II
  - Banco de Dados I
  - Programação Orientada a Objetos
  - Arquitetura de Computadores
  - Inglês Instrumental

## 📝 Notas e Faltas (`/notas`)
Lista de cada disciplina do semestre como cards expansíveis ou linhas de tabela:
- Coluna: Disciplina | Nota P1 | Nota P2 | Trabalho | Média parcial | Faltas (X/Y) | Status
- Status colorido: **Aprovado**, **Em curso**, **Atenção** (faltas perto do limite), **Risco**
- Ao clicar em uma matéria: detalhe com histórico de avaliações, percentual de presença, professor e ementa resumida
- Indicador visual de limite de faltas (barra de progresso)
- Notas mockadas realistas (algumas boas, uma ou duas no limite pra deixar interessante)

## 🎓 Histórico / Progresso do Curso (`/historico`)
- **Linha do tempo dos 8 semestres** (3 concluídos com check verde, 1 em andamento, 4 futuros em cinza)
- Para cada semestre concluído: lista de disciplinas com nota final e status
- **Resumo geral**: CR (Coeficiente de Rendimento), créditos cursados / total, previsão de formatura (ex.: dez/2027)
- **Próximas disciplinas sugeridas** pro 4º semestre

## 📆 Calendário Acadêmico (`/calendario`)
- Lista de eventos agrupados por mês
- Tipos com badges: **Prova**, **Trabalho**, **Feriado**, **Matrícula**, **Evento**
- Exemplos: P1 de Cálculo II, entrega de trabalho de BD, semana de provas, recesso, semana acadêmica
- Visual de timeline ou calendário mensal simples
- Filtro por tipo de evento

## 📢 Mural de Avisos (`/avisos`)
- Lista cronológica de comunicados (mais recentes no topo)
- Cada aviso: autor (Coordenação / Professor X), data, título, mensagem
- Badge "Novo" nos últimos 3 dias
- Possibilidade de marcar como lido (estado local)

## 📄 Documentos (`/documentos`)
Lista de documentos disponíveis para download (mockado, baixa um PDF placeholder ou mostra toast):
- Histórico Escolar
- Declaração de Matrícula
- Comprovante de Pagamento
- Ementa das Disciplinas
- Calendário Acadêmico (PDF)
- Cada item com ícone, descrição curta, data de emissão e botão "Baixar"

## 🧱 Estrutura técnica (resumo)
- React Router com rota `/login` pública e demais protegidas
- Sidebar com ícones (lucide-react) + header com avatar, nome e logout
- Todos os dados em um arquivo central `src/data/student.ts` pra ficar fácil ajustar
- Design system no `index.css` + `tailwind.config.ts` (azul institucional, dourado, neutros)
- Componentes shadcn já presentes (cards, tabela, badge, progress, sidebar, toast etc.)
- Totalmente responsivo (mobile-first nos componentes mais densos como grade e notas)

Pronto pra implementar — é só aprovar! 🚀
