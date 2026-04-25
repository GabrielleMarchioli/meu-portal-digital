import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  IdCard,
  CalendarDays,
  GraduationCap,
  ClipboardList,
  Megaphone,
  FileText,
  CalendarCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const academic = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Carteirinha", url: "/carteirinha", icon: IdCard },
  { title: "Grade de horários", url: "/grade", icon: CalendarDays },
  { title: "Notas e faltas", url: "/notas", icon: ClipboardList },
  { title: "Histórico do curso", url: "/historico", icon: GraduationCap },
];

const extras = [
  { title: "Calendário", url: "/calendario", icon: CalendarCheck },
  { title: "Avisos", url: "/avisos", icon: Megaphone },
  { title: "Documentos", url: "/documentos", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
      isActive
        ? "bg-sidebar-accent text-sidebar-primary font-semibold"
        : "text-sidebar-foreground hover:bg-sidebar-accent/60"
    }`;

  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar-background">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-accent shadow-accent">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="font-display text-base text-sidebar-accent-foreground">Univ Portal</p>
              <p className="text-[11px] uppercase tracking-wider text-sidebar-foreground/70">Aluno</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar-background">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Acadêmico</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {academic.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end={item.url === "/"} className={linkCls}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Mais</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {extras.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className={linkCls}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
