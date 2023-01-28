import React, { useRef } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import { ProblemSDK } from "@solidity-judge/sdk";

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
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import WalletLogin from "components/Button/WalletLogin";

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
              <Switch items={switchItems} />
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
        <div className="font-medium text-center">Input</div>
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
        <div className="font-medium text-center">Output</div>
        {outputs.map((output, index) => (
          <div className="mb-2" key={index}>
            <Input type="text" placeholder={output} disabled={true} />
          </div>
        ))}
      </div>
      {wallet ? (
        <Button
          text="Run"
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

      const verdictMapping = {
        0: "Accepted",
        1: "Wrong Answer",
        2: "Revert",
      };

      sdk
        .submitSolution(data.bytecode)
        .then((x) => x.wait())
        .then((result) => {
          console.log(result);
          sdk.parseSubmissionVerdict(result).then((verdict) => {
            console.log(verdict);
            alert(
              "Points: " +
                verdict.point +
                "\n" +
                verdict.verdicts
                  .map((x, i) => `test ${i}: ${verdictMapping[x]}`)
                  .join("\n")
            );
          });
        });
    });
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      {wallet ? (
        <Button text="Submit" fullWidth={true} onClick={handleSubmit} />
      ) : (
        <WalletLogin />
      )}
    </div>
  );
}
