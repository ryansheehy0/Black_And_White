import { createContext, useContext, useState } from 'react'

const HomeContext = createContext()
export const useHomeContext = () => useContext(HomeContext) // Returns the value attribute in the provider

export default function HomeProvider(props){
  const [filter, setFilter] = useState("Likes")

  return <HomeContext.Provider value={{filter, setFilter}} {...props} />
}