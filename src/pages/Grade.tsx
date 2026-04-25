import { Card, CardContent } from "@/components/ui/card";
import { schedule, days, subjects } from "@/data/student";

const Grade = () => {
  const times = Object.keys(schedule);
  const codeToSubject = (code: string) => subjects.find((s) => s.code === code);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Grade de horários</h1>
        <p className="text-sm text-muted-foreground">2º semestre · Período noturno</p>
      </div>

      {/* Tabela desktop */}
      <Card className="hidden overflow-hidden shadow-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary-soft text-primary">
              <tr>
                <th className="w-32 p-3 text-left font-semibold">Horário</th>
                {days.map((d) => (
                  <th key={d} className="p-3 text-left font-semibold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((t) => (
                <tr key={t} className="border-t">
                  <td className="bg-muted/40 p-3 font-mono text-xs text-muted-foreground">{t}</td>
                  {days.map((d) => {
                    const slot = schedule[t][d];
                    if (!slot) return <td key={d} className="p-2" />;
                    const sub = codeToSubject(slot.code);
                    return (
                      <td key={d} className="p-2 align-top">
                        <div className={`rounded-md ${sub?.color} p-2 text-white shadow-sm`}>
                          <p className="text-[10px] font-mono opacity-80">{sub?.code}</p>
                          <p className="text-xs font-semibold leading-tight">{sub?.name}</p>
                          <p className="mt-1 text-[10px] opacity-80">{slot.room}</p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile: por dia */}
      <div className="space-y-4 md:hidden">
        {days.map((d) => (
          <Card key={d} className="shadow-card">
            <CardContent className="p-4">
              <p className="mb-3 font-display text-lg text-primary">{d}</p>
              <div className="space-y-2">
                {times.map((t) => {
                  const slot = schedule[t][d];
                  if (!slot) return null;
                  const sub = codeToSubject(slot.code);
                  return (
                    <div key={t} className="flex items-center gap-3 rounded-md border p-2">
                      <div className={`h-10 w-1 rounded ${sub?.color}`} />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">{t} · {slot.room}</p>
                        <p className="text-sm font-medium">{sub?.name}</p>
                      </div>
                    </div>
                  );
                })}
                {times.every((t) => !schedule[t][d]) && (
                  <p className="text-xs text-muted-foreground">Sem aulas neste dia.</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legenda */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disciplinas</p>
          <div className="flex flex-wrap gap-3">
            {subjects.map((s) => (
              <div key={s.code} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-sm ${s.color}`} />
                <span className="text-xs">
                  <span className="font-mono text-muted-foreground">{s.code}</span> · {s.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Grade;
