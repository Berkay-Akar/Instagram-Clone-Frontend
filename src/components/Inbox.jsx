import { useQuery } from "@apollo/client";
import { GET_USER_CONVERSATIONS } from "../graphql/queries";
import { useEffect, useState } from "react";

function Inbox() {
  const { error, loading, data } = useQuery(GET_USER_CONVERSATIONS);
  const [conversations, setConversations] = useState();
  console.log("CONVERSATION DATA", data);

  useEffect(() => {
    if (data) setConversations(data.message);
  }, [data]);
  return <div>Inbox</div>;
}

export default Inbox;
