
import React, { useState } from "react";
import "./Schedule.css";

const initialSchedules = {
    14: [
        {
        id: 1,
        time: "08:00",
        title: "3 lỗi khi quay video bằng điện thoại",
        channels: ["facebook", "tiktok"],
        status: "Đã đăng",
        type: "published",
        },
        {
        id: 2,
        time: "20:30",
        title: "Không giới nội thì quay trơn",
        channels: ["facebook", "youtube", "tiktok"],
        status: "Đã lên lịch",
        type: "scheduled",
        },
    ],
    15: [
        {
        id: 3,
        time: "11:30",
        title: "Show tính năng: dựng video 2 phút",
        channels: ["facebook"],
        status: "Đang dựng",
        type: "draft",
        },
    ],
};

const channelIcons = {
    facebook: { label: "f", color: "#1877F2" },
    youtube: { label: "▶", color: "#FF0000" },
    tiktok: { label: "T", color: "#080E1A" },
};

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export default function Schedule() {
    const [selectedDate, setSelectedDate] = useState(14);
    const [month, setMonth] = useState(10);
    const [schedules, setSchedules] = useState(initialSchedules);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newTime, setNewTime] = useState("19:00");

    const dates = [12, 13, 14, 15, 16, 17, 18];

    const selectedSchedules = schedules[selectedDate] || [];

    const addSchedule = () => {
        if (!newTitle.trim()) return;

        const newItem = {
        id: Date.now(),
        time: newTime,
        title: newTitle,
        channels: ["facebook"],
        status: "Đã lên lịch",
        type: "scheduled",
        };

        setSchedules((prev) => ({
        ...prev,
        [selectedDate]: [
            ...(prev[selectedDate] || []),
            newItem,
        ].sort((a, b) => a.time.localeCompare(b.time)),
        }));

        setNewTitle("");
        setShowModal(false);
    };

    const changeMonth = (e) => {
        setMonth(Number(e.target.value));
    };

    const openAddModal = (time = "19:00") => {
        setNewTime(time);
        setShowModal(true);
    };

    return (
        <div className="schedule-page">
        {/* Status bar */}
        <div className="schedule-status-bar">
            <span>9:41</span>
            <span>5G</span>
        </div>

        {/* Header */}
        <header className="schedule-header">
            <h1>
                <button
                    className="back-icon"
                    onClick={() => window.history.back()}
                >
                    ‹
                </button>
                Lịch đăng
            </h1>

            <select value={month} onChange={changeMonth}>
            {[9, 10, 11, 12].map((m) => (
                <option value={m} key={m}>
                Tháng {m}
                </option>
            ))}
            </select>
        </header>

        {/* Calendar */}
        <div className="calendar-week">
            {dates.map((date, index) => (
            <button
                key={date}
                className={`calendar-day ${
                selectedDate === date ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(date)}
            >
                <span className="day-name">{weekDays[index]}</span>
                <strong>{date}</strong>
                <span className="day-dot">•</span>
            </button>
            ))}
        </div>

        {/* Schedule list */}
        <main className="schedule-content">
            <div className="date-label">
            {selectedDate === 14
                ? "HÔM NAY · THỨ 4"
                : `THỨ ${weekDays[dates.indexOf(selectedDate)]} · ${selectedDate}/${month}`}
            </div>

            {selectedSchedules.map((item) => (
            <div className="schedule-item" key={item.id}>
                <div className="schedule-time">{item.time}</div>

                <div className="video-thumbnail">
                <div className="avatar-head" />
                <div className="avatar-body" />
                </div>

                <div className="schedule-info">
                <h3>{item.title}</h3>

                <div className="schedule-bottom">
                    <div className="channel-list">
                    {item.channels.map((channel) => {
                        const icon = channelIcons[channel];

                        return (
                        <span
                            key={channel}
                            className="channel-mini"
                            style={{
                            backgroundColor: icon.color,
                            }}
                        >
                            {icon.label}
                        </span>
                        );
                    })}
                    </div>

                    <span className={`schedule-badge ${item.type}`}>
                    <i />
                    {item.status}
                    </span>
                </div>
                </div>
            </div>
            ))}

            {/* Empty time slot */}
            <button
            className="empty-slot"
            onClick={() => openAddModal()}
            >
            <span className="empty-time">19:00</span>
            <span className="empty-text">
                Khung giờ trống · chạm để thêm video
            </span>
            <span className="add-icon">+</span>
            </button>

            {/* AI suggestion */}
            <div className="ai-suggestion">
            <div>
                <p>Giờ đăng tốt nhất của fanpage</p>
                <strong>20:00 – 21:30</strong>
            </div>

            <button
                className="ai-button"
                onClick={() =>
                alert("AI đang phân tích giờ đăng phù hợp!")
                }
            >
                ✧ Gợi ý AI
            </button>
            </div>
        </main>

        {/* Add schedule modal */}
        {showModal && (
            <div
            className="modal-overlay"
            onClick={() => setShowModal(false)}
            >
            <div
                className="schedule-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                <h2>Thêm lịch đăng</h2>
                <button onClick={() => setShowModal(false)}>
                    ×
                </button>
                </div>

                <label>Tiêu đề video</label>
                <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Nhập tiêu đề video..."
                />

                <label>Thời gian đăng</label>
                <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                />

                <button className="save-schedule" onClick={addSchedule}>
                Thêm vào lịch
                </button>
            </div>
            </div>
        )}

        {/* Home indicator */}
        <div className="schedule-home-indicator">
            <span />
        </div>
        </div>
    );
}
