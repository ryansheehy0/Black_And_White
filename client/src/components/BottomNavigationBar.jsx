import React from "react"
import { Link } from "react-router-dom"
import HomeIcon from "../assets/icons/HomeIcon"
import AtIcon from "../assets/icons/AtIcon"

export default function BottomNavigationBar({selected}){
  return (
    <div className="flex absolute bottom-0 w-screen h-16 bg-white border-black border-t-2">
      <Link to="/home" className={`w-1/2 border-black border-r-2 flex items-center justify-center ${selected === "home" ? "bg-black" : "bg-white"}`}>
        <div className={`w-12 h-12 ${selected === "home" ? "text-white" : "text-black"}`}><HomeIcon/></div>
      </Link>
      <Link to="/posts" className={`w-1/2 border-black border-r-2 flex items-center justify-center ${selected === "posts" ? "bg-black" : "bg-white"}`}>
        <div className={`w-12 h-12 ${selected === "posts" ? "text-white" : "text-black"}`}><AtIcon/></div>
      </Link>
    </div>
  )
}