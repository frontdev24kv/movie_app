export const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const range = 3;
  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);
  const pages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
  return (
    <div className="flex justify-center mt-4 flex-wrap gap-1">
      <button
        className="btn"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        &larr;
      </button>
      {start > 1 && <button className="btn btn-disabled">...</button>}
      {pages.map((page) => (
        <button
          key={page}
          className={`btn ${page === currentPage ? 'btn-primary' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      {end < totalPages && <button className="btn btn-disabled">...</button>}
      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        &rarr;
      </button>
    </div>
  );
};
