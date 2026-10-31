import {
    BarChart3,
    CalendarDays,
    Video,
    Lightbulb,
    Camera,
    MessageCircle,
    Link2,
    Moon,
    X,
    ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./MenuModal.css";

const menuItems = [
    {
        label: "Theo dõi hiệu quả",
        detail: "25.032 xem",
        icon: BarChart3,
        page: "/analytics",
    },
    {
        label: "Lịch đăng",
        detail: "3 sắp đăng",
        icon: CalendarDays,
        page: "/schedule",
    },
    {
        label: "Dự án video",
        detail: "1 đang chạy",
        icon: Video,
        page: "/projects",
    },
    {
        label: "Kho ý tưởng",
        detail: "24 chủ đề",
        icon: Lightbulb,
        page: "/ideas",
    },
    {
        label: "Quay video mới",
        detail: "",
        icon: Camera,
        page: "/camera",
    },
    {
        label: "Nhu AI đã trả lời",
        detail: "37",
        icon: MessageCircle,
        page: "/ai-chat",
    },
    {
        label: "Kết nối kênh",
        detail: "5/7",
        icon: Link2,
        page: "/platforms",
    },
    {
        label: "Giao diện",
        detail: "Xanh navy",
        icon: Moon,
        page: "/appearance",
    },
];

export default function MenuModal({ open, onClose }) {
    const navigate = useNavigate();

    if (!open) return null;

    const handleNavigate = (path) => {
        onClose?.();
        navigate(path);
    };

    return (
        <div className="menu-overlay" onClick={onClose}>
        <section
            className="menu-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu chính"
            onClick={(event) => event.stopPropagation()}
        >
            <div className="menu-handle" />

            <div className="menu-header">
            <h2>Menu</h2>

            <button
                className="menu-close-icon"
                onClick={onClose}
                aria-label="Đóng menu"
            >
                <X size={18} />
            </button>
            </div>

            <div className="menu-list">
            {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                <button
                    className="menu-item"
                    key={item.page}
                    onClick={() => handleNavigate(item.page)}
                >
                    <span className="menu-item-icon">
                    <Icon size={17} />
                    </span>

                    <span className="menu-item-label">
                    {item.label}
                    </span>

                    {item.detail && (
                    <span className="menu-item-detail">
                        {item.detail}
                    </span>
                    )}

                    <ChevronRight
                    className="menu-chevron"
                    size={15}
                    />
                </button>
                );
            })}
            </div>

            <button
            className="menu-close-button"
            onClick={onClose}
            >
            Đóng
            </button>
        </section>
        </div>
    );
}
