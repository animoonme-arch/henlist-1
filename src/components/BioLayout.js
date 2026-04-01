"use client";

import React, { useState, useEffect } from "react";
import SauceSlab from "./SauceSlab";

export default function BioLayout({ appData }) {
  const { user, theme } = appData;

  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  // 🔥 START DATE
  const START_DATE = new Date("2026-04-01");

  const daysPassed = Math.floor(
    (Date.now() - START_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  // 🔥 2 POSTS PER DAY
  const dynamicVisibleCount = Math.max(2, daysPassed * 2);

  // 📦 Fetch
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        setAllPosts(data); // ✅ already latest first
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchLinks();
  }, []);

  const totalPosts = allPosts.length;

  // 🔍 SEARCH
  const filteredPosts = allPosts.filter((post, index) => {
    const titleText = post.title?.toLowerCase() || "";
    const search = searchQuery.toLowerCase().trim();

    if (!search) return true;

    const postNumber = totalPosts - index;

    const isExactNumeric =
      !isNaN(parseInt(search)) && parseInt(search).toString() === search;

    return isExactNumeric
      ? postNumber.toString() === search
      : titleText.includes(search);
  });

  // 🧠 Visible + upcoming
  const slabsToRender = [];
  let upcomingCount = 0;

  filteredPosts.forEach((post, index) => {
    const isVisible = index < dynamicVisibleCount;

    if (isVisible) {
      slabsToRender.push({ post, index, locked: false });
    } else if (!searchQuery && upcomingCount < 2) {
      slabsToRender.push({ post, index, locked: true });
      upcomingCount++;
    }
  });

  return (
    <div
      className="page-wrapper"
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      <div className="bio-page">
        <img
          src={`/${user.design}`}
          alt="background"
          className="bio-background"
        />

        <div className="bio-content">
          {/* 🔝 Top Ad */}
          <div className="bio-ad ad-top">
            <iframe
              src="/ad"
              title="Ad"
              scrolling="no"
              style={{
                width: "100%",
                maxWidth: "728px",
                height: "90px",
                border: "none",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* 👤 Profile */}
          <div className="bio-avatar">
            <img src={user.avatar} alt="avatar" />
          </div>

          <div className="bio-username">{user.username}</div>

          <div className="bio-description">
            {user.bio}
            <br />({Math.min(dynamicVisibleCount, totalPosts)} of {totalPosts}{" "}
            Posts Visible)
          </div>

          {/* 🔍 Search */}
          <div className="bio-search-container">
            <input
              type="text"
              className="bio-search-input"
              placeholder="Search by # or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 📦 Content */}
          <div className="bio-links">
            {slabsToRender.map((item) => (
              <SauceSlab
                key={item.post._id}
                url={item.post.url}
                thumbnail={item.post.poster}
                index={item.index}
                totalPosts={totalPosts}
                theme={theme}
                locked={item.locked}
              />
            ))}
          </div>

          {/* 🔽 Bottom Ad */}
          <div className="bio-ad ad-bottom">
            <iframe
              src="/ad"
              title="Ad"
              scrolling="no"
              style={{
                width: "100%",
                maxWidth: "728px",
                height: "90px",
                border: "none",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
