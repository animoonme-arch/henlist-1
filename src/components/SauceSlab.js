// src/components/SauceSlab.js
"use client";

export default function SauceSlab({
  url,
  thumbnail,
  index,
  totalPosts,
  theme,
}) {
  const postNumber = totalPosts - index; // #1, #2, etc.

  return (
    <div
      className="bio-link sauce-slab"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "5px 10px",
        cursor: "pointer",
        background: theme.linkBg,
        boxShadow: theme.linkShadow,
        borderRadius: "8px",
      }}
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
    >
      <img
        src={thumbnail || "/placeholder.jpg"}
        alt="thumbnail"
        style={{
          height: "70px",
          width: "auto",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />

      <div style={{ color: theme.linkColor, fontWeight: "500" }}>
        <span style={{ color: theme.avatarBorder }}>#{postNumber}</span> Sauce
      </div>
    </div>
  );
}