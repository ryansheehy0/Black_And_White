import { useState, useEffect } from "react"
import FilterBy from "../components/FilterBy"
import Post from "../components/Post"
import { useQuery } from "@apollo/client"
import { GET_POSTS_BY_LIKE, GET_POSTS_BY_DATE_POSTED } from "../utils/queries"


export default function Home(){
  const [filter, setFilter] = useState("likes")
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const {loading: likesLoading, data: likesData} = useQuery(GET_POSTS_BY_LIKE, {
    variables: { pageNumber },
    skip: (filter !== "likes")
  })

  const {loading: datePostedLoading, data: datePostedData} = useQuery(GET_POSTS_BY_DATE_POSTED, {
    variables: { pageNumber },
    skip: (filter !== "datePosted")
  })

  useEffect(() => {
    if(!likesLoading && likesData){
      if(pageNumber === 0){
        return setPosts(likesData)
      }
      setPosts([...posts, likesData])
    }

    if(!datePostedLoading && datePostedData){
      if(pageNumber === 0){
        return setPosts(datePostedData)
      }
      setPosts([...posts, datePostedData])
    }
  }, [likesLoading, likesData, datePostedLoading, datePostedData])

  useEffect(() => {
    setPageNumber(0)
  }, [filter])

  // For testing with example posts
  useEffect(() => {
    // Make example post
    const examplePost = {
      username: "ryansheehy",
      date: "11/11/23",
      expirationTime: {days: 0, hours: 23, minutes: 59},
      text: "This is a post. The limit is 255 characters.",
    }

    // Get an array of example posts
    const examplePosts = []
    for(let i = 0; i < 10; i++){
      examplePosts.push({...examplePost})
    }

    // Set the posts to be some number of example posts
    setPosts(examplePosts)
  }, [])

  function onScrollPostContainer(event){
    const scrollPosition = event.target.scrollTop + event.target.clientHeight
    if (scrollPosition >= event.target.scrollHeight - 1) {
      // Scroll is at the end
      // load another page of posts
    }
  }

  return (
    <>
      <FilterBy filter={filter} setFilter={setFilter} />
      <div onScroll={onScrollPostContainer} className="h-[calc(100vh-64px-64px)] w-screen bg-white overflow-y-auto">
        <div className="w-full h-full flex flex-col items-center pl-[calc(100vw-100%)]">
          {posts.map((post, index) => (
            <Post key={index} {...post}/>
          ))}
          {/*Loading thing*/loading ? console.log("loading") : ""}
        </div>
      </div>
    </>
  )
}