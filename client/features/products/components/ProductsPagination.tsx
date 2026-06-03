"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPages(current: number, total: number) {
  const delta = 1;
  const range: number[] = [];

  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}

export default function ProductsPagination({
  currentPage,
  totalPages,
  onChange,
}: Props) {
  const pages = getPages(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>

        {/* PREV */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              currentPage > 1 && onChange(currentPage - 1)
            }
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

        {/* FIRST PAGE */}
        {pages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>

            {pages[0] > 2 && <span className="px-2">...</span>}
          </>
        )}

        {/* MAIN PAGES */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* LAST PAGE */}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-2">...</span>
            )}

            <PaginationItem>
              <PaginationLink
                onClick={() => onChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* NEXT */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages &&
              onChange(currentPage + 1)
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}