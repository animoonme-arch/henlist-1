"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {

  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    const res = await fetch("/api/biolinks");
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const addLink = async () => {
    if (!url) return;

    setLoading(true);

    const res = await fetch("/api/biolinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (data.success) {
      setUrl("");
      fetchLinks();
    }

    setLoading(false);
  };

  const deleteLink = async (id) => {
    await fetch("/api/biolinks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchLinks();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.title}>Video Dashboard</h1>

        {/* ADD LINK */}
        <div style={styles.card}>
          <h3>Add Video Link</h3>

          <input
            style={styles.input}
            placeholder="Paste video page URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button style={styles.button} onClick={addLink}>
            {loading ? "Adding..." : "Add Video"}
          </button>
        </div>

        {/* VIDEO LIST */}
        <div style={styles.card}>
          <h3>Saved Videos</h3>

          <div style={styles.grid}>
            {links.map((link) => (

              <div key={link._id} style={styles.videoCard}>

                {link.thumbnail && (
                  <img
                    src={link.thumbnail}
                    alt="thumbnail"
                    style={styles.thumbnail}
                  />
                )}

                <div style={styles.videoTitle}>
                  {link.title}
                </div>

                {link.videoUrl && (
                  <video controls style={styles.video}>
                    <source src={link.videoUrl} type="video/mp4" />
                  </video>
                )}

                <button
                  style={styles.delete}
                  onClick={() => deleteLink(link._id)}
                >
                  Delete
                </button>

              </div>

            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f0f1a,#1b1b30)",
    padding: "40px",
    fontFamily: "sans-serif",
  },

  container: {
    maxWidth: "1000px",
    margin: "auto",
  },

  title: {
    color: "white",
    marginBottom: "30px",
  },

  card: {
    background: "#1f2033",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    marginBottom: "10px",
  },

  button: {
    padding: "10px 20px",
    background: "#6c5ce7",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  videoCard: {
    background: "#2b2d45",
    borderRadius: "10px",
    overflow: "hidden",
    paddingBottom: "10px",
  },

  thumbnail: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
  },

  videoTitle: {
    padding: "10px",
    color: "white",
    fontSize: "14px",
  },

  video: {
    width: "100%",
    maxHeight: "200px",
  },

  delete: {
    width: "90%",
    margin: "10px auto",
    display: "block",
    padding: "8px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

};