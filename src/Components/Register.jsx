import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Helmet } from "react-helmet-async";



const Register = () => {
    const { createUser, updateUserProfile, setReload } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const { email, password, name, photoURL } = data || {}

        reset()

        if (password.length < 6) {
            return toast.error('Password should be at least 6 characters or longer')
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Your password should have at least one Uppercase characters')
        }
        else if (!/[a-z]/.test(password)) {
            return toast.error('Your password should have at least one Lowercase characters')
        }

        createUser(email, password)
            .then(result => {
                updateUserProfile(name, photoURL)
                    .then(() => {
                        setReload(true)
                        toast.success('Register successfully', result.user)
                        navigate('/')
                    })
            })
            .catch(error => {
                toast.error( error.message)
            })
    }

    useEffect(()=> {
        reset()
    }, [reset])
    return (
        <div className=" flex flex-col lg:flex-row text-center items-center justify-between lg:mx-28">
            <Helmet>
                <title>Residential House | Register page</title>
            </Helmet>
            <div className="hero mt-12 rounded-3xl bg-cover" >
                <div className="hero-content text-center text-neutral-content">
                    <div className="flex justify-around gap-8 lg:my-8">
                        <div data-aos="fade-right" data-aos-duration="1000" className="lg:text-start md:text-center mb-8 text-black">
                            <h1 className="mb-5 md:text-5xl text-3xl font-bold">Welcome to the <br /> <span className='bg-gradient-to-r from-[#1DD100] via-red-500 to-blue-400 text-transparent bg-clip-text bg-300% animate-gradient'>Residential House</span><br /> Register Page..</h1>
                            <p className="mb-5 md:w-96 lg:w-full">Welcome to Residential House, where luxury meets comfort and every stay is an unforgettable experience. Join our exclusive community today by signUp for create your personal account. By create a new member</p>
                        </div>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="3000" className="card lg:mt-5 shrink-0 w-full md:w-[450px] max-w-full shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Full Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo URL</span>
                        </label>
                        <input {...register("photoURL",)} type="text" placeholder="Photo URL" className="input input-bordered" />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input {...register("password", { required: true })} type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute top-12 right-2 cursor-pointer">
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </span>
                        {errors.password && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control mt-3">
                        <button className="btn font-bold text-white bg-[#23BE0A]">Register</button>
                        <div className="text-center mt-4">
                            <p>Have an account? <Link to='/login' className="text-blue-500 font-semibold">Log In</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;