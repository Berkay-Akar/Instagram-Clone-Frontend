import React, { useContext } from "react";
import { userContext } from "../App";
import SendMessageArea from "./SendMessageArea";

function ChatArea({
  messages,
  isOpen,
  currentConversationId,
  currentConversation,
}) {
  const { user } = useContext(userContext);
  const allMessages = messages.flatMap((conversation) => conversation.message);

  const messagesToShow = allMessages.filter(
    (message) => message.conversationId === currentConversationId
  );

  {
    messagesToShow.map((message) => console.log("message", message));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`fixed right-0 bottom-28 p-4 w-1/4 max-h-3/4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {isOpen &&
          messagesToShow.map((message) => (
            <div
              key={message.id}
              className={`p-2  rounded-lg ${
                message.senderId === user.id
                  ? "bg-blue-500 text-white ml-auto mr-3  w-max "
                  : "bg-gray-200 text-gray-700 self-start w-max "
              }`}
            >
              {message.content}
            </div>
          ))}
      </div>
      <SendMessageArea currentConversation={currentConversation} />
    </div>
  );
}

export default ChatArea;
