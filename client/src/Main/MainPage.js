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
  const { setCurrentRoomId, user, darkMode } = useContext(UserContext);
  const [selectedRoom, setSelRoom] = useState({});
  const [loadingRoom, setLoadingRoom] = useState(false);
  const { roomId: paramsRoomId } = useParams();
  // const { relogin } = useAuth();

  useEffect(() => {
    // if (!user) relogin();

    // console.log("on render", user);
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

  // useEffect(() => {
  //   console.log("on user change", user);
  // }, [user]);

  useEffect(() => {
    if (!paramsRoomId) return;

    joinRoom(paramsRoomId);
  }, [paramsRoomId]);

  const joinRoom = async (roomId) => {
    // console.log(user, roomId);

    if (!user) return;

    setLoadingRoom(true);
    socket.emit("joinRoom", roomId, user._id, (response) => {
      setCurrentRoomId(roomId);
      setSelRoom(response);
      setLoadingRoom(false);
    });
  };

  return (
    <main
      className={`h-full max-h-screen w-full ${
        darkMode ? "bg-primaryDark text-white" : "bg-primary text-black"
      } flex flex-col`}
    >
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
