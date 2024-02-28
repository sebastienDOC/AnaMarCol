import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../../components/Pagination/Pagination';
import './AllArticles.css';
import FiltreArticles from "../Filtre/Filtre";
import ItemModale from '../Modales/ItemModale';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteItem from "../Delete/Delete";
import { setSelectedItemId, setSelectedItemQuantite, deleteItem, updateQuantite } from '../../actions/item.actions';

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
  const userDataPseudo = useSelector((state) => state.userReducer.pseudo)
  const userDataId = useSelector((state) => state.userReducer._id)

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

  const handleFilterChange = ({ selectedFournisseurs, selectedEtats, searchTerm }) => {
    const newFilteredItems = itemsData.filter((item) => {
      const fournisseurMatch = selectedFournisseurs.length === 0 || selectedFournisseurs.includes(item.fournisseur);
      const etatMatch = selectedEtats.length === 0 || selectedEtats.includes(item.etat);
      const searchTermMatch = !searchTerm || item.denomination.toLowerCase().includes(searchTerm.toLowerCase());
  
      return fournisseurMatch && etatMatch && searchTermMatch;
    });
  
    setFilteredItems(newFilteredItems);
  };

  const handleQuantityChange = (e, itemId, operation) => {
    e.stopPropagation()
    const selectedItem = filteredItems.find(item => item._id === itemId);
  
    if (selectedItem) {
      const numericQuantite = parseInt(selectedItem.quantite, 10);

      if (operation === 'increment') {
        dispatch(updateQuantite(itemId, numericQuantite + 1, userDataPseudo, 'increment'));
      } else if (operation === 'decrement') {
        dispatch(updateQuantite(itemId, numericQuantite - 1, userDataPseudo, 'decrement'));
      } else {
        dispatch(updateQuantite(itemId, 15, userDataPseudo, 'direct'));
      }
    }
  };

  return (
    <div className="item-flex">
      <FiltreArticles onFilterChange={handleFilterChange} />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="items-ctn"
      >
        <AnimatePresence>
          <ul className='all-items'>
            {currentItems.map((item) => (
              <motion.li
                key={item._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleItemClick(item._id)}
              >
                {userDataId === '65afe8c7c307f521781311fd' || userDataId === '65afe8e4c307f52178131201' ? (
                  <DeleteItem id={item._id} onDelete={() => handleDeleteItem(item._id, item.fournisseur, item.etat)} />
                ) : ""}
                <img 
                  src={item.image}
                  alt="Article"
                  className='item-img'
                />
                <h3>{item.denomination}</h3>
                <h4>{item.fournisseur}</h4>
                <p>{item.etat}</p>
                <div className="items-quantity">
                  <button className="plus-btn" onClick={(e) => handleQuantityChange(e, item._id, 'decrement')}>-</button>
                  <p className={`${item.quantite >= 5 ? 'item-quantite' : 'red item-quantite'}`}>Stock : {item.quantite}</p>
                  <button className="minus-btn" onClick={(e) => handleQuantityChange(e, item._id, 'increment')}>+</button>
                </div>
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
      </motion.div>
    </div>
  );
};

export default AllArticles;
