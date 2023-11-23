import { useState, useEffect } from "react"
import ThumbsUpIcon from "../assets/icons/ThumbsUpIcon"
import { useMutation } from "@apollo/client"
import { TOGGLE_POSTS_LIKE } from "../utils/mutations"

export default function Post({_id, username, liked, datePosted, timeLimit, postText}){
  const [thumbsUp, setThumbsUp] = useState(liked)
  const [countdownTimer, setCountdownTimer] = useState({
    days: Math.floor(timeLimit / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeLimit / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeLimit / (1000 * 60)) % 60)
  })

  const date = new Date(parseInt(datePosted))
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear() % 100

  const [ togglePostsLike, { error }] = useMutation(TOGGLE_POSTS_LIKE)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTimer(prevCountdownTimer => {
        if(prevCountdownTimer.minutes === 0){
          if(prevCountdownTimer.hours === 0){
            if(prevCountdownTimer.days === 0){
              // Post expired
              clearInterval(timer)
              return {days: 0, hours: 0, minutes: 0}
            }else{
              return {
                days: (prevCountdownTimer.days - 1),
                hours: 23,
                minutes: 59
              }
            }
          }else{
            return {
              days: prevCountdownTimer.days,
              hours: (prevCountdownTimer.hours - 1),
              minutes: 59
            }
          }
        }else{
          return {
            days: prevCountdownTimer.days,
            hours: prevCountdownTimer.hours,
            minutes: (prevCountdownTimer.minutes - 1)
          }
        }
      })
    }, 60000 /*1 minute*/)
    return () => clearInterval(timer)
  }, [])

  async function thumbsUpClicked(){
    await togglePostsLike({variables: {postId: _id}})
    setThumbsUp(!thumbsUp)
  }

  return (
    <div className={`relative bg-black text-white max-w-xs w-11/12 h-fit rounded-lg p-4 pt-2 ${(countdownTimer.days === 0 && countdownTimer.hours === 0 && countdownTimer.minutes === 0) ? "hidden" : "block" } mb-6`}>
      <div className="w-full text-sm flex">
        <p className="font-roboto-bold grow">{username}</p>
        <p className="grow text-center">{month}/{day}/{year}</p>
        <p className="grow text-right">{countdownTimer.days}:{countdownTimer.hours}:{countdownTimer.minutes}</p>
      </div>
      <p className="text-base">{postText}</p>
      <div
        className={`w-10 h-10 rounded-full ${thumbsUp ? "text-white bg-black border-white" : "text-black bg-white border-black"} border-2 absolute -bottom-4 right-4 p-2`}
        onClick={thumbsUpClicked}
        ><ThumbsUpIcon/>
      </div>
    </div>
  )
}