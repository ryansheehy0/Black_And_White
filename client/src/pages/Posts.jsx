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
  const [shouldLoadNewPage, setShouldLoadNewPage] = useState(true)

  const {loading: likesLoading, data: likesData, refetch: refetchLikes} = useQuery(GET_CURRENT_USER_POSTS_BY_LIKE, {
    variables: { pageNumber },
    skip: (filter !== "likes")
  })

  const {loading: datePostedLoading, data: datePostedData, refetch: refetchDatePosted} = useQuery(GET_CURRENT_USER_POSTS_BY_DATE_POSTED, {
    variables: { pageNumber },
    skip: (filter !== "datePosted")
  })

  useEffect(() => {
    if(!likesLoading && likesData){
      if(likesData.getCurrentUserPostsByLike.length !== 0){
        if(pageNumber === 0){
          setPosts(likesData.getCurrentUserPostsByLike)
        }else{
          setPosts([...posts, ...likesData.getCurrentUserPostsByLike])
        }
        setShouldLoadNewPage(true)
      }
    }

    if(!datePostedLoading && datePostedData){
      if(datePostedData.getCurrentUserPostsByDatePosted.length !== 0){
        if(pageNumber === 0){
          setPosts(datePostedData.getCurrentUserPostsByDatePosted)
        }else{
          setPosts([...posts, ...datePostedData.getCurrentUserPostsByDatePosted])
        }
        setShouldLoadNewPage(true)
      }
    }
  }, [likesLoading, likesData, datePostedLoading, datePostedData])

  useEffect(() => {
    setPageNumber(0)
    refetchDatePosted({ pageNumber })
    refetchLikes({ pageNumber })
  }, [filter])

  function onScrollPostContainer(event){
    // Scroll is at the end of screen
    const scrollPosition = event.target.scrollTop + event.target.clientHeight
    if(scrollPosition >= event.target.scrollHeight - 1){
      // If the previous page is loaded in then load another page
      if(shouldLoadNewPage){
        setPageNumber(pageNumber + 1)
        setShouldLoadNewPage(false)
      }
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
          <div className={`bg-transparent w-fit h-fit ${likesLoading || datePostedLoading ? "visible" : "invisible"}`} disabled>
              <svg className={`animate-spin h-8 w-8 text-black`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-0" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          </div>
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