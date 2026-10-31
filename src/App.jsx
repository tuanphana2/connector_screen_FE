import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from "./components/homepage/Home";
import Schedule from "./components/schedule/Schedule";
import Analytics from "./components/analytics/Analytics";
import Platforms from "./components/platforms/Platforms";
import VideoReview from "./components/video_review/VideoReview";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            {/* Các trang đã có */}
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/video-review/:videoId" element={<VideoReview />} />

            {/* Các trang chưa phát triển */}
            <Route path="/projects" element={<ComingSoon title="Dự án video" />} />
            <Route path="/ideas" element={<ComingSoon title="Kho ý tưởng" />} />
            <Route path="/camera" element={<ComingSoon title="Quay video mới" />} />
            <Route path="/ai-chat" element={<ComingSoon title="Nhu AI" />} />
            <Route path="/appearance" element={<ComingSoon title="Giao diện" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
    );
}

function ComingSoon({ title }) {
    return (
        <div style={{
        minHeight: "100vh",
        background: "#0B1930",
        color: "#F4F7FC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        }}>
        <h2>{title}</h2>
        <p>Chức năng đang được phát triển.</p>
        <button
            onClick={() => window.history.back()}
            style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: "#2585E8",
            color: "white",
            cursor: "pointer",
            }}
        >
            Quay lại
        </button>
        </div>
    );
}

export default App;
