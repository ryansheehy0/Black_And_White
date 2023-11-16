import { useState } from "react"

export default function LoginOrSingUp(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function loginClicked(event){
    event.preventDefault()
  }

  function signUpClicked(event){
    event.preventDefault()
  }

  return (
    <div className="w-screen h-screen">
      <div className="bg-white -z-10 w-1/2 h-full absolute top-0 left-0"></div>
      <div className="bg-black -z-10 w-1/2 h-full absolute top-0 right-0"></div>
      <h1 className="flex justify-center pt-8 text-5xl">
        <span className="text-black w-[140px] text-right">Black</span>
        <span className="mix-blend-difference text-white w-[36px] text-center">&</span>
        <span className="text-white w-[140px]">White</span>
      </h1>
      <form className="flex flex-col w-full items-center" onSubmit={loginClicked}>
        <input
          className="focus:outline-none rounded bg-white text-black border-2 border-solid border-black p-1 text-xl mt-16 max-w-xs w-11/12"
          type="text" maxLength="64" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}/>
        <input
          className="focus:outline-none rounded bg-white text-black border-2 border-solid border-black p-1 text-xl mt-8 max-w-xs w-11/12"
          type="password" maxLength="255" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
        <button
          className="focus:outline-none rounded bg-black text-white border-2 border-solid border-white hover:border-black p-1 text-xl mt-8 max-w-xs w-11/12"
          onClick={loginClicked}
        >Login</button>
        <button
          className="focus:outline-none rounded bg-black text-white border-2 border-solid border-white hover:border-black p-1 text-xl mt-8 max-w-xs w-11/12"
          onClick={signUpClicked}
        >Sign Up</button>
      </form>
    </div>
  )
}