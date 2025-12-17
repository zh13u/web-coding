"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { adminAccounts as DEFAULT_ADMINS } from "@/data/adminAccounts";
import type { AdminAccount } from "@/types";

export default function AdminLoginPage() {
  const router = useRouter();
  const [admins, setAdmins] = useLocalStorage<AdminAccount[]>(
    "adminAccounts",
    DEFAULT_ADMINS,
  );
  const [currentAdmin, setCurrentAdmin] = useLocalStorage<AdminAccount | null>(
    "currentAdmin",
    null,
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentAdmin) {
      router.push("/admin");
    }
  }, [currentAdmin, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors: string[] = [];
    if (!formData.email.trim()) nextErrors.push("Email is required.");
    if (!formData.password.trim()) nextErrors.push("Password is required.");
    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const admin = admins.find(
      (item) =>
        item.email === formData.email && item.password === formData.password,
    );

    if (!admin) {
      setErrors(["Invalid admin credentials."]);
      setIsLoading(false);
      return;
    }

    if (!admin.isActive) {
      setErrors(["Admin account is disabled."]);
      setIsLoading(false);
      return;
    }

    const updatedAdmin = { ...admin, lastLogin: new Date().toISOString() };
    const updatedAdmins = admins.map((item) =>
      item.id === admin.id ? updatedAdmin : item,
    );
    setAdmins(updatedAdmins);

    const { password, ...safeAdmin } = updatedAdmin;
    setCurrentAdmin(safeAdmin);
    router.push("/admin");
  };

  return (
    <>
      <Header activePage="admin" />

      <section className="page-header">
        <div className="container">
          <h1>Admin Login</h1>
          <p>Sign in to manage the PhoneStore dashboard.</p>
        </div>
      </section>

      <section className="checkout-content">
        <div className="container">
          <div className="checkout-container">
            <div className="checkout-form-section">
              <h2>Admin Credentials</h2>

              {errors.length > 0 && (
                <Alert type="error" message={errors.join(", ")} />
              )}

              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@phonestore.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter admin password"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <Loading size="small" /> : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
