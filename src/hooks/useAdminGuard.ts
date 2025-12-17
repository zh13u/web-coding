"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { AdminAccount } from "@/types";

export function useAdminGuard(redirectTo: string = "/admin/login") {
  const router = useRouter();
  const [currentAdmin, setCurrentAdmin] = useLocalStorage<AdminAccount | null>(
    "currentAdmin",
    null,
  );

  useEffect(() => {
    if (!currentAdmin) {
      router.push(redirectTo);
    }
  }, [currentAdmin, redirectTo, router]);

  const logout = () => {
    setCurrentAdmin(null);
  };

  return { currentAdmin, logout };
}
