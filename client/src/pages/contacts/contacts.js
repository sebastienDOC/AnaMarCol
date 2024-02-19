import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import './contacts.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedContactId } from '../../actions/contacts.action'
import ContactModale from '../../components/Modales/ContactModale'
import { UidContext } from '../../components/AppContext';

const Contacts = () => {
  const dispatch = useDispatch();
  const contactsData = useSelector((state) => state.contactsReducer.contactsData)
  const [isContactModaleOpen, setIsContactModaleOpen] = useState(false);
  const selectedContactId = useSelector((state) => state.contactsReducer.selectedContactId);
  const userDataId = useSelector((state) => state.userReducer._id)
  const uid = useContext(UidContext)

  const handleContactClick = (contactId) => {
    dispatch(setSelectedContactId(contactId));
    setIsContactModaleOpen(true);
  };
  const closeAddModal = () => {
    dispatch(setSelectedContactId(null));
    setIsContactModaleOpen(false);
  };
  return (
    <div>
      {uid ? (
        <div>
          <Header />
          <div className='contact-ctn'>
            <Menu />
            <div className='contact-flex'>
              <ul className='all-contact'>
                <li>
                  <h2 className='contact-title'>Contacts Extérieurs</h2>
                  <div className="contacts-row">
                    {contactsData.slice(0, 3).map((contact) => (
                      <div key={contact._id} className="contact-item" onClick={() => handleContactClick(contact._id)}>
                        <h3>{contact.poste}</h3>
                        <img 
                          src={contact.picture}
                          alt="Logo du contact"
                          className='contact-img'
                        />
                        <h3>{contact.lien}</h3>
                        <h4>{contact.nom}</h4>
                        <p>{contact.email}</p>
                        <p>{contact.tel}</p>
                      </div>
                    ))}
                  </div>
                </li>
                <li>
                  <h2 className='contact-title'>Fournisseurs Extérieurs</h2>
                  <div className="contacts-row">
                    {contactsData.slice(3, 6).map((contact) => (
                      <div key={contact._id} className="contact-item" onClick={() => handleContactClick(contact._id)}>
                        <h2>{contact.poste}</h2>
                        <img 
                          src={contact.picture}
                          alt="Logo du contact"
                          className='contact-img'
                        />
                          <a href={contact.lien} target="_blank" rel="noopener noreferrer">
                            Lien vers le site
                          </a>
                        <h4>{contact.nom}</h4>
                        <p>{contact.email}</p>
                        <p>{contact.tel}</p>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div> 
            {
              (userDataId === '65afe8c7c307f521781311fd' || userDataId === '65afe8e4c307f52178131201') 
              && isContactModaleOpen
              && <ContactModale onClose={closeAddModal} contactId={selectedContactId} />
            }
          </div>
        </div>
        ) : 
        <div>
            <h1>Veuillez vous connecter</h1>
            <h2><Link to='/'>Retour à la page de connexion</Link></h2>
        </div>
        }
        
      </div>
  )
}

export default Contacts
