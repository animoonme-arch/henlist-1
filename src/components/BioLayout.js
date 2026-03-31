"use client";

import React, { useState, useEffect } from "react";
import SauceSlab from "./SauceSlab";

export default function BioLayout({ appData }) {
  const { user, theme } = appData;

  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const totalPosts = allPosts.length;

  // 🔥 START DATE (CHANGE THIS TO YOUR LAUNCH DATE)
  const START_DATE = new Date("2026-04-01");

  const daysPassed = Math.floor(
    (Date.now() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 🔥 2 POSTS PER DAY
  const dynamicVisibleCount = Math.max(2, daysPassed * 2);

  // 📦 Fetch from Mongo API
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();

        // 🔥 IMPORTANT: reverse so newest = last (fix numbering logic)
        setAllPosts(data.reverse());
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchLinks();
  }, []);

  // 🔍 Search filter
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

  // 🧠 Decide visible + upcoming
  const slabsToRender = [];
  let upcomingCount = 0;

  allPosts.forEach((post, index) => {
    const sequentialNumber = totalPosts - index;

    const isVisible = sequentialNumber <= dynamicVisibleCount;

    if (!filteredPosts.includes(post) && searchQuery.trim() !== "") return;

    if (isVisible) {
      slabsToRender.push({
        post,
        index,
      });
    } else if (!searchQuery) {
      const isNextUpcoming =
        sequentialNumber > dynamicVisibleCount &&
        sequentialNumber <= dynamicVisibleCount + 2 &&
        upcomingCount < 2;

      if (isNextUpcoming) {
        slabsToRender.push({
          post,
          index,
        });
        upcomingCount++;
      }
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

          {/* 👤 Profile */}
          <div className="bio-avatar">
            <img src={user.avatar} alt="avatar" />
          </div>

          <div className="bio-username">{user.username}</div>

          <div className="bio-description">
            {user.bio}
            <br />({dynamicVisibleCount} of {totalPosts} Posts Visible)
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
              />
            ))}
          </div>

          {/* 🔽 Bottom Ad */}
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