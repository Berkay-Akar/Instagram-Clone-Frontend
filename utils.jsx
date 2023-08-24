import { RxAvatar } from "react-icons/rx";

export const handleImage = (profile_photo) => {
  return profile_photo ? (
    <img
      src={profile_photo}
      alt="Profile_photo"
      style={{ width: 60, height: 60 }}
      className=" rounded-full object-cover border-2 border-white"
    />
  ) : (
    <RxAvatar
      style={{ width: 60, height: 60 }}
      className="opacity-1 bg-white rounded-full border-2 border-white"
    />
  );
};
