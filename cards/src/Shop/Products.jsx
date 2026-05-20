import { CardSim,Search,ChevronDown } from 'lucide-react'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {supabase} from '../supabaseClient'


const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq('is_active', true);

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data);
      const uniqueRegions = Array.from(
        new Set(data?.map((product) => product.region).filter(Boolean))
      ).sort();
      setRegions(uniqueRegions);
      // fetch cart count for logged in user
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (user) {
          const { data: cartItems, error: cartError } = await supabase
            .from('cart_items')
            .select('id')
            .eq('user_id', user.id);
          if (!cartError) {
            const total = cartItems?.length || 0;
            setCartCount(total);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const total = e?.detail?.total ?? 0;
      setCartCount(total);
    };
    window.addEventListener('cart-updated', handler);
    return () => window.removeEventListener('cart-updated', handler);
  }, []);

  const filteredProducts = products?.filter((product) => {
    const matchesRegion = !selectedRegion || product.region === selectedRegion;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleAddToCart = async (product) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // check if item exists (no quantity concept)
      const { data: existing, error: existErr } = await supabase
        .from('cart_items')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existErr && existErr.code !== 'PGRST116') {
        // PGRST116 is 'row not found' for single(); treat as not found
        console.error(existErr.message || existErr);
        return;
      }

      if (existing && existing.id) {
        // already in cart — optionally navigate to cart
        navigate('/cart');
        return;
      }

      const { error: insErr } = await supabase
        .from('cart_items')
        .insert({ user_id: user.id, product_id: product.id });

      if (insErr) {
        console.error(insErr.message || insErr);
        return;
      }

      // update local counter
      setCartCount((c) => c + 1);
      try { window.dispatchEvent(new CustomEvent('cart-updated', { detail: { total: cartCount + 1 } })); } catch(e){}
    } catch (err) {
      console.error(err?.message || err);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.001_0)]">
         {/* Header */}
      <nav className="border-b border-[oklch(0.93_0.002_0)] bg-[oklch(0.98_0.001_0)]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[oklch(0.15_0_0)] hover:text-primary transition">
            GlobalSim
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/profile')} variant="ghost" size="sm" className='text-md font-medium border border-[oklch(0.93_0.002_0)] h-8 rounded-md gap-1.5 px-3'>
              Account
            </button>
            <button onClick={() => navigate('/cart')} size="sm" className="h-8 rounded-md gap-1.5 px-3 bg-[oklch(0.45_0.21_262)] text-white font-medium text-md hover:bg-primary/90">
              Cart ({cartCount})
            </button>
          </div>
        </div>
      </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[oklch(0.15_0_0)] mb-3">Choose Your SIM Card</h1>
          <p className="text-lg text-[oklch(0.15_0_0)]/60">
            Select from our wide range of international SIM cards and stay connected worldwide
          </p>
        </div>
        
         {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[oklch(0.15_0_0)]/40" />
            <input
              placeholder="Search by country or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 px-3 py-2 rounded-md bg-[oklch(1 _0_0)] border border-[oklch(0.93_0.002_0)] focus:outline-none focus:border-primary/50 transition"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-8 rounded-md border border-[oklch(0.93_0.002_0)] bg-[oklch(1 _0_0)] px-3 text-sm focus:outline-none focus:border-primary/50 transition"
            >
              <option value="">All regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('');
              }}
              className="h-8 rounded-md gap-1.5 px-3 font-medium hover:bg-[oklch(0.93_0.002_0)]/50 transition"
            >
              Clear filters
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
           {filteredProducts?.map((product) => (
         <div key={product.id} className="card rounded-lg bg-[oklch(1_0_0)] border border-blue-200 hover:border-primary/50 overflow-hidden transition-all hover:shadow-lg group cursor-pointer h-full flex flex-col">
         <div className='flex items-center justify-center p-1 md:p-2'>
            <div className="bg-[oklch(0.45_0.21_262)]/10 w-14 h-14 md:w-30 md:h-30 rounded-lg flex items-center justify-center mb-2 md:mb-4 transition-colors">
              <CardSim className="w-10 h-10 md:w-30 md:h-30 p-1 md:p-4 text-blue-900" />
            </div>
            </div>
            <div className="px-2 md:px-4 py-1 md:py-2 flex-1 flex flex-col">
              <h3 className="text-md md:text-lg font-semibold text-[oklch(0.15_0_0)] mb-1">{product.name}</h3>
              <p className="text-sm md:text-md font-medium text-[oklch(0.15_0_0)]/60 mb-2 md:mb-4 flex-1">
                {product.data} | {product.airtime}
              </p>
              <div className="mt-auto">
                <p className="text-sm md:text-lg font-bold text-[oklch(0.45_0.21_262)] mb-1 md:mb-2">${product.dollars} | Kes {product.price}</p>
                <button 
                 onClick={() => handleAddToCart(product)}
                 size="sm" 
                 className="w-full h-6 md:h-8 rounded-md text-sm md:text-sm bg-[oklch(0.45_0.21_262)] text-white font-medium hover:bg-primary/90">
                  Add to Cart
                </button>
              </div>
            </div>
            </div>
           ))}
        </div>

        </div>
    </div>
  )
}

export default Products