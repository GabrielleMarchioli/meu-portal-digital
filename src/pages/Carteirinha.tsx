import { useRef } from "react";
import { Download, ShieldCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { student } from "@/data/student";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const QrPlaceholder = () => (
  <div className="grid grid-cols-10 gap-[2px] rounded-md bg-white p-2">
    {Array.from({ length: 100 }).map((_, i) => {
      // padrão pseudo-aleatório estável
      const on = ((i * 73 + 17) % 7) % 2 === 0 || [0, 9, 90].includes(i);
      return <div key={i} className={`h-2 w-2 rounded-[1px] ${on ? "bg-primary" : "bg-transparent"}`} />;
    })}
  </div>
);

const Carteirinha = () => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [85.6, 53.98],
      });

      const imgWidth = 85.6;
      const imgHeight = 53.98;

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.save(`carteirinha-${student.ra}.pdf`);

      toast({
        title: "Sucesso",
        description: "Carteirinha baixada com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Carteirinha digital</h1>
        <p className="text-sm text-muted-foreground">Apresente sua credencial sempre que solicitada.</p>
      </div>

      <Card ref={cardRef} className="overflow-hidden border-0 bg-gradient-card text-primary-foreground shadow-elegant">
        {/* Faixa superior */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-accent-foreground">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-sm">UniV</p>
              <p className="text-[10px] uppercase tracking-wider text-primary-foreground/70">
                Identificação Estudantil
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success-foreground ring-1 ring-success/40">
            <ShieldCheck className="h-3 w-3" /> VÁLIDA
          </span>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[auto,1fr,auto] md:items-center">
          {/* Foto */}
          <div className="flex h-32 w-28 items-center justify-center rounded-md bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/20 overflow-hidden">
            {student.photo ? (
              <img src={student.photo} alt={student.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-4xl">{student.initials}</span>
            )}
          </div>

          {/* Dados */}
          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-accent">Nome completo</p>
              <p className="font-display text-xl leading-tight">{student.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary-foreground/70">Curso</p>
                <p className="text-sm font-medium">{student.course}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary-foreground/70">Tipo</p>
                <p className="text-sm font-medium">{student.degree}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary-foreground/70">Matrícula</p>
                <p className="font-mono text-sm">{student.ra}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary-foreground/70">Status</p>
                <p className="text-sm font-medium">{student.status}</p>
              </div>
            </div>
          </div>

          {/* QR */}
          <div className="flex flex-col items-center gap-2">
            <QrPlaceholder />
            <p className="text-[10px] text-primary-foreground/70">Validação digital</p>
          </div>
        </div>

        {/* Faixa inferior */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/20 px-6 py-3 text-xs">
          <span className="text-primary-foreground/80">
            Emissão: <span className="font-medium text-primary-foreground">{student.cardIssuedAt}</span>
          </span>
          <span className="text-primary-foreground/80">
            Validade: <span className="font-medium text-accent">{student.cardValidUntil}</span>
          </span>
          <span className="text-primary-foreground/80">{student.campus}</span>
        </div>
      </Card>

      {/* Detalhes complementares */}
      <Card className="p-6 shadow-card">
        <h2 className="font-display text-lg text-primary">Informações pessoais</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Info label="E-mail" value={student.email} />
          <Info label="CPF" value={student.cpf} />
          <Info label="Data de nascimento" value={student.birth} />
          <Info label="Ingresso" value={student.enrollmentDate} />
          <Info label="Turno" value={student.shift} />
          <Info label="Campus" value={student.campus} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleDownloadPDF} className="gap-2 bg-gradient-primary">
            <Download className="h-4 w-4" /> Baixar PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => toast({ title: "Carteirinha compartilhada", description: "Link de validação copiado." })}
          >
            Compartilhar link de validação
          </Button>
        </div>
      </Card>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default Carteirinha;
