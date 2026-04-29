'use client'
import { Menu, X, ShoppingCart, User, Package, Settings, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const navLinks = [
    { name: 'Cart', href: '#', icon: ShoppingCart },
    { name: 'Orders', href: '#', icon: Package },
    { name: 'Profile', href: '#', icon: User },
    { name: 'Settings', href: '#', icon: Settings },
    { name: 'Add Items', href: '/add/product', icon: Plus },
]

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const drawerRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isMenuOpen])

    return (
        <>
            {/* ── Navbar ── */}
            <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-[68px] flex items-center justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(true)
                            }}
                            className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors md:hidden"
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </button>
                        <div className="flex items-center gap-2.5">
                            <Image
                                height={60}
                                width={60}
                                src="/logo.png"
                                alt="ApnaMart"
                                className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-xl"
                            />
                            <span className="text-xl sm:text-[22px] font-semibold tracking-tight">
                                ApnaMart
                            </span>
                        </div>
                    </div>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 rounded-xl text-[15px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="ml-3 bg-gray-900 text-white text-[15px] font-medium px-5 py-2 rounded-xl hover:bg-gray-700 transition-colors">
                            Sign out
                        </button>
                    </div>

                    {/* Mobile icons */}
                    <div className="flex items-center gap-1 md:hidden">
                        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Cart">
                            <ShoppingCart size={22} />
                            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-0.5">
                                3
                            </span>
                        </button>
                        <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Profile">
                            <User size={22} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* ── Drawer ── */}
            <div
                ref={drawerRef}
                onClick={(e) => e.stopPropagation()}
                className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 flex flex-col
          border-r border-gray-100 transform transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                aria-modal="true"
                role="dialog"
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[15px] font-medium">
                            HU
                        </div>
                        <div>
                            <p className="text-[15px] font-medium text-gray-900">Hello, User</p>
                            <p className="text-[13px] text-gray-500 mt-0.5">user@email.com</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer links */}
                <nav className="flex-1 overflow-y-auto">
                    {navLinks.map(({ name, href, icon: Icon }) => (
                        <a
                            key={name}
                            href={href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-4 px-5 py-4 text-[15px] font-medium text-gray-800
                border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                            <Icon size={20} className="text-gray-400" />
                            {name}
                            {name === 'Cart' && (
                                <span className="ml-auto bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    3
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Drawer footer */}
                <div className="p-5 border-t border-gray-100">
                    <button className="w-full bg-gray-900 text-white text-[15px] font-medium py-3.5 rounded-xl hover:bg-gray-700 transition-colors">
                        Sign out
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar