"use client";

import { useState } from "react";

export default function SauceSlab({
  title,
  url,
  index,
  totalPosts,
  theme,
  isVisible,
  isNextUpcoming,
  onUnlock,
}) {
  const postNumber = totalPosts - index;
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleClick = () => {
    if (isVisible) {
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    if (!isUnlocked) {
      setIsUnlocked(true);
      onUnlock && onUnlock(title);
      return;
    }

    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isVisible && !isNextUpcoming) return null;

  return (
    <div
      className="bio-link sauce-slab"
      style={{
        background: theme.linkBg,
        boxShadow: theme.linkShadow,
        cursor: "pointer",
        padding: "12px",
        borderRadius: "10px",
        transition: "0.3s ease",
        opacity: isVisible ? 1 : 0.7,
        filter: isVisible || isUnlocked ? "none" : "blur(2px)",
      }}
      onClick={handleClick}
    >
      <div
        className="sauce-text"
        style={{
          color: theme.linkColor,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {/* Post Number */}
        <span style={{ color: theme.avatarBorder }}>
          #{postNumber}
        </span>

        {/* 🔥 Title as Link */}
        <span
          style={{
            textDecoration: "underline",
            wordBreak: "break-word",
          }}
        >
          {isVisible || isUnlocked
            ? title
            : isNextUpcoming
            ? "🔒 Unlock to view"
            : "Hidden"}
        </span>
      </div>
    </div>
  );
}