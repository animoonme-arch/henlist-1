"use client";

export default function SauceSlab({
  url,
  thumbnail,
  index,
  totalPosts,
  theme,
}) {
  const postNumber = totalPosts - index;

  const handleClick = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="bio-link sauce-slab"
      style={{
        background: theme.linkBg,
        boxShadow: theme.linkShadow,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* <img
        src={thumbnail || "/placeholder.jpg"}
        className="sauce-thumb"
        alt="thumbnail"
      /> */}

      <div
        className="sauce-text"
        style={{ color: theme.linkColor }}
      >
        <span style={{ color: theme.avatarBorder }}>
          #{postNumber}
        </span>{" "}
        Sauce
      </div>
    </div>
  );
}