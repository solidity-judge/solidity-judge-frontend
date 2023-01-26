export default function Input({
  placeholder,
  type,
  disabled = false,
  onChange = () => {},
}: {
  placeholder: string;
  type: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className="rounded-md pl-4 h-8 w-full bg-gray-100"
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
