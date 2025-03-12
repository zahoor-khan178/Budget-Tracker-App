import { Link } from 'react-router-dom';
import  '../Css/Nav.css'
 // We'll create this CSS file for styling

const Nav = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/" className="sidebar-link">Home </Link>
                </li>
                <li>
                    <Link to="/transaction" className="sidebar-link">Add Transaction</Link>
                </li>
                <li>
                    <Link to="/view-transaction" className="sidebar-link">View Transactions</Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;
