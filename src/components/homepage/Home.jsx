import { useRef, useState } from "react";
import {
  Menu,
  CalendarDays,
  Camera,
  Mic,
  Plus,
  Send,
  Folder,
  Check,
  Play,
  Clock3,
  Video,
  X,
  Paperclip,
} from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import "./Home.css";
import MenuModal from "../menu/MenuModal";

const initialVideos = [
  {
    id: 1,
    duration: "1:32",
    source: "Từ app",
    category: "Quan điểm",
    title: "Không giới nói thì quay trợn, AI edit cho",
    description: "Hôm nay · Bản review",
    views: "1.240",
    status: "done",
    platforms: ["facebook", "youtube", "tiktok"],
  },
  {
    id: 2,
    duration: "2:05",
    source: "Từ máy",
    category: "Show tính năng",
    title: "Edit video bằng cái video ngắn",
    description: "Hôm qua",
    views: "1.240",
    status: "processing",
    platforms: ["facebook", "youtube"],
  },
];

const filters = [
  { label: "Tất cả", value: "all", count: 12 },
  { label: "Show tính năng", value: "feature", count: 6 },
  { label: "Quan điểm", value: "opinion", count: 4 },
];

function PlatformIcons({ platforms }) {
  return (
    <div className="platform-icons">
      {platforms.includes("facebook") && (
        <span className="platform facebook">
          <FaFacebookF />
        </span>
      )}
      {platforms.includes("youtube") && (
        <span className="platform youtube">
          <FaYoutube />
        </span>
      )}
      {platforms.includes("tiktok") && (
        <span className="platform tiktok">
          <FaTiktok />
        </span>
      )}
    </div>
  );
}

