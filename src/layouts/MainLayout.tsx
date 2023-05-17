import * as React from "react";

import { useNavigate } from "react-router-dom";

import { ReactComponent as QuestionIcon } from "assets/svg/question.svg";
import { ReactComponent as ProblemsIcon } from "assets/svg/problems.svg";
import { ReactComponent as SolidityIcon } from "assets/svg/solidity.svg";
import { ReactComponent as RankingIcon } from "assets/svg/ranking.svg";

import PageLayout from "layouts/PageLayout";

import WalletLogin from "components/Button/WalletLogin";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { setSelectedPage } from "redux/slices/selectedPage";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectedPage = useAppSelector((state) => state.selectedPage);
  const lastProblem = useAppSelector((state) => state.lastProblem);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pages = [
    {
      id: "problems",
      name: "Problems",
      icon: ProblemsIcon,
      href: "/problems",
    },
    {
      id: "ranking",
      name: "Ranking",
      icon: RankingIcon,
      href: "/ranking",
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
    <div className="flex h-screen flex-col bg-slate-500">
      <div className="flex h-24 w-screen border-b border-gray-100 bg-white">
        <div className="flex h-24 flex-row justify-center">
          <div className="flex items-center">
            <SolidityIcon width={60} />
            <span className="text-lg font-bold">SOLIDITY JUDGE</span>
          </div>
        </div>
        <div className="flex grow p-6">
          <div className="flex gap-6">
            {pages.map((page) => (
              <div
                key={page.name}
                className={
                  "flex h-12 flex-row gap-2 rounded-full px-6 font-medium transition-all hover:cursor-pointer" +
                  (selectedPage.id === page.id ? " bg-c1" : " hover:bg-c1")
                }
                onClick={() => handlePageClick(page.id, page.name, page.href)}
              >
                <div className="flex items-center">
                  {<page.icon height={30} width={30} />}
                </div>
                <div className="flex items-center">
                  <span>{page.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="mx-12 border-l border-gray-100"></div>
            <div>
              {lastProblem.id > 0 &&
                [
                  {
                    icon: QuestionIcon,
                    name: lastProblem.title,
                    ...lastProblem,
                  },
                ].map((page) => (
                  <div
                    key={page.name}
                    className={
                      "flex h-12 flex-row gap-2 rounded-full px-6 font-medium transition-all hover:cursor-pointer" +
                      (selectedPage.id === page.id.toString()
                        ? " bg-c1"
                        : " hover:bg-c1")
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
                      {<page.icon height={30} width={30} />}
                    </div>
                    <div className="flex items-center">
                      <span>{page.name}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="ml-auto flex flex-col gap-1">
            <WalletLogin />
            <a
              className="text-center text-xs font-medium text-c3 no-underline"
              href="https://faucet.avax.network/"
              target="_blank"
              rel="noreferrer"
            >
              Get AVAX
            </a>
          </div>
        </div>
      </div>
      <div className="flex grow flex-col gap-1 bg-white">
        <div className="m-8 flex flex-row justify-between">
          <div className="">
            <div>
              <input
                className="h-10 w-96 rounded-full bg-gray-100 pl-4"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <PageLayout pageName={selectedPage.name}>{children}</PageLayout>
      </div>
    </div>
  );
}
