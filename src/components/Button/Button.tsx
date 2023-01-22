import React, { useEffect } from "react";

export default function Button({
  text,
  fullWidth,
  className,
  hoverText,
  onClick,
}: {
  text: string;
  fullWidth?: boolean;
  className?: string;
  hoverText?: string;
  onClick: () => void;
}) {
  const [buttonText, setButtonText] = React.useState(text);

  useEffect(() => {
    setButtonText(text);
  }, [text]);

  return (
    <button
      className={
        "rounded-full border py-2 px-5 font-medium hover:bg-indigo-700 hover:text-white" +
        (fullWidth ? " w-full" : "") +
        (className ? " " + className : "")
      }
      onClick={() => onClick()}
      onMouseEnter={() => hoverText && setButtonText(hoverText)}
      onMouseLeave={() => hoverText && setButtonText(text)}
    >
      {buttonText}
    </button>
  );
}
