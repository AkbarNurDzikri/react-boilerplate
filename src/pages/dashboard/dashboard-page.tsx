import { Users, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import {
  StatsCards,
  type StatCard,
} from "@/features/dashboard/components/stats-cards";
import { Typography } from "@/components/atoms/typography";
import { useAuth } from "@/hooks/use-auth";

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  growth: number;
}

const DUMMY_STATS: DashboardStats = {
  totalUsers: 1248,
  totalOrders: 456,
  revenue: 85400000,
  growth: 12.5,
};

export function DashboardHomePage() {
  const { user } = useAuth();

  const statCards: StatCard[] = [
    {
      title: "Total Pengguna",
      value: DUMMY_STATS.totalUsers.toLocaleString("id-ID"),
      icon: Users,
      iconClassName: "bg-blue-50",
      trend: { value: 12, label: "dari bulan lalu" },
    },
    {
      title: "Total Pesanan",
      value: DUMMY_STATS.totalOrders.toLocaleString("id-ID"),
      icon: ShoppingCart,
      iconClassName: "bg-violet-50",
      trend: { value: 8, label: "dari bulan lalu" },
    },
    {
      title: "Pendapatan",
      value: `Rp ${DUMMY_STATS.revenue.toLocaleString("id-ID")}`,
      icon: DollarSign,
      iconClassName: "bg-emerald-50",
      trend: { value: 24, label: "dari bulan lalu" },
    },
    {
      title: "Pertumbuhan",
      value: `${DUMMY_STATS.growth}%`,
      icon: TrendingUp,
      iconClassName: "bg-orange-50",
      trend: { value: -3, label: "dari bulan lalu" },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2">Dashboard</Typography>
        <Typography variant="muted">
          Selamat datang kembali, {user?.username}. Berikut ringkasan aktivitas
          Anda.
        </Typography>
      </div>

      <StatsCards stats={statCards} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <Typography variant="h4" className="mb-4">
            Aktivitas Terbaru
          </Typography>
          <p className="text-sm text-muted-foreground">
            Tidak ada aktivitas terbaru.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <Typography variant="h4" className="mb-4">
            Notifikasi
          </Typography>
          <p className="text-sm text-muted-foreground">
            Tidak ada notifikasi baru.
          </p>
        </div>
      </div>
    </div>
  );
}
