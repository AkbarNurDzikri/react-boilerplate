import { Breadcrumbs } from "@/components/molecules/breadcrumbs";

export function Header() {
  return (
    <header className="flex h-16 items-center border-b bg-background px-6">
      <Breadcrumbs />
    </header>
  );
}
