import { useMutation } from "@apollo/client";
import React from "react";
import { GET_CONVERSATION_MESSAGE } from "../graphql/mutations";

function ChatArea({ messages, isOpen }) {
  const { getConversationMessage } = useMutation(GET_CONVERSATION_MESSAGE);
  {
    messages.map((message, index) => {
      console.log("message", message.message[index].conversationId);
    });
  }

  const handleConversationMessage = async (conversationId) => {
    const conversation = messages.find(
      (conversation) => conversation.id === conversationId
    );
    try {
      await getConversationMessage({
        variables: {
          conversationId: conversationId,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      {messages.map((message) => (
        <span key={message.id}>{message?.content}</span>
      ))}
    </div>
  );
}

export default ChatArea;
