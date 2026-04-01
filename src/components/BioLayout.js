// src/components/BioLayout.js
"use client";

import React, { useState, useEffect } from "react";
import SauceSlab from "./SauceSlab";

export default function BioLayout({ appData }) {
  const { visibleCount, user, theme } = appData;

  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const totalPosts = allPosts.length;

  // Fetch biolinks
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch("/api/biolinks");
      const data = await res.json();
      setAllPosts(data); // full objects with {title, thumbnail, videoUrl, ...}
    };
    fetchLinks();
  }, []);

  // Filter posts based on search
  const filteredPosts = allPosts.filter((post, index) => {
    const titleText = post.title.toLowerCase();
    const search = searchQuery.toLowerCase().trim();

    if (!search) return true;

    const postNumber = totalPosts - index;
    const isExactNumeric =
      !isNaN(parseInt(search)) && parseInt(search).toString() === search;

    return isExactNumeric
      ? postNumber.toString() === search
      : titleText.includes(search);
  });

  // Determine which slabs to render
  const slabsToRender = [];
  let upcomingCount = 0;

  allPosts.forEach((post, index) => {
    const sequentialNumber = totalPosts - index;
    const isVisible = sequentialNumber <= visibleCount;

    if (!filteredPosts.includes(post) && searchQuery.trim() !== "") return;

    if (isVisible) {
      slabsToRender.push({
        post,
        index,
        isVisible: true,
        isNextUpcoming: false,
      });
    } else if (!searchQuery) {
      const isNextUpcoming =
        sequentialNumber > visibleCount &&
        sequentialNumber <= visibleCount + 2 &&
        upcomingCount < 2;

      if (isNextUpcoming) {
        slabsToRender.push({
          post,
          index,
          isVisible: false,
          isNextUpcoming: true,
        });
        upcomingCount++;
      }
    }
  });

  return (
    <div
      className="page-wrapper"
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="bio-page">
        <img
          src={`/${user.design}`}
          alt="background"
          className="bio-background"
        />

        <div className="bio-content">
          {/* Top Ad */}
          <div
            className="bio-ad ad-top"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "3px 0",
              backgroundColor: "#201f31",
            }}
          >
            <iframe
              src="/ad"
              title="Sponsored Ad"
              scrolling="no"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                width: "100%",
                maxWidth: "728px",
                height: "90px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#201f31",
              }}
            />
          </div>

          <div className="bio-avatar">
            <img src={user.avatar} alt="avatar" />
          </div>

          <div className="bio-username">{user.username}</div>

          <div className="bio-description">
            {user.bio}
            <br />({visibleCount} of {totalPosts} Posts Visible)
          </div>

          <div className="bio-search-container">
            <input
              type="text"
              className="bio-search-input"
              placeholder="Search by Exact Post # (e.g., 10) or Title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bio-links">
            {slabsToRender.map((item) => (
              <SauceSlab
                key={item.post._id}
                url={ item.post.url}
                thumbnail={item.post.thumbnail}
                index={item.index}
                totalPosts={totalPosts}
                theme={theme}
              />
            ))}
          </div>

          {/* Bottom Ad */}
          <div
            className="bio-ad ad-bottom"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "3px 0",
              backgroundColor: "#201f31",
            }}
          >
            <iframe
              src="/ad"
              title="Sponsored Ad"
              scrolling="no"
              style={{
                width: "100%",
                maxWidth: "728px",
                height: "90px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#201f31",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
