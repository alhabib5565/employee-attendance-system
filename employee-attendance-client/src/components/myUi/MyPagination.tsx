import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const MyPagination = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [acctivePage, setAcctivePage] = useState(0);

  // pagination
  const totalPage = Math.ceil(9 / itemsPerPage);
  const pageNumbers = [...Array(totalPage).keys()];
  const options = [3, 4, 6];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (event: any) => {
    setItemsPerPage(event.target.value);
    setAcctivePage(0);
  };

  const nextPage = () => {
    const currentActivePage = totalPage - 1 === acctivePage;
    const newPage = currentActivePage ? 0 : acctivePage + 1;
    setAcctivePage(newPage);
  };
  const previousPage = () => {
    const currentActivePage = acctivePage === 0;
    const newPage = currentActivePage ? totalPage - 1 : acctivePage - 1;
    setAcctivePage(newPage);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <Button onClick={previousPage} variant="outline" className="size-8 p-2">
          <ChevronLeft size={20} />
        </Button>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => setAcctivePage(pageNumber)}
            variant={acctivePage === pageNumber ? "default" : "outline"}
            className="size-8 p-2"
          >
            <span className="material-icons text-sm">{pageNumber}</span>
          </Button>
        ))}
        <Button onClick={nextPage} variant="outline" className="size-8 p-2">
          <ChevronRight size={20} />
        </Button>
        <select
          onChange={handleSelectChange}
          className=" px-1 sm:px-2 md:px-3 py-1 bg-gray-200 text-gray-600 border-2  focus:outline-gray-400  rounded-md"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MyPagination;
