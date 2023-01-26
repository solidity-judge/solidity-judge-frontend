import React from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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
    { id: "submit", name: "Submit", component: SubmitPanel({ problem }) },
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
            <CodeEditor setCode={setCode} />
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
  const handleSubmit = () => {
    console.log(code);
    compileCode(code).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      <div>
        <div className="font-medium text-center">Input</div>
        {problem.inputFormat.map((input, index) => (
          <div className="mb-2" key={index}>
            <Input type="text" placeholder={input} />
          </div>
        ))}
      </div>
      <div>
        <div className="font-medium text-center">Output</div>
        {problem.outputFormat.map((output, index) => (
          <div className="mb-2" key={index}>
            <Input type="text" placeholder={output} disabled={true} />
          </div>
        ))}
      </div>
      <Button text="Submit" fullWidth={true} onClick={handleSubmit} />
    </div>
  );
}

function SubmitPanel({ problem }: { problem: Problem }) {
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      <Button text="Submit" fullWidth={true} onClick={handleSubmit} />
    </div>
  );
}
