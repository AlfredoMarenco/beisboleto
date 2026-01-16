import React from "react";
import { Link, router } from "@inertiajs/react";
import { Search, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/Context/SearchContext";


export function SearchModal() {
    const { isOpen, close } = useSearch();
    const [teams, setTeams] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    // Fetch teams on mount (once opened)
    React.useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('/api/teams');
                if (response.ok) {
                    const data = await response.json();
                    setTeams(data);
                }
            } catch (error) {
                console.error("Failed to load teams", error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && teams.length === 0) {
            fetchTeams();
        }
    }, [isOpen, teams.length]);

    // Reset query when closed
    React.useEffect(() => {
        if (!isOpen) {
            setQuery("");
        }
    }, [isOpen]);

    const filteredTeams = React.useMemo(() => {
        if (!query) return teams;
        return teams.filter((team) =>
            team.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [teams, query]);

    const handleNavigate = (teamId) => {
        close();
        router.visit(`/teams/${teamId}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-x-4 top-24 md:inset-x-0 md:w-[600px] md:mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl z-[10001] overflow-hidden border border-neutral-200 dark:border-white/10"
                    >
                        {/* Header / Input */}
                        <div className="p-4 border-b border-neutral-100 dark:border-white/5 flex items-center gap-3">
                            <Search className="w-5 h-5 text-neutral-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Buscar equipos..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
                            />
                            <button
                                onClick={close}
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-neutral-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {loading ? (
                                <div className="p-8 text-center text-neutral-500 text-sm">
                                    Cargando...
                                </div>
                            ) : filteredTeams.length > 0 ? (
                                <div className="flex flex-col gap-1">
                                    {filteredTeams.map((team) => (
                                        <button
                                            key={team.id}
                                            onClick={() => handleNavigate(team.id)}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group text-left w-full"
                                        >
                                            <div className="relative w-10 h-10 bg-white dark:bg-neutral-950 rounded-lg p-1.5 shadow-sm border border-neutral-100 dark:border-white/10">
                                                <img
                                                    src={team.badge}
                                                    alt={team.name}
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>
                                            <span className="flex-1 font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                                {team.name}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-neutral-500">
                                    <p>No se encontraron equipos.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-white/5 text-xs text-center text-neutral-400">
                            Presiona &apos;Esc&apos; para cerrar
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
