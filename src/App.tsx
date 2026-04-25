import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout, { ProtectedRoute } from "@/layouts/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Carteirinha from "./pages/Carteirinha";
import Grade from "./pages/Grade";
import Notas from "./pages/Notas";
import Historico from "./pages/Historico";
import Calendario from "./pages/Calendario";
import Avisos from "./pages/Avisos";
import Documentos from "./pages/Documentos";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/carteirinha" element={<Carteirinha />} />
                <Route path="/grade" element={<Grade />} />
                <Route path="/notas" element={<Notas />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/avisos" element={<Avisos />} />
                <Route path="/documentos" element={<Documentos />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
