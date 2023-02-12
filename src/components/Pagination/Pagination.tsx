export default function Pagination({
  totalItems,
  currentPage,
  onSelectPage,
}: {
  totalItems: number;
  currentPage: number;
  onSelectPage: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / 10);
  const pageNumbers: number[] = []; // [1, 2, ..., current - 2, current - 1, current, current + 1, current + 2, ..., totalPages - 1, totalPages]
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === 2 ||
      i === totalPages - 1 ||
      i === totalPages ||
      Math.abs(i - currentPage) <= 2
    ) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex flex-row justify-center gap-3">
      {pageNumbers.map((page, id) => (
        <div key={page}>
          {id > 1 && pageNumbers[id - 1] + 1 !== page && (
            <span className="text-gray-500">...</span>
          )}
          <button
            onClick={() => onSelectPage(page)}
            className={
              "h-12 w-12 rounded-lg border" +
              (page === currentPage
                ? " bg-c2 text-white"
                : " hover:bg-gray-100")
            }
          >
            {page}
          </button>
        </div>
      ))}
    </div>
  );
}
