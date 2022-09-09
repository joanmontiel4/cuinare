import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useLogin } from '../../hooks/use-login';
import './login.scss';

export function Login() {
    const isLogged = useSelector((state: RootState) => state.isLogged);
    const userLogged = useSelector((state: RootState) => state.userLogged);
    const { handleClick } = useLogin();

    return (
        <div className="login">
            {isLogged ? (
                <img
                    className="login__img"
                    src={userLogged.photoURL}
                    alt="user-profile"
                />
            ) : (
                <div className="login__no-img"></div>
            )}
            <button
                className="login__button"
                type="button"
                onClick={handleClick}
            >
                {isLogged ? 'Logout' : 'Login'}
            </button>
        </div>
    );
}
