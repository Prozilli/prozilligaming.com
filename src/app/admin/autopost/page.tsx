"use client";

import { useState } from "react";

/* ============================================================
   Auto-Post Scheduler Page
   ============================================================ */

type PostStatus = "scheduled" | "posted" | "failed" | "draft";
type ContentType = "text" | "image" | "video" | "reel" | "story" | "short";

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  type: ContentType;
  platforms: string[];
  scheduledFor: string;
  status: PostStatus;
  aiGenerated: boolean;
  engagement?: { likes: number; comments: number; shares: number };
}

const POSTS: ScheduledPost[] = [
  {
    id: "1",
    title: "ZO Syndicate Gang Wars Update",
    content: "The streets of Los Santos are heating up. 10 gangs, 1 city, infinite possibilities. Which side are you on? #ZOSyndicate #FiveM #GTA5RP",
    type: "text",
    platforms: ["X", "Facebook"],
    scheduledFor: "Feb 14, 2026 5:00 PM",
    status: "scheduled",
    aiGenerated: true,
  },
  {
    id: "2",
    title: "Stream Highlight Reel",
    content: "Best moments from last night's stream - casino heist gone wrong!",
    type: "reel",
    platforms: ["Instagram", "TikTok", "YouTube"],
    scheduledFor: "Feb 14, 2026 12:00 PM",
    status: "scheduled",
    aiGenerated: false,
  },
  {
    id: "3",
    title: "LISA AI Introduction",
    content: "Meet LISA - our AI co-host who never sleeps, always remembers your name, and has better comebacks than your friends.",
    type: "image",
    platforms: ["X", "Facebook", "Instagram"],
    scheduledFor: "Feb 13, 2026 3:00 PM",
    status: "posted",
    aiGenerated: true,
    engagement: { likes: 47, comments: 12, shares: 8 },
  },
  {
    id: "4",
    title: "Weekend Marathon Announcement",
    content: "Saturday marathon stream starting at 2PM EST. 6+ hours of ZO Syndicate RP with the whole crew.",
    type: "text",
    platforms: ["X", "Facebook"],
    scheduledFor: "Feb 13, 2026 10:00 AM",
    status: "posted",
    aiGenerated: false,
    engagement: { likes: 34, comments: 8, shares: 5 },
  },
  {
    id: "5",
    title: "New Merch Drop Teaser",
    content: "Something new is coming to the shop...",
    type: "story",
    platforms: ["Instagram", "Facebook"],
    scheduledFor: "Feb 12, 2026 6:00 PM",
    status: "posted",
    aiGenerated: true,
    engagement: { likes: 89, comments: 23, shares: 15 },
  },
  {
    id: "6",
    title: "Failed TikTok Upload",
    content: "Behind the scenes footage from ZO Syndicate development",
    type: "video",
    platforms: ["TikTok"],
    scheduledFor: "Feb 11, 2026 4:00 PM",
    status: "failed",
    aiGenerated: false,
  },
];

