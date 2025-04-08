import "./App.css";

import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";
function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutUs/>}/>          
          <Route path="/signup" element={<SignUp/>}/>          
          <Route path="/login" element={<Login/>}/>          
          <Route path="/courses" element={<CourseList/>}/>          
          <Route path="/contact" element={<Contact/>}/>          
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
