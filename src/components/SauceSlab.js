// src/components/SauceSlab.js
"use client";

export default function SauceSlab({
  url,
  thumbnail,
  index,
  totalPosts,
  theme,
}) {
  const postNumber = totalPosts - index;

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
      {/* Thumbnail on left */}
      <img
        src={thumbnail || "/placeholder.jpg"}
        alt="thumbnail"
        style={{
          height: "50px",
          width: "auto",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />

      {/* Centered text */}
      <div
        style={{
          color: theme.linkColor,
          fontWeight: "500",
          flexGrow: 1,
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: theme.avatarBorder,
            WebkitTextStroke: "2px black",
            fontWeight: "bold",
          }}
        >
          #{postNumber}
        </div>
        <div>Sauce</div>
      </div>
    </div>
  );
}
