import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "redux/hooks";
import { ProblemPreview } from "types/Problem";
import { getContestProblems } from "api/problems";
import ProblemCard from "components/Problem/ProblemCard";
import { setSelectedPage } from "redux/slices/selectedPage";
import { Ranking, Standings } from "types/Contest";
import { getStandings } from "api/contest";
import Pagination from "components/Pagination/Pagination";

export default function ProblemPage() {
  const [activeTab, setActiveTab] = React.useState("problems");
  const [problems, setProblems] = React.useState<ProblemPreview[]>([]);
  const [standings, setStandings] = React.useState<Standings>({
    total: 0,
    ranking: [],
  });
  const dispatch = useAppDispatch();
  const params = useParams();
  const contestId = parseInt(params.contestId ? params.contestId : "0");
  const currentPage = 1;
  const tabs = ["problems", "standings"];

  useEffect(() => {
    const problems = getContestProblems(contestId);
    problems.then((data) => {
      setProblems(data.problems);
      dispatch(
        setSelectedPage({
          id: contestId.toString(),
          name: "Contest",
        })
      );
    });

    const standings = getStandings(contestId, 0);
    standings.then((data) => {
      setStandings(data);
    })
  }, [dispatch, contestId]);

  return (
    <div className="flex grow flex-col gap-3 border-t pt-3">
      <div className="flex flex-row gap-3">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={
              "rounded-md p-1 text-sm font-medium hover:cursor-pointer" +
              (activeTab === tab
                ? " bg-indigo-500 text-white shadow-lg shadow-indigo-500/50"
                : "")
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="flex grow-[3] flex-col">
        <div className="flex flex-col gap-3">
          {activeTab === "problems" && (
            <>
              {problems?.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </>
          )}
          {activeTab === 'standings' && (
            <div className="flex grow flex-col rounded-md border p-3">
            <div className="flex flex-row">
              <span className="w-6 text-center font-bold">#</span>
              <span className="grow text-center font-bold">User</span>
              <span className="w-24 text-center font-bold">Points</span>
              <span className="w-32 text-center font-bold">Problem solved</span>
            </div>
            <div className="my-1 border-b"></div>
            <div className="flex flex-col gap-1">
              {standings.ranking.map((user, idx) => (
                <UserTag
                  key={idx}
                  userObject={user}
                  rank={(currentPage - 1) * 10 + idx + 1}
                  className="even:bg-gray-50"
                />
              ))}
            </div>
            <div className="my-3">
              <Pagination
                totalItems={standings.total}
                currentPage={currentPage}
                onSelectPage={() => {}}
              />
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UserTag({
  userObject,
  rank,
  className,
}: {
  userObject: Ranking;
  rank: number;
  className: string;
}) {
  const shortenAddress = (address: string) => {
    return address.slice(0, 7) +
    "..." +
    address.slice(-5);
  }

  return (
    <div
      className={
        "flex-rowrounded-md group flex py-1 hover:cursor-pointer hover:bg-c1 " +
        className
      }
    >
      <div className="flex w-6 flex-col justify-center">
        <span className="text-center group-hover:font-medium">{rank}</span>
      </div>
      <div className="flex grow flex-col gap-1">
        <span className="text-center group-hover:font-medium">
          <a
            target="_blank"
            href={"https://testnet.snowtrace.io/address/" + userObject.contestant}
            rel="noopener noreferrer"
          >
            {shortenAddress(userObject.contestant)}
          </a>
        </span>
      </div>
      <div className="flex w-24 flex-col justify-center">
        <span className="text-center group-hover:font-medium">
          {userObject.totalPoints}
        </span>
      </div>
      <div className="flex w-32 flex-col justify-center">
        <span className="text-center group-hover:font-medium">
          {userObject.submissions.filter(sub => sub !== null).length}
        </span>
      </div>
    </div>
  );
}
