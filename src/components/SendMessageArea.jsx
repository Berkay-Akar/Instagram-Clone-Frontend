import { useMutation, useSubscription } from "@apollo/client";
import { useState } from "react";
import { SEND_MESSAGE } from "../graphql/mutations";
// import { NEW_MESSAGE_SUBSCRIPTION } from "../graphql/subscription";

function SendMessageArea({ currentConversation }) {
  const [message, setMessage] = useState({
    content: "",
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const receiverId = currentConversation.userB.id;
  // const { data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
  //   variables: { conversationId: currentConversation.id },
  // });
  console.log("receiverId", receiverId);

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    if (message.content.trim() === "") {
      return;
    }

    try {
      await sendMessage({
        variables: {
          content: message.content,
          receiverId: receiverId,
        },
      });

      // if (data && data.sendMessage) {
      //   const sentMessage = data.sendMessage;
      // }

      setMessage({ content: "" });
    } catch (error) {
      console.error("@sendMessage", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(message.content);
    try {
      sendMessage({
        variables: {
          content: message.content,
          receiverId: receiverId,
        },
      });
    } catch (error) {
      console.error("@sendMessage", error);
    }
  };
  return (
    <label className="flex flex-row  items-center justify-start border fixed right-0 bottom-0 p-4  max-h-3/4 w-8/12">
      <textarea
        className="w-full  h-20  "
        placeholder="Write Your Message.."
        name="content"
        value={message.content}
        onChange={handleChange}
      />
      <button
        className={`bg-blue-500 text-white rounded-lg p-2 ${
          message.content.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSend}
        disabled={message.content.trim() === ""}
      >
        Send
      </button>
    </label>
  );
}

export default SendMessageArea;
