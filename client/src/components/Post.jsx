import { useState, useEffect } from "react"
import ThumbsUpIcon from "../assets/icons/ThumbsUpIcon"

export default function Post({username, date, expirationTime, text}){
  const [thumbsUp, setThumbsUp] = useState(false)
  const [countdownTimer, setCountdownTimer] = useState(expirationTime)

  useEffect(() => {
    const timer = setTimeout(() => {
      if(countdownTimer.minutes === 0){
        if(countdownTimer.hours === 0){
          if(countdownTimer.days === 0){
            // Post expired
            setCountdownTimer({days: 0, hours: 0, minutes: 0})
          }else{
            setCountdownTimer({
              days: (countdownTimer.days - 1),
              hours: 23,
              minutes: 59
            })
          }
        }else{
          setCountdownTimer({
            days: countdownTimer.days,
            hours: (countdownTimer.hours - 1),
            minutes: 59
          })
        }
      }else{
        setCountdownTimer({
          days: countdownTimer.days,
          hours: countdownTimer.hours,
          minutes: (countdownTimer.minutes - 1)
        })
      }
    }, 60000 /*1 minute*/)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative bg-black text-white max-w-xs w-11/12 h-fit rounded-lg p-4 pt-2 ${(countdownTimer.days === 0 && countdownTimer.hours === 0 && countdownTimer.minutes === 0) ? "hidden" : "block" } mb-6`}>
      <div className="w-full text-sm flex">
        <p className="font-roboto-bold grow">{username}</p>
        <p className="grow text-center">{date}</p>
        <p className="grow text-right">{countdownTimer.days}:{countdownTimer.hours}:{countdownTimer.minutes}</p>
      </div>
      <p className="text-base">{text}</p>
      <div
        className={`w-10 h-10 rounded-full ${thumbsUp ? "text-white bg-black border-white" : "text-black bg-white border-black"} border-2 absolute -bottom-4 right-4 p-2`}
        onClick={() => setThumbsUp(!thumbsUp)}
        ><ThumbsUpIcon/>
      </div>
    </div>
  )
}