import { useAuth } from "@/hooks/useAuth";
import { UserNavbar, Navbar } from "../Navbar";
import { getAccessToken } from "@/context/tokenStore";

const Header = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log("token disappearing after refresh?",getAccessToken())
  if (loading) return <Navbar />;
  return (
    <header>
      <div>{isAuthenticated ? <UserNavbar /> : <Navbar />}</div>
    </header>
  );
};

export default Header;
