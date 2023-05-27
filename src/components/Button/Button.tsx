export default function Button({
  children,
  fullWidth,
  className,
  disabled = false,
  onClick,
}: {
  children: string;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={
        "rounded-full border px-5 py-2 font-medium hover:bg-indigo-700 hover:text-white" +
        (fullWidth ? " w-full" : "") +
        (className ? " " + className : "")
      }
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
