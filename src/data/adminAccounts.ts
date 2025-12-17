import type { AdminAccount } from "@/types";

export const adminAccounts: AdminAccount[] = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@phonestore.com",
    role: "super_admin",
    isActive: true,
    createdAt: "2024-01-01",
    lastLogin: null,
    password: "admin123",
  },
  {
    id: 2,
    name: "Product Manager",
    email: "product@phonestore.com",
    role: "product_manager",
    isActive: true,
    createdAt: "2024-01-15",
    lastLogin: null,
    password: "product123",
  },
  {
    id: 3,
    name: "Order Manager",
    email: "order@phonestore.com",
    role: "order_manager",
    isActive: true,
    createdAt: "2024-02-01",
    lastLogin: null,
    password: "order123",
  },
  {
    id: 4,
    name: "Customer Manager",
    email: "customer@phonestore.com",
    role: "customer_manager",
    isActive: true,
    createdAt: "2024-02-15",
    lastLogin: null,
    password: "customer123",
  },
];
