import React from "react";

function SubStories({ story }) {
  const [index, setIndex] = React.useState(0);
  const [visitedIndex, setVisitedIndex] = React.useState([0]);
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
    <div className="w-1/3 h-screen bg-white m-4 p-4  relative rounded-md ">
      <div className="w-full h-1 rounded-full  gap-2 flex">
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
      <div className="py-4">
        <div className="justify-between items-center flex">
          {index !== 0 ? (
            <button onClick={() => handleIndex(index - 1, "remove")}>
              geri
            </button>
          ) : (
            <div />
          )}
          {index !== story?.length - 1 ? (
            <button onClick={() => handleIndex(index + 1, "add")}>ileri</button>
          ) : (
            <div />
          )}
        </div>
        <div className="relative">
          <img
            className="w-full rounded-md absolute h-[500px] object-cover"
            src={story[index].file}
          />
        </div>
      </div>
    </div>
  );
}

export default SubStories;
