export default function PageLayout({
  children,
  pageName,
}: {
  children: React.ReactNode;
  pageName: string;
}) {
  return (
    <div className="mx-8 flex grow flex-col gap-3">
      <h1 className="text-3xl font-bold">{pageName}</h1>
      <div className="mb-6 flex grow">{children}</div>
    </div>
  );
}
