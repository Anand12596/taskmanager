import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'MEMBER',
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                'users/register/',
                formData
            );

            alert('Registration Successful');

            navigate('/');

        } catch (error) {

            alert('Registration Failed');
        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card p-4 shadow">

                        <h2 className="text-center mb-4">
                            Register
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <select
                                name="role"
                                className="form-control mb-3"
                                onChange={handleChange}
                            >

                                <option value="MEMBER">
                                    Member
                                </option>

                                <option value="ADMIN">
                                    Admin
                                </option>

                            </select>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                Register
                            </button>

                        </form>

                        <p className="mt-3 text-center">

                            Already have an account?

                            <Link to="/">
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;