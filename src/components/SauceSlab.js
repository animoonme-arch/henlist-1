// src/components/SauceSlab.js
"use client";

import React from "react";

export default function SauceSlab({
  title, // FULL URL (hidden from UI)
  index,
  totalPosts,
  theme,
  isVisible,
  isNextUpcoming,
}) {
  const postNumber = totalPosts - index;
  const linkColor = theme.linkColor;
  const postNumberColor = theme.avatarBorder;

  let content,
    linkStyle,
    isClickable = false;

  if (!isVisible && isNextUpcoming) {
    linkStyle = {
      background: "rgba(0, 0, 0, 0.4)",
      opacity: 0.5,
      cursor: "default",
      boxShadow: "none",
    };
    content = (
      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: linkColor,
        }}
      >
        <span style={{ color: postNumberColor, marginRight: 5 }}>
          #{postNumber}
        </span>
        Coming Soon...
      </div>
    );
  } else if (isVisible) {
    isClickable = true;

    linkStyle = {
      background: theme.linkBg,
      boxShadow: theme.linkShadow,
    };

    content = (
      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: linkColor,
        }}
      >
        <span style={{ color: postNumberColor, marginRight: 5 }}>
          #{postNumber}
        </span>
        Sauce
      </div>
    );
  } else {
    return null;
  }

  return (
    <div
      className="bio-link"
      data-post-number={postNumber}
      style={{
        ...linkStyle,
        cursor: isClickable ? "pointer" : "default",
      }}
      onClick={
        isClickable
          ? () => window.open(title, "_blank", "noopener,noreferrer")
          : null
      }
    >
      {content}
    </div>
  );
}
