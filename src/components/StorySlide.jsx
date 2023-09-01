import { useContext } from "react";
import SubStories from "./SubStories";
import { StoryUserContext } from "./StoryCard";

export default function StorySlide({ stories }) {
  const { setSelectedUser, selectedUser } = useContext(StoryUserContext);
  return (
    <div className="w-screen flex  h-screen justify-center p-4">
      {/* {stories
        .map((s) => s.stories)
        .map((story, index) => {
          return <SubStories key={index} story={story} />;
        })} */}
      <SubStories
        story={stories.find((s) => s.user.id === selectedUser.user.id).stories}
      />
    </div>
  );
}
