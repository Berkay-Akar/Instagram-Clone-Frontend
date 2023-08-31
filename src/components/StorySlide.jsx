import { useState } from "react";

function StorySlide({ stories }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  const handleCarouselChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < stories.length) {
      setActiveIndex(newIndex);
      setStoryIndex(0);
    }
  };

  console.log("STORIESSSSSSS", stories);

  const handleOpenUser = (userIndex) => {
    const prevUsers = stories.slice(Math.max(0, userIndex - 2), userIndex);
    const nextUsers = stories.slice(userIndex + 1, userIndex + 3);
    const selectedUser = stories[userIndex];
    const userWithNeighbors = [selectedUser, ...prevUsers, ...nextUsers];
    console.log("User and Neighbors:", userWithNeighbors);
  };
  console.log(handleOpenUser(1));

  const handleStoryChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < stories[activeIndex].stories.length) {
      setStoryIndex(newIndex);
    } else if (newIndex >= stories[activeIndex].stories.length) {
      if (activeIndex < stories.length - 1) {
        setActiveIndex(activeIndex + 1);
        setStoryIndex(0);
      } else {
        setActiveIndex(0);
        setStoryIndex(0);
      }
    } else if (newIndex < 0) {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        setStoryIndex(stories[activeIndex - 1].stories.length - 1);
      } else {
        setActiveIndex(stories.length - 1);
        setStoryIndex(stories[stories.length - 1].stories.length - 1);
      }
    }
  };
  // console.log("STORIES!'^!'^!'^", stories[0]);
  // const currentStory = stories?.[0]?.file?.file;
  // console.log("CURRENT STORY", currentStory);

  {
    stories.map((story, index) => {
      console.log("STORIES", story);
    });
  }

  /*
    const STORIES = stories?.map((story) => {
    console.log("STORIES STORY", story);
    return story.stories.map((file) => {
      testFile = [...testFile, { file: file, user: story.user }];
      return { file: file, user: story.user };
    });
  });

  <img
                key={story?.file?.id}
                src={story[index].file.file}
                className="w-[400px] h-[700px] "
              />
  */

  // {
  //   stories.map((story, index) => {
  //     return story.file.map((file) => {
  //       console.log("FILEEEEEEE", file);
  //       return (
  //         <img
  //           key={file?.id}
  //           src={file?.file}
  //           className="w-[400px] h-[700px]"
  //         />
  //       );
  //     });
  //   });
  // }

  return (
    <div>
      <div>
        <div className="flex flex-row">
          <button
            onClick={() => handleStoryChange(storyIndex - 1)}
            className="text-red-500"
          >
            {"<"}
          </button>
          {stories?.stories?.map((file, fileIndex) => (
            <img
              key={fileIndex}
              src={file?.file}
              className="w-[400px] h-[700px]"
              alt={`Story ${activeIndex}-${fileIndex}`}
            />
          ))}

          <button
            className="text-red-500"
            onClick={() => handleStoryChange(storyIndex + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StorySlide;
