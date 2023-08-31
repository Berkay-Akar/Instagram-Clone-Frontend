import { POSTS } from "../graphql/queries";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useMutation, useQuery } from "@apollo/client";
import { RxAvatar } from "react-icons/rx";
import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import {
  LIKE_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "../graphql/mutations";
import save from "../assets/save.svg";
import saved from "../assets/saved.svg";
import { produce } from "immer";
import Upload from "./Upload";
import { Link } from "react-router-dom";
import StoryContainer from "./StoryContainer";

function Main({ isOpen, setIsOpen, isStoryOpen, setIsStoryOpen }) {
  const { loading, error, data } = useQuery(POSTS);
  const { user } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [savePost] = useMutation(SAVE_POST);
  const [unsavePost] = useMutation(UNSAVE_POST);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLike, setShowLike] = useState(false);
  // const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, 3));
  // const [startIndex, setStartIndex] = useState(3);
  // const chunkSize = 2;

  const isLikedByUser = (post) => {
    if (post && post.likes) {
      const likedUsers = post.likes.map((like) => like.user.id);
      const currentUserID = user.id;
      const currentUserLiked = likedUsers.includes(currentUserID);
      return currentUserLiked;
    }
    return false;
  };

  const isSavedByUser = (post) => {
    if (post && post.saves) {
      const savedUsers = post.saves.map((save) => save.user.id);

      const currentUser = user.id;
      const currentUserSaved = savedUsers.includes(currentUser);

      return currentUserSaved;
    }

    return false;
  };

  const postLike = async (postId) => {
    try {
      const { data } = await likePost({
        variables: {
          postId: postId,
        },
      });

      return data.likePost;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const postUnlike = async (postId) => {
    try {
      const { data } = await unlikePost({
        variables: {
          postId: postId,
        },
      });

      return data.unlikePost;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const postSave = async (postId) => {
    try {
      const { data } = await savePost({
        variables: {
          postId: postId,
        },
      });

      return data.savedPost;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const postUnsave = async (postId) => {
    try {
      const { data } = await unsavePost({
        variables: {
          postId: postId,
        },
      });
      return data.unsavedPost;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const handleLike = async (postId) => {
    const postToLike = posts.find((post) => post.id === postId);

    if (!postToLike) {
      console.log("Post not found");
      return;
    }

    try {
      if (isLikedByUser(postToLike)) {
        const unlikedPost = await postUnlike(postId);

        if (unlikedPost) {
          setPosts(
            produce((draft) => {
              const post = draft.find((post) => post.id === unlikedPost.id);
              post.like_count = unlikedPost.like_count;
            })
          );
        }
      } else {
        const likedPost = await postLike(postId);

        if (likedPost) {
          setPosts(
            produce((draft) => {
              const post = draft.find((post) => post.id === likedPost.id);
              post.like_count = likedPost.like_count;
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (postId) => {
    const postToSave = posts.find((post) => post.id === postId);

    if (!postToSave) {
      console.log("Post not found");
      return;
    }

    try {
      if (isSavedByUser(postToSave)) {
        const unsavedPost = await postUnsave(postId);

        if (unsavedPost) {
          setPosts((prevPosts) =>
            produce(prevPosts, (draft) => {
              const postIndex = draft.findIndex(
                (post) => post.id === unsavedPost.id
              );
              if (postIndex !== -1) {
                draft[postIndex] = unsavedPost;
              }
            })
          );
        }
      } else {
        const savedPost = await postSave(postId);

        if (savedPost) {
          setPosts((prevPosts) =>
            produce(prevPosts, (draft) => {
              const postIndex = draft.findIndex(
                (post) => post.id === savedPost.id
              );
              if (postIndex !== -1) {
                draft[postIndex] = savedPost;
              }
            })
          );
        }
        setShowSuccessMessage(true);
        console.log(showSuccessMessage);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

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

  const handleDoubleClick = async (postId) => {
    const postToLike = posts.find((post) => post.id === postId);

    if (!postToLike) {
      console.log("Post not found");
      return;
    }

    try {
      if (isLikedByUser(postToLike)) {
        const unlikedPost = await postUnlike(postId);

        if (unlikedPost) {
          setPosts((prevPosts) =>
            produce(prevPosts, (draft) => {
              const postIndex = draft.findIndex(
                (post) => post.id === unlikedPost.id
              );
              if (postIndex !== -1) {
                draft[postIndex] = unlikedPost;
              }
            })
          );
        }
      } else {
        const likedPost = await postLike(postId);
        setShowLike(true);
        console.log(showSuccessMessage);
        setTimeout(() => {
          setShowLike(false);
        }, 1000);

        if (likedPost) {
          setPosts((prevPosts) =>
            produce(prevPosts, (draft) => {
              const postIndex = draft.findIndex(
                (post) => post.id === likedPost.id
              );
              if (postIndex !== -1) {
                draft[postIndex] = likedPost;
              }
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleShowMore = () => {
  //   const endIndex = startIndex + chunkSize;
  //   const newVisiblePosts = posts.slice(0, endIndex);
  //   setVisiblePosts(newVisiblePosts);
  //   setStartIndex(endIndex);
  // };

  return (
    <>
      {isOpen && (
        <Upload
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          posts={posts}
          setPosts={setPosts}
          className="opacity-50 w-screen"
        />
      )}

      <div className="sticky top-0 flex flex-col p-4 border-l border-gray-extraLight bg-white w-[630px]">
        <StoryContainer
          isStoryOpen={isStoryOpen}
          setIsStoryOpen={setIsStoryOpen}
        />

        <ul className="flex flex-col items-center  justify-center">
          {posts.map((post) => (
            <li key={post.id} className="mb-4 w-[468px]">
              <Link to={`/${post?.user?.username}`}>
                <div className="flex flex-row items-center justify-start gap-1 ml-1 mb-1">
                  {post.user?.profile_photo ? (
                    <img
                      src={post.user.profile_photo}
                      alt="Profile_photo"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <RxAvatar className="w-8 h-8 opacity-50	" />
                  )}
                  <p className="font-bold">{post?.user?.username}</p>
                  <span className="text-sm text-gray-dark ml-2">
                    •{formatTimestamp(post.created_at)}
                  </span>
                </div>
              </Link>

              <div className="relative">
                <img
                  className="w-full object-contain border rounded-[4px]"
                  src={post?.file}
                  alt="Post_image"
                  onDoubleClick={() => handleDoubleClick(post.id)}
                />
                {showLike && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-1  animate-jump">
                    <BsFillHeartFill className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                <Link to={`/${post?.user.username}`}>
                  <span className="font-bold">{post?.user?.username}</span>
                </Link>
                <span className="">{post?.content}</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1 justify-start items-center">
                  <div className="flex flex-row gap-1 justify-start items-center">
                    {!isLikedByUser(post) ? (
                      <AiOutlineHeart
                        className="w-6 h-6 cursor-pointer hover:opacity-50"
                        onClick={() => handleLike(post.id)}
                      />
                    ) : (
                      <BsFillHeartFill
                        className="w-6 h-6 cursor-pointer hover:opacity-50 text-red-500 animate-jump"
                        onClick={() => handleLike(post.id)}
                      />
                    )}
                    <p>{post.like_count}</p>
                  </div>
                  <div className="flex flex-row gap-1 justify-start items-center">
                    <BiMessageRounded className="w-6 h-6 cursor-pointer hover:opacity-50" />
                    <p>{post.comments_count}</p>
                  </div>
                </div>
                <div className="pr-2">
                  {isSavedByUser(post) ? (
                    <img
                      src={saved}
                      alt="Saved"
                      className="w-6 h-6 cursor-pointer "
                      onClick={() => handleSave(post.id)}
                    />
                  ) : (
                    <img
                      src={save}
                      alt="Save"
                      className="w-6 h-6 cursor-pointer "
                      onClick={() => handleSave(post.id)}
                    />
                  )}
                  {showSuccessMessage && (
                    <div className="w-full text-red-600">
                      Post saved Successfully
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b pt-8" />
            </li>
          ))}
          <div className="flex items-center justify-center">
            {/* {posts.length > 3 && (
              <button
                className="mt-4 text-blue-500 hover:underline focus:outline-none item"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )} */}
          </div>
        </ul>
      </div>
    </>
  );
}

export default Main;
