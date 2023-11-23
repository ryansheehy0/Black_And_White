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
        console.log(likesData.getPostsByLike)
        setPosts(likesData.getPostsByLike)
      }else{
        setPosts([...posts, ...likesData.getPostsByLike])
      }
    }

    if(!datePostedLoading && datePostedData){
      if(pageNumber === 0){
        console.log(datePostedData.getPostsByDatePosted)
        setPosts(datePostedData.getPostsByDatePosted)
      }else{
        setPosts([...posts, ...datePostedData.getPostsByDatePosted])
      }
    }
  }, [likesLoading, likesData, datePostedLoading, datePostedData])

  useEffect(() => {
    setPageNumber(0)
  }, [filter])

  function onScrollPostContainer(event){
    const scrollPosition = event.target.scrollTop + event.target.clientHeight
    if(scrollPosition >= event.target.scrollHeight - 1){
      // Scroll is at the end
      // load another page of posts
      //console.log("End of scroll.")
      // If the previous page is loaded in
        //setPageNumber(pageNumber + 1)
      console.log("posts")
      console.log(posts)
    }
  }

  return (
    <>
      <FilterBy filter={filter} setFilter={setFilter} />
      <div onScroll={onScrollPostContainer} className="h-[calc(100vh-64px-64px)] w-screen bg-white overflow-y-auto">
        <div className="w-full h-full flex flex-col items-center pl-[calc(100vw-100%)]">
          {posts.map((post) => (
            <Post key={post._id} {...post}/>
          ))}
          <svg className={`animate-spin h-5 w-5 ${(likesLoading || datePostedLoading) ? "visible" : "invisible" }`}></svg>
        </div>
      </div>
    </>
  )
}