import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Sidebar from "../../components/sidebar";

function RegisterClerk() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        clerk_name: "",
        admin_id: "",
        store_id: ""

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

        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/clerks`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        clerk_name: formData.clerk_name,
                        admin_id: formData.admin_id,
                        store_id: formData.store_id
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error || "Registration failed."
                );
            } else {
                setSuccess("Clerk registered successfully!");
                setFormData({
                    clerk_name: "",
                    admin_id: "",
                    store_id: ""
                });
            }
        } catch (err) {
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-dashboard">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    <Sidebar role="admin" />
                    
                    <span>My</span>Duka
                </div>

            </aside>

            {/* MAIN CONTENT*/}
            
            <h2>Register Clerk</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="clerk_name">Clerk Name:</label>
                    <input
                        type="text"
                        id="clerk_name"
                        name="clerk_name"
                        value={formData.clerk_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="admin_id">Admin ID:</label>
                    <input
                        type="text"
                        id="admin_id"
                        name="admin_id"
                        value={formData.admin_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="store_id">Store ID:</label>
                    <input
                        type="text"
                        id="store_id"
                        name="store_id"
                        value={formData.store_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register Clerk"}
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
    );
}

export default RegisterClerk;