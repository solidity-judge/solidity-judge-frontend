import * as React from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

import Button from "components/Button/Button";
import { WalletState } from "@web3-onboard/core";
import { ethers } from "ethers";

import { useAppDispatch, useAppSelector } from "redux/hooks";

import { setPreviousWallet } from "redux/slices/previousWallet";
import { openModal } from "redux/slices/modal";
import { ModalType } from "constants/modal";
import { UserSdk } from "@solidity-judge/sdk";

const injected = injectedModule();

const rpcUrl = "https://rpc.ankr.com/avalanche_fuji";

// initialize Onboard
init({
  wallets: [injected],
  chains: [
    {
      id: "0xA869",
      token: "AVAX",
      label: "Fuji",
      rpcUrl,
    },
  ],
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

export default function WalletLogin() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [buttonText, setButtonText] = React.useState("Connect to Wallet");
  const previousWallet = useAppSelector((state) => state.previousWallet);
  const dispatch = useAppDispatch();

  const disconnectWallet = (wallet: WalletState) => {
    dispatch(setPreviousWallet(""));
    disconnect(wallet!);
  };

  const connectWallet = () => {
    connect().then((newWallets) => {
      const walletLabel = newWallets[0].label;
      dispatch(setPreviousWallet(walletLabel));
    });
  };

  React.useEffect(() => {
    if (wallet) {
      const userAddress = wallet.accounts[0].address;
      setButtonText(userAddress.slice(0, 4) + "..." + userAddress.slice(-4));

      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      const signer = ethersProvider.getSigner();

      const userSdk = new UserSdk(signer);
      userSdk.getUsername(wallet.accounts[0].address).then((username) => {
        if (username === "") {
          dispatch(openModal(ModalType.REGISTER_USER));
        } else {
          setButtonText(username);
        }
      });
    } else {
      if (connecting) {
        setButtonText("Connecting...");
      } else {
        setButtonText("Connect to Wallet");
      }
    }

    // Connect to old wallets if available
    if (!wallet && previousWallet.length) {
      connect({ autoSelect: { label: previousWallet, disableModals: true } });
    }
  }, [wallet, connecting, previousWallet, dispatch, connect]);

  return (
    <Button
      text={buttonText}
      onClick={() => (wallet ? disconnectWallet(wallet) : connectWallet())}
      fullWidth={true}
      hoverText={wallet ? "Disconnect" : undefined}
    />
  );
}
