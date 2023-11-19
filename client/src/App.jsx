import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
// Import pages and components
  // Import pages
import LoginOrSingUp from './pages/LoginOrSignUp'
import Home from "./pages/Home"
import Posts from "./pages/Posts"
  // Import components
import BottomNavigationBar from './components/BottomNavigationBar'

const httpLink = createHttpLink({
  uri: "/graphql"
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginOrSingUp/>}/>
          <Route path="/home" exact element={
            <>
              <Home/>
              <BottomNavigationBar selected="home"/>
            </>
          }/>
          <Route path="/posts" exact element={
            <>
              <Posts/>
              <BottomNavigationBar selected="posts"/>
            </>
          }/>
        </Routes>
      </Router>
    </ApolloProvider>
  )
}