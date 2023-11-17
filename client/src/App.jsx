import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// Import pages and components
  // Import pages
import LoginOrSingUp from './pages/LoginOrSignUp'
import Home from "./pages/Home"
import Posts from "./pages/Posts"
  // Import components
import BottomNavigationBar from './components/BottomNavigationBar'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginOrSingUp/>}/>
        <Route path="/home" exact element={
          <>
            <Home/>
            <BottomNavigationBar selected="home"/>
          </>
        }/>
        <Route path="/posts" exact element={
          <>
            <Posts/>
            <BottomNavigationBar selected="posts"/>
          </>
        }/>
      </Routes>
    </Router>
  )
}