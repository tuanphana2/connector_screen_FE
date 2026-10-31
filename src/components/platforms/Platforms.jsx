
import React, { useState } from "react";
import "./Platforms.css";

const channels = [
    {
        name: "Facebook",
        description: "Fanpage nhu.digitalmkt",
        icon: "f",
        color: "#1877F2",
        status: "Đã kết nối",
        type: "connected",
    },
    {
        name: "YouTube",
        description: "Nhu Digital",
        icon: "▶",
        color: "#FF0000",
        status: "Đã kết nối",
        type: "connected",
    },
    {
        name: "TikTok",
        description: "@nhu.digitalmkt",
        icon: "♪",
        color: "#101827",
        status: "Hết hạn",
        type: "expired",
    },
    {
        name: "Instagram",
        description: "Chưa kết nối",
        icon: "IG",
        color: "#E1306C",
        status: "Kết nối",
        type: "disconnected",
    },
    {
        name: "Website",
        description: "nhudigital.vn/blog",
        icon: "W",
        color: "#526783",
        status: "Đã kết nối",
        type: "connected",
    },
];

const notificationItems = [
    { name: "Thông báo trên app", icon: "♧", enabled: true },
    { name: "Zalo", icon: "◉", enabled: true },
    { name: "Telegram", icon: "➤", enabled: false },
];

export default function Flatforms() {
    const [notifications, setNotifications] = useState(
        notificationItems.map((item) => item.enabled)
    );

    const toggleNotification = (index) => {
        setNotifications((prev) =>
        prev.map((value, i) => (i === index ? !value : value))
        );
    };

    const handleConnect = (channel) => {
        alert(`Bạn đã chọn kết nối ${channel.name}`);
    };

    return (
        <div className="connect-page">
        <div className="phone-status">
            <span>9:41</span>
            <span>5G</span>
        </div>

        <header className="connect-header">
            <button
                className="back-button"
                onClick={() => window.history.back()}
            >
                ‹
            </button>
            <h1>Kết nối kênh</h1>
        </header>

        <main className="connect-content">
            <section>
            <h2 className="section-title">KÊNH ĐĂNG VIDEO</h2>

            <div className="channel-card">
                {channels.map((channel) => (
                <div className="channel-item" key={channel.name}>
                    <div
                    className="channel-icon"
                    style={{ backgroundColor: channel.color }}
                    >
                    {channel.icon}
                    </div>

                    <div className="channel-info">
                    <h3>{channel.name}</h3>
                    <p>{channel.description}</p>
                    </div>

                    <button
                    className={`status-badge ${channel.type}`}
                    onClick={() => handleConnect(channel)}
                    >
                    <span className="status-dot" />
                    {channel.status}
                    </button>
                </div>
                ))}
            </div>
            </section>

            <section className="notification-section">
            <h2 className="section-title">NHẬN THÔNG BÁO</h2>

            <div className="notification-card">
                {notificationItems.map((item, index) => (
                <div className="notification-item" key={item.name}>
                    <div className="notification-icon">
                    {item.icon}
                    </div>

                    <span className="notification-name">
                    {item.name}
                    </span>

                    <button
                    className={`toggle ${
                        notifications[index] ? "active" : ""
                    }`}
                    onClick={() => toggleNotification(index)}
                    aria-label={`Bật/tắt ${item.name}`}
                    >
                    <span />
                    </button>
                </div>
                ))}
            </div>
            </section>
        </main>

        <div className="home-indicator">
            <span />
        </div>
        </div>
    );
}
