import React from "react";

import { ethers } from "ethers";
import { UserSdk } from "@solidity-judge/sdk";
import { useConnectWallet } from "@web3-onboard/react";

import Modal from "components/Modal/Modal";
import RoundedButton from "components/Button/RoundedButton";
import { useAppDispatch } from "redux/hooks";
import { closeModal } from "redux/slices/modal";

export default function RegisterModal() {
  const [username, setUsername] = React.useState("");
  const [{ wallet }] = useConnectWallet();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (wallet) {
      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );

      const signer = ethersProvider.getSigner();
      const userSdk = new UserSdk(signer);
      userSdk
        .register(username)
        .then((tx) => tx.wait())
        .then(() => {
          dispatch(closeModal());
        });
    }
  };

  return (
    <Modal disableClose={true}>
      <div className="my-3">
        <div className="text-center text-2xl font-medium">
          REGISTER YOUR USERNAME
        </div>
        <span className="text-center text-sm text-red-500">
          Your username can not be changed after the first set
        </span>
      </div>
      <div className="my-auto flex flex-col gap-2">
        <span className="text-center text-sm font-medium">Username</span>
        <input
          className="h-8 rounded-full border-2 border-c4 px-3 text-center"
          onChange={(e) => setUsername(e.target.value)}
        />
        <RoundedButton onClick={handleSave}>Save</RoundedButton>
      </div>
    </Modal>
  );
}
