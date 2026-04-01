"use client";

import { useState } from "react";

export default function SauceSlab({
  title, // this is your link
  index,
  totalPosts,
  theme,
  isVisible,
  isNextUpcoming,
  onUnlock,
}) {
  const postNumber = totalPosts - index;
  const [isUnlocked, setIsUnlocked] = useState(false);

  const showTitle = isVisible || isUnlocked;

  const handleUnlock = () => {
    if (!isVisible && !isUnlocked) {
      setIsUnlocked(true);
      onUnlock && onUnlock(title);
    }
  };

  const handleOpen = () => {
    if (!showTitle) {
      handleUnlock();
      return;
    }

    if (title) {
      window.open(title, "_blank", "noopener,noreferrer");
    }
  };

  if (!isVisible && !isNextUpcoming) return null;

  return (
    <div
      className="bio-link sauce-slab"
      style={{
        background: theme.linkBg,
        boxShadow: theme.linkShadow,
        padding: "12px",
        borderRadius: "10px",
        opacity: isVisible ? 1 : 0.7,
        filter: showTitle ? "none" : "blur(2px)",
        transition: "0.3s ease",
        cursor: showTitle ? "pointer" : "pointer", // always clickable
      }}
      onClick={handleOpen}
    >
      <div
        className="sauce-text"
        style={{
          color: theme.linkColor,
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        {/* ✅ Number */}
        <span style={{ color: theme.avatarBorder }}>
          #{postNumber}
        </span>

        {/* ✅ Title */}
        <span
          style={{
            textDecoration: showTitle ? "underline" : "none",
            wordBreak: "break-word",
          }}
        >
          {showTitle
            ? "Sause"
            : isNextUpcoming
            ? "🔒 Unlock to view"
            : "Hidden"}
        </span>
      </div>
    </div>
  );
}