import * as React from "react";

import Modal from "components/Modal/Modal";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import WalletLogin from "components/Button/WalletLogin";

export default function LoginModal({
  handleModalClose,
}: {
  handleModalClose: () => void;
}) {
  const [selectedTab, setSelectedTab] = React.useState("User");

  const roles = ["User", "Admin"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal handleModalClose={handleModalClose}>
      <div className="flex flex-col gap-6 grow">
        <div className="flex flex-row">
          {roles.map((role) => (
            <div
              key={role}
              className={
                "border p-2 font-medium w-24 text-center hover:cursor-pointer" +
                (role === "User" ? " rounded-l-full" : " rounded-r-full") +
                (role === selectedTab ? "" : " bg-gray-200")
              }
              onClick={() => setSelectedTab(role)}
            >
              {role}
            </div>
          ))}
        </div>
        <div className="flex flex-row mt-8">
          {selectedTab === "User" ? (
            <WalletLogin />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input placeholder="Username" type="text" />
              </div>
              <div className="mb-3">
                <Input placeholder="Password" type="password" />
              </div>
              <Button text="Login" onClick={() => null} fullWidth={true} />
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}
