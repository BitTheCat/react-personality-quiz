import { Link } from 'react-router-dom';

export default function Header(){
    return (
        <header>
            <div className='title'>Which Element Are You?</div>
            <div className="subtitle">(based on completely random things)</div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>       
                <Link to="/about">About</Link>       
            </nav>
        </header>
    );
};