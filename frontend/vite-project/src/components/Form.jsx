import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import Loading from './Loading';
import './Form.css'; // Import the CSS file for animations

function Form({ route, method }) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const methodName = method === 'login' ? "Login" : "Register";
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const data = method === 'login' ? { username, password } : { username, email, password };
            const response = await api.post(route, data);
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }
        }
        catch (error) {
            console.log(error);
            if (methodName === 'Login')
                alert("Invalid Credentials Or Not registered");
            else
                alert("Enter valid Email or Account already exists")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-7 animated-header pb-4">Make Your Notes Daily</h1>
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md animated-form">
                <form onSubmit={handleSubmit} className='w-full'>
                    <h1 className='text-2xl font-bold mb-6 text-center'>{methodName}</h1>
                    <input
                        type='text'
                        className='w-full p-2 mb-4 border border-gray-300 rounded'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                        required
                    />
                    {methodName === 'Register' && (
                        <input
                            type='email'
                            className='w-full p-2 mb-4 border border-gray-300 rounded'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                        />
                    )}
                    <input
                        type='password'
                        className='w-full p-2 mb-4 border border-gray-300 rounded'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                    {loading && <Loading />}
                    <button
                        type="submit"
                        className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2'
                    >
                        {methodName}
                    </button>
                    {methodName === 'Login' ? (
                        <button
                            onClick={() => navigate('/register')}
                            className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2'
                        >
                            Click To Register
                        </button>
                    ) : null}
                </form>
            </div>
        </div>
    );
}

export default Form;