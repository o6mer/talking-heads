import React, { useContext } from "react";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContextProvider";
import colorConfg from "../colorConfg.json";

export const socket = io("http://localhost:8080");

const MainPage = () => {
  const [roomList, setRoomList] = useState();
  const { currentRoomId, setCurrentRoomId, user } = useContext(UserContext);
  const [selectedRoom, setSelRoom] = useState({});
  const { roomId } = useParams();

  useEffect(() => {
    if (!roomId) return;
    joinRoom(roomId);
  }, []);

  const joinRoom = async (roomId) => {
    if (currentRoomId === roomId) return;

    setCurrentRoomId(roomId);

    try {
      const response = await fetch(
        `http://localhost:3001/api/room/joinRoom/${roomId}`,
        {
          method: "POST",
          body: JSON.stringify({ userId: user._id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      socket.emit("joinRoom", roomId, user._id);
      setSelRoom(resData.room);
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
    <main className={`h-screen bg-primary`}>
      <NavBar />
      {roomList ? (
        <div className="flex h-[90vh]">
          <SideBar
            roomList={roomList}
            setRoomList={setRoomList}
            joinRoom={joinRoom}
          />
          <ChatRoom selectedRoom={selectedRoom} key={selectedRoom._id} />
        </div>
      ) : null}
    </main>
  );
};

export default MainPage;
