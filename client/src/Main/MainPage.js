import React, { useContext } from "react";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContextProvider";
import useAuth from "../Landing/hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

export const socket = io("http://localhost:8080");

const MainPage = () => {
  const [roomList, setRoomList] = useState();
  const { currentRoomId, setCurrentRoomId, user } = useContext(UserContext);
  const [selectedRoom, setSelRoom] = useState({});
  const [loadingRoom, setLoadingRoom] = useState(false);
  const { roomId: paramsRoomId } = useParams();
  useAuth();

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

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      alert("user disconnected " + user._id);
      socket.emit("userDisconnected", user._id);
    });
  }, []);

  useEffect(() => {
    if (!paramsRoomId) return;

    joinRoom(paramsRoomId);
  }, [paramsRoomId]);

  const joinRoom = async (roomId) => {
    // if (paramsRoomId === roomId) {
    //   setLoadingRoom(true);
    //   const response = await fetch(`http://localhost:3001/api/room/${roomId}`);
    //   const data = await response.json();
    //   setCurrentRoomId(roomId);
    //   setSelRoom(data.room);
    //   setLoadingRoom(false);
    //   return;
    // }

    // if (roomId === paramsRoomId)

    setLoadingRoom(true);
    socket.emit("joinRoom", roomId, user._id, (response) => {
      setCurrentRoomId(roomId);
      setSelRoom(response);
      setLoadingRoom(false);
    });
  };

  return (
    <main className={`h-screen max-h-screen bg-primary flex flex-col`}>
      <NavBar />
      {roomList ? (
        <div className="flex h-[90%] grow shrink basis-auto">
          <SideBar
            roomList={roomList}
            setRoomList={setRoomList}
            joinRoom={joinRoom}
          />

          {loadingRoom ? (
            <div className="flex w-full h-full justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <ChatRoom selectedRoom={selectedRoom} key={selectedRoom._id} />
          )}
        </div>
      ) : null}
    </main>
  );
};

export default MainPage;
