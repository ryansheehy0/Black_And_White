import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN, SIGN_UP } from "../utils/mutations"
import Auth from "../utils/auth"

export default function LoginOrSingUp(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [login, { error: loginError }] = useMutation(LOGIN)
  const [signUp, { error: signUpError }] = useMutation(SIGN_UP)

  async function loginOrSignUpClicked(event, loginOrSignUp){
    event.preventDefault()
    try{
      if(!username) return setErrorMessage("Username required")
      if(!password) return setErrorMessage("Password required")
      let response
      if(loginOrSignUp === "login"){
        try{
          response = await login({variables: {username, password}})
        }catch(error){
          return setErrorMessage("Login error.")
        }
      }else if(loginOrSignUp === "signUp"){
        try{
          response = await signUp({variables: {username, password}})
        }catch(error){
          return setErrorMessage("Sign up error.")
        }
      }
      if(!response.ok) return setErrorMessage("Something went wrong.")
      const {token, user} = response
      console.log(user)
      Auth.login(token)
    }catch(error){
      console.error(error)
    }
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
      <form className="flex flex-col w-full items-center" onSubmit={event => loginOrSignUpClicked(event, "login")}>
        <input
          className="focus:outline-none rounded bg-white text-black border-2 border-solid border-black p-1 text-xl mt-16 max-w-xs w-11/12"
          type="text" maxLength="64" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}/>
        <input
          className="focus:outline-none rounded bg-white text-black border-2 border-solid border-black p-1 text-xl mt-8 max-w-xs w-11/12"
          type="password" maxLength="255" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
        <button
          className="focus:outline-none rounded bg-black text-white border-2 border-solid border-white hover:border-black p-1 text-xl mt-8 max-w-xs w-11/12"
          onClick={event => loginOrSignUpClicked(event, "login")}
        >Login</button>
        <button
          className="focus:outline-none rounded bg-black text-white border-2 border-solid border-white hover:border-black p-1 text-xl mt-8 max-w-xs w-11/12"
          onClick={event => loginOrSignUpClicked(event, "signUp")}
        >Sign Up</button>
        <button
          className={`focus:outline-none rounded bg-red-500 text-center text-white border-2 border-white border-solid hover:border-black p-1 text-xl mt-8 max-w-xs w-11/12 ${errorMessage ? "visible" : "invisible"}`}
          onClick={(event) => {event.preventDefault(); setErrorMessage("");}}
        >{errorMessage}</button>
      </form>
    </div>
  )
}