export default function Home() {
  const [videos, setVideos] = useState(initialVideos);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [prompt, setPrompt] = useState("");
  const [localFiles, setLocalFiles] = useState([]);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["facebook"]);
  const [isPublishing, setIsPublishing] = useState(false);
  const togglePlatform = (platform) => {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform]
    );
  };

  const toggleVideo = (id) => {
    setSelectedVideos((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);
    const newFiles = files
      .filter((file) => file.type.startsWith("video/"))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    setLocalFiles((current) => [...current, ...newFiles]);
    event.target.value = "";
  };

  const removeFile = (id) => {
    setLocalFiles((current) => {
      const file = current.find((item) => item.id === id);
      if (file) URL.revokeObjectURL(file.url);
      return current.filter((item) => item.id !== id);
    });
  };

  const handleSend = async () => {
    if (!prompt.trim() && selectedVideos.length === 0 && localFiles.length === 0) {
      alert("Hãy nhập yêu cầu hoặc chọn video trước nhé!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/videos/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            selectedVideos,
            localFiles,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Không thể tạo video.");
      }

      setVideos((current) => [data.video, ...current]);
      setPrompt("");
      setSelectedVideos([]);
      setLocalFiles([]);
      alert(data.message || "Đã gửi yêu cầu dựng video thành công.");
    } catch (error) {
      alert(error.message || "Không thể kết nối đến máy chủ.");
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt chưa hỗ trợ nhận diện giọng nói.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt((current) =>
        current ? `${current} ${transcript}` : transcript
      );
    };

    recognition.start();
  };

  const filteredVideos = videos.filter((video) => {
    if (filter === "all") return true;
    if (filter === "feature") return video.category === "Show tính năng";
    if (filter === "opinion") return video.category === "Quan điểm";
    return true;
  });

  const handlePublish = async () => {
    if (selectedPlatforms.length === 0) {
      alert("Hãy chọn ít nhất một nền tảng để đăng.");
      return;
    }

    const content = (prompt || "").trim();

    if (!content) {
      alert("Chưa có nội dung để đăng.");
      return;
    }

    setIsPublishing(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/publishing`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Nếu API yêu cầu đăng nhập, bổ sung Authorization tại đây.
          },
          body: JSON.stringify({
            content,
            platforms: selectedPlatforms,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Đăng bài thất bại.");
      }

      alert(data.message || "Đã gửi yêu cầu đăng bài đến hệ thống.");
    } catch (error) {
      alert(error.message || "Không thể kết nối đến máy chủ.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="status-bar">
        <span>9:41</span>
        <span className="status-right">5G ▰</span>
      </div>

      <div className="dashboard">
        <header className="welcome-header">
          <div className="app-avatar">N</div>
          <div className="welcome-text">
            <h1>Đang dựng 1 video, xong em báo</h1>
            <p>Nhu AI · trợ lý dựng video</p>
          </div>
        </header>

        <section className="processing-grid">
          <article className="processing-card">
            <div className="card-status">
              <span className="status-dot" />
              Đang dựng
            </div>
            <h3>Show tính năng + giải thích</h3>
            <div className="progress-track">
              <span style={{ width: "78%" }} />
            </div>
          </article>

          <article className="processing-card">
            <div className="processing-topline">
              <div className="card-status">
                <span className="status-dot" />
                Hẹn 20:30
              </div>
              <span className="small-muted">T4 14/10</span>
            </div>
            <h3>Không giới nói thì quay trợn</h3>
            <p className="card-hint">Chạm để xem toàn màn</p>
          </article>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <h2>Đã dựng <span>12 video</span></h2>
            <button className="text-button" onClick={() => setFilter("all")}>
              Xem tất cả
            </button>
          </div>

          <div className="video-grid">
            {filteredVideos.map((video) => (
              <article className="video-card" key={video.id}>
                <div className="video-cover">
                  <div className="cover-top">
                    <span className="duration">
                      <Play size={10} fill="currentColor" />
                      {video.duration}
                    </span>
                    <span
                      className={`source-badge ${
                        video.source === "Từ máy" ? "source-green" : ""
                      }`}
                    >
                      {video.source}
                    </span>
                  </div>

                  <div className="cover-placeholder">
                    <Video size={34} />
                  </div>

                  <div className="video-info">
                    <span className="video-category">{video.category}</span>
                    <h3>{video.title}</h3>
                    <p>{video.description} · {video.views} xem</p>
                    <PlatformIcons platforms={video.platforms} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="filter-row">
          {filters.map((item) => (
            <button
              key={item.value}
              className={`filter-chip ${filter === item.value ? "active" : ""}`}
              onClick={() => setFilter(item.value)}
            >
              {item.label} · {item.count}
            </button>
          ))}
        </div>

        <section className="local-section">
          <div className="section-heading local-heading">
            <h2>Video trong máy <span>Hôm nay 10</span></h2>
            <button
              className="folder-button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Folder size={14} />
              Tệp
            </button>
          </div>

          <div className="local-video-row">
            {localFiles.map((file) => (
              <div className="local-video" key={file.id}>
                <video src={file.url} muted preload="metadata" />
                <button
                  className="remove-file"
                  onClick={() => removeFile(file.id)}
                  aria-label="Xóa video"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {Array.from({ length: Math.max(0, 5 - localFiles.length) }).map(
              (_, index) => (
                <button
                  className={`local-video placeholder-video ${
                    selectedVideos.includes(index) ? "selected" : ""
                  }`}
                  key={`placeholder-${index}`}
                  onClick={() => toggleVideo(index)}
                >
                  <span className="placeholder-person" />
                  {selectedVideos.includes(index) && (
                    <span className="selected-check">
                      <Check size={12} />
                    </span>
                  )}
                </button>
              )
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            multiple
            hidden
            onChange={handleFiles}
          />
        </section>

        <section className="ai-composer">
          <div className="selected-summary">
            {selectedVideos.length > 0
              ? `Đã chọn ${selectedVideos.length} video`
              : "Đặt chủ đề video – nói với AI dựng..."}
          </div>

          {showFilePicker && (
            <div className="attachment-menu">
              <button onClick={() => fileInputRef.current?.click()}>
                <Video size={16} />
                Chọn video từ máy
              </button>
            </div>
          )}

          <div className="composer-controls">
            <button
              className={`round-button ${isListening ? "listening" : ""}`}
              onClick={startVoiceInput}
              aria-label="Nhập bằng giọng nói"
            >
              <Mic size={19} />
            </button>

            <button
              className="round-button"
              onClick={() => setShowFilePicker((current) => !current)}
              aria-label="Thêm video"
            >
              <Plus size={21} />
            </button>

            <textarea
              className="prompt-input"
              placeholder="Nhập yêu cầu cho AI..."
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={1}
            />

            <button className="send-button" onClick={handleSend}>
              <Send size={16} />
              Gửi
            </button>
          </div>
        </section>
        
          <div className="publish-row">
            <div className="publish-platforms">
              <button
                type="button"
                title="Facebook"
                aria-label="Chọn Facebook"
                aria-pressed={selectedPlatforms.includes("facebook")}
                className={`publish-platform facebook ${
                  selectedPlatforms.includes("facebook") ? "active" : ""
                }`}
                onClick={() => togglePlatform("facebook")}
              >
                <FaFacebookF />
              </button>

              <button
                type="button"
                title="YouTube"
                aria-label="Chọn YouTube"
                aria-pressed={selectedPlatforms.includes("youtube")}
                className={`publish-platform youtube ${
                  selectedPlatforms.includes("youtube") ? "active" : ""
                }`}
                onClick={() => togglePlatform("youtube")}
              >
                <FaYoutube />
              </button>

              <button
                type="button"
                title="TikTok"
                aria-label="Chọn TikTok"
                aria-pressed={selectedPlatforms.includes("tiktok")}
                className={`publish-platform tiktok ${
                  selectedPlatforms.includes("tiktok") ? "active" : ""
                }`}
                onClick={() => togglePlatform("tiktok")}
              >
                <FaTiktok />
              </button>
            </div>

            <span className="publish-hint">
              {selectedPlatforms.length > 0
                ? `Đã chọn ${selectedPlatforms.length} nền tảng`
                : "Chọn nền tảng"}
            </span>

            <button
              type="button"
              className="publish-button"
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <LoaderCircle size={16} className="publish-spinner" />
              ) : (
                <Send size={15} />
              )}
              {isPublishing ? "Đang đăng" : "Đăng"}
            </button>
          </div>
      </div>

      <nav className="bottom-nav">
        <button
          className="nav-circle"
          aria-label="Mở menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={22} />
        </button>

        <button className="nav-center">
          <CalendarDays size={16} />
          <span>3 bài sắp đăng</span>
        </button>

        <button
          className="nav-circle nav-camera"
          aria-label="Chọn video"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera size={20} />
        </button>
      </nav>

      <MenuModal
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <div className="home-indicator" />
    </main>
  );
}
