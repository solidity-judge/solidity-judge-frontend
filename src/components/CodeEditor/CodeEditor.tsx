import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-solidity";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setSourceCode } from "redux/slices/sourceCode";

export default function CodeEditor({
  setCode,
  problemId,
}: {
  setCode: (code: string) => void;
  problemId: number;
}) {
  const dispatch = useAppDispatch();
  const code = useAppSelector((state) => state.sourceCode[problemId]);

  return (
    <div className="w-full h-full border">
      <AceEditor
        mode="solidity"
        width="100%"
        height="100%"
        onChange={(currentCode) => {
          setCode(currentCode);
          dispatch(
            setSourceCode({
              id: problemId.toString(),
              code: currentCode,
            })
          );
        }}
        defaultValue={code ? code : templateCode}
      />
    </div>
  );
}

const templateCode = `pragma solidity ^0.8.17;

contract Solution {
    function execute(bytes memory input) external returns (bytes memory) {
        
    }
}`;
