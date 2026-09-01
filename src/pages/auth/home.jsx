import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">

            {/* NAVBAR */}

            <nav className="navbar">

                <div className="logo">
                    <span>🗃️ 📊My</span>Duka
                </div>

                <div className="nav-links">
                    
                    <button
                        className="login-btn"
                        onClick={() => navigate("/auth/login")}
                    >
                        Login
                    </button>
                </div>

            </nav>


            {/* HERO SECTION */}

            <section className="hero">

                <div className="hero-content">

                    <p className="small-heading">
                         INVENTORY MANAGEMENT
                    </p>

                    <h1 className="grow">
                        Manage Your Store.
                        <br />
                        <span>Grow Your Business.</span>
                    </h1>

                    <p className="hero-text">
                        MyDuka makes inventory management simple.
                        Track your stock, monitor payments, manage
                        your team and understand your business
                        through powerful reports.
                    </p>

                    <div className="hero-buttons">

                        <span>

                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate("/register-merchant")
                            }
                        >
                            Registration
                        </button>

                        </span>

                    </div>

                </div>


                {/* DASHBOARD PREVIEW */}

                <div className="dashboard-preview">

                    <div className="preview-cards">

                        <div className="preview-card">
                            <small>Total Stock</small>
                            <h3>1,240</h3>
                            <p>+12.5%</p>
                        </div>

                        <div className="preview-card">
                            <small>Products</small>
                            <h3>86</h3>
                            <p>+8.2%</p>
                        </div>

                        <div className="preview-card">
                            <small>Suppliers</small>
                            <h3>24</h3>
                            <p>+4.7%</p>
                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}

            <section
                className="features"
                id="features"
            >

                <div className="section-heading">

                    <p className="you">EVERYTHING YOU NEED</p>

                    <h2 className="under">
                        Your store, under control.
                    </h2>

                    <span className="tools">
                        Powerful tools to help you manage
                        your inventory and make better decisions.
                    </span>

                </div>


                <div className="feature-grid">

                    <div className="feature-card">

                        <h3>
                            📦 Inventory Tracking
                        </h3>

                        <p>
                            Know exactly what is in stock,
                            what has been received and what
                            has been spoilt.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                             📊 Smart Reports
                        </h3>

                        <p>
                            View weekly, monthly and annual
                            reports using easy-to-understand
                            graphs.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            💰 Payment Tracking
                        </h3>

                        <p>
                            Easily separate paid and unpaid
                            supplier payments.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            👥 Team Management
                        </h3>

                        <p>
                            Manage merchants, store admins
                            and clerks with secure role-based
                            access.
                        </p>

                    </div>

                </div>

            </section>


            {/* ABOUT */}

            <section
                className="about"
                id="about"
            >

                <div>

                    <p className="small-header">
                        WHY MYDUKA?
                    </p>

                    <h2 className="less">
                        Less paperwork.

                        <br />
                        
                        Better decisions.
                    </h2>

                </div>

                <p>
                    MyDuka gives businesses a simple way to
                    keep track of their inventory and store
                    performance. Instead of relying on
                    notebooks and spreadsheets, your team
                    can access accurate information from
                    one place.
                </p>

            </section>


            {/* CTA */}

            <section className="cta">

                <h2 className="ready">
                    Ready to take control of your inventory?
                </h2>

                <p className="start">
                    Start managing your store with MyDuka.
                </p>

                <div className="hero-button">

                <button
                    onClick={() =>
                        navigate("/register-merchant")
                    }
                >
                    Registration
                </button>

                </div>

            </section>


            {/* FOOTER */}

            <footer>

                <div className="logo">
                    <span>My</span>Duka
                </div>

                <p className="start">
                    Smart inventory management for modern
                    businesses.
                </p>

                <small className="ready">
                    © 2026 MyDuka. All rights reserved.
                </small>

            </footer>

        </div>
    );
}

export default Home;
