import React from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const roomId = useParams().roomId;
  return (
    <main>
      <NavBar />
      <div className="flex">
        <SideBar />
        <ChatRoom roomId={roomId} />
      </div>
    </main>
  );
};

export default MainPage;
