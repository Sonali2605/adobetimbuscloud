import Login from "./project-components/Login";
import Dashboard from "./project-components/Dashboard";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detailspage from "./project-components/Detailspage";
import ManagerDashboard from "./project-components/ManagerDashboard";
import ProfilePage from "./project-components/profilePage";
import DashBoardCustomer from "./project-components/DashBoardCustomer";
import FluidicPlayer from "./project-components/FluidicPlayer";

export default function App() {
  return (
    <>
      {/* <Login/> */}
      {/* <Dashboard/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning_object/:courseId/instance/:instanceId/:isLearning/detailspage" element={<Detailspage />} />
          <Route path="/managerDashboard" element={<ManagerDashboard />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/dashboardCustomer" element={<DashBoardCustomer/>} />
          <Route path="/fludicPlayer" element={<FluidicPlayer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
