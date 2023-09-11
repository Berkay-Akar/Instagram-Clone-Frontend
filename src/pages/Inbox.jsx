import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CONVERSATIONS } from "../graphql/queries";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import InboxSidebar from "../components/InboxSidebar";
import ChatArea from "../components/ChatArea";
import { GET_CONVERSATION_MESSAGE } from "../graphql/mutations";

function Inbox() {
  const loggedInUser = useContext(userContext);
  const { error, loading, data } = useQuery(GET_USER_CONVERSATIONS);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log("CONVERSATION DATA", data);

  useEffect(() => {
    if (data) setConversations(data.getConversations);
  }, [data]);

  let conversationId = conversations.map((conversation) => {
    console.log(conversation);
  });

  console.log("conversations", conversations);
  const handleOpen = (conversationId) => {
    setIsOpen(true);
    setCurrentConversationId(conversationId);
  };

  console.log("is OPEN", isOpen);

  return (
    <div className="flex flex-row items-start ">
      <InboxSidebar />
      <div className=" mt-20">
        {conversations.map((conversation, index) =>
          conversation.userA.id != loggedInUser.id ? (
            <ul key={index} className="w-[382px]  ">
              <li
                className="cursor-pointer"
                onClick={() => handleOpen(conversation.id)}
              >
                <div className="flex flex-row items-center justify-start gap-1 border  pb-4 pl-2">
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
              <div className="flex flex-row items-center justify-start gap-1 border w-full pb-4 pl-2">
                <img
                  className="rounded-full w-12 h-12 mt-2"
                  src={conversation.userA.profile_photo}
                  alt="profile photo"
                />
                <span key={index}>{conversation.userA.name}</span>
              </div>
            </ul>
          )
        )}
      </div>
      {isOpen && (
        <ChatArea
          messages={conversations}
          isOpen={isOpen}
          currentConversationId={currentConversationId}
        />
      )}
    </div>
  );
}

export default Inbox;
