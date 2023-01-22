export default function SolvedFilter() {
  return (
    <div className="flex flex-col gap-3 border rounded-md">
      <div className="font-medium text-lg border-b p-3">Filter problems</div>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-row gap-3">
          <input type="checkbox" id="solved" name="solved" value="solved" />
          <label htmlFor="solved">Hide solved problems</label>
        </div>
      </div>
    </div>
  );
}
