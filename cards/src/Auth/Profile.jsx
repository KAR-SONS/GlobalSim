import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { CardSim } from 'lucide-react'
import {supabase} from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    // GET LOGGED IN USER
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    // GET PROFILE
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setProfile(data);
  };

  return (
     <div className="min-h-screen bg-[oklch(0.98_0.001_0)]">
        {/* Header */}
      <nav className="border-b border-[oklch(0.15_0_0)] bg-[oklch(0.98_0.001_0)]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[oklch(0.15_0_0)] hover:text-primary transition">
            GlobalSim
          </Link>
        </div>
      </nav>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[oklch(0.45_0.21_262)]/10 to-[oklch(0.5_0.18_189)]/10 rounded-2xl p-8 mb-12 border border-[oklch(0.45_0.21_262)]/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[oklch(0.45_0.21_262)]/20 flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[oklch(0.15_0_0)] mb-2">{profile?.name}</h1>
                <p className="text-[oklch(0.15_0_0)]/60">{profile?.email}</p>
                <p className="text-sm text-[oklch(0.15_0_0)]/50 mt-1"> Member since{" "}
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : ""}</p>
              </div>
            </div>
          </div>
        </div>

         {/* My Sim Cards */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[oklch(0.15_0_0)] mb-3">My Sim Cards</h1>
          <p className="text-lg text-[oklch(0.15_0_0)]/60">
            SIM cards you've purchased will appear here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="card rounded-lg bg-[oklch(1_0_0)] border border-[oklch(0.93_0.002_0)] hover:border-primary/50 overflow-hidden transition-all hover:shadow-lg group cursor-pointer h-full flex flex-col">
         <div className='flex items-center justify-center p-2'>
            <div className="bg-[oklch(0.45_0.21_262)]/10 w-18 h-18 rounded-lg flex items-center justify-center mb-4 transition-colors">
              <CardSim className="w-20 h-20 p-4 text-blue-900" />
            </div>
            </div>
            <div className="px-4 py-2 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-[oklch(0.15_0_0)] mb-1">Airtel Zambia Sim</h3>
              <p className="text-md font-medium text-[oklch(0.15_0_0)]/60 mb-4 flex-1">
                5GB Data | 100 Mins 
              </p>
              <div className="mt-auto">
                <p className="text-lg font-bold text-[oklch(0.45_0.21_262)] mb-2">$2.99 | Kes 300</p>
                <button size="sm" className="w-full h-8 rounded-md bg-[oklch(0.45_0.21_262)] text-white font-medium hover:bg-primary/90">
                  Add to Cart
                </button>
              </div>
            </div>
            </div>
        </div>

        </div>
     </div>
  )
}

export default Profile