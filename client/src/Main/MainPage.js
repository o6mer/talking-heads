import React from "react";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8080");

const MainPage = () => {
  const roomId = useParams().roomId;
  console.log(roomId);
  const [roomList, setRoomList] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/room`); // using "getAllRooms" from the API
        const resData = await response.json(); //resData.roomList is the roomList (ofc)
        setRoomList(resData.roomList);
      } catch (error) {
        console.log(error);
      }
    };
    sendRequest(); // calling the func above
  }, []);
  return (
    <main className="h-screen">
      <NavBar />
      {roomList && (
        <div className="flex h-[90vh]">
          <SideBar roomList={roomList} />
          <ChatRoom roomId={roomId} roomList={roomList} />
        </div>
      )}
    </main>
  );
};

export default MainPage;
// export { socket };
