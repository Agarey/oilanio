import Link from "next/link";
import React from "react";

const Pagination = ({ cardsPerPage, totalCards, paginate, currentPage }) => {
  const pageNumbers = [];

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }

  const simplePageLink = {
    border: "1px solid #212529",
    color: "#212529",
  };

  const activePageLink = {
    backgroundColor: "#212529",
    color: "#fff",
  };

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav >
      <ul className="pagination" style={containerStyle}>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link href="#">
              <a
                onClick={() => paginate(number)}
                className="page-link custom-page-item"
                style={number === currentPage ? activePageLink : simplePageLink}
              >
                {number}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;