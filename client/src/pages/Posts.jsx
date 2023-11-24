import { useState, useEffect } from "react"
import FilterBy from "../components/FilterBy"
import Post from "../components/Post"
import PopupPost from "../components/PopupPost"
import { useQuery } from "@apollo/client"
import { GET_CURRENT_USER_POSTS_BY_LIKE, GET_CURRENT_USER_POSTS_BY_DATE_POSTED } from "../utils/queries"

export default function Posts(){
  const [filter, setFilter] = useState("likes")
  const [posts, setPosts] = useState([])
  const [popup, setPopup] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)

  const {loading: likesLoading, data: likesData} = useQuery(GET_CURRENT_USER_POSTS_BY_LIKE, {
    variables: { pageNumber },
    skip: (filter !== "likes")
  })

  const {loading: datePostedLoading, data: datePostedData} = useQuery(GET_CURRENT_USER_POSTS_BY_DATE_POSTED, {
    variables: { pageNumber },
    skip: (filter !== "datePosted")
  })

  useEffect(() => {
    if(!likesLoading && likesData){
      if(pageNumber === 0){
        setPosts(likesData.getCurrentUserPostsByLike)
      }else{
        setPosts([...posts, ...likesData.getCurrentUserPostsByLike])
      }
    }

    if(!datePostedLoading && datePostedData){
      if(pageNumber === 0){
        setPosts(datePostedData.getCurrentUserPostsByDatePosted)
      }else{
        setPosts([...posts, ...datePostedData.getCurrentUserPostsByDatePosted])
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
    }
  }

  return (
    <>
      <FilterBy filter={filter} setFilter={setFilter} />
      <div onScroll={onScrollPostContainer} className="h-[calc(100vh-64px-64px-64px)] w-screen bg-white overflow-y-auto">
        <div className={`w-full h-full ${popup ? "pointer-events-none opacity-40" : "pointer-events-auto opacity-100"} flex flex-col items-center pl-[calc(100vw-100%)]`}>
          {posts.map((post) => (
            <Post key={post._id} {...post}/>
          ))}
          <svg className={`animate-spin h-5 w-5 ${(likesLoading || datePostedLoading) ? "visible" : "invisible" }`}></svg>
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