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
    // ✅ If already visible → open directly
    if (isVisible) {
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // 🔒 Locked → unlock first
    if (!isUnlocked) {
      setIsUnlocked(true);
      onUnlock && onUnlock(title);
      return;
    }

    // 🔓 After unlock → open
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // ❌ Hide completely if not visible & not upcoming
  if (!isVisible && !isNextUpcoming) return null;

  return (
    <div
      className="bio-link sauce-slab"
      style={{
        background: theme.linkBg,
        boxShadow: theme.linkShadow,
        cursor: "pointer",
        opacity: isVisible ? 1 : 0.7,
        filter: isVisible ? "none" : "blur(2px)",
        transition: "0.3s ease",
      }}
      onClick={handleClick}
    >
      <div className="sauce-text" style={{ color: theme.linkColor }}>
        <span style={{ color: theme.avatarBorder }}>
          #{postNumber}
        </span>{" "}
        {isVisible
          ? title
          : isUnlocked
          ? title
          : isNextUpcoming
          ? "🔒 Unlock to view"
          : "Hidden"}
      </div>
    </div>
  );
}