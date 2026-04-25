import { Check, Circle, GraduationCap, Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { history, student, upcomingSubjects } from "@/data/student";

const Historico = () => {
  const progress = (student.creditsDone / student.creditsTotal) * 100;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Histórico do curso</h1>
        <p className="text-sm text-muted-foreground">Acompanhe seu progresso até a formatura.</p>
      </div>

      {/* Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <ResumoCard label="CR Geral" value={student.cr.toFixed(2)} />
        <ResumoCard label="Créditos" value={`${student.creditsDone}/${student.creditsTotal}h`} />
        <ResumoCard label="Semestres" value={`${student.currentSemester}/${student.totalSemesters}`} />
        <ResumoCard label="Previsão" value={student.expectedGraduation} />
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Progresso geral do curso</p>
            <p className="font-display text-lg text-primary">{progress.toFixed(0)}%</p>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="mt-2 text-xs text-muted-foreground">
            Faltam {student.totalSemesters - student.currentSemester} semestres para concluir o curso.
          </p>
        </CardContent>
      </Card>

      {/* Linha do tempo */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <h2 className="mb-6 font-display text-xl text-primary">Linha do tempo</h2>
          <div className="space-y-4">
            {history.map((h) => {
              const isDone = h.status === "concluido";
              const isCurrent = h.status === "atual";
              return (
                <div key={h.semester} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 ${
                        isDone
                          ? "bg-success text-success-foreground ring-success/30"
                          : isCurrent
                          ? "bg-accent text-accent-foreground ring-accent/30"
                          : "bg-muted text-muted-foreground ring-border"
                      }`}
                    >
                      {isDone ? <Check className="h-5 w-5" /> : isCurrent ? <Loader className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    </div>
                    {h.semester < history.length && <div className="my-1 w-px flex-1 bg-border" />}
                  </div>

                  <div className="flex-1 pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-lg">{h.semester}º semestre</p>
                      <Badge
                        variant="secondary"
                        className={
                          isDone
                            ? "bg-success/15 text-success-foreground"
                            : isCurrent
                            ? "bg-accent/20 text-accent-foreground"
                            : ""
                        }
                      >
                        {h.period}
                      </Badge>
                      {isDone && h.average && (
                        <span className="text-xs text-muted-foreground">
                          Média: <span className="font-semibold text-primary">{h.average.toFixed(1)}</span>
                        </span>
                      )}
                    </div>

                    {isDone && h.subjects && (
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {h.subjects.map((s) => (
                          <div key={s.name} className="flex items-center justify-between rounded-md border bg-background px-3 py-2">
                            <span className="text-sm">{s.name}</span>
                            <span className="font-mono text-sm font-semibold text-primary">{s.grade.toFixed(1)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {isCurrent && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Em andamento — veja suas notas e faltas na aba correspondente.
                      </p>
                    )}

                    {h.status === "futuro" && (
                      <p className="mt-1 text-sm text-muted-foreground">A cursar.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Próximas disciplinas */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl text-primary">Próximas disciplinas sugeridas</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {upcomingSubjects.map((s) => (
              <Badge key={s} variant="secondary" className="bg-primary-soft text-primary">
                {s}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ResumoCard = ({ label, value }: { label: string; value: string }) => (
  <Card className="shadow-card">
    <CardContent className="p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl text-primary">{value}</p>
    </CardContent>
  </Card>
);

export default Historico;
