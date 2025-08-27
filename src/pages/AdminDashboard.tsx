import { AdminNavbar, Footer } from "@/components";
import AdminDashboardNav from "@/components/Navbar/Admin/AdminDashboardNav";
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
