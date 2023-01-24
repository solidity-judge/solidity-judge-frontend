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
import { getProblem } from "api/problems";

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
      dispatch(setLastProblem(data));
    });
  }, [dispatch, problemId]);

  const tabs = ["problem", "editor"];

  const handleTest = () => {
    console.log(code);
  };

  const handleSubmit = () => {
    console.log(code);
  };

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
          <div className="flex flex-col grow gap-3">
            <CodeEditor setCode={setCode} />
            <div className="flex flex-row gap-3 mb-3 justify-end">
              <Button text="Test" onClick={handleTest} />
              <Button text="Submit" onClick={handleSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
