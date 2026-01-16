import React, { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react"; // Use Inertia Link
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import MainLayout from '@/Layouts/MainLayout';
import { TEAM_COLORS, TEAM_STADIUMS } from "@/lib/constants";

// Helper components if needed from Lucide, already imported
// Constants should be in existing file or shared logic

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

export default function Home({ teams: initialTeams }) { // Inertia props
    // We can pass data from controller, or fetch client side. 
    // Plan mentions fetching data in backend, so let's assume `teams` is passed as a prop.
    // However, if we want to keep client-side fetching as fallback or match 1:1 behavior, we can do that too.
    // The previous Next.js code fetched on mount. Let's start with using props for better Inertia integration.

    // If teams are not passed from backend, we might need state.
    // Let's assume for now the controller will provide it.

    const teams = initialTeams || [];

    return (
        <MainLayout>
            <Head title="Beisboleto - Liga Mexicana de Béisbol" />

            <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-red-600 selection:text-white overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
                    {/* Abstract Background Shapes */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold tracking-wider mb-8 border border-red-200 dark:border-red-800/50 uppercase">
                                Temporada 2026
                            </span>

                            {/* LMB Logo (Large & Premium) */}
                            <div className="mb-10 relative w-64 h-64 lg:w-96 lg:h-96 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-105 hover:rotate-2">
                                <img
                                    src="https://r2.thesportsdb.com/images/media/league/badge/m3eza81748934903.png"
                                    alt="LMB - Liga Mexicana de Béisbol"
                                    className="object-contain w-full h-full"
                                />
                            </div>

                            <p className="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                                Vive la intensidad de la Liga Mexicana de Béisbol.
                                <br className="hidden md:block" /> Estadísticas, noticias y boletos en tiempo real.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* Featured Teams Grid */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
                                    <Trophy className="w-8 h-8 text-yellow-500" />
                                    Equipos Destacados
                                </h2>
                                <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
                                    Los protagonistas de la liga. Conoce sus estadios, historia y palmarés.
                                </p>
                            </div>
                        </div>

                        {teams.length === 0 ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                            </div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {teams.map((team) => (
                                    <Link href={`/teams/${team.id}`} key={team.id} className="block">
                                        <motion.div
                                            variants={itemVariants}
                                            className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                        >
                                            {/* Background Gradient */}
                                            <div
                                                className="absolute inset-0 opacity-95 transition-transform duration-500 group-hover:scale-105"
                                                style={{
                                                    background: `linear-gradient(135deg, ${TEAM_COLORS[team.id] || '#171717'} 0%, #000000 100%)`
                                                }}
                                            />

                                            {/* Huge Watermark Logo */}
                                            <div className="absolute -right-8 -bottom-12 w-80 h-80 opacity-30 transform rotate-12 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:opacity-40 pointer-events-none mix-blend-soft-light">
                                                <img
                                                    src={team.badge}
                                                    alt="Watermark"
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>

                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

                                            {/* Content */}
                                            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
                                                <div className="flex justify-between items-start">
                                                    {/* Main Logo - Larger now */}
                                                    <div className="w-24 h-24 relative filter drop-shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                                                        <img
                                                            src={team.badge}
                                                            alt={team.name}
                                                            className="object-contain w-full h-full"
                                                        />
                                                    </div>
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/20 shadow-sm">
                                                        LMB
                                                    </span>
                                                </div>

                                                <div className="transform transition-transform duration-300">
                                                    <h3 className="text-3xl font-black leading-none mb-4 tracking-tight drop-shadow-md">{team.name}</h3>

                                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 ease-in-out">
                                                        <div className="flex items-center gap-2 text-sm text-white/90 font-medium mb-4 bg-black/20 w-fit px-3 py-1 rounded-lg backdrop-blur-sm">
                                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                                                            {TEAM_STADIUMS[team.id] || team.stadium || "Estadio Local"}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm font-bold text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl backdrop-blur-md w-fit transition-colors border border-white/20">
                                                            Ver Detalles <ArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-neutral-200 dark:border-white/10 py-16 bg-neutral-50 dark:bg-neutral-950">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="md:col-span-2">
                            <h4 className="font-black text-2xl mb-6">BEISBOL MEXICO</h4>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-sm">
                                La plataforma oficial para los verdaderos fanáticos del rey de los deportes en México.
                                Estadísticas, noticias y la mejor cobertura de la LMB.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-sm uppercase tracking-wider text-neutral-900 dark:text-white">Enlaces Rápidos</h5>
                            <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                                <li><a href="#" className="hover:text-red-600 transition-colors">Calendario 2026</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Equipos</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Estadísticas</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Noticias</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-sm uppercase tracking-wider text-neutral-900 dark:text-white">Legal</h5>
                            <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                                <li><a href="#" className="hover:text-red-600 transition-colors">Términos y Condiciones</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-red-600 transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-200 dark:border-white/5 text-center text-neutral-400 text-xs">
                        <p>© {new Date().getFullYear()} Béisbol México. Todos los derechos reservados.</p>
                    </div>
                </footer>
            </div>
        </MainLayout>
    );
}
