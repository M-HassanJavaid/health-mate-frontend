import React, { useState } from 'react';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { Mail, Lock, UserPlus, Calendar, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../services/auth.js';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const [fetchSignup, { isLoading: isSubmitting }] = useSignupMutation()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Basic Validation
            if (!gender || gender === "") {
                alert("Please select your gender");
                return;
            }

            let res = await fetchSignup({
                email,
                password,
                name,
                dateOfBirth,
                gender
            }).unwrap();


            if (!res.success) {
                throw new Error(data.message);
            } else {
                alert('Account created! Please check your email for verification.');
                setIsEmailSent(true);
            }

        } catch (error) {
            alert(error?.message || error?.data?.message || 'Some error occured');
            console.log(error);
        } 
    };

    if (isEmailSent) {
        return (
            <main className='min-h-screen w-screen bg-[var(--bg-primary)] flex justify-center items-center px-6'>
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail size={40} />
                    </div>
                    <h1 className='text-2xl text-[var(--text-primary)] font-bold mb-4' >
                        Verify your email to continue.
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        We've sent a verification link to <span className="font-semibold">{email}</span>.
                        Please check your inbox and spam folder.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)] py-12 px-4">
            <div className="w-full max-w-md bg-[var(--bg-primary)] p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--border-subtle)]">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        Your Health <span className="text-[var(--btn-primary)]">Journey</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-sm">
                        Create your profile to get personalized AI health insights.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Full Name</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className='bg-[var(--bg-secondary)] border-none'
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Email Address</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                            className='bg-[var(--bg-secondary)] border-none'
                        />
                    </div>

                    {/* Grid for DOB and Gender */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Birthday</label>
                            <Input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                                className='bg-[var(--bg-secondary)] border-none'
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                className="w-full p-3 rounded-xl bg-[var(--bg-secondary)] border-none text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--btn-primary)] outline-none"
                            >
                                <option value="" disabled>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] ml-1">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className='bg-[var(--bg-secondary)] border-none'
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        loading={isSubmitting}
                        className="w-full py-4 mt-4 bg-[var(--btn-primary)] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center gap-2"
                    >
                        {!isSubmitting && <UserPlus size={18} />}
                        {isSubmitting ? 'Creating Account...' : 'Get Started'}
                    </Button>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-center text-[var(--text-secondary)] text-sm">
                    Already part of the community?{' '}
                    <Link to='/login'>
                        <span className="text-[var(--btn-primary)] hover:underline font-bold cursor-pointer">
                            Log in
                        </span>
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Signup;