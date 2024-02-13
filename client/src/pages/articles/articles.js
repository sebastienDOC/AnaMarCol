import './articles.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import AllArticles from '../../components/Articles/AllArticles'

export default function Articles() {
    
    return (
        <div>
            <Header />
            <div className='articles-ctn'>
                <Menu />
                <AllArticles />
            </div>
        </div>
    )
}