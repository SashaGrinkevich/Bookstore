import React, { useState } from "react";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { setActivePage } from "../../store/books/bookscards.reducer";
import { getSlice } from "../../store/books/bookscards.selectors";

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
  const { activePage } = useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();

  const pagination = generatePagination(activePage, total);

  const incActivePage = () => {
    if (activePage === total) {
      return;
    } else {
      dispatch(setActivePage(activePage + 1));
    }
  };
  const decActivePage = () => {
    if (activePage === 1) {
      return;
    } else {
      dispatch(setActivePage(activePage - 1));
    }
  };

  return (
    <div className={styles.buttonsContainer}>
      <div>
        <button className={styles.nextAndPrevBut} onClick={decActivePage}>
        </button>
      </div>
      <div className={styles.numbersContainer}>
        {pagination.map((item, index) => (
          <React.Fragment key={index}>
            {typeof item === "number" ? (
              <button
                className={styles.buttons}
                onClick={() => {
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
      <div>
        <button className={styles.nextAndPrevBut} onClick={incActivePage}>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
