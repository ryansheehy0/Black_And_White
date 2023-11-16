export default function FilterBy({context}){
  const { filter, setFiler } = context()

  return (
    <div className="w-screen h-16 bg-white absolute top-0 flex justify-center items-center">
      <p className="text-black text-xl">Filter by:</p>
      <button className="ml-2 rounded bg-black text-white">Likes</button>
      <button className="ml-2">Date Posted</button>
    </div>
  )
}