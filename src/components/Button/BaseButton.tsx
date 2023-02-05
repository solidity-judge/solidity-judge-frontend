export default function BaseButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="rounded-full border py-2 px-5 font-medium hover:bg-c1">
      {children}
    </button>
  );
}
