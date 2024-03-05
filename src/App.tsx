import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Login from "./project-components/Login"
import Dashboard from "./project-components/Dashboard"
import ProfilePage from "./project-components/profilePage"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
export default function App(){
  return (
    <>
   {/* <Login/> */}
   {/* <Dashboard/> */}
   {/* <ProfilePage /> */}
   <BrowserRouter>
   <Routes>
    <Route path ="/" element={<Login/>}/>
    <Route path = "/dashboard" element={<Dashboard/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}