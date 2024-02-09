import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Spinner from '../components/Spinner';


import {useRegisterUserMutation} from '../slices/userApiSlice';
import {setCredentials} from '../slices/authSlice';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [confirmPassword, setConfirmPassword] =useState('');


  const [register, {isLoading, error}] = useRegisterUserMutation();

  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submithandler = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error('Password do not match');
      return;
    }else{
      try {
        const res = await register({name, email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data.message || err.error)
      }
    }
    
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser/>Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={submithandler}>
          <div className="form-group">
            <input
            className="form-control" 
            type="text"
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            />
          </div>
          <div className="form-group">
            <input
            className="form-control" 
            type="email"
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
            <input
            className="form-control" 
            type="password"
            id='password2'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
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

export default RegisterPage