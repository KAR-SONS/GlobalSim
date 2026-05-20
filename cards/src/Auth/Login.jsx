import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {supabase} from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        navigate("/products");
      }
    };

    checkUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful");
    navigate("/products");
  };
  return (
     <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-white">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-2">
              GlobalSim
            </h1>
            <p className="text-gray-600">Welcome back! Login to continue</p>
          </div>

          <div className="bg-white border-2 border border-blue-100 rounded-2xl p-8">
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <label className="text-md font-semibold text-black">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-3 py-1 border border-blue-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-md font-semibold text-black">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-3 py-1 border border-blue-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 text-black"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-600 text-white font-bold h-11 rounded-lg"
                >
                  Login
                </button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-blue-500 font-semibold hover:text-blue-600">
                  Sign up here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login