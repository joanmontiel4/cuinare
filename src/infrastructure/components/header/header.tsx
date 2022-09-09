import { Login } from '../login-button/login';
import './header.scss';
// import header from './header.module.css';
export function Header({
    appTitle,
    children,
}: {
    appTitle: string;
    children: JSX.Element;
}) {
    return (
        <header className="header">
            <h1 className="header__title">{appTitle}</h1>
            {children}

            <Login></Login>
        </header>
    );
}
