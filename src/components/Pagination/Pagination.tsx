import React, { useState } from "react";
import styles from "./Pagination.module.css";
import prev from "./img/icon-prev.png";
import next from "./img/icon-next.png";
import clsx from "clsx";

interface PaginationProps {
  page?: number;
  onClick?: (page: number) => void;
  pages: number;
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

const Pagination: React.FC<PaginationProps> = ({ page, pages, onClick }) => {
  const [activePage, setActivePage] = useState(page ?? 1);

  const pagination = generatePagination(activePage, pages);

  // const handlePageClick = (newPage: number) => {
  //   if (onClick) {
  //     onClick(newPage);
  //   }
  //   setActivePage(newPage);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <div>
      <div>
        {/* <button
          className={clsx(styles.paginationArrow, styles.arrowsNone)}
          onClick={() => handlePageClick(activePage - 1)}
          disabled={activePage === 1}
        >
          <img src={prev} />
          <p className={styles.prev}>Prev</p>
        </button> */}
        <div className={styles.numbersWrapper}></div>
        {pagination.map((item, index) => (
          <React.Fragment key={index}>
            {typeof item === "number" ? (
              <button
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
      {/* <button
        className={clsx(styles.paginationArrow, styles.arrowsNone)}
        onClick={() => handlePageClick(activePage + 1)}
        disabled={activePage === pages}
      >
        <p className={styles.prev}>Next</p>
        <img src={next} />
      </button> */}
    </div>
  );
};

export default Pagination;
