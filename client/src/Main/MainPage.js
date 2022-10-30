import React, { useContext } from "react";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { useBeforeunload } from "react-beforeunload";
import useAuth from "../Landing/hooks/useAuth";

export const socket = io("http://localhost:8080", {
  "sync disconnect on unload": true,
});

const MainPage = () => {
  const { relogin } = useAuth();

  const [roomList, setRoomList] = useState();
  const { currentRoomId, setCurrentRoomId, user, darkMode } =
    useContext(UserContext);
  const [selectedRoom, setSelRoom] = useState({});
  const [loadingRoom, setLoadingRoom] = useState(false);
  const { roomId: paramsRoomId } = useParams();

  useEffect(() => {
    relogin();

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

    // socket.on("disconnect", () => {
    //   console.log(socket.id); // undefined
    //   if (!currentRoomId) return;
    //   socket.emit("userDisconnected", currentRoomId, user?._id);
    // });
  }, []);

  useEffect(() => {
    if (!paramsRoomId) return;

    joinRoom(paramsRoomId);
  }, [paramsRoomId]);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   window.addEventListener("unload", handleTabClosing);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //     window.removeEventListener("unload", handleTabClosing);
  //   };
  // });

  // const handleTabClosing = () => {
  //   socket.emit("userDisconnected", currentRoomId, user?._id);
  //   // socket.disconnect();
  // };

  // const alertUser = (event) => {
  //   event.preventDefault();
  //   event.returnValue = "";
  // };

  const joinRoom = async (roomId) => {
    if (!user) return;

    setLoadingRoom(true);
    socket.emit("joinRoom", roomId, user._id, (response) => {
      setCurrentRoomId(roomId);

      if (!response) return;
      setSelRoom(response);
      setLoadingRoom(false);
    });
  };

  socket.on("connect", function () {
    socket.on("disconnect", function () {
      socket.emit("userDisconnected");
    });
  });

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
            selectedRoom={selectedRoom}
            roomList={roomList}
            setRoomList={setRoomList}
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
