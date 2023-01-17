import {Route, Routes} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import CreateJobs from "./pages/Job/CreateJobs";
import EditJob from "./pages/Job/EditJob";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <ProtectedRoutes
            Component={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
        }
      />
      <Route
        path="/job/add"
        element={
          <ProtectedRoutes
            Component={
              <>
                <Navbar />
                <CreateJobs />
              </>
            }
          />
        }
      />
      <Route
        path="/job/edit/:id"
        element={
          <ProtectedRoutes
            Component={
              <>
                <Navbar />
                <EditJob />
              </>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
