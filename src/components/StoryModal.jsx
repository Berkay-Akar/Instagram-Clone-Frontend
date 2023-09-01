import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import Card from "./Card";
import Carousel from "./Carousel";
import StorySlide from "./StorySlide";
import { StoryUserContext } from "./StoryCard";

export default function StoryModal({ children, data, stories }) {
  let [isOpen, setIsOpen] = useState(false);
  const { setSelectedUser, selectedUser } = useContext(StoryUserContext);
  let [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  let [timer, setTimer] = useState(null);
  function closeModal() {
    setIsOpen(false);
    setCurrentStoryIndex(0);
    clearTimeout(timer);
  }

  function openModal() {
    setSelectedUser(data);
    setIsOpen(true);
  }
  let testFile = [];

  const STORIES = stories?.map((story) => {
    // console.log("STORIES STORY", story);
    return story.stories.map((file) => {
      testFile = [...testFile, { file: file, user: story.user }];
      return { file: file, user: story.user };
    });
  });
  // console.log("TEST FILE", testFile);
  // console.log("STORIES", STORIES);
  const allStories = STORIES?.map((story) => story);
  // console.log("FILES", allStories);
  function handleCarouselChange(index) {
    setCurrentStoryIndex(index);
  }
  // console.log("data", data);

  useEffect(() => {
    if (isOpen && data?.stories?.length > 0) {
      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        if (currentStoryIndex < data.stories.length - 1) {
          setCurrentStoryIndex(currentStoryIndex + 1);
        } else {
          closeModal();
        }
      }, 99999999999);

      setTimer(newTimer);
    }
  }, [isOpen, currentStoryIndex, data?.stories?.length]);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const userStories = allStories?.map((userStoryList) =>
    userStoryList.map((story) => story?.file)
  );
  // console.log("user Stories ", userStories);

  return (
    <>
      <div onClick={openModal}>{children}</div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 w-screen"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed flex items-center justify-center w-screen inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex w-screen items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col justify-center items-center w-screen h-screen bg-opacity-100 transform overflow-hidden bg-black text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pr-[200px]"
                  ></Dialog.Title>

                  {STORIES.map((userStories, userIndex) => (
                    <div
                      key={userIndex}
                      className={`w-full flex items-center justify-center h-[700px] relative ${
                        userIndex === currentStoryIndex ? "" : "hidden"
                      }`}
                    >
                      <StorySlide
                        stories={stories}
                        currentStoryIndex={currentStoryIndex}
                        userIndex={userIndex}
                      />
                    </div>
                  ))}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
