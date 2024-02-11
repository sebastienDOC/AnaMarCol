import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../../components/Pagination/Pagination';
import './AllArticles.css';
import FiltreArticles from "../Tri/Tri";
import ItemModale from '../Modales/ItemModale';
import { motion, AnimatePresence } from 'framer-motion'; // Importez AnimatePresence
import DeleteItem from "../Delete/Delete";
import { setSelectedItemId, setSelectedItemQuantite, deleteItem } from '../../actions/item.actions';

const ITEMS_PER_PAGE = 15;

const AllArticles = () => {
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.itemsReducer.items || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const [filteredItems, setFilteredItems] = useState(itemsData);
  const selectedItemId = useSelector((state) => state.itemReducer.selectedItemId);

  useEffect(() => {
    setFilteredItems(itemsData);
  }, [itemsData]);

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemClick = (itemId, isDeleteButton) => {
    if (!isDeleteButton) {
      dispatch(setSelectedItemId(itemId));
      setIsAddModalOpen(true);
    }
  };

  const handleDeleteItem = (itemId, fournisseur, etat) => {
    dispatch(deleteItem(itemId, fournisseur, etat));
    const updatedFilteredItems = filteredItems.filter((item) => item._id !== itemId);
    setFilteredItems(updatedFilteredItems);
    dispatch(setSelectedItemQuantite(null));
  };  

  const closeAddModal = () => {
    dispatch(setSelectedItemId(null));
    setIsAddModalOpen(false);
  };

  const handleFilterChange = ({ sortByFournisseur, sortByEtat, searchTerm }) => {
    const newFilteredItems = itemsData.filter((item) => {
      const fournisseurMatch = !sortByFournisseur || item.fournisseur === sortByFournisseur;
      const etatMatch = !sortByEtat || item.etat === sortByEtat;
      const searchTermMatch = !searchTerm || item.denomination.toLowerCase().includes(searchTerm.toLowerCase());

      return fournisseurMatch && etatMatch && searchTermMatch;
    });

    // Ajoutez une animation de fade-out/fade-in lors du changement de filtre
    setFilteredItems(newFilteredItems);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FiltreArticles onFilterChange={handleFilterChange} />
      <div className="items-ctn">
        <AnimatePresence>
          <ul className='all-items'>
            {currentItems.map((item) => (
              <motion.li
                key={item._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleItemClick(item._id)}
              >
                <DeleteItem id={item._id} onDelete={() => handleDeleteItem(item._id, item.fournisseur, item.etat)} />
                <h3>{item.denomination}</h3>
                <img 
                  src={item.image}
                  alt="Article"
                  className='item-img'
                />
                <h4>{item.fournisseur}</h4>
                <p>{item.etat}</p>
                <p>Quantité : {item.quantite}</p>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>

        {isAddModalOpen && <ItemModale onClose={closeAddModal} itemId={selectedItemId} />}

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
