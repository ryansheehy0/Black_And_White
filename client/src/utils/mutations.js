import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      token
      user {
        _id
        username
      }
    }
  }
`

export const SIGN_UP = gql`
  mutation signup($username: String!, $password: String!){
    signup(username: $username, password: $password){
      token
      user {
        _id
        username
      }
    }
  }
`

export const TOGGLE_POSTS_LIKE = gql`
  mutation togglePostsLike($postId: String!){
    togglePostsLike(postId: $postId){
      _id
      postText
      datePosted
      timeLimit
      likes
    }
  }
`

export const ADD_POST = gql`
  mutation addPost($postText: String!){
    addPost(postText: $postText){
      _id
      postText
      datePosted
      timeLimit
      likes
    }
  }
`