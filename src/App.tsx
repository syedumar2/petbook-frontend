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
import {
  ProfileOverview,
  PrivatePetListing,
  PrivatePetDetails,
  AddPetListingBox,
  UpdatePetListingBox,
  Conversations,
  UsersList,
  PetList,
  UnapprovedPets,
  ApprovedPets,
} from "./components";
import AdminRoutes from "./components/AdminRoutes";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Test from "./pages/Test";
import AdoptionInfoPage from "./pages/AdoptionInfo";
import AboutMe from "./pages/AboutMe";
import { WebSocketProvider } from "./context/WebSocketContext";
import NotificationsPage from "./components/Notifications/NotificationsPage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />

        <BrowserRouter>
          <AuthProvider>
            <WebSocketProvider>
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />
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



//TODO quickly build notifications page with clear all and clear single notification function
//TODO Complete admin panel
// TODO (Day 5 | MEDIUM): Apply UI customizations to static pages and make it responsive

//   - Style Adoption FAQ + About Me pages
//   - Ensure consistent layout, fonts, and spacing

//TODO
// --Backend: clean up database and prepare for deployment
//TODO: In the future replace the multi hook setup with a useReducer as it better fits this use case. Altho current setup still works
