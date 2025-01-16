import { useState } from "react";

type UsePaginationProps = {
  initialPage?: number;
  totalPages: number;
};

export const usePagination = ({ initialPage = 1, totalPages }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(() => Math.min(Math.max(page, 1), totalPages));
  };

  return {
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
};
