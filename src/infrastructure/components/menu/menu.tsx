import { Link } from 'react-router-dom';
import { iMenuOptions } from '../../interfaces/imenu-options';
import './menu.scss';

export function Menu({ menuOptions }: { menuOptions: Array<iMenuOptions> }) {
    return (
        <nav className="nav-menu">
            <ul className="tabs">
                {menuOptions.map((item) => (
                    <li key={item.label} className="tabs__item">
                        <Link to={item.path} className="tabs__link">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
