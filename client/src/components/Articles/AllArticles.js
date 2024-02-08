// AllArticles.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from '../../components/Pagination/Pagination'
import './AllArticles.css'
import FiltreArticles from "../Tri/Tri";
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 18;

const AllArticles = () => {
  const itemsData = useSelector((state) => state.itemsReducer.items || []);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  
  const [filteredItems, setFilteredItems] = useState(itemsData);

  const handleFilterChange = ({ sortByFournisseur, sortByEtat, searchTerm }) => {
    const newFilteredItems = itemsData.filter((item) => {
      const fournisseurMatch = !sortByFournisseur || item.fournisseur === sortByFournisseur;
      const etatMatch = !sortByEtat || item.etat === sortByEtat;
      const searchTermMatch = !searchTerm || item.denomination.toLowerCase().includes(searchTerm.toLowerCase());

      return fournisseurMatch && etatMatch && searchTermMatch;
    });

    setFilteredItems(newFilteredItems);
  };

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="items-ctn">
        <FiltreArticles onFilterChange={handleFilterChange} />

        <ul className='all-items'>
          {currentItems.map((item) => (
            <li key={item._id}>
              <h3>{item.denomination}</h3>
              <img 
                src={item.image}
                alt="Photo de l'employé"
                className='item-img'
              />
              <h4>{item.fournisseur}</h4>
              <p>{item.etat}</p>
              <p>Quantité : {item.quantite}</p>
            </li>
          ))}
        </ul>

        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredItems.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </motion.div>
  );
};

export default AllArticles;