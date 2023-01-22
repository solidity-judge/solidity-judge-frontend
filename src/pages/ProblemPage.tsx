import { useParams } from "react-router-dom";

export default function ProblemPage() {
  const params = useParams();
  const problemId = params.problemId;

  return <>{problemId}</>;
}
