import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GraduationCap, Info, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ra, setRa] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(ra, password)) {
      toast({ title: "Bem-vindo!", description: "Login realizado com sucesso." });
      navigate("/", { replace: true });
    } else {
      toast({
        title: "Credenciais inválidas",
        description: "Verifique o RA e a senha e tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero p-4">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
        {/* Lado decorativo */}
        <div className="hidden text-primary-foreground lg:block">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <GraduationCap className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium tracking-wide">UniV · Est. 1968</span>
          </div>
          <h1 className="font-display text-5xl leading-tight">
            Sua vida acadêmica,<br />
            <span className="text-accent">organizada em um só lugar.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-primary-foreground/80">
            Acompanhe sua grade, notas, faltas, carteirinha digital e o progresso do seu curso
            de forma simples e elegante.
          </p>
        </div>

        {/* Card de login */}
        <Card className="border-0 p-8 shadow-elegant md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-card">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-primary">Portal do Aluno</h2>
              <p className="text-sm text-muted-foreground">Acesse com suas credenciais</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ra">Registro Acadêmico (RA)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="ra"
                  placeholder="20231234"
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                  className="pl-9"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-95" size="lg">
              Entrar no portal
            </Button>
          </form>

          <div className="mt-6 rounded-md border border-accent/30 bg-accent-soft p-4">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="text-xs text-accent-foreground">
                <p className="font-semibold">Credenciais de teste</p>
                <p className="mt-1">RA: <span className="font-mono">20231234</span></p>
                <p>Senha: <span className="font-mono">123456</span></p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
