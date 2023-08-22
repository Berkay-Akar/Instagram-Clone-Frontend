import { useContext, useState } from "react";
import { userContext } from "../App";
import Sidebar from "../components/Sidebar";
import Main from "../components/main";
import Suggestions from "../components/Suggestions";
import Story from "../components/Story";
/* eslint-disable react/prop-types */
function Home({ handleLogout }) {
  const { user } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const rootElement = document.getElementById("root");

  if (!user) {
    console.log("user not found");
    return;
  }

  return (
    <div>
      {isStoryOpen ? ((<Story />), rootElement) : null}
      <div className="flex min-h-screen max-w-7xl mx-auto border">
        <Sidebar
          handleLogout={handleLogout}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Main
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isStoryOpen={isStoryOpen}
          setIsStoryOpen={setIsStoryOpen}
        />
        <Suggestions />
      </div>
    </div>
  );
}

export default Home;
