import React, { useContext } from "react";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../Landing/hooks/useAuth";
import errorImage from "../Media/Moai404.jpg";
import MobileActionBar from "./Components/ChatRoom/Components/MobileActionBar";

const MainPage = ({ noRoom }) => {
  const [noRoomState, setNoRoomState] = useState(noRoom);
  const [roomList, setRoomList] = useState();
  const { currentRoomId, setCurrentRoomId, user, darkMode, socket } =
    useContext(UserContext);
  const [selectedRoom, setSelRoom] = useState({});
  const [roomFound, setRoomFound] = useState(undefined);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const { roomId: paramsRoomId } = useParams();
  const [textHeader, setTextHeader] = useState(
    "Please select a room to start chatting"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/room`,
          {
            headers: {
              Authorization: "Bearer " + user?.token,
            },
          }
        ); // using "getAllRooms" from the API
        const resData = await response.json(); //resData.roomList is the roomList (ofc)
        setRoomList(resData.roomList);
      } catch (error) {
        console.log(error);
      }
    };
    sendRequest(); // calling the func above
  }, []);

  const handleTabClosing = (event) => {
    event.preventDefault();
    socket.emit("userDisconnected", user._id, currentRoomId);

    return;
    // event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleTabClosing);
    return () => {
      window.removeEventListener("beforeunload", handleTabClosing);
    };
  }, [currentRoomId]);

  useEffect(() => {
    if (!paramsRoomId) {
      setNoRoomState(true);
      return;
    }
    setNoRoomState(false);
    joinRoom(paramsRoomId);
  }, [paramsRoomId]);

  useEffect(() => {
    if (noRoomState) {
      leaveRoom();
    }
  }, [noRoomState]);

  const joinRoom = async (roomId) => {
    if (!user) return;

    setLoadingRoom(true);
    socket.emit("joinRoom", roomId, user._id, (newRoom, responseMsg) => {
      setLoadingRoom(false);
      if (responseMsg.statusCode === 404 || responseMsg.statusCode === 400) {
        console.error(
          `Status code: ${responseMsg.statusCode}. ${responseMsg.message}.`
        );
        setTextHeader(responseMsg.message); // selected room not found or something
        setRoomFound(false);
        navigate("/main");
      } else {
        setRoomFound(true);
        setSelRoom(newRoom);
        setCurrentRoomId(roomId);
      }
    });
  };

  const leaveRoom = () => {
    if (!currentRoomId) return;
    setCurrentRoomId(undefined);
    setLoadingRoom(true);
    socket.emit("userDisconnected", user._id, currentRoomId);
    setLoadingRoom(false);
  };

  return (
    <main
      className={`flex flex-col h-full max-h-screen w-full grow  ${
        darkMode ? "bg-primaryDark text-white" : "bg-primary text-black"
      } `}
    >
      <NavBar />
      {roomList ? (
        <div className="flex w-full grow shrink basis-auto relative flex-col md:flex-row z-20">
          <MobileActionBar
            roomList={roomList}
            setRoomList={setRoomList}
            selectedRoom={selectedRoom}
            isRoom={roomFound && !noRoomState}
          />
          <SideBar roomList={roomList} setRoomList={setRoomList} />

          {loadingRoom ? (
            <div className="flex w-full h-full justify-center items-center">
              <CircularProgress />
            </div>
          ) : roomFound && !noRoomState ? (
            <ChatRoom selectedRoom={selectedRoom} key={selectedRoom._id} />
          ) : (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <p>{textHeader}</p>
              <img className="w-96" alt="select a room " src={errorImage}></img>
            </div>
          )}
        </div>
      ) : null}
    </main>
  );
};

export default MainPage;
