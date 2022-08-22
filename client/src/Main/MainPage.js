import React, { useContext } from "react";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContextProvider";

export const socket = io("http://localhost:8080");

const MainPage = () => {
  const [roomList, setRoomList] = useState();
  const { setCurrentRoomId } = useContext(UserContext);
  const [selectedRoom, setSelRoom] = useState({});

  const joinRoom = async (roomId) => {
    socket.emit("join-room", roomId);
    setCurrentRoomId(roomId);
    try {
      const response = await fetch(`http://localhost:3001/api/room/${roomId}`);
      const resData = await response.json();
      setSelRoom(resData.room); // changing the currRoom
    } catch (err) {
      console.log(err);
    }
  };

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
    <main className="h-screen bg-gray-200">
      <NavBar />
        {roomList && (
          <div className="flex h-[90vh]">
            <SideBar roomList={roomList} joinRoom={joinRoom} />
            <ChatRoom selectedRoom={selectedRoom} />
          </div>
        )}
    </main>
  );
};

export default MainPage;
// export { socket };
