import { useQuery } from "@apollo/client";
import { GET_USER_CONVERSATIONS } from "../graphql/queries";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";

function Inbox() {
  const loggedInUser = useContext(userContext);
  const { error, loading, data } = useQuery(GET_USER_CONVERSATIONS);
  const [conversations, setConversations] = useState([]);
  console.log("CONVERSATION DATA", data);

  useEffect(() => {
    if (data) setConversations(data.getConversations);
  }, [data]);

  return (
    <>
      {conversations.map((conversation, index) =>
        conversation.userA.id != loggedInUser.id ? (
          <ul key={index} className="w-1/4 ">
            <li>
              <div className="flex flex-row items-center justify-start gap-1 border w-full pb-4 pl-2">
                <img
                  className="rounded-full w-12 h-12 mt-2"
                  src={conversation.userB.profile_photo}
                  alt="profile photo"
                />
                <span key={index}>{conversation.userB.name}</span>
              </div>
            </li>
          </ul>
        ) : (
          <ul key={index}>
            <li>
              <span key={index}>{conversation.userA.name}</span>
            </li>
          </ul>
        )
      )}
    </>
  );
}

export default Inbox;
