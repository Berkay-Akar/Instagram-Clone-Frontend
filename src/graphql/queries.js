import { gql } from "@apollo/client";

export const POSTS = gql`
  query Posts {
    posts {
      id
      file
      content
      like_count
      comments_count
      created_at
      user {
        id
        name
        username
        profile_photo
      }
      likes {
        id
        user {
          id
          name
          username
          profile_photo
        }
      }
      saves {
        id
        user {
          id
          name
          username
        }
      }
      post_replies {
        id
        content
        like_count
        created_at
        updated_at
        user {
          id
          name
          username
          profile_photo
        }
      }
      post_tagged {
        id
        user {
          id
          name
          username
        }
      }
    }
  }
`;

export const GET_STORY_LIST = gql`
  query getStoryList {
    getStoryList {
      user {
        id
        name
        username
        profile_photo
      }
      stories {
        id
        file
        like_count
        is_saved
        created_at
        user_id
      }
    }
  }
`;
