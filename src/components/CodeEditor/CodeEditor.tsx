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

  let lastSavedTimestamp = 0;
  const setCodeAndSave = (code: string) => {
    setCode(code);
    if (Date.now() - lastSavedTimestamp > 1000) {
      onSave(code);
      lastSavedTimestamp = Date.now();
    }
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
