import * as React from "react";

import { useNavigate } from "react-router-dom";

import { ReactComponent as BellIcon } from "assets/svg/bell.svg";
import { ReactComponent as SettingsIcon } from "assets/svg/settings.svg";
import { ReactComponent as SolidityIcon } from "assets/svg/solidity.svg";

import PageLayout from "layouts/PageLayout";

import WalletLogin from "components/Button/WalletLogin";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { setSelectedPage } from "redux/slices/selectedPage";

export default function MainLayout({
  children,
  handleModalOpen,
  handleModalClose,
}: {
  children: React.ReactNode;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}) {
  const selectedPage = useAppSelector((state) => state.selectedPage);
  const lastProblem = useAppSelector((state) => state.lastProblem);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pages = [
    { id: "home", name: "Home", icon: SettingsIcon, href: "/" },
    {
      id: "problems",
      name: "Problems",
      icon: SettingsIcon,
      href: "/problems",
    },
    {
      id: "contests",
      name: "Contests",
      icon: SettingsIcon,
      href: "/contests",
    },
    {
      id: "messages",
      name: "Messages",
      icon: SettingsIcon,
      href: "/messages",
    },
    {
      id: "settings",
      name: "Settings",
      icon: SettingsIcon,
      href: "/settings",
    },
  ];

  const handlePageClick = (id: string, page: string, href: string) => {
    dispatch(
      setSelectedPage({
        id: id,
        name: page,
      })
    );
    navigate(href);
  };

  return (
    <div className="bg-slate-500 flex flex-row h-screen">
      <div className="fixed h-screen bg-white w-64 border-r-2 border-gray-200">
        <div className="flex flex-row justify-center h-24">
          <div className="flex items-center">
            <SolidityIcon width={60} />
            <span className="font-bold text-lg">SOLIDITY JUDGE</span>
          </div>
        </div>
        <div className="flex flex-col gap-6 px-6">
          {pages.map((page) => (
            <div
              key={page.name}
              className={
                "flex flex-row h-12 gap-2 px-3 hover:cursor-pointer rounded-3xl font-medium transition-all duration-300" +
                (selectedPage.id === page.id
                  ? " bg-indigo-700 text-white"
                  : " hover:bg-slate-300")
              }
              onClick={() => handlePageClick(page.id, page.name, page.href)}
            >
              <div className="flex items-center">
                {
                  <page.icon
                    height={30}
                    width={30}
                    className={
                      selectedPage.id === page.id ? "[&>path]:stroke-white" : ""
                    }
                  />
                }
              </div>
              <div className="flex items-center">
                <span>{page.name}</span>
              </div>
            </div>
          ))}
          <div className="border-b border-gray-400"></div>
          {lastProblem.id > 0 &&
            [
              { icon: SettingsIcon, name: lastProblem.title, ...lastProblem },
            ].map((page) => (
              <div
                key={page.name}
                className={
                  "flex flex-row h-12 gap-2 px-3 hover:cursor-pointer rounded-3xl font-medium transition-all duration-300" +
                  (selectedPage.id === page.id.toString()
                    ? " bg-indigo-700 text-white"
                    : " hover:bg-slate-300")
                }
                onClick={() =>
                  handlePageClick(
                    page.id.toString(),
                    page.name,
                    "/problems/" + page.id
                  )
                }
              >
                <div className="flex items-center">
                  {
                    <page.icon
                      height={30}
                      width={30}
                      className={
                        selectedPage.id === page.id.toString()
                          ? "[&>path]:stroke-white"
                          : ""
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
      <div className="ml-64 flex flex-col grow gap-1 bg-white">
        <div className="flex flex-row justify-between m-8">
          <div className="">
            <div>
              <input
                className="rounded-full pl-4 h-10 w-96 bg-gray-100"
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
              <WalletLogin />
            </div>
          </div>
        </div>
        <PageLayout pageName={selectedPage.name}>{children}</PageLayout>
      </div>
    </div>
  );
}
