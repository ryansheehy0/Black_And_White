export default function FilterBy({filter, setFilter}){
  return (
    <div className="w-screen h-16 bg-white absolute top-0 flex justify-center items-center">
      <p className="text-black text-xl">Filter by:</p>
      <button
        className={`focus:outline-none hover:border-black ml-2 rounded-lg ${filter === "Likes" ? "bg-black text-white" : "bg-white text-black"} p-2 text-base border-2 border-black`}
        onClick={() => setFilter("Likes")}
      >Likes</button>
      <button
        className={`focus:outline-none hover:border-black ml-2 rounded-lg ${filter === "Date Posted" ? "bg-black text-white" : "bg-white text-black"} p-2 text-base border-2 border-black`}
        onClick={() => setFilter("Date Posted")}
      >Date Posted</button>
    </div>
  )
}