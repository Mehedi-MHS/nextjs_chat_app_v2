"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MyMessege from "@/components/chat/myMessege";
import FriendsMessege from "@/components/chat/FriendsMessege";

export default function HOME() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [newMessege, setNewMessege] = useState([]);
  const [text, setText] = useState("");
  const [myId, setMyId] = useState("");
  const [roomId, setRoomID] = useState("");
  /*
  instead of using multiple state variable, you can use one state object.
  const [config, setConfig] = useState({
    connected: false,
    socket: null,
    newMessege: [],
    text: "",
    myId: "",
    roomName: "",
  });
  */

  useEffect(() => {
    const newSocket = io(undefined, {
      path: "/api/socket/socketConfig",
    });

    newSocket.on("connect", () => {
      // Socket is connected or not
      setConnected(newSocket.connected); //returns boolean value, handles disconnecte
      setMyId(newSocket.id);
    });

    newSocket.on("serverMessege", (data) => {
      console.log(JSON.stringify(data));
      console.log("newSocket.id:", newSocket.id);
      setMyId(newSocket.id ? newSocket.id : data.id);
      setNewMessege((prev) => [...prev, data]);
    });

    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  //handleSend
  const handleSend = () => {
    if (socket && text) {
      setNewMessege((prevMesseges) => [
        ...prevMesseges,
        { id: socket.id, data: text },
      ]);
      socket.emit("clientMessege", text);
      setText("");
    } else {
      alert("either text or socket is not defined");
    }
  };
  //handleJoinRoom
  const handleJoinRoom = () => {
    if (socket && roomId) {
      socket.emit("joinRoom", roomId);
    } else {
      alert(socket ? "roomID missing" : "socket undefined");
    }
  };

  return (
    <>
      <h1 className=" mx-auto mt-5 ">
        {connected ? (
          <span className="bg-white inline-block shadow-sm rounded-sm text-green-600 font-extrabold">
            Server Connected
          </span>
        ) : (
          <span className="bg-white inline-block shadow-sm rounded-sm text-red-600 font-extrabold">
            Connecting server...
          </span>
        )}
      </h1>
      <h1>MY ID: {myId}</h1>
      <br />
      <ul className="flex flex-col gap-2 pb-[20vh]">
        {newMessege.map((messege, index) =>
          messege.id == myId ? (
            <li key={index}>
              {" "}
              <MyMessege userID={messege.id} data={messege.data} />
            </li>
          ) : (
            <li key={index}>
              {" "}
              <FriendsMessege userID={messege.id} data={messege.data} />
            </li>
          )
        )}
      </ul>
      <div className="p-3 rounded-md border bg-slate-300 grid grid-cols-3 grid-rows-2 gap-4 fixed bottom-0 left-0 right-0">
        <input
          type="text"
          value={text}
          className="p-2 rounded-sm col-span-2 text-2xl border w-full"
          placeholder="Type messege.."
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className=" w-full p-2 bg-blue-700 text-white font-blod"
          type="submit"
          onClick={handleSend}
        >
          Send
        </button>
        <input
          type="text"
          value={roomId}
          className="p-2 col-span-2 rounded-sm  text-2xl border w-full"
          placeholder="Room ID..."
          onChange={(e) => setRoomID(e.target.value)}
        />
        <button
          className=" w-full p-2 bg-green-700 text-white font-blod"
          type="submit"
          onClick={handleJoinRoom}
        >
          Join
        </button>
      </div>
    </>
  );
}
