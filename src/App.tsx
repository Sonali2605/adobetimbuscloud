import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Login from "./project-components/Login"
import Dashboard from "./project-components/Dashboard"
import ProfilePage from "./project-components/profilePage"
import ManagerDashboard from "./project-components/ManagerDashboard"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Detailspage from "./project-components/Detailspage"
// import CoursePlayer from "./project-components/CoursePlayer"
export default function App(){
  return (
    <>
   {/* <Login/> */}
   {/* <Dashboard/> */}
   {/* <ProfilePage /> */}
   <ManagerDashboard />
   {/* <BrowserRouter>
   <Routes>
    <Route path ="/" element={<Login/>}/>
    <Route path = "/dashboard" element={<Dashboard/>}/>
    <Route path = "/detailspage" element={<Detailspage/>}/>
    {/* <Route path = "/course-player/${cid}" element={<CoursePlayer/>}/> */}
   </Routes>
   </BrowserRouter> */}
    </>
  )
}