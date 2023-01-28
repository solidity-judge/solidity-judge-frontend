import React, { useRef } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

import { ProblemSDK } from "@solidity-judge/sdk";
import type { SubmissionResult } from "@solidity-judge/sdk";

import { useAppDispatch } from "redux/hooks";
import { Problem } from "types/Problem";
import { seperateNumber } from "utils/numbers";
import { setSelectedPage } from "redux/slices/selectedPage";
import { setLastProblem } from "redux/slices/lastProblem";
import CodeEditor from "components/CodeEditor/CodeEditor";
import Button from "components/Button/Button";
import { compileCode, getProblem } from "api/problems";
import Switch from "components/Switch/Switch";
import Input from "components/Input/Input";
import WalletLogin from "components/Button/WalletLogin";

import { ReactComponent as LoadingIcon } from "assets/svg/loading.svg";

const defaultProblem: Problem = {
  id: 0,
  address: "",
  author: "",
  timestamp: "",
  title: "",
  block: 0,
  checker: "",
  isWhitelisted: true,
  txHash: "",
  description: "",
  gasLimit: 0,
  inputFormat: [],
  outputFormat: [],
};

export default function ProblemPage() {
  const [activeTab, setActiveTab] = React.useState("problem");
  const [code, setCode] = React.useState("");
  const [problem, setProblem] = React.useState<Problem>(defaultProblem);
  const dispatch = useAppDispatch();
  const params = useParams();
  const problemId = parseInt(params.problemId ? params.problemId : "0");

  useEffect(() => {
    const problemDetail = getProblem(problemId);
    problemDetail.then((data) => {
      setProblem(data);
      dispatch(
        setSelectedPage({
          id: problemId.toString(),
          name: problemId.toString() + " - " + data.title,
        })
      );
      dispatch(
        setLastProblem({
          ...data,
          title: data.id + " - " + data.title,
        })
      );
    });
  }, [dispatch, problemId]);

  const tabs = ["problem", "editor"];
  const switchItems = [
    {
      id: "test",
      name: "Test",
      component: TestPanel({ problem, code }),
    },
    { id: "submit", name: "Submit", component: SubmitPanel({ problem, code }) },
  ];

  return (
    <div className="flex grow flex-col border-t pt-3 gap-3">
      <div className="flex flex-row gap-3">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={
              "text-sm p-1 rounded-md font-medium hover:cursor-pointer" +
              (activeTab === tab
                ? " bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
                : "")
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="flex flex-row grow gap-3">
        {activeTab === "problem" ? (
          <MathJaxContext
            config={{
              tex: {
                inlineMath: [
                  ["$", "$"],
                  ["\\(", "\\)"],
                ],
              },
            }}
          >
            <div className="flex flex-row gap-3 grow">
              <div className="prose max-w-none grow-[2]">
                <MathJax>
                  <ReactMarkdown>{problem.description}</ReactMarkdown>
                </MathJax>
              </div>
              <div className="flex flex-col gap-3 grow">
                <div className="border rounded-md">
                  <div className="text-center p-3 border-b font-medium">
                    Gas limit
                  </div>
                  <div className="text-center p-3 font-bold text-lg">
                    {seperateNumber(problem.gasLimit)}
                  </div>
                </div>
              </div>
            </div>
          </MathJaxContext>
        ) : (
          <div className="flex flex-row grow gap-3">
            <CodeEditor setCode={setCode} problemId={problemId} />
            <div className="flex flex-col gap-3">
              <Switch items={switchItems} defaultSelectedId={"submit"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TestPanel({ problem, code }: { problem: Problem; code: string }) {
  const [{ wallet }] = useConnectWallet();
  const inputs = useRef(problem.inputFormat.map(() => ""));
  const [outputs, setOutputs] = React.useState<string[]>([]);

  useEffect(() => {
    setOutputs(problem.outputFormat);
  }, [problem.outputFormat]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputs.current[index] = event.target.value;
  };

  const handleSubmit = async () => {
    if (!wallet) return;
    const ethersProvider = new ethers.providers.Web3Provider(
      wallet.provider,
      "any"
    );

    const signer = ethersProvider.getSigner();
    const userAddress = await signer.getAddress();

    compileCode(code).then((data) => {
      const sdk = new ProblemSDK(
        {
          inputFormat: problem.inputFormat,
          outputFormat: problem.outputFormat,
          address: problem.address,
        },
        userAddress,
        signer
      );

      sdk.deployAndRunExample(inputs.current, data.bytecode).then((result) => {
        setOutputs(result);
      });
    });
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      <div>
        <div className="font-medium text-center text-sm">Input</div>
        {problem.inputFormat.map((input, index) => (
          <div className="mb-2" key={index}>
            <Input
              type="text"
              placeholder={input}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
      </div>
      <div>
        <div className="font-medium text-center text-sm">Output</div>
        {outputs.map((output, index) => (
          <div className="mb-2" key={index}>
            <Input type="text" placeholder={output} disabled={true} />
          </div>
        ))}
      </div>
      {wallet ? (
        <Button
          text="Run"
          className="text-sm"
          fullWidth={true}
          onClick={handleSubmit}
          disabled={false}
        />
      ) : (
        <WalletLogin />
      )}
    </div>
  );
}

function SubmitPanel({ code, problem }: { problem: Problem; code: string }) {
  const [{ wallet }] = useConnectWallet();
  const [showResult, setShowResult] = React.useState(false);
  const [verdict, setVerdict] = React.useState<SubmissionResult | null>(null);

  const handleSubmit = async () => {
    if (!wallet) return;
    setShowResult(true);
    const ethersProvider = new ethers.providers.Web3Provider(
      wallet.provider,
      "any"
    );

    const signer = ethersProvider.getSigner();
    const userAddress = await signer.getAddress();

    compileCode(code).then((data) => {
      const sdk = new ProblemSDK(
        {
          inputFormat: problem.inputFormat,
          outputFormat: problem.outputFormat,
          address: problem.address,
        },
        userAddress,
        signer
      );

      sdk
        .submitSolution(data.bytecode)
        .then((x) => x.wait())
        .then((result) => {
          console.log(result);
          sdk.parseSubmissionVerdict(result.transactionHash).then((verdict) => {
            setVerdict(verdict);
          });
        })
        .catch((err) => {
          console.log(err);
          setShowResult(false);
        });
    });
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      {showResult && (
        <div
          className={
            "border rounded-md p-3" +
            (verdict
              ? verdict.point === 100
                ? " bg-green-500"
                : " bg-red-500"
              : "")
          }
        >
          {verdict ? (
            <div className="text-center text-sm font-medium">
              Point: {verdict.point}/100
            </div>
          ) : (
            <div className="flex flex-row gap-3 items-center justify-center">
              <LoadingIcon className="animate-spin" width={30} height={30} />
              <div className="flex flex-col text-sm">Waiting result...</div>
            </div>
          )}
        </div>
      )}
      {wallet ? (
        <Button
          text="Submit"
          className="text-sm"
          fullWidth={true}
          onClick={handleSubmit}
        />
      ) : (
        <WalletLogin />
      )}
    </div>
  );
}
