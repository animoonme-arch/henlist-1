// src/components/BioLayout.js
'use client';

import React, { useState, useEffect } from 'react';
import SauceSlab from './SauceSlab';

export default function BioLayout({ appData, adScripts }) {
    const { allPosts, visibleCount, totalPosts, user, theme } = appData;
    const [searchQuery, setSearchQuery] = useState('');
    const [unlockedState, setUnlockedState] = useState({});

    // Load initial unlocked state on client-side mount
    useEffect(() => {
        const STORAGE_KEY = 'henpro_unlocked_titles';
        const stored = localStorage.getItem(STORAGE_KEY);
        try {
            setUnlockedState(stored ? JSON.parse(stored) : {});
        } catch (e) {
            setUnlockedState({});
        }
    }, []);

    // Function to re-render slabs when a new post is unlocked
    const handleUnlock = (title) => {
        setUnlockedState(prev => ({ ...prev, [title]: true }));
    };

    // Filter posts based on search query
    const filteredPosts = allPosts.filter((title, index) => {
        const titleText = title.toLowerCase();
        const search = searchQuery.toLowerCase().trim();
        
        if (search === "") return true;

        const postNumber = totalPosts - index;
        
        const isExactNumeric = !isNaN(parseInt(search, 10)) && parseInt(search, 10).toString() === search;

        if (isExactNumeric) {
            return postNumber.toString() === search;
        } else {
            return titleText.includes(search);
        }
    });
    
    // Determine which posts to render
    const slabsToRender = [];
    let upcomingCount = 0;

    allPosts.forEach((title, index) => {
        const sequentialNumber = totalPosts - index;
        const isVisible = sequentialNumber <= visibleCount;
        
        if (!filteredPosts.includes(title) && searchQuery.trim() !== "") {
             return; // Filtered out and search is active
        }

        if (isVisible) {
            // Render visible posts that match the filter
            if (filteredPosts.includes(title)) {
                slabsToRender.push({ title, index, isVisible: true, isNextUpcoming: false });
            }
        } else if (searchQuery.trim() === "") {
            // Only show 'Coming Soon' when search is empty
            const isNextUpcoming = (sequentialNumber > visibleCount) && 
                                  (sequentialNumber <= visibleCount + 2) && 
                                  (upcomingCount < 2);
            
            if (isNextUpcoming) {
                slabsToRender.push({ title, index, isVisible: false, isNextUpcoming: true });
                upcomingCount++;
            }
        }
    });

    // Convert theme object into dynamic CSS variables for inline style
    const getCssVars = () => {
        return Object.keys(theme).map(key => `--theme-${key}: ${theme[key]};`).join(' ');
    };

    return (
        <div className="page-wrapper" style={{ [getCssVars()]: '' }}>
            {/* Ad Script Top */}
            <div dangerouslySetInnerHTML={{ __html: adScripts.adScriptTop }} />
            
            <div className="bio-page">
                {/* Image paths are relative to the /public directory */}
                <img src={`/${user.design}`} alt="background" className="bio-background" />

                <div className="bio-content">
                    <div className="bio-ad ad-top"></div> 

                    <div className="bio-avatar">
                        <img src={user.avatar} alt="avatar" />
                    </div>

                    <div className="bio-username">
                        {user.username}
                    </div>

                    <div className="bio-description">
                        {user.bio}
                        <br />({visibleCount} of {totalPosts} Posts Visible)
                    </div>
                    
                    <div className="bio-search-container">
                        <input 
                            type="text" 
                            id="bio-search-input" 
                            className="bio-search-input" 
                            placeholder="Search by Exact Post # (e.g., 10) or Title..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="bio-links" id="bio-links-container">
                        {slabsToRender.map(post => (
                            <SauceSlab 
                                key={post.index} 
                                title={post.title}
                                index={post.index}
                                totalPosts={totalPosts}
                                theme={theme}
                                isVisible={post.isVisible}
                                isNextUpcoming={post.isNextUpcoming}
                                onUnlock={handleUnlock}
                            />
                        ))}
                    </div>

                    <div className="bio-ad ad-bottom"></div>
                </div>
            </div>
            
            {/* Ad Script Bottom */}
            <div dangerouslySetInnerHTML={{ __html: adScripts.adScriptBottom }} />
        </div>
    );
}