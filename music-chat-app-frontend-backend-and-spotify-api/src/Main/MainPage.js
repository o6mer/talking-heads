import React from "react";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/General/NavBar";
import ChatRoom from "./Components/ChatRoom/ChatRoom";

const MainPage = () => {
  return (
    <main>
      <NavBar />
      <div className="flex">
        <SideBar />
        <ChatRoom />
      </div>
    </main>
  );
};

export default MainPage;
