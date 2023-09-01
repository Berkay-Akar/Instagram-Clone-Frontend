import React, { createContext } from "react";
import { handleImage } from "../../utils";

import StoryModal from "./StoryModal";
export const StoryUserContext = React.createContext();

function StoryCard({ data, stories }) {
  const [selectedUser, setSelectedUser] = React.useState(null);
  return (
    <li className="mb-4 ">
      <div className="items-center justify-center flex">
        <div className="w-[65px] h-[65px] rounded-full  flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 cursor-pointer">
          <StoryUserContext.Provider value={{ setSelectedUser, selectedUser }}>
            <StoryModal data={data} stories={stories}>
              {handleImage(data?.user?.profile_photo)}
            </StoryModal>
          </StoryUserContext.Provider>
        </div>
      </div>
    </li>
  );
}

export default StoryCard;
