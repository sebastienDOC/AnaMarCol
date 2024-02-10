// AddModal.jsx
import React, { useState } from 'react';
import "./ItemModale.css"
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantite, updateQuantiteSuccess, uploadItemPicture } from "../../actions/item.actions"
import { dateParser } from '../../Utils';

const ItemModale = ({ onClose }) => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const { selectedItemInfo, selectedItemQuantite } = useSelector((state) => state.itemReducer);
    const currentUser = useSelector((state) => state.userReducer);
    const [quantite, setQuantite] = useState(selectedItemQuantite || ''); // Utilisez la quantité du state comme valeur initiale
    const [updateForm, setUpdateForm] = useState(false);

    const handlePicture = async (event) => {
        event.preventDefault();

        if (selectedItemInfo && selectedItemInfo._id && file && currentUser && currentUser._id) {
            const modifierId = typeof currentUser._id === 'string' ? currentUser._id : currentUser._id[0];

            const data = new FormData();
            data.append("denomination", selectedItemInfo.denomination);
            data.append("itemId", selectedItemInfo._id);
            data.append("file", file);
            data.append("modifierId", modifierId);

            try {
                await dispatch(uploadItemPicture(data, selectedItemInfo._id, modifierId));

                onClose();
            } catch (error) {
                console.error("Erreur lors de l'envoi de l'image :", error);
            }
        } else {
            console.error("Les informations nécessaires ne sont pas disponibles.");
        }
    };

    const handleUpdate = async () => {
        try {
            if (selectedItemInfo && selectedItemInfo._id) {
            await dispatch(updateQuantite(selectedItemInfo._id, quantite));
            setUpdateForm(false);

            dispatch(updateQuantiteSuccess(selectedItemInfo._id, quantite));

            } else {
            console.error("L'ID de l'article est indéfini.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la quantité :", error);
        }
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className='modal-close'>X</button>
                <div className='modal-ctn'> 

                    <div className='modal-left'>
                        <h4>Photo de l'article</h4>
                        {selectedItemInfo && selectedItemInfo.image ? (
                            <>
                                <img src={selectedItemInfo.image} alt="Article" />
                                <form  onSubmit={handlePicture} className="upload-image">
                                    <label htmlFor="file">Changer d'image</label>
                                    <input 
                                        type="file" 
                                        id="file" 
                                        name="file" 
                                        accept=".jpg, .jpeg, .png" 
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="upload-image-btn"
                                    />
                                    <br/>
                                    <input type="submit" value="Envoyer" className="upload-image-send" />
                                </form>
                            </>
                        ) : (
                            <p>Aucune image disponible</p>
                        )}
                    </div>

                    <div className='modal-right'>
                        <div className='modal-infos'>
                            <h4>Dénomination de l'article</h4>
                            <p>{selectedItemInfo ? selectedItemInfo.denomination : ""}</p>
                        </div>
                        <div className='modal-infos'>
                            <h4>Fournisseur</h4>
                            <p>{selectedItemInfo ? selectedItemInfo.fournisseur : ""}</p>
                        </div>
                        <div className='modal-infos'>
                            <h4>État de l'article</h4>
                            <p>{selectedItemInfo ? selectedItemInfo.etat : ""}</p>
                        </div>
                        {updateForm !== true && (
                        <>
                            <h4>Quantité</h4>
                            <p onClick={() => setUpdateForm(!updateForm)}>{selectedItemInfo ? selectedItemInfo.quantite : ""}</p>
                            <button onClick={() => setUpdateForm(!updateForm)}>Modifier la quantité</button>
                        </>
                        )}
                        {updateForm && (
                            <>
                                <h4>Quantité</h4>
                                <textarea
                                    type='text'
                                    value={quantite}
                                    onChange={(e) => setQuantite(e.target.value)}
                                />
                                <br />
                                <button onClick={handleUpdate}>Valider modifications</button>
                            </>
                        )}
                        <div>
                            <h4>Créé le : </h4>
                            <p>{dateParser(selectedItemInfo ? selectedItemInfo.createdAt : "")}</p>
                            <h4>Modifié le : </h4>
                            <p>{dateParser(selectedItemInfo ? selectedItemInfo.updatedAt : "")}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ItemModale;