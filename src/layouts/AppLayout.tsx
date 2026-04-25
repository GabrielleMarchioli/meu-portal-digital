import { ReactNode } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { student } from "@/data/student";

export const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children ? <>{children}</> : <Outlet />;
};

const AppLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden sm:block">
                <p className="font-display text-lg leading-none text-primary">Portal do Aluno</p>
                <p className="text-xs text-muted-foreground">{student.course} · {student.shift}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium leading-none">{student.name}</p>
                <p className="text-xs text-muted-foreground">RA {student.ra}</p>
              </div>
              <img
                src="/danilo.jpeg"
                alt={student.name}
                className="h-10 w-10 cursor-pointer rounded-full object-cover shadow-card transition-transform hover:scale-110"
                onClick={() => navigate("/carteirinha")}
              />
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
