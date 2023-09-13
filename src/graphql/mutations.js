import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      token
      user {
        id
        name
        email
        username
        profile_photo
        post_count
        followings_count
        followers_count
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        id
        name
        email
        username
      }
    }
  }
`;

export const SUGGESTIONS = gql`
  mutation suggest_Follow($userId: Int!) {
    suggestFollow(userId: $userId) {
      id
      name
      username
      profile_photo
    }
  }
`;

export const SEND_RESET_EMAIL = gql`
  mutation SendResetEmail($email: String!) {
    sendResetEmail(email: $email)
  }
`;
export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const POST_ACTION_FRAGMENT = gql`
  fragment PostActionFields on Post {
    id
    file
    like_count
    comments_count
    content
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
      post {
        id
        content
        file
        like_count
        comments_count
      }
      post_id
      user {
        id
        username
        name
        profile_photo
      }
      user_id
    }
    post_replies {
      id
      content
      user {
        id
        name
        username
        profile_photo
      }
      replies_likes {
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
export const LIKE_POST = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId) {
      ...PostActionFields
    }
  }
  ${POST_ACTION_FRAGMENT}
`;

export const UNLIKE_POST = gql`
  mutation unlikePost($postId: Int!) {
    unlikePost(postId: $postId) {
      ...PostActionFields
    }
  }
  ${POST_ACTION_FRAGMENT}
`;
export const SAVE_POST = gql`
  mutation savePost($postId: Int!) {
    savePost(postId: $postId) {
      ...PostActionFields
    }
  }
  ${POST_ACTION_FRAGMENT}
`;
export const UNSAVE_POST = gql`
  mutation unsavePost($postId: Int!) {
    unsavePost(postId: $postId) {
      ...PostActionFields
    }
  }
  ${POST_ACTION_FRAGMENT}
`;

export const CREATE_POST = gql`
  mutation CreatePost($file: String!, $content: String!) {
    createPost(file: $file, content: $content) {
      ...PostActionFields
    }
  }
  ${POST_ACTION_FRAGMENT}
`;

export const STORY_ACTION_FRAGMENT = gql`
  fragment StoryActionFields on Story {
    id
    file
    like_count
    created_at
    is_saved
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
`;

export const CREATE_STORY = gql`
  mutation CreateStory($file: String!) {
    createStory(file: $file) {
      ...StoryActionFields
    }
  }
  ${STORY_ACTION_FRAGMENT}
`;

export const LIKE_STORY = gql`
  mutation LikeStory($storyId: String!) {
    likeStory(storyId: $storyId) {
      ...StoryActionFields
    }
  }
  ${STORY_ACTION_FRAGMENT}
`;

export const UNLIKE_STORY = gql`
  mutation UnlikeStory($storyId: String!) {
    unlikeStory(storyId: $storyId) {
      ...StoryActionFields
    }
  }
  ${STORY_ACTION_FRAGMENT}
`;

export const SAVE_STORY = gql`
  mutation SaveStory($storyId: String!) {
    saveStory(storyId: $storyId) {
      ...StoryActionFields
    }
  }
  ${STORY_ACTION_FRAGMENT}
`;

export const UNSAVE_STORY = gql`
  mutation UnsaveStory($storyId: String!) {
    unsaveStory(storyId: $storyId) {
      ...StoryActionFields
    }
  }
  ${STORY_ACTION_FRAGMENT}
`;

export const GET_PROFILE_POSTS = gql`
  mutation profilePosts($userId: Int!) {
    profilePosts(userId: $userId) {
      id
      file
      content
      like_count
      comments_count
      created_at
      updated_at
      user {
        name
        username
        profile_photo
      }
      likes {
        id
        user_id
        post_id
        user {
          id
          username
          name
          profile_photo
        }
      }
      saves {
        id
        user_id
        post_id
        user {
          id
          username
          name
          profile_photo
        }
        post {
          id
          file
          content
          like_count
          comments_count
        }
      }
    }
  }
`;

export const GET_CONVERSATION_MESSAGE = gql`
  mutation getConversationMessage($conversationId: Int!) {
    getConversationMessage(conversationId: $conversationId) {
      id
      content
      senderId
      receiverId
      is_seen
      is_deleted
      created_at
      updated_at
      conversationId
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($receiverId: Int!, $content: String!) {
    sendMessage(receiverId: $receiverId, content: $content) {
      id
      content
      senderId
      receiverId
      is_seen
      is_deleted
      created_at
      updated_at
      conversationId
    }
  }
`;
