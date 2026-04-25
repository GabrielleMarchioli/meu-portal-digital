import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone } from "lucide-react";
import { announcements } from "@/data/student";

const Avisos = () => {
  const [read, setRead] = useState<number[]>([]);
  const markRead = (id: number) => setRead((r) => (r.includes(id) ? r : [...r, id]));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Mural de avisos</h1>
        <p className="text-sm text-muted-foreground">Comunicados da coordenação e dos professores.</p>
      </div>

      <div className="space-y-3">
        {announcements.map((a) => {
          const isRead = read.includes(a.id);
          return (
            <Card
              key={a.id}
              onClick={() => markRead(a.id)}
              className={`cursor-pointer shadow-card transition-all hover:shadow-elegant ${
                isRead ? "opacity-70" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-lg leading-tight">{a.title}</p>
                      {a.isNew && !isRead && (
                        <Badge className="bg-accent text-accent-foreground hover:bg-accent">Novo</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {a.author} · {a.date}
                    </p>
                    <p className="mt-3 text-sm">{a.body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Avisos;
