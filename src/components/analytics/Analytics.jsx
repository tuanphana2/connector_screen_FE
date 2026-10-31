import React, { useState } from "react";
import "./Analytics.css";

const platforms = [
    { name: "Facebook", icon: "f", color: "#1877F2" },
    { name: "YouTube", icon: "▶", color: "#FF0000" },
    { name: "TikTok", icon: "T", color: "#080E1A" },
    { name: "Instagram", icon: "IG", color: "#E1306C" },
    { name: "Threads", icon: "@", color: "#080E1A" },
    { name: "LinkedIn", icon: "in", color: "#0A66C2" },
    { name: "Website", icon: "W", color: "#526783" },
];

const videos = [
    {
        id: 1,
        title: "Không giỏi nói thì quay trơn",
        views: "12.480",
        comments: "312",
        rank: 1,
    },
    {
        id: 2,
        title: "Dựng 1 video chỉ mất 2 phút",
        views: "6.902",
        comments: "98",
        rank: 2,
    },
];

const analyticsData = {
    "7 ngày": {
        views: "25.032",
        growth: "+18%",
        videos: videos,
    },
    "30 ngày": {
        views: "89.520",
        growth: "+25%",
        videos: videos,
    },
    "90 ngày": {
        views: "245.800",
        growth: "+32%",
        videos: videos,
    },
};

export default function Analytics() {
    const [period, setPeriod] = useState("7 ngày");
    const [showDropdown, setShowDropdown] = useState(false);

    const data = analyticsData[period];

    return (
        <div className="analytics-page">

        {/* Status bar */}
        <div className="analytics-status-bar">
            <span>9:41</span>
            <span>5G</span>
        </div>

        {/* Header */}
        <header className="analytics-header">
            <h1>
                <button
                    className="analytics-back"
                    onClick={() => window.history.back()}
                >
                    ‹
                </button>
                Hiệu quả
            </h1>

            <div className="period-wrapper">
                <button
                    className="period-button"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {period}
                    <span>⌄</span>
                </button>

                {showDropdown && (
                    <div className="period-dropdown">
                    {Object.keys(analyticsData).map((item) => (
                        <button
                        key={item}
                        className={period === item ? "period-selected" : ""}
                        onClick={() => {
                            setPeriod(item);
                            setShowDropdown(false);
                        }}
                        >
                        {item}
                        </button>
                    ))}
                    </div>
                )}
            </div>
        </header>

        <main className="analytics-content">

            {/* Overall status */}
            <h2 className="platform-heading">
            ĐÃ LÊN ĐỦ 7/7 NỀN TẢNG
            </h2>

            {/* Main statistics */}
            <section className="analytics-overview">

            <div className="overview-top">
                <div className="ai-avatar">N</div>

                <span className="ai-name">Nhu AI</span>

                <span className="publish-status">
                <i />
                Đã lên 7/7
                </span>
            </div>

            <div className="views-content">
                <strong>{data.views}</strong>
                <span>lượt xem</span>
            </div>

            <div className="growth-info">
                <span>↗ {data.growth}</span>
                <p>so với tuần trước</p>
            </div>

            </section>

            {/* Social platforms */}
            <section className="platform-grid">

            {platforms.map((platform) => (
                <div className="platform-item" key={platform.name}>

                <div
                    className="platform-icon"
                    style={{
                    backgroundColor: platform.color,
                    }}
                >
                    {platform.icon}

                    <span className="connected-check">✓</span>
                </div>

                <span className="platform-name">
                    {platform.name}
                </span>

                </div>
            ))}

            </section>

            {/* Top videos */}
            <section className="top-videos-section">

            <h2 className="section-heading">
                VIDEO NỔI BẬT
            </h2>

            <div className="top-videos-list">

                {data.videos.map((video) => (
                <div className="top-video-item" key={video.id}>

                    <div className="video-thumb">
                    <div className="thumb-head" />
                    <div className="thumb-body" />
                    </div>

                    <div className="top-video-info">
                    <h3>{video.title}</h3>

                    <p>
                        {video.views} xem · {video.comments} bình luận
                    </p>
                    </div>

                    <div className={`video-rank rank-${video.rank}`}>
                    #{video.rank}
                    </div>

                </div>
                ))}

            </div>

            </section>

        </main>

        {/* Home indicator */}
        <div className="analytics-home-indicator">
            <span />
        </div>

        </div>
    );
}
