import * as React from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

import Button from "components/Button/Button";

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

export default function WalletLogin({
  handleModalClose,
}: {
  handleModalClose: () => void;
}) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [buttonText, setButtonText] = React.useState("Connect to Wallet");

  React.useEffect(() => {
    console.log(wallet);
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
  }, [wallet, connecting]);

  return (
    <Button
      text={buttonText}
      onClick={() => (wallet ? disconnect(wallet) : connect())}
      fullWidth={true}
      hoverText={wallet ? "Disconnect" : undefined}
    />
  );
}
