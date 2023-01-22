export default function PageLayout({
  children,
  pageName,
}: {
  children: React.ReactNode;
  pageName: string;
}) {
  return (
    <div className="flex flex-col gap-3 grow mx-8">
      <h1 className="text-3xl font-bold">{pageName}</h1>
      <div className="flex grow">{children}</div>
    </div>
  );
}
