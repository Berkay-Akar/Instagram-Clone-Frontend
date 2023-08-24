import { handleImage } from "../../utils";

import StoryModal from "./StoryModal";

function StoryCard({ data }) {
  return (
    <li className="mb-4 ">
      <div className="items-center justify-center flex">
        <div className="w-[65px] h-[65px] rounded-full  flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 cursor-pointer">
          <StoryModal data={data}>
            {handleImage(data.user.profile_photo)}
          </StoryModal>
        </div>
      </div>
    </li>
  );
}

export default StoryCard;
