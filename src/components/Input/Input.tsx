export default function Input({
  placeholder,
  type,
  children,
}: {
  placeholder: string;
  type: string;
  children?: React.ReactNode;
}) {
  return (
    <input
      className="rounded-md pl-4 h-12 bg-gray-100"
      placeholder={placeholder}
      type={type}
    />
  );
}
