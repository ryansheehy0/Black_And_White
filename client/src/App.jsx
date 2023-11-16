import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// Import pages and components
  // Import pages
import LoginOrSingUp from './pages/LoginOrSignUp'
//import Home from "./pages/Home"
import HomeProvider, { useHomeContext } from "./utils/HomeContext"
  // Import components
import BottomNavigationBar from './components/BottomNavigationBar'
import FilterBy from "./components/FilterBy"

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginOrSingUp/>}/>
        <Route path="/home" exact element={
          <>
            <HomeProvider>
              <FilterBy context={useHomeContext}/>
            </HomeProvider>
            <BottomNavigationBar selected="home"/>
          </>
        }/>
        <Route path="/posts" exact element={
          <BottomNavigationBar selected="posts"/>
        }/>
      </Routes>
    </Router>
  )
}