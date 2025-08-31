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



// === Week 1 ===

// TODO (Day 1–2 | HIGH): Add gender field to pet listings
//   - Update backend schema, DAO, and service
//   - Update frontend forms + filters
//   - Test with new and existing pet entries

// TODO (Day 3–4 | MEDIUM): Implement online/offline indicators
//   - Hook into WebSocket presence events
//   - Show presence badge in chat user list
//   - Verify updates on connect/disconnect

// TODO (Day 5 | MEDIUM): Apply UI customizations to static pages
//   - Style Adoption FAQ + About Me pages
//   - Ensure consistent layout, fonts, and spacing


// === Week 2 ===

// TODO (Day 6–7 | LOW): Refactor code into custom hooks
//   - Extract chat logic, token handling, scroll, etc.
//   - Replace inline logic with reusable hooks

// TODO (Day 8–9 | LOW): Refactor for mobile users
//   - Add responsive CSS tweaks
//   - Fix viewport issues
//   - Test in Chrome DevTools mobile mode

// TODO (Day 10–12 | MEDIUM): Start notification service
//   - Backend: notification table + service
//   - Frontend: badge counts + placeholder notification UI
//   - Keep minimal — just scaffold for now

//TODO 
// --Backend: clean up database and prepare for deployment
