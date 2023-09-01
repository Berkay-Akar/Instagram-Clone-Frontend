import { useContext } from "react";
import { useState } from "react";
import { StoryUserContext } from "./StoryCard";
import SubStories from "./SubStories";

function StorySlide({ stories, userIndex, currentStoryIndex }) {
  let { user } = useContext(StoryUserContext);
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const handleCarouselChange = (newUserIndex) => {
    if (newUserIndex >= 0 && newUserIndex < stories.length) {
      setActiveUserIndex(newUserIndex);
      setActiveStoryIndex(0);
    }
  };

  let files = [];
  const mapStories = stories.map((story) => {
    return (files = [...files, story.stories]);
  });

  console.log(files);

  const handleStoryChange = (newStoryIndex) => {
    if (
      newStoryIndex >= 0 &&
      newStoryIndex < stories[activeUserIndex].stories.length
    ) {
      setActiveStoryIndex(newStoryIndex);
    } else if (newStoryIndex >= stories[activeUserIndex].stories.length) {
      if (activeUserIndex < stories.length - 1) {
        setActiveUserIndex(activeUserIndex + 1);
        setActiveStoryIndex(0);
      } else {
        setActiveUserIndex(0);
        setActiveStoryIndex(0);
      }
    } else if (newStoryIndex < 0) {
      if (activeUserIndex > 0) {
        setActiveUserIndex(activeUserIndex - 1);
        setActiveStoryIndex(stories[activeUserIndex - 1].stories.length - 1);
      } else {
        setActiveUserIndex(stories.length - 1);
        setActiveStoryIndex(stories[stories.length - 1].stories.length - 1);
      }
    }
  };

  {
    files.map((story, activeUserIndex) => {
      return story?.map((s, activeStoryIndex) => {
        {
          s?.user_id === user.id && console.log("USERS SSSSSSSSSSSS", s);
        }
      });
    });
  }

  // console.log("active user index", userIndex);
  // console.log("current story", stories[userIndex]);
  // const currentStories = stories[userIndex] || [];
  // console.log("CURRENT STORIES", currentStoryIndex);
  // console.log("LENGTH", stories[userIndex].length);
  // console.log("USER INDEX", userIndex);

  return (
    <div>
      {/* Sol ve sağ yönlendirme düğmeleri */}
      <div>
        {userIndex > 0 && (
          <button onClick={() => handleCarouselChange(userIndex - 1)}>
            {"<"}
          </button>
        )}

        {userIndex < stories.length - 1 && (
          <button onClick={() => handleCarouselChange(userIndex + 1)}>
            {">"}
          </button>
        )}
      </div>

      <div>
        {/* {files.map((story, index) => {
          return story?.map((s, subIndex) => {
            {
              s.user_id === user.id && (
                <img
                  key={s.id}
                  src={s.file}
                  alt="https://pbs.twimg.com/media/EIMozecWsAEiM_F.png"
                />
              );
            }
          });
        })} */}

        <div className="w-screen flex  h-screen justify-center ">
          {files.map((story, index) => {
            return <SubStories key={index} story={story} />;
          })}
        </div>

        {/* {stories[userIndex].length > 1 ? (
          currentStories.map((story, storyIndex) => (
            <div key={storyIndex}>
              {console.log("BEFORE IMG ELSEEEEEEE", story.file.file)}
              <img
                src={story.file.file}
                className="w-[400px] h-[700px]"
                alt={`Story ${userIndex}-${currentStoryIndex}`}
              />
              {console.log("EEYYYOOOOOOO ELSEEEEEEE", story.file.file)}
              <button onClick={() => handleStoryChange(currentStoryIndex - 1)}>
                {"<"}
              </button>
              <button onClick={() => handleStoryChange(currentStoryIndex + 1)}>
                {">"}
              </button>
            </div>
          ))
        ) : (
          <div key={stories[userIndex][currentStoryIndex]?.file.id}>
            <img
              src={stories[userIndex][currentStoryIndex]?.file.file}
              className="w-[400px] h-[700px]"
              alt={`Story ${userIndex}-`}
            />
            {console.log(
              "EEYYYOOOOOOO İİİFFFFF",
              stories[userIndex][currentStoryIndex].file
            )}
            <button onClick={() => handleStoryChange(currentStoryIndex - 1)}>
              {"<"}
            </button>
            <button onClick={() => handleStoryChange(currentStoryIndex + 1)}>
              {">"}
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default StorySlide;
