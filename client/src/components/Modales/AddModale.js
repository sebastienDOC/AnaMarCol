// AddModal.jsx
import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../actions/items.actions";
import "./AddModale.css"

const AddModal = ({ onClose }) => {
    const [denomination, setDenomination] = useState("");
    const [fournisseur, setFournisseur] = useState("");
    const [quantite, setQuantite] = useState("");
    const [etat, setEtat] = useState("");
    const [file, setFile] = useState("");

    const dispatch = useDispatch();

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            dispatch(addItem({ denomination, fournisseur, quantite, etat }));
            
            setDenomination("");
            setFournisseur("");
            setQuantite("");
            setEtat("");
            setFile("");
        } catch (error) {
        console.error("Erreur lors de la soumission de l'article", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>X</button>
                <form action='' onSubmit={handleAdd} id='article-add-form' className="article-add-ctn">
        
                    <label htmlFor="denomination">Dénomination de l'article</label>
                    <input 
                        type="text" 
                        name="denomination" 
                        id="denomination" 
                        onChange={(e) => setDenomination(e.target.value)} 
                        value={denomination} 
                    />
                    <div className="denomination error"></div>
                    <br/>
        
                    <label htmlFor="fournisseur">Fournisseur</label>
                    <select
                        name="fournisseur"
                        id="fournisseur"
                        onChange={(e) => setEtat(e.target.value)}
                        value={etat}
                    >
                        <option value=""></option>
                        <option value="CashGuard">CashGuard</option>
                        <option value="Aures">Aures</option>
                        <option value="LDLC">LDLC</option>
                        <option value="VNE">VNE</option>
                    </select>
                    <div className="fournisseur error"></div>
                    <br/>
        
                    <label htmlFor="denomination">État de l'article</label>
                    <select
                        name="etat"
                        id="etat"
                        onChange={(e) => setEtat(e.target.value)}
                        value={etat}
                    >
                        <option value=""></option>
                        <option value="neuf">Neuf</option>
                        <option value="SAV">SAV</option>
                    </select>
                    <div className="etat error"></div>
                    <br/>
        
                    <label htmlFor="quantite">Quantité en stock</label>
                    <input 
                        type="text" 
                        name="quantite" 
                        id="quantite" 
                        onChange={(e) => setQuantite(e.target.value)} 
                        value={quantite} 
                    />
                    <div className="quantite error"></div>
                    <br/>
        
                    <input type="submit" value="Ajouter l'article" />
                </form>
            </div>
        </div>
    )
}

export default AddModal;