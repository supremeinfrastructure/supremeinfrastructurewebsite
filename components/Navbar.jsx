'use client'
import React, { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, X, Menu as MenuIcon } from "lucide-react";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }) {
    const [active, setActive] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [scrolled, setScrolled] = useState(false);
    const overlayRef = useRef(null);

    // Handle scroll to add background blur on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    // Close menu on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") closeMenu(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // Close menu on route change (works if using next/navigation)
    useEffect(() => {
        const handleRouteChange = () => closeMenu();
        window.addEventListener("popstate", handleRouteChange);
        return () => window.removeEventListener("popstate", handleRouteChange);
    }, []);

    const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
        setOpenDropdowns({});
    }, []);

    const toggleDropdown = useCallback((key) => {
        setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-2 inset-x-0 mx-auto z-50 transition-all duration-300",
                    // On mobile: full width with small margin; on lg+: max-width centered
                    "w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] lg:max-w-4xl",
                    "left-1/2 -translate-x-1/2",
                    scrolled && "drop-shadow-lg",
                    className
                )}
            >
                {/* ── Mobile / Tablet Header Bar ── */}
                <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    {/* Logo */}
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                        <img
                            src="/images/home/urlLogo.png"
                            alt="Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Hamburger */}
                    <button
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                    </button>
                </div>

                {/* ── Desktop Menu ── */}
                <div className="hidden lg:block">
                    <Menu setActive={setActive}>
                        <Link href="/">
                            <MenuItem setActive={setActive} active={active} item="Home" />
                        </Link>

                        <MenuItem setActive={setActive} active={active} item="About">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/about/supremeInfrastructure">Supreme Infrastructure</HoveredLink>
                                <HoveredLink href="/about/architecturalDesigns">Architectural Designs</HoveredLink>
                            </div>
                        </MenuItem>

                        <Link href="/services/servicesdashboard">
                            <MenuItem setActive={setActive} active={active} item="Portfolio" />
                        </Link>

                        <MenuItem setActive={setActive} active={active} item="Projects">
                            <div className="text-sm grid grid-cols-2 gap-10 p-4">
                                <ProductItem
                                    title="Commercial Projects"
                                    href="/project/commercialprojects"
                                    src="/images/home/commercial.jpg"
                                    description="Explore our commercial project portfolio."
                                />
                                <ProductItem
                                    title="Residential Projects"
                                    href="/project/residencialprojects"
                                    src="/images/home/residencial2.jpg"
                                    description="Discover our residential project designs."
                                />
                                <ProductItem
                                    title="Guest House"
                                    href="/project/guesthouse"
                                    src="/images/home/guestHouse.jpg"
                                    description="View our guest house projects."
                                />
                                <ProductItem
                                    title="Green Initiatives"
                                    href="/project/horticultureprojects"
                                    src="/images/home/greeninitiative.jpeg"
                                    description="Explore Our Green Creations"
                                />
                            </div>
                        </MenuItem>

                        <MenuItem setActive={setActive} active={active} item="Contact">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/contact">Contact Us</HoveredLink>
                                <HoveredLink href="/contact/career">Career</HoveredLink>
                            </div>
                        </MenuItem>
                    </Menu>
                </div>
            </nav>

            {/* ── Mobile Overlay (backdrop) ── */}
            {isMenuOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* ── Mobile Slide-in Drawer ── */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className={cn(
                    "fixed top-0 left-0 h-full z-50 lg:hidden",
                    // Responsive drawer width
                    "w-4/5 max-w-xs sm:max-w-sm",
                    "bg-white dark:bg-gray-900 shadow-2xl",
                    "transform transition-transform duration-300 ease-in-out",
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <Link href="/" onClick={closeMenu}>
                        <img
                            src="/images/home/urlLogo.png"
                            alt="Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                    <button
                        onClick={closeMenu}
                        aria-label="Close menu"
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Nav Items */}
                <nav className="mt-4 flex flex-col px-6 pb-8 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <MobileMenuItem href="/" onClick={closeMenu}>Home</MobileMenuItem>

                    <MobileMenuDropdown
                        title="About"
                        isOpen={openDropdowns.about}
                        onClick={() => toggleDropdown('about')}
                    >
                        <MobileMenuItem href="/about/supremeInfrastructure" onClick={closeMenu}>
                            Supreme Infrastructure
                        </MobileMenuItem>
                        <MobileMenuItem href="/about/architecturalDesigns" onClick={closeMenu}>
                            Architectural Designs
                        </MobileMenuItem>
                    </MobileMenuDropdown>

                    <MobileMenuItem href="/services/servicesdashboard" onClick={closeMenu}>
                        Portfolio
                    </MobileMenuItem>

                    <MobileMenuDropdown
                        title="Projects"
                        isOpen={openDropdowns.projects}
                        onClick={() => toggleDropdown('projects')}
                    >
                        <MobileMenuItem href="/project/commercialprojects" onClick={closeMenu}>
                            Commercial Projects
                        </MobileMenuItem>
                        <MobileMenuItem href="/project/residencialprojects" onClick={closeMenu}>
                            Residential Projects
                        </MobileMenuItem>
                        <MobileMenuItem href="/project/guesthouse" onClick={closeMenu}>
                            Guest House
                        </MobileMenuItem>
                        <MobileMenuItem href="/project/horticultureprojects" onClick={closeMenu}>
                            Green Initiatives
                        </MobileMenuItem>
                    </MobileMenuDropdown>

                    <MobileMenuDropdown
                        title="Contact"
                        isOpen={openDropdowns.contact}
                        onClick={() => toggleDropdown('contact')}
                    >
                        <MobileMenuItem href="/contact" onClick={closeMenu}>
                            Contact Us
                        </MobileMenuItem>
                        <MobileMenuItem href="/contact/career" onClick={closeMenu}>
                            Career
                        </MobileMenuItem>
                    </MobileMenuDropdown>
                </nav>
            </div>
        </>
    );
}

// ── Sub-components ──────────────────────────────────────────────

const MobileMenuItem = React.memo(({ href, onClick, children }) => (
    <Link
        href={href}
        onClick={onClick}
        className="block py-3 text-base font-medium text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 border-b border-gray-50 dark:border-gray-800 transition-colors duration-200"
    >
        {children}
    </Link>
));
MobileMenuItem.displayName = "MobileMenuItem";

const MobileMenuDropdown = React.memo(({ title, isOpen, onClick, children }) => (
    <div className="border-b border-gray-50 dark:border-gray-800">
        <button
            onClick={onClick}
            aria-expanded={isOpen}
            className="flex items-center justify-between w-full py-3 text-base font-medium text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 focus:outline-none"
        >
            {title}
            <ChevronDown
                className={cn(
                    "w-4 h-4 transition-transform duration-200 text-gray-400",
                    isOpen && "rotate-180 text-amber-500"
                )}
            />
        </button>

        <div
            className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100 mb-2" : "max-h-0 opacity-0"
            )}
        >
            <div className="pl-4 flex flex-col space-y-1 border-l-2 border-amber-400 ml-1">
                {children}
            </div>
        </div>
    </div>
));
MobileMenuDropdown.displayName = "MobileMenuDropdown";

export default NavbarDemo;