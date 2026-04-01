"use client";

export default function SauceSlab({
  url,
  thumbnail,
  displayNumber,
  theme,
  locked = false,
}) {
  const handleClick = () => {
    if (locked) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="bio-link sauce-slab"
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "5px 10px",
        cursor: locked ? "not-allowed" : "pointer",
        background: theme.linkBg,
        boxShadow: theme.linkShadow,
        borderRadius: "8px",
        opacity: locked ? 0.6 : 1,
        position: "relative",
      }}
    >
      <img
        src={thumbnail || "/placeholder.jpg"}
        alt="thumbnail"
        style={{
          height: "50px",
          borderRadius: "6px",
          objectFit: "cover",
          filter: locked ? "blur(2px)" : "none",
        }}
      />

      <div
        style={{
          color: theme.linkColor,
          fontWeight: "500",
          flexGrow: 1,
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <span>#{displayNumber}</span>
        <span>{locked ? "Coming Soon" : "Sauce"}</span>
      </div>

      {locked && (
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          🔒
        </div>
      )}
    </div>
  );
}
