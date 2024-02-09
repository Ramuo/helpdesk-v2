import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';

import {useLogoutUserMutation} from '../slices/userApiSlice';
import {logout} from '../slices/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const [logoutApiCall] = useLogoutUserMutation();

    const {userInfo} = useSelector((state) => state.auth);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    };

    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            {userInfo ? (
                <li>
                    <button className='btn' onClick={logoutHandler}>
                        <FaSignOutAlt/>Logout
                    </button>
                </li>
            ) : (
                <>
                    <li>
                    <Link to='/login'>
                        <FaSignInAlt/> Login
                    </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser/> Register
                        </Link>
                    </li>
                </>
            )
            }
        </ul>
    </header>
    )
}

export default Header