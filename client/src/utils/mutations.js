import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      token
    }
  }
`

export const SIGN_UP = gql`
  mutation signup($username: String!, $password: String!){
    signup(username: $username, password: $password){
      token
    }
  }
`

export const TOGGLE_POSTS_LIKE = gql`
  mutation togglePostsLike($postId: ID!){
    togglePostsLike(postId: $postId){
      _id
    }
  }
`

export const ADD_POST = gql`
  mutation addPost($postText: String!){
    addPost(postText: $postText){
      _id
    }
  }
`