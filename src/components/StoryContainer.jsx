import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { RxAvatar } from "react-icons/rx";
import { STORIES } from "../graphql/queries";
import Story from "./Story";

function StoryContainer({ isStoryOpen, setIsStoryOpen }) {
  const [stories, setStories] = useState([]);
  const { loading, error, data } = useQuery(STORIES);

  useEffect(() => {
    if (data && data.stories) {
      setStories(data.stories);
    }
    console.log("stories", stories);
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleOpenStory = () => {
    setIsStoryOpen(true);
  };

  return (
    <ul className="flex flex-row gap-3 items-center justify-start">
      {stories.map((story) => (
        <li key={story.id} className="mb-4 ">
          <div className="items-center justify-center flex">
            {isStoryOpen && (
              <Story
                key={story.id}
                story={story}
                isStoryOpen={isStoryOpen}
                setIsStoryOpen={setIsStoryOpen}
                stories={stories}
                setStories={setStories}
                data={data}
              />
            )}
            {!isStoryOpen ? (
              <div className="w-[65px] h-[65px] rounded-full  flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 cursor-pointer">
                {story.user?.profile_photo ? (
                  <img
                    src={story.user.profile_photo}
                    alt="Profile_photo"
                    className="w-[60px] h-[60px] rounded-full object-cover border-2 border-white"
                    onClick={handleOpenStory}
                  />
                ) : (
                  <RxAvatar
                    className="w-[60px] h-[60px] opacity-1 bg-white rounded-full border-2 border-white"
                    onClick={handleOpenStory}
                  />
                )}
              </div>
            ) : (
              <div className="w-[70px] h-[70px] rounded-full items-center justify-center bg-gray-200  p-1 cursor-pointer">
                {story.user?.profile_photo ? (
                  <img
                    src={story.user.profile_photo}
                    alt="Profile_photo"
                    className="w-[60px] h-[60px] rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <RxAvatar className="w-[60px] h-[60px] opacity-1 rounded-full	border-2 border-white" />
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default StoryContainer;
