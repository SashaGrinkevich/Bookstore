import React, { useState } from "react";

interface PaginationProps {
  page?: number;
  onClick?: (page: number) => void;
  total: number;
}

const generatePagination = (page: number, total: number) => {
  if (total < 7) {
    return Array.from(Array(total), (_, i) => i + 1);
  }

  if (page < 5) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (page > total - 4) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "...", page - 1, page, page + 1, "...", total];
};

const Pagination: React.FC<PaginationProps> = ({ page, total, onClick }) => {
  const [activePage, setActivePage] = useState(page ?? 1);

  const pagination = generatePagination(activePage, total);

  return (
    <div>
      {pagination.map((item, index) => (
        <React.Fragment key={index}>
          {typeof item === "number" ? (
            <button
              style={{ backgroundColor: item === activePage ? "red" : "white" }}
              onClick={() => {
                setActivePage(item);
                onClick?.(item);
              }}
            >
              {item}
            </button>
          ) : (
            <span>{item}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Pagination;