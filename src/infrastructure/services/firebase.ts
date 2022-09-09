// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';

export const startFirebase = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        databaseURL: `https://${process.env.REACT_APP_DB}.${process.env.REACT_APP_DBR}.firebasedatabase.app/`,
        projectId: process.env.REACT_APP_PID,
        storageBucket: process.env.REACT_APP_SB,
        messagingSenderId: process.env.REACT_APP_SID,
        appId: process.env.REACT_APP_APPID,
    };

    // Initialize Firebase
    const fireApp = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    const fireDataBase = getDatabase(fireApp);

    return { fireApp, fireDataBase };
};
