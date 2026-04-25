import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { calendar } from "@/data/student";

const types = ["Todos", "Prova", "Trabalho", "Evento", "Feriado", "Matrícula"];

const typeColor: Record<string, string> = {
  Prova: "bg-destructive text-destructive-foreground",
  Trabalho: "bg-warning text-warning-foreground",
  Evento: "bg-primary text-primary-foreground",
  Feriado: "bg-muted text-muted-foreground",
  Matrícula: "bg-accent text-accent-foreground",
};

const Calendario = () => {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? calendar : calendar.filter((e) => e.type === filter);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Calendário acadêmico</h1>
        <p className="text-sm text-muted-foreground">Provas, trabalhos, eventos e feriados.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <Button
            key={t}
            variant={filter === t ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(t)}
            className={filter === t ? "bg-primary" : ""}
          >
            {t}
          </Button>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <ul className="divide-y">
            {filtered.map((e) => (
              <li key={e.title} className="flex items-center gap-4 p-4 hover:bg-muted/40">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-primary-soft text-primary">
                  <span className="font-display text-lg leading-none">{e.date.slice(0, 2)}</span>
                  <span className="text-[10px] uppercase">{e.date.slice(3, 5)}/{e.date.slice(8, 10)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${typeColor[e.type]} hover:${typeColor[e.type]}`}>{e.type}</Badge>
                    <p className="font-medium">{e.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.desc}</p>
                </div>
                <span className="hidden text-sm text-muted-foreground sm:block">{e.date}</span>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="p-6 text-center text-sm text-muted-foreground">Nenhum evento neste filtro.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendario;
