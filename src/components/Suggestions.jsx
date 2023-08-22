import { userContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SUGGESTIONS } from "../graphql/mutations";
import { useContext, useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";

function Suggestions() {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [suggests, setSuggests] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [suggestFollow, { loading, error }] = useMutation(SUGGESTIONS);

  const fetchData = async () => {
    try {
      const response = await suggestFollow({
        variables: {
          userId: user.id,
        },
      });
      setSuggests(response.data.suggestFollow);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const maxSuggestions = showMore ? suggests.length : 3;
  const visibleSuggestions = suggests.slice(0, maxSuggestions);
  console.log(user);

  return (
    <div className="h-screen sticky top-0 mt-4">
      <Link to={`/${user?.username}`}>
        <div className="flex flex-row gap-1 items-center justify-start ">
          {user.profile_photo ? (
            <img
              src={user?.profile_photo}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <RxAvatar className="w-8 h-8" />
          )}
          <span className="font-bold">{user?.username}</span>
          <span>{user?.name}</span>{" "}
        </div>
      </Link>
      <p className="mt-4 text-black opacity-50 font-bold">
        Suggestions for you
      </p>
      <ul className="flex flex-col">
        {visibleSuggestions.map((suggest) => (
          <li key={suggest.id} className="mt-8">
            <Link to={`/${suggest?.username}`}>
              <div className="flex flex-row  gap-1  items-center justify-start">
                {suggest?.profile_photo ? (
                  <img
                    src={suggest?.profile_photo}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <RxAvatar className="w-8 h-8" />
                )}
                <p className="font-bold"> {suggest.username}</p>
                <p> {suggest.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {suggests.length > 3 && (
        <button
          className="mt-4 text-blue-500 hover:underline focus:outline-none"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default Suggestions;
