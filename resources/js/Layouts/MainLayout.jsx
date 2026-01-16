import React from "react";
import { MainHeader } from "@/Components/MainHeader";
import { SearchProvider } from "@/Context/SearchContext";
import { SearchModal } from "@/Components/SearchModal";
// Theme provider concept merged here or handled globally if just class manipulation
// If strictly needed, we can wrap standard React Context.

export default function MainLayout({ children }) {
    return (
        <SearchProvider>
            <div className="min-h-screen font-sans text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950">
                <MainHeader />
                <main className="pt-20 min-h-screen">
                    {children}
                </main>
                <SearchModal />
            </div>
        </SearchProvider>
    );
}
