import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  IdCard,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { student, subjects, calendar, schedule, days } from "@/data/student";

const Dashboard = () => {
  const progress = (student.currentSemester / student.totalSemesters) * 100;
  const totalAbsences = subjects.reduce((s, x) => s + x.absences, 0);
  const generalAvg = (
    subjects.reduce((s, x) => s + x.average, 0) / subjects.length
  ).toFixed(1);

  // Próxima aula = primeiro slot do dia atual ou seguinte
  const todayIndex = (new Date().getDay() + 6) % 7;
  const dayName = days[Math.min(todayIndex, days.length - 1)] || days[0];
  const firstSlotKey = Object.keys(schedule)[0];
  const next = schedule[firstSlotKey][dayName] || schedule[firstSlotKey]["Seg"];
  const nextSubject = subjects.find((s) => s.code === next?.code);

  const nextEvents = calendar.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden border-0 bg-gradient-hero text-primary-foreground shadow-elegant">
        <CardContent className="p-6 md:p-8">
          <p className="text-sm uppercase tracking-widest text-accent">Bem-vindo de volta</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Olá, {student.shortName} 👋</h1>
          <p className="mt-2 max-w-xl text-primary-foreground/80">
            {student.course} — {student.degree} · {student.currentSemester}º semestre · Previsão de
            formatura: {student.expectedGraduation}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Semestre</p>
              <p className="font-display text-2xl">
                {student.currentSemester}/{student.totalSemesters}
              </p>
            </div>
            <div className="rounded-md bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Faltam</p>
              <p className="font-display text-2xl">
                {student.totalSemesters - student.currentSemester} semestres
              </p>
            </div>
            <div className="rounded-md bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">CR atual</p>
              <p className="font-display text-2xl">{student.cr.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-primary" /> Média geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-primary">{generalAvg}</p>
            <p className="text-xs text-muted-foreground">Considerando todas as disciplinas do semestre</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">Faltas no semestre</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-primary">{totalAbsences}</p>
            <p className="text-xs text-muted-foreground">
              {subjects.filter((s) => s.absences / s.absenceLimit >= 0.6).length} disciplina(s) em atenção
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">Progresso do curso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl text-primary">{progress.toFixed(0)}%</p>
            <Progress value={progress} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Próxima aula */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-xl text-primary">Próxima aula</CardTitle>
          </CardHeader>
          <CardContent>
            {nextSubject ? (
              <div className="flex flex-wrap items-center gap-4">
                <div className={`h-14 w-14 shrink-0 rounded-md ${nextSubject.color}`} />
                <div className="flex-1 min-w-[200px]">
                  <p className="font-display text-lg">{nextSubject.name}</p>
                  <p className="text-sm text-muted-foreground">{nextSubject.professor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{firstSlotKey}</p>
                  <p className="text-xs text-muted-foreground">Sala: {next?.room}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma aula próxima.</p>
            )}
          </CardContent>
        </Card>

        {/* Próximos eventos */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl text-primary">Próximos eventos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextEvents.map((e) => (
              <div key={e.title} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="rounded-md bg-primary-soft px-2 py-1 text-center">
                  <p className="font-display text-sm leading-none text-primary">{e.date.slice(0, 2)}</p>
                  <p className="text-[10px] uppercase text-primary/70">{e.date.slice(3, 5)}/{e.date.slice(6, 10)}</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1 text-[10px]">{e.type}</Badge>
                  <p className="text-sm font-medium leading-tight">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Atalhos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: "/carteirinha", icon: IdCard, label: "Carteirinha", desc: "Ver credencial digital" },
          { to: "/grade", icon: CalendarDays, label: "Grade", desc: "Horários da semana" },
          { to: "/notas", icon: ClipboardList, label: "Notas e faltas", desc: "Desempenho atual" },
          { to: "/historico", icon: GraduationCap, label: "Histórico", desc: "Progresso completo" },
        ].map((s) => (
          <Link key={s.to} to={s.to}>
            <Card className="group cursor-pointer shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
