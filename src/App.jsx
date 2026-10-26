import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import InvitationPage from "./pages/InvitationPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <p className="text-center mt-5">
            Welcome. Please open your invitation link.
          </p>
        }
      />
      <Route path="/create-admin" element={<AdminPage />} />
      <Route path="/invite/:code" element={<InvitationPage />} />
      <Route path="/preview" element={<InvitationPage preview />} />
      <Route
        path="*"
        element={<p className="text-center mt-5">Page not found</p>}
      />
    </Routes>
  );
}

export default App;