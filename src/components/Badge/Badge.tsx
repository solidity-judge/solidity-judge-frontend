export default function Badge({ text }: { text: string }) {
  return (
    <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
      {text}
    </span>
  );
}
