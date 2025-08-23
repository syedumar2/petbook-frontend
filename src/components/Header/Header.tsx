import { useAuth } from "@/hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import UserNavbar from "../Navbar/UserNavbar";

const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header>
      <div>{isAuthenticated ? <UserNavbar /> : <Navbar />}</div>
    </header>
  );
};

export default Header;
