import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export const TIER_VARIANTS: Record<string, BadgeVariant> = {
  CRITICAL: "destructive",
  NORMAL: "default",
  LOW: "secondary",
};

export const AUDIT_LOGS_QUERY_KEY = ["audit-logs"];
