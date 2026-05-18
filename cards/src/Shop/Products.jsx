import { CardSim,Search,ChevronDown } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const Products = () => {
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.001_0)]">
         {/* Header */}
      <nav className="border-b border-[oklch(0.93_0.002_0)] bg-[oklch(0.98_0.001_0)]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[oklch(0.15_0_0)] hover:text-primary transition">
            GlobalSim
          </Link>
          <div className="flex items-center gap-4">
            <button variant="ghost" size="sm" className='text-md font-medium border border-[oklch(0.93_0.002_0)] h-8 rounded-md gap-1.5 px-3'>
              Account
            </button>
            <button size="sm" className="h-8 rounded-md gap-1.5 px-3 bg-[oklch(0.45_0.21_262)] text-white font-medium text-md hover:bg-primary/90">
              Cart (0)
            </button>
          </div>
        </div>
      </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[oklch(0.15_0_0)] mb-3">Choose Your SIM Card</h1>
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
              className="pl-10 px-3 py-1 rounded-md bg-[oklch(1 _0_0)] border border-[oklch(0.93_0.002_0)]"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button variant="outline" size="sm" className="inline-flex items-center justify-center rounded-md border border-[oklch(0.93_0.002_0)] gap-2 h-8 rounded-md gap-1.5 px-3 font-medium">
              Region <ChevronDown className="w-4 h-4" />
            </button>
            <button variant="ghost" size="sm" className="h-8 rounded-md gap-1.5 px-3 font-medium">
              Clear filters
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
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

export default Products