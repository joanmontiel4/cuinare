import React from 'react';
import './App.scss';
import { startFirebase } from '../../services/firebase';
import { AppRoutes } from '../routes/app-routes';
import { Layout } from '../layout/layout';
import { AppContextProvider } from '../../context/provider';
import { MyFridgeProvider } from '../../../features/myfridge/context/myfridge.provider';

function App() {
    startFirebase();
    const appTitle = 'cuinare';
    const menuOptions = [
        { path: '/', label: 'Home' },
        { path: '/recipes', label: 'Recipes' },
        { path: '/myfridge', label: 'My Fridge' },
        { path: '/myrecipes', label: 'My Recipes' },
        { path: '/favorites', label: 'Favorites' },
    ];
    return (
        <AppContextProvider>
            <MyFridgeProvider>
                <Layout appTitle={appTitle} menuOptions={menuOptions}>
                    <AppRoutes menuOptions={menuOptions}></AppRoutes>
                </Layout>
            </MyFridgeProvider>
        </AppContextProvider>
    );
}

export default App;
