import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-solidity";

export default function CodeEditor({
  setCode,
}: {
  setCode: (code: string) => void;
}) {
  return (
    <div className="w-full h-full border">
      <AceEditor
        mode="solidity"
        width="100%"
        height="100%"
        onChange={(code) => setCode(code)}
      />
    </div>
  );
}
