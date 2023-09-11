import React from "react";

function ChatArea({ messages, isOpen, currentConversationId }) {
  const allMessages = messages.flatMap((conversation) => conversation.message);

  const messagesToShow = allMessages.filter(
    (message) => message.conversationId === currentConversationId
  );

  let conversations = [];
  messages.map((message, index) => {});
  return (
    <div>
      {isOpen &&
        messagesToShow.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
    </div>
  );
}

export default ChatArea;
