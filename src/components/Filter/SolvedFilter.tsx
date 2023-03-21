export default function SolvedFilter({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-row items-center gap-3">
      <input type="checkbox" onChange={onChange} checked={value} />
      <label>Hide solved problems</label>
    </div>
  );
}
