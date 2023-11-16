import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// Import pages and components
import LoginOrSingUp from './pages/LoginOrSignUp'
import BottomNavigationBar from './components/BottomNavigationBar'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginOrSingUp/>}/>
        <Route path="/home" exact element={
          <BottomNavigationBar selected="home"/>
        }/>
        <Route path="/posts" exact element={
          <BottomNavigationBar selected="posts"/>
        }/>
      </Routes>
    </Router>
  )
}