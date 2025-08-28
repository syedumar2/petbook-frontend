import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import {
  Home,
  Login,
  PetListing,
  Register,
  PetDetail,
  UserDashboard,
  AdminDashboard,
} from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfileOverview, PrivatePetListing, PrivatePetDetails, AddPetListingBox, UpdatePetListingBox, Conversations, UsersList, PetList, UnapprovedPets, ApprovedPets } from "./components";
import AdminRoutes from "./components/AdminRoutes";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Test from "./pages/Test";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />

        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/signup" />
              <Route element={<PetListing />} path="/pets" />
              <Route element={<PetDetail />} path="/pets/:petId" />
              <Route element={<Test />} path="/test" />

              <Route element={<ProtectedRoute />} path="/profile">
                <Route element={<UserDashboard />}>
                  <Route index element={<ProfileOverview />} />{" "}
                  <Route path="pets" element={<PrivatePetListing />} />
                  <Route path="pets/:petId" element={<PrivatePetDetails />} />
                  <Route path="pets/add" element={<AddPetListingBox />} />
                  <Route path="pets/update/:petId" element={<UpdatePetListingBox />} />
                  <Route path="conversations" element={<Conversations />} />
                </Route>
              </Route>

              <Route element={<AdminRoutes />} path="/admin">
                <Route element={<AdminDashboard />}>
                  <Route index element={<UsersList />} />
                  <Route element={<PetList />} path="pets" />
                  <Route element={<UnapprovedPets />} path="pets/unapproved" />
                  <Route element={<ApprovedPets />} path="pets/approved" />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
//TODO Organise component export structure for readable imports
//TODO Build a search feature for User Pet listings
//TODO Build a delete feature for deleting user posts
//TODO Refactor ugly code into custom hooks for readability
//TODO Start work on Conversations feature
//TODO Add a gender field to pet listings