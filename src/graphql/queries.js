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

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    getUserProfile(username: $username) {
      id
      name
      username
      email
      post_count
      followings_count
      followers_count
      description
      profile_photo
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
      likedPosts {
        id
        user {
          id
          name
          username
          profile_photo
        }
        post {
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
      savedPosts {
        id
        user {
          id
          name
          username
          profile_photo
        }
        post {
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
      taggedPosts {
        id
        user {
          id
          name
          username
          profile_photo
        }
        post {
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
      followers {
        id
      }
      followings {
        id
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
      created_at
      updated_at
    }
  }
`;

export const GET_USER_CONVERSATIONS = gql`
  query getConversations {
    getConversations {
      message {
        id
        senderId
        receiverId
        content
        conversationId
        created_at
        updated_at
      }
      userA {
        id
        name
        username
        profile_photo
      }
      userB {
        id
        name
        username
        profile_photo
      }
    }
  }
`;
