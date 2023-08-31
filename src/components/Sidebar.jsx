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
import { RiMessengerLine } from "react-icons/ri";
import logo from "../assets/logo.png";

initTE({ Sidenav });
function Sidebar({ handleLogout, isOpen, setIsOpen }) {
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
    <div className="h-screen sticky top-0 flex flex-col justify-between w-72 px-2">
      <div>
        <div className="mt-1 mb-4 ml-1 flex items-center justify-center rounded-full w-16 h-16 hover:bg-gray-lightest transform transition-colors duratios-200">
          <Link to="/">
            <img src={logo} className="w-full h-12 object-contain"></img>
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

                <span className="ml-4 ">Home</span>
              </li>
            </Link>
            <li className="mb-4 flex items-center  rounded-full pl-3 pr-8 py-3">
              <BsSearch className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
              <span className="ml-4 ">Search</span>
            </li>
            <li className="mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <AiOutlineCompass className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
              <span className="ml-4 ">Explore</span>
            </li>
            <li className="mb-4 flex  items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <BiMoviePlay className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
              <span className="ml-4 ">Reels</span>
            </li>
            <li className="mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <RiMessengerLine className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
              <span className="ml-4 ">Messages</span>
            </li>
            <li className="mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <AiOutlineHeart className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
              <span className="ml-4 ">Notifications</span>
            </li>
            <li className="mb-4 flex items-center  group-hover:text-primary-base rounded-full pl-3 pr-8 py-3">
              <BsPlusSquare className="w-[20px] h-[20px] hover:scale-110 duration-300 transition" />
              <span className="ml-4 " onClick={handleOpenForm}>
                Create
              </span>
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
                  <span className="ml-4 ">Profile</span>
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
        {user && (
          <button
            className="text-white bg-black rounded-full w-1/2"
            onClick={handleLogoutClick}
          >
            Çıkış Yapıyorum
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
