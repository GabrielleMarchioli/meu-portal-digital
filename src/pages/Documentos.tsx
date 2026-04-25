import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { documents } from "@/data/student";

const Documentos = () => {
  const { toast } = useToast();
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Documentos</h1>
        <p className="text-sm text-muted-foreground">Baixe seus documentos acadêmicos oficiais.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {documents.map((d) => (
          <Card key={d.name} className="shadow-card transition-all hover:shadow-elegant">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.desc}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Emitido em {d.date}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={() =>
                  toast({ title: "Em breve", description: `Download de "${d.name}" estará disponível em breve.` })
                }
              >
                <Download className="h-4 w-4" /> Baixar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documentos;
