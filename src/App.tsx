import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
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
  PrivatePetDetails,
  UsersList,
  PetList,
  UnapprovedPets,
  ApprovedPets,
} from "./components";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminRoutes from "./components/AdminRoutes";
import * as path from "path";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
              <Route element={<Test/>} path = "/test"/>

              <Route element={<ProtectedRoute />} path="/profile">
                <Route element={<UserDashboard />}>
                  <Route index element={<ProfileOverview />} />{" "}
                  <Route path="pets" element={<UserPetList />} />
                  <Route path="pets/:petId" element={<PrivatePetDetails />} />
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
