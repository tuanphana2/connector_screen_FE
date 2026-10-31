
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Đăng nhập thất bại.");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert(data.message || "Đăng nhập thành công");
        } catch (error) {
            alert(error.message || "Không thể kết nối đến máy chủ.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: "google.user@gmail.com",
                        name: "Google User",
                    }),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Đăng nhập Google thất bại.");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert(data.message || "Đăng nhập Google thành công");
        } catch (error) {
            alert(error.message || "Không thể kết nối đến máy chủ.");
        }
    };

    return (
        <main className="login-page">
        <div className="login-container">
            <header className="brand">
            <div className="brand-logo">N</div>

            <h1>Nhu video AI</h1>

            <p className="brand-description">
                Quay bằng điện thoại - AI dựng & đăng giúp bạn
            </p>
            </header>

            <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="email">Email</label>

                <div className="input-wrapper">
                <Mail size={19} className="input-icon" />

                <input
                    id="email"
                    type="email"
                    placeholder="abc@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>

                <div className="input-wrapper">
                <Lock size={19} className="input-icon" />

                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                    {showPassword ? (
                    <EyeOff size={19} />
                    ) : (
                    <Eye size={19} />
                    )}
                </button>
                </div>
            </div>

            <button type="submit" className="login-button" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <button
                type="button"
                className="forgot-password"
                onClick={async () => {
                    try {
                        const response = await fetch(
                            `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ email }),
                            }
                        );

                        const data = await response.json().catch(() => ({}));

                        if (!response.ok) {
                            throw new Error(data.message || "Không thể gửi yêu cầu.");
                        }

                        alert(data.message || "Đã gửi link đặt lại mật khẩu.");
                    } catch (error) {
                        alert(error.message || "Không thể kết nối đến máy chủ.");
                    }
                }}
            >
                Quên mật khẩu?
            </button>
            </form>

            <div className="divider">
            <span />
            <p>hoặc</p>
            <span />
            </div>

            <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
            >
            <svg
                viewBox="0 0 48 48"
                width="20"
                height="20"
                aria-hidden="true"
            >
                <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
                />
                <path
                fill="#34A853"
                d="M24 44c5.5 0 10.2-1.8 13.6-4.9L31 34c-1.8 1.2-4.1 2-7 2-5.4 0-10-3.6-11.6-8.5H5.6v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                fill="#FBBC05"
                d="M12.4 27.5a12 12 0 0 1 0-7v-5.3H5.6a20 20 0 0 0 0 17.6l6.8-5.3Z"
                />
                <path
                fill="#EA4335"
                d="M24 12c3 0 5.7 1 7.8 3.1l5.9-5.9C34.2 5.9 29.5 4 24 4A20 20 0 0 0 5.6 15.2l6.8 5.3C14 15.6 18.6 12 24 12Z"
                />
            </svg>

            <span>Tiếp tục với Google</span>
            </button>

            <footer className="login-footer">
            Chưa có tài khoản? Liên hệ{" "}
            <strong>nhu.digitalmkt</strong> để được cấp.
            </footer>
        </div>
        </main>
    );
}