const PLATFORM_OPTIONS = [
  { id: "x", name: "X", color: "#ffffff", types: ["text", "image"] },
  { id: "facebook", name: "Facebook", color: "#1877f2", types: ["text", "image", "story", "reel"] },
  { id: "instagram", name: "Instagram", color: "#e4405f", types: ["image", "story", "reel"] },
  { id: "tiktok", name: "TikTok", color: "#ff0050", types: ["video", "reel"] },
  { id: "youtube", name: "YouTube", color: "#ff0000", types: ["video", "short"] },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

export default function AutoPostPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "calendar" | "create" | "video">("queue");
  const [posts] = useState(POSTS);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["x", "facebook"]);
  const [contentType, setContentType] = useState<ContentType>("text");
  const [isGenerating, setIsGenerating] = useState(false);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setNewPostContent("The ZO Syndicate streets don't sleep. Tonight's stream brings gang wars, casino heists, and enough chaos to make Los Santos proud. Catch the action live at 5PM EST across all platforms. #FiveM #GTARP #ZOSyndicate #LiveStream");
      setIsGenerating(false);
    }, 1500);
  };

  const statusColors: Record<PostStatus, string> = {
    scheduled: "badge-electric",
    posted: "badge-emerald",
    failed: "badge-red",
    draft: "badge-gold",
  };

  const typeIcons: Record<ContentType, string> = {
    text: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12",
    image: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M18 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    video: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    reel: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5",
    story: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    short: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-8.625 0V5.625m8.625 12.75V5.625",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Auto-Post</h1>
          <p className="text-sm text-muted mt-1">Schedule content across all platforms with AI assistance</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-data text-xs text-dim">{posts.filter((p) => p.status === "scheduled").length} scheduled</span>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab("create")}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Post
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-glass border border-glass-border w-fit">
        {(["queue", "calendar", "create", "video"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all capitalize ${
              activeTab === tab
                ? "bg-red/15 text-red-bright"
                : "text-muted hover:text-foreground hover:bg-white/[0.04]"
            }`}
          >
            {tab === "video" ? "Video Generator" : tab === "queue" ? "Post Queue" : tab}
          </button>
        ))}
      </div>

      {/* Queue Tab */}
      {activeTab === "queue" && (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="card p-5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-glass border border-glass-border flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={typeIcons[post.type]} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold">{post.title}</span>
                  {post.aiGenerated && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-electric/10 text-electric border border-electric/20">AI</span>
                  )}
                </div>
                <p className="text-xs text-muted mb-2 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-3">
                  <span className="text-data text-[10px] text-dim">{post.scheduledFor}</span>
                  <div className="flex gap-1">
                    {post.platforms.map((p) => (
                      <span key={p} className="text-[9px] px-1.5 py-0.5 rounded-full bg-glass border border-glass-border text-dim">
                        {p}
                      </span>
                    ))}
                  </div>
                  {post.engagement && (
                    <span className="text-[10px] text-dim">
                      {post.engagement.likes} likes &middot; {post.engagement.comments} comments
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`badge text-[9px] ${statusColors[post.status]}`}>{post.status}</span>
                <button className="p-1.5 text-dim hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-4">Content Calendar</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header Row */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="text-[10px] font-bold text-dim p-2">Time</div>
                {DAYS.map((day) => (
                  <div key={day} className="text-[10px] font-bold text-dim p-2 text-center">{day}</div>
                ))}
              </div>
              {/* Time Slots */}
              {HOURS.map((hour) => (
                <div key={hour} className="grid grid-cols-8 gap-1">
                  <div className="text-data text-[10px] text-dim p-2 border-t border-glass-border">{hour}</div>
                  {DAYS.map((day) => {
                    const hasPost = Math.random() > 0.8;
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className={`p-2 border-t border-glass-border min-h-[32px] rounded cursor-pointer hover:bg-glass transition-colors ${
                          hasPost ? "bg-red/10" : ""
                        }`}
                      >
                        {hasPost && (
                          <div className="text-[9px] text-red-bright font-semibold truncate">
                            Post
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Tab */}
      {activeTab === "create" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5">
              <h2 className="text-sm font-bold mb-4">Create New Post</h2>
              <div className="space-y-4">
                {/* Content Type */}
                <div>
                  <label className="text-xs font-semibold text-dim block mb-2">Content Type</label>
                  <div className="flex flex-wrap gap-2">
                    {(["text", "image", "video", "reel", "story", "short"] as ContentType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setContentType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${
                          contentType === type
                            ? "bg-red/15 border-red/30 text-red-bright"
                            : "bg-glass border-glass-border text-muted hover:border-glass-border-hover"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-dim">Content</label>
                    <button
                      onClick={handleAIGenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-1.5 text-[10px] font-semibold text-electric hover:text-foreground transition-colors"
                    >
                      <svg className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                      {isGenerating ? "Generating..." : "AI Generate"}
                    </button>
                  </div>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your post content or use AI to generate..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-dim">{newPostContent.length} characters</span>
                    <span className="text-[10px] text-dim">280 max for X</span>
                  </div>
                </div>

                {/* Schedule */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-dim block mb-1.5">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dim block mb-1.5">Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button className="btn btn-ghost btn-sm">Save Draft</button>
                  <button className="btn btn-primary btn-sm">Schedule Post</button>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-6">
            <div className="card p-5">
              <h2 className="text-sm font-bold mb-4">Target Platforms</h2>
              <div className="space-y-2">
                {PLATFORM_OPTIONS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? "bg-glass-active border-glass-border-hover"
                        : "bg-glass border-glass-border opacity-60"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                    >
                      {platform.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-xs font-semibold">{platform.name}</div>
                      <div className="text-[10px] text-dim">{platform.types.join(", ")}</div>
                    </div>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedPlatforms.includes(platform.id)
                        ? "bg-emerald border-emerald"
                        : "border-dim"
                    }`}>
                      {selectedPlatforms.includes(platform.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Settings */}
            <div className="card p-5">
              <h2 className="text-sm font-bold mb-4">AI Generation</h2>
              <div className="space-y-3">
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Text Model</span>
                  <span className="text-data text-xs">Groq llama-3.3</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Image Model</span>
                  <span className="text-data text-xs">DALL-E 3 HD</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Video Model</span>
                  <span className="text-data text-xs">Leonardo Motion 2.0</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-glass">
                  <span className="text-xs text-muted">Cost per Video</span>
                  <span className="text-data text-xs text-gold">~$0.04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Generator Tab */}
      {activeTab === "video" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">AI Video Generation</h2>
            <p className="text-xs text-muted mb-4">Generate 5-second motion videos using DALL-E 3 + Leonardo Motion 2.0</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Image Prompt</label>
                <textarea
                  placeholder="Describe the image for DALL-E 3..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Motion Prompt</label>
                <textarea
                  placeholder="Describe the camera movement and animation..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground placeholder-dim focus:outline-none focus:border-red/50 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-dim block mb-1.5">Resolution</label>
                <select className="w-full px-4 py-2.5 rounded-lg bg-glass border border-glass-border text-sm text-foreground focus:outline-none focus:border-red/50 transition-colors">
                  <option>720p (Recommended)</option>
                  <option>1080p</option>
                </select>
              </div>
              <button className="btn btn-primary btn-sm w-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Generate Video
              </button>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold mb-4">Pipeline</h2>
            <div className="space-y-4">
              {[
                { step: "1. DALL-E 3", desc: "Generate HD image from prompt", status: "ready", time: "~10s" },
                { step: "2. Leonardo Upload", desc: "Upload as init-image via presigned S3", status: "ready", time: "~3s" },
                { step: "3. Motion 2.0", desc: "Animate with camera movement", status: "ready", time: "~30s" },
                { step: "4. Platform Upload", desc: "Upload to selected platforms", status: "ready", time: "~15s" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4 p-3 rounded-lg bg-glass border border-glass-border">
                  <div className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{item.step}</div>
                    <div className="text-[10px] text-dim">{item.desc}</div>
                  </div>
                  <span className="text-data text-[10px] text-dim">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
