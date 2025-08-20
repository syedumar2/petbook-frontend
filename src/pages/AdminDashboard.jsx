import { AdminDashboardNav, AdminNavbar, Footer } from "@/components";
import { Outlet } from "react-router-dom";


const AdminDashboard = () => {
  return (
    <div>
      <header>
        <AdminNavbar />
      </header>
      <main>
        <AdminDashboardNav />
    <Outlet/>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
