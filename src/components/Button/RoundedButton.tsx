export default function RoundedButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-full border bg-c2 py-2 text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
