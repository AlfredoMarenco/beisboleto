import React from "react";
import { Link, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Trophy, Facebook, Twitter, Instagram, Globe, Users, Info, Ticket } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";
import { TEAM_COLORS, TEAM_STADIUMS, TEAM_INFO } from "@/lib/constants";

// Helper to format dates
const formatDate = (dateString, timeString) => {
    if (!dateString) return "Fecha por definir";
    // Construct valid date string. Input format from API often 'YYYY-MM-DD'.
    // If timeString is present, append it.
    const dateStr = timeString ? `${dateString}T${timeString}` : dateString;
    const date = new Date(dateStr);

    // Fallback if invalid date
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

export default function Show({ team, matches }) {
    // Props receive data from controller
    const { id, name: teamName, badge: teamBadge, stadium } = team;
    const { past, upcoming } = matches;

    const teamColor = TEAM_COLORS[String(id)] || "#171717";

    if (!teamName) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-20">
                    <h2 className="text-2xl font-bold mb-4">Equipo no encontrado</h2>
                    <Link href="/" className="text-red-600 hover:underline">
                        Volver al inicio
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title={`${teamName} - Beisboleto`} />
            <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-red-600 selection:text-white pb-12">
                {/* Team Header */}
                <section className="relative overflow-hidden mb-12">
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            background: `linear-gradient(135deg, ${teamColor} 0%, #000000 100%)`,
                            opacity: 0.9
                        }}
                    />


                    {/* Watermark Logo */}
                    <div className="absolute -right-20 -bottom-32 w-[500px] h-[500px] opacity-20 rotate-12 pointer-events-none mix-blend-soft-light z-0">
                        <img src={teamBadge} alt="" className="object-contain w-full h-full" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="w-40 h-40 md:w-56 md:h-56 relative bg-white/10 backdrop-blur-xl rounded-full p-6 border border-white/20 shadow-2xl shadow-black/50"
                        >
                            <img
                                src={teamBadge}
                                alt={teamName}
                                className="object-contain w-full h-full p-4"
                            />
                        </motion.div>

                        <div className="text-center md:text-left text-white">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white/90 text-xs font-bold tracking-wider mb-4 border border-white/20 uppercase">
                                    Liga Mexicana de Béisbol
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight text-white drop-shadow-lg">
                                    {teamName}
                                </h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-neutral-200 font-medium">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        {TEAM_STADIUMS[id] || stadium || "Estadio Local"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Trophy className="w-4 h-4 text-yellow-400" />
                                        Temporada 2025
                                    </div>
                                </div>

                                {TEAM_INFO[id]?.ticketsUrl && (
                                    <div className="mt-8 flex justify-center md:justify-start">
                                        <a
                                            href={TEAM_INFO[id].ticketsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-2xl shadow-xl shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-[-150%] transition-transform duration-700 rotate-12" />
                                            <Ticket className="w-6 h-6 animate-pulse" />
                                            <span className="text-lg">Comprar Boletos</span>
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-neutral-500 hover:text-red-600 mb-8 transition-colors font-medium text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver al Inicio
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Club Info Sidebar */}
                        <div className="lg:col-span-3 space-y-6">
                            <section className="bg-white dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-white/5 p-6 shadow-sm">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-red-600" />
                                    Información
                                </h2>

                                {TEAM_INFO[id] && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xs uppercase text-neutral-500 font-bold mb-2 tracking-wider">Estadio</h3>
                                            <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                                {TEAM_STADIUMS[id] || stadium || "Estadio Local"}
                                            </p>
                                            <p className="text-sm text-neutral-500 mt-1 flex items-start gap-1">
                                                <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                                                {TEAM_INFO[id].stadiumInfo.address}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-xs uppercase text-neutral-500 font-bold mb-2 tracking-wider">Capacidad</h3>
                                            <p className="font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                                                <Users className="w-4 h-4 text-neutral-400" />
                                                {TEAM_INFO[id].stadiumInfo.capacity} aficionados
                                            </p>
                                        </div>

                                        {TEAM_INFO[id].founded && (
                                            <div>
                                                <h3 className="text-xs uppercase text-neutral-500 font-bold mb-2 tracking-wider">Fundación</h3>
                                                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                                    {TEAM_INFO[id].founded}
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-xs uppercase text-neutral-500 font-bold mb-3 tracking-wider">Redes Sociales</h3>
                                            <div className="flex gap-3">
                                                {TEAM_INFO[id].social.facebook && (
                                                    <a href={TEAM_INFO[id].social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600/10 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                                                        <Facebook className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {TEAM_INFO[id].social.instagram && (
                                                    <a href={TEAM_INFO[id].social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-600/10 text-pink-600 rounded-lg hover:bg-pink-600 hover:text-white transition-colors">
                                                        <Instagram className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {TEAM_INFO[id].social.twitter && (
                                                    <a href={TEAM_INFO[id].social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-500/10 text-sky-500 rounded-lg hover:bg-sky-500 hover:text-white transition-colors">
                                                        <Twitter className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {TEAM_INFO[id].social.website && (
                                                    <a href={TEAM_INFO[id].social.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors">
                                                        <Globe className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Upcoming Matches */}
                        <div className="lg:col-span-5">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 decoration-red-600">
                                <span className="w-1.5 h-8 bg-red-600 rounded-full" />
                                Próximos Partidos
                            </h2>
                            <div className="space-y-4">
                                {upcoming.length > 0 ? (
                                    upcoming.map((event) => (
                                        <MatchCard key={event.idEvent} event={event} isUpcoming teamId={id} />
                                    ))
                                ) : (
                                    <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center text-neutral-500">
                                        <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                        <p>No hay partidos programados próximamente.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Past Results */}
                        <div className="lg:col-span-4">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
                                Resultados Recientes
                            </h2>
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {past.length > 0 ? (
                                    past.map((event) => (
                                        <MatchCard key={event.idEvent} event={event} teamId={id} />
                                    ))
                                ) : (
                                    <p className="text-neutral-500 italic">No hay resultados recientes disponibles.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

function MatchCard({ event, isUpcoming = false, teamId }) {
    const isHome = event.idHomeTeam == teamId;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-white/5 overflow-hidden hover:border-red-600/30 dark:hover:border-red-500/30 transition-colors shadow-sm"
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <span>{formatDate(event.dateEventLocal || event.dateEvent, event.strTimeLocal || event.strTime)}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded ${isHome ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
                            {isHome ? 'Local' : 'Visitante'}
                        </span>
                        <span className={`px-2 py-1 rounded ${isUpcoming ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                            {isUpcoming ? 'Programado' : 'Finalizado'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    {/* Home Team */}
                    <div className={`flex-1 flex flex-col items-center text-center gap-2 ${isHome ? 'opacity-100' : 'opacity-70 grayscale-[0.5]'}`}>
                        <div className="relative w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full p-2 border border-neutral-200 dark:border-white/10">
                            {event.strHomeTeamBadge && (
                                <img src={event.strHomeTeamBadge} alt={event.strHomeTeam} className="object-contain w-full h-full p-1" />
                            )}
                        </div>
                        <span className="text-sm font-bold leading-tight">{event.strHomeTeam}</span>
                        {!isUpcoming && <span className={`text-2xl font-black ${isHome ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}>{event.intHomeScore}</span>}
                    </div>

                    <div className="text-neutral-300 dark:text-neutral-700 font-black text-xl">VS</div>

                    {/* Away Team */}
                    <div className={`flex-1 flex flex-col items-center text-center gap-2 ${!isHome ? 'opacity-100' : 'opacity-70 grayscale-[0.5]'}`}>
                        <div className="relative w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full p-2 border border-neutral-200 dark:border-white/10">
                            {event.strAwayTeamBadge && (
                                <img src={event.strAwayTeamBadge} alt={event.strAwayTeam} className="object-contain w-full h-full p-1" />
                            )}
                        </div>
                        <span className="text-sm font-bold leading-tight">{event.strAwayTeam}</span>
                        {!isUpcoming && <span className={`text-2xl font-black ${!isHome ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`}>{event.intAwayScore}</span>}
                    </div>
                </div>

                {event.strVenue && (
                    <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-white/5 text-xs text-center text-neutral-500 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.strVenue}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
