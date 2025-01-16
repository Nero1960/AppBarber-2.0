import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationComponentProps) => {
  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            className={`${
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            } bg-transparent text-Primary-500 hover:bg-transparent hover:text-Primary-500 cursor-pointer`}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              type="button"
              onClick={() => onPageChange(i + 1)}
              isActive={currentPage === i + 1}
              className={`${
                currentPage === i + 1
                  ? "bg-[#D6A354] text-[#0F0F0F]"
                  : "bg-transparent text-[#D6A354]"
              } border-[#D6A354] hover:bg-[#D6A354] hover:text-white-500 cursor-pointer`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            className={`${
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            } bg-transparent text-Primary-500 hover:bg-transparent hover:text-Primary-500 cursor-pointer`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
