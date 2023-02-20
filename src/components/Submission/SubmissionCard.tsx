import { SubmissionPreview } from "types/Submission";

export default function SubmissionCard({
  submission,
}: {
  submission: SubmissionPreview;
}) {
  submission.timestamp = new Date(submission.timestamp).toLocaleString();
  return (
    <div
      className={
        "flex flex-row justify-between gap-3 rounded-md border p-3 hover:cursor-pointer hover:border-c4 " +
        (submission.point === 10000
          ? "bg-green-300 hover:bg-green-400"
          : submission.point > 5000
          ? "bg-orange-300 hover:bg-orange-400"
          : "bg-red-300 hover:bg-red-400")
      }
    >
      <div className="flex flex-col justify-center gap-1">
        <span className="text-center text-sm">Block</span>
        <span className="text-sm font-medium">{submission.block}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-center text-sm">Time</span>
        <span className="text-sm font-medium">{submission.timestamp}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-center text-sm">txHash</span>
        <span className="text-sm font-medium">
          {shortenAddress(submission.txHash)}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-center text-sm">Version</span>
        <span className="text-center text-sm font-medium">
          {submission.version}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-center text-sm">User</span>
        <span className="text-sm font-medium">
          {shortenAddress(submission.user)}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-center text-sm">Point</span>
        <span className="text-center text-sm font-medium">
          {Math.floor(submission.point / 100)}
        </span>
      </div>
    </div>
  );
}

function shortenAddress(address: string) {
  return address.slice(0, 5) + "..." + address.slice(-5);
}
