import { useState } from "react"
import FilterBy from "../components/FilterBy"
import Post from "../components/Post"

export default function Home(){
  const [filter, setFilter] = useState("Likes")

  const examplePost = {
    username: "ryansheehy",
    date: "11/11/23",
    expirationTime: {days: 0, hours: 23, minutes: 59},
    text: "This is a post. The limit is 255 characters."
  }

  return (
    <>
      <FilterBy filter={filter} setFilter={setFilter} />
      <div className="h-[calc(100vh-64px-64px)] w-screen bg-white flex flex-col items-center overflow-y-auto">
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
        <Post {...examplePost}/>
      </div>
    </>
  )
}