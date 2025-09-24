import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import {
  AddPetListingBox,
  ApprovedPets,
  Conversations,
  PetList,
  PrivatePetDetails,
  PrivatePetListing,
  ProfileOverview,
  UnapprovedPets,
  UpdatePetListingBox,
  UsersList,
} from "./components";
import BlackListedUser from "./components/Admin/Users/BlackListedUser";
import AdminRoutes from "./components/AdminRoutes";
import NotificationsPage from "./components/Notifications/NotificationsPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";
import {
  AdminDashboard,
  Home,
  Login,
  PetDetail,
  PetListing,
  Register,
  UserDashboard,
} from "./pages";
import AboutMe from "./pages/AboutMe";
import AdminLogin from "./pages/AdminLogin";
import AdoptionInfoPage from "./pages/AdoptionInfo";
import Test from "./pages/Test";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />

        <BrowserRouter>
          <AuthProvider>
            <WebSocketProvider>
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<AdminLogin />} path="/adminLogin" />
                <Route element={<Register />} path="/signup" />
                <Route element={<PetListing />} path="/pets" />
                <Route element={<PetDetail />} path="/pets/:petId" />
                <Route element={<AdoptionInfoPage />} path="/adoption" />
                <Route element={<AboutMe />} path="/aboutme" />

                <Route element={<Test />} path="/test" />
                <Route element={<ProtectedRoute />} path="/profile">
                  <Route element={<UserDashboard />}>
                    <Route index element={<ProfileOverview />} />{" "}
                    <Route path="pets" element={<PrivatePetListing />} />
                    <Route path="pets/:petId" element={<PrivatePetDetails />} />
                    <Route path="pets/add" element={<AddPetListingBox />} />
                    <Route
                      path="pets/update/:petId"
                      element={<UpdatePetListingBox />}
                    />
                    <Route path="conversations" element={<Conversations />} />
                    <Route
                      path="notifications"
                      element={<NotificationsPage />}
                    />
                  </Route>
                </Route>

                <Route element={<AdminRoutes />} path="/admin">
                  <Route element={<AdminDashboard />}>
                    <Route index element={<UsersList />} />
                    <Route element={<PetList />} path="pets" />
                    <Route
                      element={<UnapprovedPets />}
                      path="pets/unapproved"
                    />
                    <Route element={<ApprovedPets />} path="pets/approved" />
                    <Route
                      element={<BlackListedUser />}
                      path="users/blacklisted"
                    />
                  </Route>
                </Route>
              </Routes>
            </WebSocketProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;

//TODO make conversations page responsive
//TODO
// --Backend: clean up database and prepare for deployment
//TODO: In the future replace the multi hook setup with a useReducer as it better fits this use case. Altho current setup still works
