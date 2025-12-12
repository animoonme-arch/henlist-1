// src/app/page.js
// This is an async Server Component (runs on the server).

import { getVisiblePostCount, originalData, backgroundToTheme, themeStyles, mockUser, getAdScripts } from '@/lib/data';
import BioLayout from '@/components/BioLayout';

// Force dynamic rendering to ensure the visibility count is accurate on every request.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
    // --- SERVER-SIDE LOGIC EXECUTION ---
    const totalVisibleCount = getVisiblePostCount();
    const themeKey = backgroundToTheme[mockUser.design.split('.')[0]] || 'default';
    const currentTheme = themeStyles[themeKey];
    const { adScriptTop, adScriptBottom } = getAdScripts();

    // Reverse the data: Newest (index 0) to Oldest (index N-1) for rendering
    const allPosts = [...originalData].reverse(); 

    const appData = {
        allPosts,
        visibleCount: totalVisibleCount,
        totalPosts: originalData.length,
        user: mockUser,
        theme: currentTheme,
    };
    
    // --- RENDER CLIENT COMPONENT ---
    return (
        <BioLayout 
            appData={appData} 
            adScripts={{ adScriptTop, adScriptBottom }} 
        />
    );
}

// --- METADATA (for SEO) ---
export const metadata = {
    title: `${mockUser.username} | Bio Link`,
    description: mockUser.bio,
};