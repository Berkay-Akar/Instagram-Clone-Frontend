import { useState, useContext, useEffect } from "react";
import { Sidenav, initTE } from "tw-elements";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHeart,
} from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { GiJumpingDog } from "react-icons/gi";
import { userContext } from "../App";
import { BsSearch, BsPlusSquare } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { BiMoviePlay } from "react-icons/bi";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import logo from "../assets/logo.png";

initTE({ Sidenav });
function InboxSidebar({ handleLogout, isOpen, setIsOpen }) {
  const { user } = useContext(userContext);

  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const handleItemClick = (page) => {
    setActive(page);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/auth/login");
  };

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between w-20 px-2 border-r">
      <div>
        <div className="mt-1 mb-4 ml-1 flex items-center justify-center rounded-full w-16 h-16 hover:bg-gray-lightest transform transition-colors duratios-200">
          <Link to="/">
            <LuInstagram className="w-8 h-8  object-contain hover:scale-110 duration-300 transition" />
          </Link>
        </div>
        <nav className="flex-col mb-4 cursor-pointer">
          <ul className="text-xl  block ">
            <Link to="/">
              <li
                className={`mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3 ${
                  active === "home" ? "bg-white text-black font-bold" : ""
                }`}
                onClick={() => handleItemClick("home")}
              >
                {active === "home" ? (
                  <AiFillHome className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
                ) : (
                  <AiOutlineHome className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
                )}
              </li>
            </Link>
            <li className="mb-4 flex items-center  rounded-full pl-3 pr-8 py-3">
              <BsSearch className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
            </li>
            <li className="mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <AiOutlineCompass className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
            </li>
            <li className="mb-4 flex  items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <BiMoviePlay className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
            </li>
            {user && (
              <Link to={"/direct/inbox"}>
                <li
                  className={`mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3 ${
                    active === "profile"
                      ? "bg-white text-primary-base font-bold"
                      : ""
                  }`}
                  onClick={() => handleItemClick("direct/inbox")}
                >
                  {active === "home" ? (
                    <RiMessengerFill className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
                  ) : (
                    <RiMessengerLine className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
                  )}
                </li>
              </Link>
            )}
            <li className="mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <AiOutlineHeart className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
            </li>
            <li className="mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <BsPlusSquare
                className="w-[20px] h-[20px] hover:scale-110 duration-300 transition"
                onClick={handleOpenForm}
              />
            </li>

            {user ? (
              <Link to={`/${user?.username}`}>
                <li
                  className={`mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3 ${
                    active === "profile"
                      ? "bg-white text-primary-base font-bold"
                      : ""
                  }`}
                  onClick={() => handleItemClick("profile")}
                >
                  {user.profile_photo ? (
                    <img
                      src={user.profile_photo}
                      className="w-[20px] h-[20px] hover:scale-110 duration-300 transition rounded-full"
                    />
                  ) : (
                    <RxAvatar />
                  )}
                </li>
              </Link>
            ) : (
              <Link to="/auth/login">
                <li className=" flex  text-black rounded-full py-3 px-8 w-11/12 shadow-lg">
                  <GiJumpingDog className="w-8 h-8 " />
                  <span>Login</span>
                </li>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default InboxSidebar;
