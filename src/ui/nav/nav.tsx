"use client";
import { useState } from "react";
import Header from "./header";
import SideBarLeft from "./side-bar-left";
import SideBarRight from "./side-bar-right";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSidebarRight, setShowSidebarRight] = useState(false);

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleSideBarRight = () => {
    setShowSidebarRight(!showSidebarRight);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex h-full w-full">
        {showSidebar && <SideBarLeft toggle={toggleSideBar}/>}
        <div className="flex flex-col h-full max-h-full overflow-hidden w-full">
          <Header 
            toggleLeft={toggleSideBar}
            toggleRight={toggleSideBarRight}
            left={showSidebar}
            right={showSidebarRight}
          />
          {children}
        </div>
        {showSidebarRight && <SideBarRight toggle={toggleSideBarRight}/>}
      </div>
    </div>
  );
}
