import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_POST } from "../utils/mutations"

export default function PopupPost({popup, setPopup}){
  const [postText, setPostText] = useState("")

  const [addPost, { error }] = useMutation(ADD_POST)

  async function onPost(){
    try {
      if(postText !== ""){
        await addPost({variables: { postText }})
        setPostText("")
      }
      setPopup(false)
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className={`${popup ? "visible" : "invisible"}`}>
      <textarea
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base bg-black text-white max-w-xs w-11/12 h-32 rounded-lg p-4 focus:outline-none resize-none`}
        value={postText}
        onChange={(event) => setPostText(event.target)}
        placeholder="Post" rows="4">
      </textarea>
      <button className="focus:outline-none hover:border-black rounded-full p-1 text-black bg-white border-2 border-black absolute top-[calc(50%+60px)] left-[calc(50%+138px-16px)] -translate-x-1/2 -translate-y-1/2" onClick={onPost}>Post</button>
    </div>
  )
}