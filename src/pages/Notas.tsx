import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { subjects } from "@/data/student";

const statusVariant = (status: string, absRatio: number) => {
  if (absRatio >= 0.85) return { label: "Risco", cls: "bg-destructive text-destructive-foreground" };
  if (absRatio >= 0.6) return { label: "Atenção", cls: "bg-warning text-warning-foreground" };
  if (status === "Aprovado") return { label: "Aprovado", cls: "bg-success text-success-foreground" };
  return { label: "Em curso", cls: "bg-primary text-primary-foreground" };
};

const Notas = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Notas e faltas</h1>
        <p className="text-sm text-muted-foreground">Acompanhe seu desempenho em cada disciplina do semestre.</p>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <Accordion type="multiple" className="divide-y">
            {subjects.map((s) => {
              const ratio = s.absences / s.absenceLimit;
              const st = statusVariant(s.status, ratio);
              return (
                <AccordionItem key={s.code} value={s.code} className="border-0">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline">
                    <div className="flex w-full items-center gap-4 text-left">
                      <div className={`h-10 w-1.5 shrink-0 rounded ${s.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-mono">{s.code}</span> · {s.professor}
                        </p>
                      </div>
                      <div className="hidden text-center sm:block">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Média</p>
                        <p className="font-display text-lg text-primary">{s.average.toFixed(1)}</p>
                      </div>
                      <div className="hidden text-center md:block">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Faltas</p>
                        <p className="text-sm font-medium">
                          {s.absences}/{s.absenceLimit}
                        </p>
                      </div>
                      <Badge className={`${st.cls} hover:${st.cls} mr-2 shrink-0`}>{st.label}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-muted/30 px-4 pb-5 pt-1">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Avaliações
                        </p>
                        <div className="space-y-2">
                          <RowEval label="P1" value={s.grades.p1} />
                          <RowEval label="P2" value={s.grades.p2} />
                          <RowEval label="Trabalho" value={s.grades.work} />
                          <div className="mt-3 flex items-center justify-between border-t pt-2">
                            <span className="text-sm font-semibold">Média parcial</span>
                            <span className="font-display text-xl text-primary">{s.average.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Frequência
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Faltas</span>
                            <span className="font-medium">
                              {s.absences} de {s.absenceLimit} permitidas
                            </span>
                          </div>
                          <Progress value={ratio * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {Math.round((1 - ratio) * 100)}% de presença · limite máx. de 25% de faltas
                          </p>
                        </div>

                        <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Ementa
                        </p>
                        <p className="text-sm text-muted-foreground">{s.syllabus}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

const RowEval = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between rounded-md border bg-background px-3 py-2">
    <span className="text-sm">{label}</span>
    <span className={`font-mono text-sm font-semibold ${value < 6 ? "text-destructive" : "text-primary"}`}>
      {value.toFixed(1)}
    </span>
  </div>
);

export default Notas;
