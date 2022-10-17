import logo from "./logo.svg";
import "./App.css";
import { subscribe, sendMessage } from "./supabaseClient";
import React, { useEffect, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";

function App() {
  const [response, setResponse] = useState<any>();
  const [message, setMessage] = useState<string>();

  const sub = () => {
    subscribe("room1", "message", (payload) => {
      setResponse(payload.message);
      console.log("Message received");
    });
  };

  const sendMsg = () => {
    sendMessage(message);
    console.log("Message Sent");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {}, [response]);

  return (
    <div className="">
      <button onClick={sub}>Subscribe</button>
      <input
        type={"text"}
        name={"messageInput"}
        onChange={handleChange}
      ></input>
      <button onClick={sendMsg}>Listen</button>
      <div>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
