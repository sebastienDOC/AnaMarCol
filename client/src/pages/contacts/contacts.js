import './contacts.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import user from '../../assets/user.png'

export default function Contacts() {
    return (
        <div>
            <Header />
            <div className='contact-ctn'>
                <Menu />
                <div className='contact-flex'>

                    <div className='contact-chef'>
                        <div className='contact-adresse'>
                            <div className='contact-adresse-flex'>
                                <h2 className='contact-h2'>Adresse de l'entreprise</h2>
                                <h3>Palmaroux</h3>
                                <h3>58230 Montsauche les Settons </h3>
                            </div>
                            <div className='contact-user'>
                                <h2>Gérant de l'entreprise</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Edith LECORDIER</h3>
                                <p>07 05 06 88 45</p>
                            </div>
                            <div className='contact-adresse-flex'>
                                <h2 className='contact-h2'>Adresse du dépot</h2>
                                <h3>5 rue Aristide Berges</h3>
                                <h3>ZAC de la rente du Bassin</h3>
                                <h3>21800 Sennecey-les-Dijon</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className='contact-sous-chef'>
                        <div className='contact-tech'>
                            <div className='contact-user'>
                                <h2>Technicien Monteur</h2>
                                <h2>SAV</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Thierry SIMON</h3>
                                <p>07 05 06 88 45</p>
                            </div>
                            <div className='contact-user'>
                                <h2>Technicien Monteur</h2>
                                <h2>SAV</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Alain DE SAINTE COLOMBE</h3>
                                <p>07 05 06 88 45</p>
                            </div>
                        </div>
                        
                        <div className='contact-hotline'>
                            <div className='contact-user'>
                                <h2>Responsable Hotline</h2>
                                <h2>Technicien Monteur</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Franck SIMON</h3>
                                <p>07 05 06 88 45</p>
                            </div>

                            <div className='contact-user'>
                                <h2>Technicien Hotline</h2>
                                <h2>SAV</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Étienne BULLE</h3>
                                <p>07 05 06 88 45</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='contact-peuple'>
                        <div className='contact-depot'>
                            <div className='contact-user'>
                                <h2>Gestionnaire d'entrepôt</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Coline LECORDIER</h3>
                                <p>07 05 06 88 45</p>
                            </div>
                        </div>

                        <div className='contact-ext'>
                            <div className='contact-user'>
                                <h2>Prestataire extérieur</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Laurent JAMIN</h3>
                                <p>07 05 06 88 45</p>
                            </div>

                            <div className='contact-user'>
                                <h2>Prestataire extérieur</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Yves DOOMS</h3>
                                <p>07 05 06 88 45</p>
                            </div>

                            <div className='contact-user'>
                                <h2>Prestataire extérieur</h2>
                                <img 
                                    src={user}
                                    alt="Photo de l'employé"
                                    className='user-img'
                                />
                                <h3>Bertrand HUYNH</h3>
                                <p>07 05 06 88 45</p>
                            </div>
                        </div>
                    </div>

                </div> 
            </div>
        </div>
    )
}