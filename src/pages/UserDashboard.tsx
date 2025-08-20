
import { DashboardNav, Footer, UserNavbar } from "@/components";
import { Outlet } from "react-router-dom";


const UserDashboard = () => {
  return (
    <div>
      <header>
        <UserNavbar />
      </header>
      <main>
        <DashboardNav />
        <Outlet/>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
