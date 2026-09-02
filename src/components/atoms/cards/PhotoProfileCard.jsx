import React, { useState } from "react";
import { Card, CardContent } from "./Card";

/**
 * PhotoProfileCard
 * Photo-centric portrait profile card with verified badge, bio, stats, and follow action.
 * Supports size="default" and size="compact".
 */
export default function PhotoProfileCard({
  imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  name = "Sophie Bennett",
  verified = true,
  bio = "Product Designer who focuses on simplicity & usability.",
  followersCount = 312,
  postsCount = 48,
  size = "default",
  followLabel = "Follow +",
  followingLabel = "Following",
  isFollowing: initialFollowing = false,
  onFollow,
  className = "",
}) {
  const [following, setFollowing] = useState(initialFollowing);

  const handleFollowClick = (e) => {
    e.stopPropagation();
    const next = !following;
    setFollowing(next);
    onFollow?.(next);
  };

  const isCompact = size === "compact";

  return (
    <Card
      className={`overflow-hidden rounded-3xl border border-slate-100/80 dark:border-slate-800 shadow-xl transition-all duration-300 ${
        isCompact ? "max-w-[270px] w-full" : "max-w-[320px] w-full"
      } ${className}`}
    >
      {/* Portrait Photo Container */}
      <div className="p-3 pb-0">
        <div
          className={`w-full overflow-hidden rounded-2xl relative bg-slate-100 dark:bg-slate-800 ${
            isCompact ? "h-64" : "h-72 sm:h-80"
          }`}
        >
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle soft gradient overlay at bottom of photo */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-2xl" />
        </div>
      </div>

      {/* Profile Details */}
      <CardContent className="p-4 sm:p-5 pt-3 pb-4">
        {/* Name and Verified Badge */}
        <div className="flex items-center gap-1.5">
          <h3
            className={`font-bold text-slate-900 dark:text-white tracking-tight ${
              isCompact ? "text-base" : "text-lg"
            }`}
          >
            {name}
          </h3>
          {verified && (
            <svg
              className="w-4 h-4 text-emerald-500 fill-emerald-500 shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          )}
        </div>

        {/* Bio Description */}
        <p
          className={`text-slate-500 dark:text-slate-400 leading-relaxed mt-1 mb-4 ${
            isCompact ? "text-[11px] line-clamp-2" : "text-xs"
          }`}
        >
          {bio}
        </p>

        {/* Stats Row & Follow Action */}
        <div className="flex items-center justify-between pt-1">
          {/* Icon + Count stats */}
          <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-300">
            {/* Followers count */}
            <div className="flex items-center gap-1.5 text-xs font-bold" title="Followers">
              <svg
                className="w-3.5 h-3.5 text-slate-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{followersCount}</span>
            </div>

            {/* Posts count */}
            <div className="flex items-center gap-1.5 text-xs font-bold" title="Posts">
              <svg
                className="w-3.5 h-3.5 text-slate-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
              </svg>
              <span>{postsCount}</span>
            </div>
          </div>

          {/* Pill-shaped Follow Button */}
          <button
            onClick={handleFollowClick}
            className={`py-1.5 px-4 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 ${
              following
                ? "bg-indigo-600 text-white shadow-indigo-500/20"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100"
            }`}
          >
            {following ? followingLabel : followLabel}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
