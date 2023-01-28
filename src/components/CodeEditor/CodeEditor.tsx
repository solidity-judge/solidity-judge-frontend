import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-solidity";

function getStorageKey(problemId: number) {
  return `soju-code-${problemId}`;
}

export default function CodeEditor({ setCode, problemId }: { setCode: (code: string) => void; problemId: number }) {
  function onSave(source: string) {
    const key = getStorageKey(problemId);
    localStorage.setItem(key, source);
  }

  const defaultCode = localStorage.getItem(getStorageKey(problemId)) ?? templateCode;

  const setCodeAndSave = (code: string) => {
    setCode(code);
    onSave(code);
  };

  return (
    <div className="w-full h-full border">
      <AceEditor
        mode="solidity"
        width="100%"
        height="100%"
        onLoad={() => setCode(defaultCode)}
        onChange={(code) => setCodeAndSave(code)}
        defaultValue={defaultCode}
      />
    </div>
  );
}

const templateCode = `pragma solidity ^0.8.17;

contract Solution {
    function execute(bytes memory input) external returns (bytes memory) {

    }
}`;
