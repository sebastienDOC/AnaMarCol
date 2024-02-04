import './articles.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';

export default function Articles() {
    return (
        <div>
            <Header />
            <div className='articles-ctn'>
                <Menu />

            </div>
        </div>
    )
}