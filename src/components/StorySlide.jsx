import SubStories from "./SubStories";

export default function StorySlide({ stories }) {
  return (
    <div className="w-screen flex  h-screen justify-center p-4">
      {stories
        .map((s) => s.stories)
        .map((story, index) => {
          return <SubStories key={index} story={story} />;
        })}
    </div>
  );
}
