import { Link } from 'gatsby';
import React from 'react';

type PaginationPostsProps = {
  base: string;
  totalPages: number;
  currentPage: number;
};

export const PaginationPosts = ({ base, currentPage, totalPages }: PaginationPostsProps) => {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className="flex justify-between text-xl items-center">
      {currentPage === 1 ? (
        <span></span>
      ) : (
        <Link rel="prev" to={previousPage === 1 ? '/' : `${base}/${previousPage}`}>
          &larr; Prev
        </Link>
      )}
      <div className="text-base">
        Page {currentPage} of {totalPages}
      </div>
      {currentPage < totalPages ? (
        <Link
          rel="next"
          to={`${base}/${currentPage + 1}`}
          className={currentPage === totalPages ? `text-gray-400 hover:text-gray-400 cursor-not-allowed` : ''}
        >
          Next &rarr;
        </Link>
      ) : (
        <span></span>
      )}
    </nav>
  );
};
