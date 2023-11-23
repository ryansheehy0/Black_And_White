import { useState } from "react"
import FilterBy from "../components/FilterBy"
import Post from "../components/Post"
import PopupPost from "../components/PopupPost"

export default function Posts(){
  const [filter, setFilter] = useState("Likes")
  const [popup, setPopup] = useState(false)

  const examplePost = {
    username: "ryansheehy",
    date: "11/11/23",
    expirationTime: {days: 0, hours: 23, minutes: 59},
    text: "This is a post. The limit is 255 characters."
  }

  return (
    <>
      <FilterBy filter={filter} setFilter={setFilter} />
      <div className="h-[calc(100vh-64px-64px-64px)] w-screen bg-white overflow-y-auto">
        <div className={`w-full h-full ${popup ? "pointer-events-none opacity-40" : "pointer-events-auto opacity-100"} flex flex-col items-center pl-[calc(100vw-100%)]`}>
          <Post {...examplePost}/>
          <Post {...examplePost}/>
          <Post {...examplePost}/>
          <Post {...examplePost}/>
          <Post {...examplePost}/>
          <Post {...examplePost}/>
          <Post {...examplePost}/>
        </div>
      </div>
      <div className="w-screen h-16 bg-white flex justify-center items-center">
        <button
          className="focus:outline-none hover:border-black max-w-xs w-11/12 h-fit text-base bg-black text-white rounded-lg"
          onClick={() => setPopup(!popup)}
          >{popup ? "Cancel" : "New Post"}
        </button>
      </div>
      <PopupPost popup={popup} setPopup={setPopup}/>
    </>
  )
}