import React from "react";
import { Link } from "@inertiajs/react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Use framer-motion directly or switch to motion/react if preferred and installed
import { ThemeToggle } from "@/Components/ThemeToggle";
import { useSearch } from "@/Context/SearchContext";

const navLinks = [
    { name: "Equipos", href: "#" },
    { name: "Estadísticas", href: "#" },
    { name: "Noticias", href: "#" },
    { name: "Tienda", href: "#" },
];

export function MainHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { toggle } = useSearch();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 w-full z-[9999] bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
                {/* Floating Logo Container - Absolute Positioned */}
                <div
                    className={`absolute left-0 drop-shadow-xl z-[10000] pointer-events-none transition-all duration-500 ease-in-out
            ${isScrolled
                            ? "top-2 w-32 h-20 md:left-0"
                            : "top-2 w-32 h-20 md:top-[-10px] md:left-6 md:w-52 md:h-40"
                        }`}
                >
                    <img
                        src="/logo-light.png"
                        alt="Beisboleto Logo"
                        className="object-contain dark:hidden w-full h-full"
                    />
                    <img
                        src="/logo-dark.png"
                        alt="Beisboleto Logo"
                        className="object-contain hidden dark:block w-full h-full"
                    />
                </div>

                <div className="flex-1" />

                {/* Desktop Navigation - All Links Right */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                    <button
                        onClick={toggle}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                    >
                        <span className="flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            <span className="hidden lg:inline">Buscar...</span>
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold border border-neutral-200 dark:border-white/10 px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 group-hover:border-red-500/30 transition-colors">
                            <span className="text-xs">⌘</span>K
                        </div>
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group flex items-center gap-2 hover:text-red-600 dark:hover:text-white transition-colors relative"
                        >
                            <span>{link.name}</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    <div className="pl-4 border-l border-neutral-200 dark:border-white/10">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggle}
                        className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-950 overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                            <button
                                onClick={() => {
                                    toggle();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 py-3 px-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-red-600 dark:hover:text-white transition-colors text-left"
                            >
                                <Search className="w-4 h-4" />
                                <span>Buscar equipos...</span>
                            </button>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="py-3 px-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-red-600 dark:hover:text-white transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="py-3 px-4 flex items-center justify-between border-t border-neutral-100 dark:border-white/5 mt-2 pt-4">
                                <span>Cambiar Tema</span>
                                <ThemeToggle />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
