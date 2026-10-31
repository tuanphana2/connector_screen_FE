
import React, { useState } from "react";
import "./VideoReview.css";

export default function VideoReview() {
    const [features, setFeatures] = useState({
        bigText: true,
        diagram: true,
        caption: false,
    });

    const [version, setVersion] = useState("v2");
    const [approved, setApproved] = useState(false);

    const toggleFeature = (key) => {
        setFeatures((prev) => ({
        ...prev,
        [key]: !prev[key],
        }));
    };

    const handleApprove = () => {
        setApproved(true);
        alert("Video đã được duyệt và sẵn sàng đăng!");
    };

    const handleVoiceEdit = () => {
        alert("Chức năng sửa video bằng giọng nói");
    };

    return (
        <div className="review-page">

        {/* Status bar */}
        <div className="review-status-bar">
            <span>9:41</span>
            <span>5G</span>
        </div>

        {/* Header */}
        <header className="review-header">
            <h1>
                <button
                    className="review-back"
                    onClick={() => window.history.back()}
                >
                    ‹
                </button>
                Bản dựng #13
            </h1>

            <span className={`review-status ${approved ? "approved" : ""}`}>
            <i />
            {approved ? "Đã duyệt" : "Chờ duyệt"}
            </span>
        </header>

        {/* Video Preview */}
        <section className="video-preview">

            <div className="video-top-info">
            <span className="video-duration">▶ 1:32</span>

            <div className="version-options">
                <button
                className={version === "v1" ? "version-active" : ""}
                onClick={() => setVersion("v1")}
                >
                v1
                </button>

                <button
                className={version === "v2" ? "version-active" : ""}
                onClick={() => setVersion("v2")}
                >
                v2 · mới
                </button>
            </div>
            </div>

            <div className="video-scene">
            <div className="scene-circle circle-one" />
            <div className="scene-circle circle-two" />
            <div className="scene-circle circle-three" />

            <div className="scene-text">
                <h2>KHÔNG GIỎI NÓI</h2>
                <h2 className="highlight-text">THÌ QUAY TRƠN</h2>
            </div>

            <div className="scene-play">
                <span />
            </div>

            <div className="scene-caption">
                AI sẽ edit cho mình phần còn lại
            </div>
            </div>
        </section>

        {/* Presentation tools */}
        <section className="presentation-section">

            <h2 className="review-section-title">
            CÔNG CỤ TRÌNH BÀY
            </h2>

            <div className="presentation-card">

            <div className="presentation-item">
                <div className="presentation-icon">T</div>
                <span>Chữ to</span>

                <button
                className={`review-toggle ${
                    features.bigText ? "active" : ""
                }`}
                onClick={() => toggleFeature("bigText")}
                >
                <span />
                </button>
            </div>

            <div className="presentation-item">
                <div className="presentation-icon">♧</div>
                <span>Sơ đồ</span>

                <button
                className={`review-toggle ${
                    features.diagram ? "active" : ""
                }`}
                onClick={() => toggleFeature("diagram")}
                >
                <span />
                </button>
            </div>

            <div className="presentation-item">
                <div className="presentation-icon">▤</div>
                <span>Chú thích</span>

                <button
                className={`review-toggle ${
                    features.caption ? "active" : ""
                }`}
                onClick={() => toggleFeature("caption")}
                >
                <span />
                </button>
            </div>

            </div>
        </section>

        {/* Score */}
        <section className="attraction-section">
            <div className="score-header">
            <span>Độ hấp dẫn</span>
            <strong>82/100</strong>
            </div>

            <div className="score-track">
            <div className="score-progress" />
            </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">

            <div className="timeline-row">
            <span>Video</span>
            <div className="timeline-track">
                <div className="timeline-video" />
                <div className="timeline-cursor" />
            </div>
            </div>

            <div className="timeline-row">
            <span>Chữ to</span>
            <div className="timeline-track">
                {features.bigText && (
                <>
                    <div className="timeline-block text-block-one" />
                    <div className="timeline-block text-block-two" />
                </>
                )}
                <div className="timeline-cursor" />
            </div>
            </div>

            <div className="timeline-row">
            <span>Sơ đồ</span>
            <div className="timeline-track">
                {features.diagram && (
                <div className="timeline-block diagram-block" />
                )}
                <div className="timeline-cursor" />
            </div>
            </div>

        </section>

        {/* Actions */}
        <section className="review-actions">

            <button
            className="voice-edit-button"
            onClick={handleVoiceEdit}
            >
            <span>♩</span>
            Sửa bằng lời
            </button>

            <button
            className="approve-button"
            onClick={handleApprove}
            disabled={approved}
            >
            <span>➤</span>
            {approved ? "Đã duyệt" : "Duyệt & đăng"}
            </button>

        </section>

        {/* Home indicator */}
        <div className="review-home-indicator">
            <span />
        </div>

        </div>
    );
}
