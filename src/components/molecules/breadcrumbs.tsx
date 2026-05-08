import { Link, useLocation } from "react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getLabel = (path: string) => {
    const labels: Record<string, string> = {
      dashboard: "Dashboard",
      admin: "Admin",
      users: "Pengguna",
      roles: "Role",
      permissions: "Permission",
      "audit-logs": "Audit Log",
      profile: "Profil",
    };
    return labels[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  const breadcrumbs: BreadcrumbItem[] = pathnames.map((value, index) => {
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
    return {
      label: getLabel(value),
      href,
      active: index === pathnames.length - 1,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm font-medium"
    >
      <ol className="flex items-center gap-1.5 text-muted-foreground">
        <li className="flex items-center">
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Home className="size-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbs.map((item, _) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 opacity-50" />
            {item.active ? (
              <span className="text-foreground font-semibold truncate max-w-[150px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-foreground transition-colors truncate max-w-[150px]"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
