import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, PetListing, Register } from "./pages";
import PetDetail from "./pages/PetDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element ={<Login/>} path="/login"/>
        <Route element={<Register/>} path="/signup"/>
        <Route element={<PetListing/>} path="/pets"/>
        <Route element={<PetDetail/>} path="/pets/:petId"/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
