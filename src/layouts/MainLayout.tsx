import * as React from "react";

import { ReactComponent as BellIcon } from "assets/svg/bell.svg";
import { ReactComponent as SettingsIcon } from "assets/svg/settings.svg";

import WalletLogin from "utils/WalletLogin";

export default function MainLayout({
  children,
  handleModalOpen,
  handleModalClose,
}: {
  children: React.ReactNode;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}) {
  const [selectedPage, setSelectedPage] = React.useState("Home");
  const pages = [
    { name: "Home", icon: SettingsIcon, href: "/" },
    {
      name: "Problems",
      icon: SettingsIcon,
      href: "/problems",
    },
    {
      name: "Contests",
      icon: SettingsIcon,
      href: "/contests",
    },
    {
      name: "Messages",
      icon: SettingsIcon,
      href: "/messages",
    },
    {
      name: "Settings",
      icon: SettingsIcon,
      href: "/settings",
    },
  ];

  const handlePageClick = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <div className="bg-slate-500 flex flex-row h-screen">
      <div className="bg-white w-64 border-r-2 border-gray-200">
        <div className="flex flex-row justify-center h-24">
          <div className="flex items-center">
            <span className="font-bold text-lg">SOLIDITY JUDGE</span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {pages.map((page) => (
            <div
              key={page.name}
              className={
                "flex flex-row h-12 gap-2 mx-6 px-3 hover:cursor-pointer rounded-3xl font-medium transition-all duration-300" +
                (selectedPage === page.name
                  ? " bg-indigo-700 text-white"
                  : " hover:bg-slate-300")
              }
              onClick={() => handlePageClick(page.name)}
            >
              <div className="flex items-center">
                {
                  <page.icon
                    height={30}
                    width={30}
                    className={
                      selectedPage === page.name ? "[&>path]:stroke-white" : ""
                    }
                  />
                }
              </div>
              <div className="flex items-center">
                <span>{page.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col grow gap-6 bg-white">
        <div className="flex flex-row justify-between m-8">
          <div className="">
            <div>
              <input
                className="rounded-full pl-4 h-8 w-96 bg-gray-100"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <div className="rounded-full p-2 shadow-lg shadow-gray-200 hover:cursor-pointer hover:bg-indigo-700">
              <BellIcon height={25} width={25} />
            </div>
            <div>
              {/* <Button text="Login" onClick={() => handleModalOpen()} /> */}
              <WalletLogin handleModalClose={handleModalClose} />
            </div>
          </div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
