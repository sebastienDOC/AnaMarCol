import React from "react";
import './Pagination.css'

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const windowWidth = window.innerWidth;

  return (
    <nav>
      <ul className='pagination'>
        <li>
          <button onClick={() => paginate(currentPage - 1)} className={currentPage === 1 || windowWidth < 1000 ? 'button hidden' : 'button'} aria-label="Page précédente">
            Précédent
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)} aria-label="Numéro de la page">
              {number}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => paginate(currentPage + 1)} className={currentPage === pageNumbers.length || windowWidth < 1000 ? 'button hidden' : 'button'} aria-label="Page suivante">
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
