import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {FaSignInAlt} from 'react-icons/fa';
import {toast} from 'react-toastify';
import Spinner from '../components/Spinner'



import {useLoginUserMutation} from '../slices/userApiSlice';
import {setCredentials} from '../slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');

  const [login, {isLoading}] = useLoginUserMutation();

  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);


  const submithandler = async (e) => {
    e.preventDefault();
    
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }


  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Please login to get support</p>
      </section>
      <section className="form">
        <form onSubmit={submithandler}>
          <div className="form-group">
            <input
            className="form-control" 
            type="email"
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
            />
          </div>
          <div className="form-group">
            <input
            className="form-control" 
            type="password"
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>

          {isLoading && <Spinner/>}
        </form>
      </section>
    </>
  )
}

export default LoginPage;