import { getUsers } from "api/users";
import Pagination from "components/Pagination/Pagination";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { setSelectedPage } from "redux/slices/selectedPage";

type UserObject = {
  address: string;
  solvedCount: number;
  submissionsCount: number;
  username: string;
};

type UsersObject = {
  total: number;
  users: UserObject[];
};

export default function RankingPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setSelectedPage({ id: "ranking", name: "Ranking" }));
  }, [dispatch]);

  const [users, setUsers] = React.useState<UsersObject>({
    total: 0,
    users: [],
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="flex grow">
      <div className="flex grow flex-col rounded-md border p-3">
        <div className="flex flex-row">
          <span className="w-6 text-center font-bold">#</span>
          <span className="grow text-center font-bold">User</span>
          <span className="w-24 text-center font-bold">Solved</span>
          <span className="w-32 text-center font-bold">Submissions</span>
        </div>
        <div className="my-1 border-b"></div>
        <div className="flex flex-col gap-1">
          {users.users.map((user, idx) => (
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
            totalItems={users.total}
            currentPage={currentPage}
            onSelectPage={setCurrentPage}
          />
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
  userObject: UserObject;
  rank: number;
  className: string;
}) {
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
          {userObject.username}
        </span>
        <span className="text-center text-sm text-gray-400">
          <a
            target="_blank"
            href={"https://testnet.snowtrace.io/address/" + userObject.address}
            rel="noopener noreferrer"
          >
            {userObject.address.slice(0, 7) +
              "..." +
              userObject.address.slice(-5)}
          </a>
        </span>
      </div>
      <div className="flex w-24 flex-col justify-center">
        <span className="text-center group-hover:font-medium">
          {userObject.solvedCount}
        </span>
      </div>
      <div className="flex w-32 flex-col justify-center">
        <span className="text-center group-hover:font-medium">
          {userObject.submissionsCount}
        </span>
      </div>
    </div>
  );
}
