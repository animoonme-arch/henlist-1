// src/components/SauceSlab.js
'use client';

import React, { useState, useCallback } from 'react';

const STORAGE_KEY = 'henpro_unlocked_titles';

// --- Client-Side Helper Functions ---

function getUnlockedTitles() {
    if (typeof window === 'undefined') return {}; // Safety check for SSR
    const stored = localStorage.getItem(STORAGE_KEY);
    try { return stored ? JSON.parse(stored) : {}; } catch (e) { return {}; }
}

function setUnlockedTitle(title) {
    if (typeof window === 'undefined') return;
    const unlocked = getUnlockedTitles();
    unlocked[title] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
}

function copyToClipboard(text, container, originalBg) {
    navigator.clipboard.writeText(text).then(() => {
        const originalShadow = container.style.boxShadow;
        container.style.background = 'linear-gradient(to right, #00CC00, #008000)';
        container.style.boxShadow = '0 0 15px rgba(0, 204, 0, 0.7)';
        
        setTimeout(() => {
            container.style.background = originalBg;
            container.style.boxShadow = originalShadow;
        }, 500);
    }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Failed to copy. Please copy manually: ' + text);
    });
}

// --- SauceSlab Component ---

export default function SauceSlab({ title, index, totalPosts, theme, isVisible, isNextUpcoming, onUnlock }) {
    const [isRevealed, setIsRevealed] = useState(false);
    
    // Check local storage for permanent unlock status
    const isPermanentlyUnlocked = !!getUnlockedTitles()[title];
    
    const postNumber = totalPosts - index;
    const originalBg = theme.linkBg;
    const linkColor = theme.linkColor;
    const postNumberColor = theme.avatarBorder;

    const finalDisplayState = isVisible && (isPermanentlyUnlocked || isRevealed);

    const handleClick = useCallback((e) => {
        const container = e.currentTarget;
        if (!isVisible || finalDisplayState) {
            if (finalDisplayState) {
                copyToClipboard(title, container, originalBg);
            }
            return;
        }

        if (!isRevealed) {
            setIsRevealed(true);
            setTimeout(() => {
                setUnlockedTitle(title);
                onUnlock(title); 
            }, 3000); 
        }
    }, [isVisible, finalDisplayState, isRevealed, title, originalBg, onUnlock]);
    
    // --- Render Logic ---
    let content, linkStyle, isClickable = false;

    if (!isVisible && isNextUpcoming) {
        // BLOCKED state (Coming Soon)
        linkStyle = { background: 'rgba(0, 0, 0, 0.4)', boxShadow: 'none', cursor: 'default', opacity: '0.5' };
        content = (
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: linkColor }}>
                <span style={{ color: postNumberColor, marginRight: 5 }}>#{postNumber}</span> Coming Soon...
            </div>
        );
    } else if (isVisible) {
        isClickable = true;

        if (finalDisplayState) {
            // UNLOCKED/REVEALED state
            linkStyle = { background: originalBg, boxShadow: theme.linkShadow };
            content = (
                <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '1.1rem', color: linkColor }}>
                    <span style={{ color: postNumberColor, marginRight: 5 }}>#{postNumber}:</span> {title}
                    <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, opacity: 0.8 }}>(Click to Copy)</span>
                </div>
            );
        } else {
            // LOCKED state (Click to Reveal)
            linkStyle = { background: originalBg, boxShadow: theme.linkShadow };
            content = (
                <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: linkColor }}>
                    <span style={{ color: postNumberColor, marginRight: 5 }}>#{postNumber}</span> Sauce (Click to Reveal)
                </div>
            );

            // Apply revealing styles if actively revealing
            if (isRevealed) {
                linkStyle = { background: theme.linkHoverBg, boxShadow: theme.linkHoverShadow };
                content = (
                    <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '1.1rem', color: linkColor }}>
                        <span style={{ display: 'block', marginBottom: 4 }}>#{postNumber} The Sauce is:</span>
                        <span style={{ fontSize: '1.2rem', color: postNumberColor }}>{title}</span>
                    </div>
                );
            }
        }
    } else {
        return null;
    }

    return (
        <div 
            className="bio-link" 
            data-post-number={postNumber} 
            data-title={title.toLowerCase()} 
            style={{ ...linkStyle, cursor: isClickable ? 'pointer' : 'default' }}
            onClick={isClickable ? handleClick : null}
        >
            {content}
        </div>
    );
}