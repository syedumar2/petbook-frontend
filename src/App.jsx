import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  PetListing,
  Register,
  PetDetail,
  UserDashboard,
} from "./pages";

import {
  ProfileOverview,
  Conversations,
  UserPetList,
  PrivatePetListing,
  PetDetailsComponent,
  PrivatePetDetails,
  UsersList,
  PetList,
  UnapprovedPets,
  ApprovedPets,
} from "./components";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/signup" />
        <Route element={<PetListing />} path="/pets" />
        <Route element={<PetDetail />} path="/pets/:petId" />
        <Route element={<UserDashboard />} path="/profile">
          <Route index element={<ProfileOverview />} /> {/* default page */}
          <Route path="pets" element={<UserPetList />} />
          <Route path="pets/:petId" element={<PrivatePetDetails />} />
          <Route path="conversations" element={<Conversations />} />
        </Route>
        <Route element={<AdminDashboard />} path="/admin">
          <Route index element={<UsersList />} />
          <Route element={<PetList />} path="pets" />
          <Route element={<UnapprovedPets/>} path = "pets/unapproved"/>
             <Route element={<ApprovedPets/>} path = "pets/approved"/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
