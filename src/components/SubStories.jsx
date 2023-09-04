import React, { useContext } from "react";
import { StoryUserContext } from "./StoryCard";

function SubStories({ story, onStoryEnd, user }) {
  const [index, setIndex] = React.useState(0);
  const [visitedIndex, setVisitedIndex] = React.useState([0]);
  let [timer, setTimer] = React.useState(null);
  console.log(story);
  const {
    closeModal,
    setIsOpen,
    isOpen,
    currentStoryIndex,
    setCurrentStoryIndex,
  } = useContext(StoryUserContext);

  React.useEffect(() => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (index < story.length - 1) {
        setIndex(index + 1);
      } else {
        onStoryEnd();
      }
    }, 99999999);

    setTimer(newTimer);
  }, [index]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const handleIndex = (numb, info) => {
    if (info === "add") {
      setVisitedIndex([...visitedIndex, numb]);
    } else if (info === "remove") {
      setVisitedIndex(visitedIndex.filter((v) => v !== numb + 1));
    }
    if (numb >= 0 && story?.length > index) {
      setIndex(numb);
    }
  };

  return (
    <div className="w-1/3 h-11/12 bg-white m-4   relative rounded-md ">
      <div className="relative bg-dark h-full">
        <img
          className="w-full rounded-md absolute h-full  object-cover"
          src={story[index].file}
        />
      </div>
      <div className="absolute left-0 top-0 w-full p-4  ">
        <div className="w-full h-1 rounded-full   flex flex-wrap ">
          <div className="w-full gap-2 flex">
            {story?.map((s, storyIndex) => {
              return (
                <div
                  key={s.id}
                  className="h-1 bg-gray-500 border-1 rounded-full"
                  style={{
                    width: `${100 / story.length}%`,
                    ...(visitedIndex.find((v) => v === storyIndex) >= 0 && {
                      background: "white",
                    }),
                  }}
                ></div>
              );
            })}
          </div>
          <div className="w-full mt-2">
            <div className="justify-between items-center flex">
              <div className="flex flex-row items-center justify-between gap-2">
                <img
                  src={user.profile_photo}
                  alt="profile_photo"
                  className="rounded-full w-12 h-12"
                />
                <p className="text-white ">{user.username}</p>
              </div>
              {index !== 0 ? (
                <button
                  className="text-white"
                  onClick={() => handleIndex(index - 1, "remove")}
                >
                  previus
                </button>
              ) : (
                <div />
              )}
              {index !== story?.length - 1 ? (
                <button
                  className="text-white"
                  onClick={() => handleIndex(index + 1, "add")}
                >
                  next
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubStories;
