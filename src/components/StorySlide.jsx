import { useContext, useEffect, useState } from "react";
import SubStories from "./SubStories";
import { StoryUserContext } from "./StoryCard";

export default function StorySlide({ stories }) {
  const { setSelectedUser, selectedUser } = useContext(StoryUserContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(selectedUser);
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedUser]);

  const goToNextUser = () => {
    if (currentIndex >= stories.length - 1) return;

    setCurrentIndex(currentIndex + 1);
    setSelectedUser(stories[currentIndex + 1]);
  };
  return (
    <div className="w-screen flex  h-screen justify-center p-4">
      {/* {stories
        .map((s) => s.stories)
        .map((story, index) => {
          return <SubStories key={index} story={story} />;
        })} */}
      <SubStories
        story={stories.find((s) => s.user.id === selectedUser.user.id).stories}
        user={stories.find((s) => s.user.id === selectedUser.user.id).user}
        onStoryEnd={goToNextUser}
      />
      {stories[currentIndex] + 1 != null && (
        <span
          className="cursor-pointer text-white"
          onClick={() => goToNextUser()}
        >
          {">"}
        </span>
      )}
    </div>
  );
}
