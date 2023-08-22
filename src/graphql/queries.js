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

export const STORIES = gql`
  query Stories {
    stories {
      id
      file
      is_saved
      like_count
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
    }
  }
`;
