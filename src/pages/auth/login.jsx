import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authservice";
import { API_URL } from "../../config";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        //navigate the user depending on their email
        if (email === "merchant12@gmail.com") {
            navigate ("/merchant/dashboard")
        }

        if (email === "admin34@gmail.com") {
            navigate("/admin")
        }

        if (email === "clerk56@gmail.com") {
            navigate("/clerk/dashboard")
        }

        try {

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                    data.message ||
                    "Invalid email or password."
                );

                return;
            }

            // Store JWT
            localStorage.setItem(
                "token",
                data.access_token
            );

            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Redirect based on role

            if (data.user.role === "merchant") {

                navigate("/merchant/dashboard");

            } else if (data.user.role === "admin") {

                navigate("/admin");

            } else if (data.user.role === "clerk") {

                navigate("/clerk/dashboard");

            } else {

                setError("Unknown user role.");

            }

        } catch (error) {

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    <span>My</span>Duka
                </div>

                <h1>
                    Welcome back
                </h1>

                <p className="login-subtitle">
                    Sign in to manage your store.
                </p>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <div className="login-options">

                        <label className="remember">
                            <input
                                type="checkbox"
                            />

                            Remember me
                        </label>

                        <button
                            type="button"
                            className="forgot"
                            onClick={() =>
                                navigate("/forgot-password")
                            }
                        >
                            Forgot password?
                        </button>

                    </div>


                    <button
                        className="login-submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>

                </form>


                <div className="divider">
                    <span>OR</span>
                </div>


                <p className="register-text">
                    Don't have an account?
                </p>

                <button
                    className="create-account"
                    onClick={() =>
                        navigate("/register-merchant")
                    }
                >
                    Create Account
                </button>


                <button
                    className="back-home"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    ← Back to Home
                </button>

            </div>

        </div>
    );
}

export default Login;
