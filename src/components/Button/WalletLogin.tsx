import * as React from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

import Button from "components/Button/Button";
import { PREVIOUSLY_CONNECTED_WALLET_KEY } from "../../constants";
import { WalletState } from "@web3-onboard/core";

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

  const disconnectWallet = (wallet: WalletState) => {
    localStorage.removeItem(PREVIOUSLY_CONNECTED_WALLET_KEY);
    disconnect(wallet!);
  }

  const connectWallet = () => {
    connect().then(newWallets => {
      const walletLabel = JSON.stringify(newWallets.map(wallet => wallet.label));
      localStorage.setItem(
        PREVIOUSLY_CONNECTED_WALLET_KEY,
        walletLabel,
      );
    })
  }

  React.useEffect(() => {
    if (wallet) {
      setButtonText(
        wallet.accounts[0].address.slice(0, 6) +
          "..." +
          wallet.accounts[0].address.slice(-4)
      );
    } else {
      if (connecting) {
        setButtonText("Connecting...");
      } else {
        setButtonText("Connect to Wallet");
      }
    }

    const previouslyConnectedWallets = JSON.parse(
      localStorage.getItem(PREVIOUSLY_CONNECTED_WALLET_KEY) || '[]',
    )
    // Connect to old wallets if available
    if (!wallet && previouslyConnectedWallets.length) {
      connect({ autoSelect: previouslyConnectedWallets[0] });
    }
  }, [wallet, connecting, connect]);

  return (
    <Button
      text={buttonText}
      onClick={() => (wallet ? disconnectWallet(wallet) : connectWallet())}
      fullWidth={true}
      hoverText={wallet ? "Disconnect" : undefined}
    />
  );
}
