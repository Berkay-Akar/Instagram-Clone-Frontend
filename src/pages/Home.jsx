import { useState, useContext } from "react";
import { userContext } from "../App";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Suggestions from "../components/Suggestions";

function Home({ handleLogout }) {
  const { user } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState();

  if (!user) {
    console.log("user not found");
    return;
  }

  return (
    <div>
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
