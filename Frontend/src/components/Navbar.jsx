import { useNavigate, Link } from 'react-router-dom';
import {BubbleText} from './index';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if the user is logged in

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('student-courses');
        navigate('/login');
    };

    return (
        <nav className='flex justify-between items-center px-2 py-2 gap-5'>
            <div className='flex'>
                <h1 className='font-anta text-3xl'>Mexus</h1>
            </div>
            <div className='flex items-center justify-start gap-5'>
                {token ? (
                    <>
                        <ul className='font-bold text-xl hover:border-b-white hover:border-b-4'>Home</ul>
                        <ul className='font-bold text-xl hover:border-b-white hover:border-b-4'>Courses</ul>
                    </>
                ) : null}
            </div>
            <div className='flex justify-end items-center gap-4'>
                {token ? (
                    <button className='outline-none rounded-md px-4 py-2 bg-blue-600 text-white font-bold' onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            <button className='outline-none rounded-md px-4 py-2 bg-blue-600 text-white font-bold'>Login</button>
                        </Link>
                        <Link to="/register">
                            <button className='outline-none rounded-md px-4 py-2 bg-green-600 text-white font-bold'>Signup</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
