import React, { useEffect } from "react";

export default function Button({
  children,
  fullWidth,
  className,
  hoverText,
  disabled = false,
  onClick,
}: {
  children: string;
  fullWidth?: boolean;
  className?: string;
  hoverText?: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  const [buttonText, setButtonText] = React.useState(children);

  useEffect(() => {
    setButtonText(children);
  }, [children]);

  return (
    <button
      className={
        "rounded-full border py-2 px-5 font-medium hover:bg-indigo-700 hover:text-white" +
        (fullWidth ? " w-full" : "") +
        (className ? " " + className : "")
      }
      onClick={() => onClick()}
      onMouseEnter={() => hoverText && setButtonText(hoverText)}
      onMouseLeave={() => hoverText && setButtonText(children)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
