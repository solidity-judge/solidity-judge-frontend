import AceEditor from "react-ace";

export default function CodeEditor({
  setCode,
}: {
  setCode: (code: string) => void;
}) {
  return (
    <AceEditor width="100%" height="100%" onChange={(code) => setCode(code)} />
  );
}
