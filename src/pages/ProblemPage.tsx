import { useParams } from "react-router-dom";
import { ProblemDetail } from "types/Problem";

import { useAppDispatch } from "redux/hooks";

import { setLastProblem } from "redux/slices/lastProblem";
import { useEffect } from "react";

export default function ProblemPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const problemId = params.problemId;

  useEffect(() => {
    const lastProblem = {
      id: problemId as string,
      name: problemId as string,
      href: `/problems/${problemId}`,
    };
    dispatch(setLastProblem(lastProblem));
  });

  return <>{problemId}</>;
}

const problemDetail = {
  id: "0A",
  title: "A cộng B",
  description: `Cho $2$ số nguyên $A$ và $B$. Hãy tính $A + B$.
  ## Input
  Gồm $1$ dòng chứa $2$ số nguyên $A$ và $B$ $(1 \\le A, B \\le 1000)$, cách bởi $1$ dấu cách.
  ## Output
  Ghi ra tổng $A + B$.
  ## Sample Input 
  \`\`\`
  3 4
  \`\`\`
  ## Sample Output 
  \`\`\`
  7
  \`\`\`
  ## Note
  Gợi ý: Sử dụng toán tử "+".`,
} as ProblemDetail;
