"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    const res = await fetch("/api/biolinks");
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const previewLink = async () => {
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
      fetchLinks();
      setUrl("");
      setPreview(null);
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

        <h1 style={styles.title}>BioLinks Dashboard</h1>

        {/* ADD LINK */}
        <div style={styles.card}>
          <h3>Add New Link</h3>

          <input
            style={styles.input}
            placeholder="Paste URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button style={styles.button} onClick={previewLink}>
            {loading ? "Adding..." : "Add Link"}
          </button>
        </div>

        {/* LINKS LIST */}
        <div style={styles.card}>
          <h3>Saved Links</h3>

          <div style={styles.grid}>
            {links.map((link) => (
              <div key={link._id} style={styles.linkCard}>
                <img
                  src={link.thumbnail}
                  style={styles.thumbnail}
                />

                <div style={styles.linkTitle}>
                  {link.title}
                </div>

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
    maxWidth: "900px",
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
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  linkCard: {
    background: "#2b2d45",
    borderRadius: "10px",
    overflow: "hidden",
  },

  thumbnail: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
  },

  linkTitle: {
    padding: "10px",
    color: "white",
    fontSize: "14px",
  },

  delete: {
    width: "100%",
    padding: "8px",
    background: "#ff4d4d",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};