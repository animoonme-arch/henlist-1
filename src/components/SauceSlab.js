"use client";

import { useState } from "react";

export default function SauceSlab({
  title,
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
      if (onUnlock) onUnlock(title);
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
        background: theme?.linkBg || "#222",
        boxShadow: theme?.linkShadow || "none",
        padding: "12px",
        borderRadius: "10px",
        opacity: isVisible ? 1 : 0.7,
        filter: showTitle || isNextUpcoming ? "none" : "blur(2px)",
        transition: "0.3s ease",
        cursor: "pointer",
      }}
      onClick={handleOpen}
    >
      <div
        className="sauce-text"
        style={{
          color: theme?.linkColor || "#fff",
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        <span style={{ color: theme?.avatarBorder || "#999" }}>
          #{postNumber}
        </span>

        <span
          style={{
            textDecoration: showTitle ? "underline" : "none",
            wordBreak: "break-word",
          }}
        >
          {showTitle
            ? "Sauce"
            : isNextUpcoming
            ? "Upcoming"
            : "Hidden"}
        </span>
      </div>
    </div>
  );
}