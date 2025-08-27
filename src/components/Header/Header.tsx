import { useAuth } from "@/hooks/useAuth";
import { UserNavbar, Navbar } from "../Navbar";


const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header>
      <div>{isAuthenticated ? <UserNavbar /> : <Navbar />}</div>
    </header>
  );
};

export default Header;
