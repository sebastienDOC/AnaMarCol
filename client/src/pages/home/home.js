import './home.css';
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import Statistiques from '../../components/Stats/Statistics';
import ArticlesBelow5 from '../../components/Articles/ArticlesBelow5';

export default function Home() {
    return (
        <div className='home-ctn'>
            <Header /> 
            <div className='home-first'>
                <Menu />
                <div className='home-both'>
                    <Statistiques />
                    <ArticlesBelow5 />
                </div>
            </div>
        </div>
    )
}