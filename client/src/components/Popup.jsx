export default function Popup({popup, setPopup}){
  function onPost(){
    setPopup(false)
  }

  return (
    <div className={`${popup ? "visible" : "invisible"}`}>
      <textarea className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base bg-black text-white max-w-xs w-11/12 h-32 rounded-lg p-4 focus:outline-none resize-none`} placeholder="Post" rows="4">
      </textarea>
      <button className="focus:outline-none hover:border-black rounded-full p-1 text-black bg-white border-2 border-black absolute top-[calc(50%+60px)] left-[calc(50%+138px-16px)] -translate-x-1/2 -translate-y-1/2" onClick={onPost}>Post</button>
    </div>
  )
}