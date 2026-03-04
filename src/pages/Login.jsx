import React, { useContext, useState } from 'react';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';
import cn from '../utils/cn.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../features/authSlice.js';
import { useLoginMutation } from '../services/auth.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fetchLogin , {isLoading : isLoggingIn , error , isError }] = useLoginMutation()

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            let res = await fetchLogin({
                email,
                password
            }).unwrap();
            if (!res.success) {
                throw new Error(res.message)
            } 
            dispatch(setLogin(res.user));
            navigate('/')
            alert('You have successfully login.')
        } catch (error) {
            alert(error.data.message)
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)] p-6">
            <div className="w-full max-w-md">
                {/* Brand Logo / Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--btn-primary)] shadow-sm border border-blue-100">
                        <ShieldCheck size={36} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-[var(--bg-primary)] p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[var(--border-subtle)]">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
                            Welcome <span className="text-[var(--btn-primary)]">Back</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] text-sm font-medium">
                            Securely log in to your health dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                                    Email Address
                                </label>
                                <Mail size={14} className="text-slate-300" />
                            </div>
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[var(--bg-secondary)] border-none h-12 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                                    Password
                                </label>
                                <Link to='/forget-password'>
                                    <button
                                        type="button"
                                        className="text-[11px] font-bold text-[var(--btn-primary)] hover:underline uppercase tracking-widest"
                                    >
                                        Forgot?
                                    </button>
                                </Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-[var(--bg-secondary)] border-none h-12 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        {/* Action Button */}
                        <Button
                            type="submit"
                            loading={isLoggingIn}
                            className="w-full py-4 mt-2 bg-[var(--btn-primary)] hover:bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                        >
                            {!isLoggingIn && <LogIn size={18} className="mr-2" />}
                            {isLoggingIn ? 'Authenticating...' : 'SIGN IN'}
                        </Button>
                    </form>

                    {/* Signup Redirect */}
                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-[var(--text-secondary)] text-sm">
                            New to Health Mate?{' '}
                            <Link to="/signup">
                                <span className="text-[var(--btn-primary)] font-bold hover:underline cursor-pointer">
                                    Create account
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Secure Footer Note */}
                <p className="text-center mt-8 text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                    <ShieldCheck size={12} /> END-TO-END ENCRYPTED HEALTH DATA
                </p>
            </div>
        </main>
    );
};

export default Login;