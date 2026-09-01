import React from "react";
import { useEffect, useState } from "react";

import {
    getStores,
    addStore,
    updateStore,
    deleteStore
} from "../../services/merchantservice";
import Sidebar from "../../components/sidebar";

function Stores() { 

  const [stores, setStores] = useState([]);

  const [formData, setFormData] = useState({
        st_name: "",
        location: "",
        merchant_id: ""
    });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


    // =========================
    // GET STORES
    // =========================

      const loadStores = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getStores();

            // Depending on your Flask response
            setStores(data.stores || data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    // Load stores when page opens

    useEffect(() => {

        loadStores();

    }, []);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // =========================
    // ADD / UPDATE STORE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        try {

            setLoading(true);

            if (editingId) {

                // UPDATE

                await updateStore(
                    editingId,
                    formData
                );

                setSuccess(
                    "Store updated successfully."
                );

            } else {

                // ADD

                await addStore(formData);

                setSuccess(
                    "Store added successfully."
                );
            }


            // Clear form

            setFormData({
                st_name: "",
                location: "",
                merchant_id: ""
            });

            setEditingId(null);

            // Refresh stores

            await loadStores();

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // EDIT STORE
    // =========================

    const handleEdit = (store) => {

        setEditingId(store.id);

        setFormData({
            st_name: store.name,
            location: store.location,
            merchant_id: store.merchant_id,
        });

        setError("");
        setSuccess("");

        // Scroll to form

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // CANCEL EDIT
    // =========================

    const cancelEdit = () => {

        setEditingId(null);

        setFormData({
            st_name: "",
            location: "",
            merchant_id: ""
        });

    };


    // =========================
    // DELETE STORE
    // =========================

    const handleDelete = async (storeId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this store?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await deleteStore(storeId);

            setSuccess(
                "Store deleted successfully."
            );

            // Refresh stores

            await loadStores();

        } catch (error) {

            setError(error.message);

        }
    };


    return (

        <div className="admin-dashboard">

            {/* HEADER */}

            <div className="page-header">

                <div>
                    <Sidebar role="merchant" />

                    <h1>
                        My Stores
                    </h1>

                    <p>
                        Manage your MyDuka stores.
                    </p>

                </div>

            </div>


            {/* MESSAGES */}

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


            {/* ADD / EDIT FORM */}

            <main className="admin-main">

                <form
                    className="store-form-card"
                    onSubmit={handleSubmit}
                >

                    {/* STORE NAME */}
                    <h2>ADD STORE</h2>

                    <div className="form-group">

                        <label>
                            Store Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Store 1"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* LOCATION */}

                    <div className="form-group">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Nairobi"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Merchant id
                        </label>

                        <input
                            type="text"
                            name="merchant_id"
                            placeholder="e.g. 1"
                            value={formData.merchant_id}
                            onChange={handleChange}
                            min="1"
                            required
                        />

                    </div>

                        {/* BUTTONS */}

                    <div className="form-buttons">

                        <button
                            className="buttons"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Store"
                                    : "Add Store"}
                        </button>


                        {editingId && (

                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </main>

          <div className="admin-main">


            {/* STORE LIST */}

            <div className="stores-section">

                <div className="section-title">

                    <h2>
                        Your Stores
                    </h2>

                    <span>
                        {stores.length} stores
                    </span>

                </div>


                {loading && stores.length === 0 ? (

                    <p>
                        Loading stores...
                    </p>

                ) : stores.length === 0 ? (

                    <div className="empty-state">

                        <h3>
                            No stores yet
                        </h3>

                        <p>
                            Add your first store using
                            the form above.
                        </p>

                    </div>

                ) : (

                    <div className="stores-grid">

                        {stores.map((store) => (

                            <div
                                className="store-card"
                                key={store.store_id}
                            >

                                <div className="store-icon">
                                    🏪
                                </div>

                                <div className="store-info">

                                    <h3>
                                        {store.st_name}
                                    </h3>

                                    <p>
                                        📍 {store.location}
                                    </p>

                                    {store.created_at && (

                                        <small>
                                            Created:{" "}
                                            {new Date(
                                                store.created_at
                                            ).toLocaleDateString()}
                                        </small>

                                    )}

                                </div>


                                {/* ACTIONS */}

                                <div className="store-actions">

                                    <button
                                        onClick={() =>
                                            handleEdit(store.store_id)
                                        }
                                        className="edit-btn"
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                store.store_id
                                            )
                                        }
                                        className="edit-btn"
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
            
          </div>

        </div>
    );
}

export default Stores;