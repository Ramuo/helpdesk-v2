import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../components/Spinner';
import {toast} from 'react-toastify';
import {FaEdit} from 'react-icons/fa'

import {
    useGetUserByIdQuery,
    useUpdateUserMutation
} from '../slices/userApiSlice';

const UserEditPage = () => {
    const {id: userId} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        data: user, 
        isLoading, 
        refetch, 
        error 
    } = useGetUserByIdQuery(userId);
    console.log(user)
    

    const [
        updateUser, 
        {isLoading: loadingUpdate}
    ] = useUpdateUserMutation()


    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
        }

    }, [user]);

    const submithandler = async (e) => {
        e.preventDefault();

        try {
            await updateUser({userId, name, email, password})
            toast.success('Profil modifié avec succès');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            
        }
        
    };

    return (
        <>
          <section className="heading">
            <h1>
              <FaEdit/>Edit Profile
            </h1>
            <p>Please create an account</p>
          </section>

          <section className="form">
          {loadingUpdate && <Spinner/>}

            {isLoading ? (
                <Spinner/>
            ): error ? (
                <>
                    <h1 style={{color: 'red'}}>
                        {error.data.message}
                    </h1>
                </>
            ) : (
                <>
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
                            <button 
                            type='submit'
                            className="btn btn-block">
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            )
            }
          </section>
        </> 
      )
};

export default UserEditPage;