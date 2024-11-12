import { Link } from 'react-router-dom';

export default function Header(){
    return (
        <header>
            <h2>Which Element Are You?</h2>
            (based on completely random things)
            <nav>
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>       
            </nav>
        </header>
    );
};