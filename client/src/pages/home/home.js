import './home.css';
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import img from '../../assets/Logo/logo_small.jpg'

export default function Home() {
    return (
        <div className='home-ctn'>
            <Header /> 
            <div className='home-first'>
                <Menu />
                <div className='home-first-flex'>
                    <div className='home-first-ctn'>
                        <div className='home-res'>
                            <div className='home-res-details'>
                                <h2 className='home-first-title'>Détails des produits</h2>
                                <div className='home-res-ctn'>
                                    <div className='home-res-box'>
                                        <p>98</p>
                                        <p>Total articles</p>
                                    </div>
                                    <div className='home-res-box'> 
                                        <p>24</p>
                                        <p>Stock réduit</p>
                                    </div>
                                    <div className='home-res-box'>
                                        <p>50</p>
                                        <p>Familles article</p>
                                    </div>
                                    <div className='home-res-box'>
                                        <p>176</p>
                                        <p>Total clients</p>
                                    </div>
                                </div>
                            </div>
                            <div className='home-res-inv'>
                                <h2 className='home-first-title'>Résumé de l'inventaire</h2>
                                <div className='home-inv-ctn'>
                                    <div className='home-inv-box'>
                                        <p>Quantité disponible</p>
                                        <p>58849</p>
                                    </div>
                                    <div className='home-inv-box'>
                                        <p>Quantité à recevoir</p>
                                        <p>128</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='home-second'>
                        <div className='home-second-ctn'>
                            <div className='home-border'>
                                <h2 className='home-second-title'>Stock réduit</h2>
                            </div>
                            <div className='home-second-grid'>
                                    <div className='home-second-grid-box'>
                                        <img 
                                            src={img}
                                            alt='img AnaMarCol'
                                            className='logo'
                                        />
                                        <p>Nom de l'article</p>
                                        <p>10</p>
                                    </div>
                                    <div className='home-second-grid-box'>
                                        <img 
                                            src={img}
                                            alt='img AnaMarCol'
                                            className='logo'
                                        />
                                        <p>Nom de l'article</p>
                                        <p>10</p>
                                    </div>
                                    <div className='home-second-grid-box'>
                                        <img 
                                            src={img}
                                            alt='img AnaMarCol'
                                            className='logo'
                                        />
                                        <p>Nom de l'article</p>
                                        <p>10</p>
                                    </div>
                                    <div className='home-second-grid-box'>
                                        <img 
                                            src={img}
                                            alt='img AnaMarCol'
                                            className='logo'
                                        />
                                        <p>Nom de l'article</p>
                                        <p>10</p>
                                    </div>
                                    <div className='home-second-grid-box'>
                                        <img 
                                            src={img}
                                            alt='img AnaMarCol'
                                            className='logo'
                                        />
                                        <p>Nom de l'article</p>
                                        <p>10</p>
                                    </div>
                                    <div className='home-second-grid-box'>
                                        <img 
                                            src={img}
                                            alt='img AnaMarCol'
                                            className='logo'
                                        />
                                        <p>Nom de l'article</p>
                                        <p>10</p>
                                    </div>
                                </div>
                        </div>
                        <div className='home-third-ctn'>
                            <div className='home-border'>
                                <h2 className='home-second-title'>Commande(s) en cours</h2>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}