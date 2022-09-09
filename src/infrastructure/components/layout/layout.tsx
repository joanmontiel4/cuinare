import { iMenuOptions } from '../../interfaces/imenu-options';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';

// import layout from './layout.module.css';

export function Layout({
    appTitle,
    menuOptions,
    children,
}: {
    appTitle: string;
    menuOptions: Array<iMenuOptions>;
    children: JSX.Element;
}) {
    return (
        <>
            <Header appTitle={appTitle}>
                <Menu menuOptions={menuOptions}></Menu>
            </Header>
            <main className="main-container">{children}</main>
            {/* <Footer></Footer> */}
        </>
    );
}
