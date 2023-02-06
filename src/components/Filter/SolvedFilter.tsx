export default function SolvedFilter({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col rounded-md border">
      <div className="border-b px-3 py-2 font-medium">FILTER PROBLEMS</div>
      <div className="flex flex-col gap-3 py-3 px-5">
        <div className="flex flex-row gap-3">
          <input type="checkbox" onChange={onChange} checked={value} />
          <label>Hide solved problems</label>
        </div>
      </div>
    </div>
  );
}
