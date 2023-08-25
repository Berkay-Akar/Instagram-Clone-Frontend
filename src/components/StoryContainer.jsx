import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_STORY_LIST } from "../graphql/queries";
import StoryCard from "./StoryCard";

function StoryContainer({ isStoryOpen, setIsStoryOpen }) {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(0);
  const { loading, error, data } = useQuery(GET_STORY_LIST);
  useEffect(() => {
    if (data && data.getStoryList) {
      setStories(data.getStoryList);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleOpenStory = (story) => {
    setSelectedStory(story);
    setIsStoryOpen(true);
  };
  // console.log("data", data);
  // const temp = data.getStoryList.map((storyList) => storyList);
  // const users = temp.map((story) => story.user);
  // console.log("users", users);
  // console.log(
  //   data.getStoryList.map((storyList) => storyList?.map((story) => story))
  // );

  return (
    <ul className="flex flex-row gap-3 items-center justify-start">
      {stories.map((story, index) => (
        <div key={story.id} onClick={() => handleOpenStory(index)}>
          <StoryCard data={story} stories={stories} />
        </div>
      ))}
    </ul>
  );
}

export default StoryContainer;
