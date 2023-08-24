import { useMutation } from "@apollo/client";
import {
  LIKE_STORY,
  SAVE_STORY,
  UNLIKE_STORY,
  UNSAVE_STORY,
} from "../graphql/mutations";
import moment from "moment";
import { produce } from "immer";
import { useContext } from "react";
import { userContext } from "../App";

function Story({
  story,
  isStoryOpen,
  setIsStoryOpen,
  stories,
  setStories,
  data,
}) {
  const [likeStory] = useMutation(LIKE_STORY);
  const [unlikeStory] = useMutation(UNLIKE_STORY);
  const [saveStory] = useMutation(SAVE_STORY);
  const [unsaveStory] = useMutation(UNSAVE_STORY);
  const { user } = useContext(userContext);

  function closeModal() {
    setIsStoryOpen(false);
  }

  function openModal() {
    setIsStoryOpen(true);
  }

  const isLikedByUser = (story) => {
    if (story && story.likes) {
      const likedUsers = story.likes.map((like) => like.user.id);
      const currentUserID = user.id;
      const currentUserLiked = likedUsers.includes(currentUserID);
      return currentUserLiked;
    }
    return false;
  };

  const storyLike = async (storyId) => {
    try {
      const { data } = await likeStory({
        variables: {
          storyId: storyId,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const storyUnlike = async (storyId) => {
    try {
      const { data } = await unlikeStory({
        variables: {
          storyId: storyId,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const storySave = async (storyId) => {
    try {
      const { data } = await saveStory({
        variables: {
          storyId: storyId,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
  const storyUnsave = async (storyId) => {
    try {
      const { data } = await unsaveStory({
        variables: {
          storyId: storyId,
        },
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const handleLike = async (storyId) => {
    const storyToLike = stories.find((story) => story.id === storyId);
    if (!storyToLike) {
      console.log("Story not found!");
      return;
    }

    try {
      if (isLikedByUser) {
        const unlikedStory = await storyUnlike(storyId);
        if (unlikedStory) {
          setStories(
            (prevStories) => produce(prevStories),
            (draft) => {
              const storyIndex = draft.findIndex(
                (story) => story.id === unlikedStory.id
              );
              if (storyIndex !== -1) {
                draft[storyIndex] = unlikedStory;
              }
            }
          );
        }
      } else {
        const likedStory = await storyLike(storyId);
        if (likedStory) {
          setStories((prevPosts) =>
            produce(prevPosts, (draft) => {
              const postIndex = draft.findIndex(
                (post) => post.id === likedStory.id
              );
              if (postIndex !== -1) {
                draft[postIndex] = likedStory;
              }
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  function formatTimestamp(created_at) {
    const timestampInMilliseconds = parseInt(created_at, 10);
    const postDate = moment(timestampInMilliseconds);
    const currentDate = moment();
    const diffInHours = currentDate.diff(postDate, "hours");

    if (diffInHours < 24) {
      if (diffInHours === 0) {
        return `1s `;
      } else {
        return `${diffInHours}s `;
      }
    } else {
      return postDate.format("MMMM Do YYYY");
    }
  }

  const isSavedByUser = (story) => {
    if (story && story.saves) {
      const savedUsers = story.saves.map((save) => save.user.id);
      const currentUserID = user.id;
      const currentUserSaved = savedUsers.includes(currentUserID);
      return currentUserSaved;
    }
    return false;
  };

  return (
    <>
      {isStoryOpen ? (
        <div className="z-50 w-screen bg-black ">
          <div className="story-header">
            <div className="story-header-user">
              <div className="story-header-user-avatar">
                <img src={story?.user?.profile_photo} alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Story;
