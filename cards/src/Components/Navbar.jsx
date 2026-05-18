import React from 'react'
import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
     {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-[oklch(0.93_0.002_0)] bg-[oklch(0.98_0.001_0)]/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-6 h-6 text-[oklch(0.45_0.21_262)]" />
            <span className="text-xl font-bold text-[oklch(0.15_0_0)]">GlobalSim</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="#" className="text-sm text-[oklch(0.15_0_0)]/70 hover:text-foreground transition">
              Products
            </Link>
            <Link to="#" className="text-sm text-[oklch(0.15_0_0)]/70 hover:text-foreground transition">
              Pricing
            </Link>
            <Link to="#" className="text-sm text-[oklch(0.15_0_0)]/70 hover:text-foreground transition">
              About
            </Link>
            <Link to="#" className="text-sm text-[oklch(0.15_0_0)]/70 hover:text-foreground transition">
              Support
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button variant="ghost" className='text-md font-medium h-8 rounded-md gap-1.5 px-3'>
              Sign In
            </button>
            <button size="sm" className="h-8 rounded-md gap-1.5 px-3 text-white text-md font-medium bg-[oklch(0.45_0.21_262)] hover:bg-primary/90">
              Get Started
            </button>
          </div>
        </div>
      </nav>
      </div>
  )
}

export default Navbar