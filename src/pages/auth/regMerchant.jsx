import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function RegisterMerchant() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        //navigate the user depending on their email
        if (formData.email === "merchant12@gmail.com") {
            navigate ("/merchant/dashboard")
        }

        if (formData.email === "admin34@gmail.com") {
            navigate("/admin")
        }

        if (formData.email === "clerk56@gmail.com") {
            navigate("/clerk/dashboard")
        }

        // Check passwords
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/auth/register-merchant`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error || "Registration failed."
                );
                return;
            }

            setSuccess(
                "Account created successfully!"
            );

        } catch (error) {
            setError(
                "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Create An Account</h1>

                <p>
                    Register your MyDuka account.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                <p>
                    Already have an account?
                    <button
                        type="button"
                        onClick={() => navigate("/auth/login")}
                    >
                        Login
                    </button>
                </p>

            </div>

        </div>
    );
}

export default RegisterMerchant;
