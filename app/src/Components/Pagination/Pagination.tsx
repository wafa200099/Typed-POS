import { FC } from "react";
import "./Pagination.css";

interface Props {
  totalitems: number;
  paginate: (pageNumber: number) => void;
  itemPerPage: number;
}

const Pagination: FC<Props> = ({ totalitems, itemPerPage, paginate }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil( totalitems/ itemPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
