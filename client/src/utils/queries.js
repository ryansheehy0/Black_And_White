import { gql } from "@apollo/client"

export const GET_POSTS_BY_LIKE = gql`
  query getPostsByLike($pageNumber: Int!){
    getPostsByLike(pageNumber: $pageNumber){
      _id
      username
      postText
      datePosted
      timeLimit
      liked
    }
  }
`

export const GET_POSTS_BY_DATE_POSTED = gql`
  query getPostsByDatePosted($pageNumber: Int!){
    getPostsByDatePosted(pageNumber: $pageNumber){
      _id
      username
      postText
      datePosted
      timeLimit
      liked
    }
  }
`

export const GET_CURRENT_USER_POSTS_BY_LIKE = gql`
  query getCurrentUserPostsByLike($pageNumber: Int!){
    getCurrentUserPostsByLike(pageNumber: $pageNumber){
      _id
      username
      postText
      datePosted
      timeLimit
      liked
    }
  }
`

export const GET_CURRENT_USER_POSTS_BY_DATE_POSTED = gql`
  query getCurrentUserPostsByDatePosted($pageNumber: Int!){
    getCurrentUserPostsByDatePosted(pageNumber: $pageNumber){
      _id
      username
      postText
      datePosted
      timeLimit
      liked
    }
  }
`