import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-solidity";

function getStorageKey(problemId: number) {
  return `soju-code-${problemId}`;
}

export default function CodeEditor({ setCode, problemId }: { setCode: (code: string) => void; problemId: number }) {
  console.log("problemId", problemId);

  function onSave(source: string) {
    const key = getStorageKey(problemId);
    localStorage.setItem(key, source);
  }

  const code = localStorage.getItem(getStorageKey(problemId)) ?? templateCode;

  return (
    <div className="w-full h-full border">
      <AceEditor
        mode="solidity"
        width="100%"
        height="100%"
        onChange={(code) => setCode(code)}
        defaultValue={code}
        commands={[
          {
            name: "save",
            bindKey: {
              win: "Ctrl-S",
              mac: "Cmd-S",
            },
            exec: (editor) => onSave(editor.getValue()),
          },
        ]}
      />
    </div>
  );
}

const templateCode = `pragma solidity ^0.8.17;

contract Solution {
    function execute(bytes memory input) external returns (bytes memory) {

    }
}`;
