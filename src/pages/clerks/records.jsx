import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  clerk_name: "",
  product_name: "",
  supplier_name: "",
  store_name: "",
  items_received: "",
  items_in_stock: "",
  items_spoilt: "0",
  buying_price: "",
  selling_price: "",
  payment_status: "unpaid",
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function Records() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [options, setOptions] = useState({
    clerks: [],
    stores: [],
  });

  const [error, setError] = useState("");
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);

  // =====================================================
  // LOAD CLERKS AND STORES
  // =====================================================

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await fetch(`${API_URL}/records`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `The API returned ${response.status}.`
          );
        }

        setOptions({
          clerks: data.clerks || [],
          stores: data.stores || [],
        });
      } catch (loadError) {
        setError(
          `Could not load clerks and stores. ${loadError.message}`
        );
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const change = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const submit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const recordData = {
        ...form,

        items_received: Number(form.items_received),
        items_in_stock: Number(form.items_in_stock),
        items_spoilt: Number(form.items_spoilt),
        buying_price: Number(form.buying_price),
        selling_price: Number(form.selling_price),
      };

      const response = await fetch(`${API_URL}/records`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(recordData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to create the inventory record."
        );
      }

      // Go back to inventory after successful save
      navigate("/clerk/inventory");

    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main style={pageStyle}>

      {/* BACK BUTTON */}
      <button
        type="button"
        style={backButton}
        onClick={() => navigate("/clerk/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {/* PAGE HEADER */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Record Inventory</h1>

        <p style={subtitleStyle}>
          Record the products received, stock available,
          supplier information and payment status.
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div role="alert" style={errorStyle}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* LOADING MESSAGE */}
      {loadingOptions && (
        <div style={loadingStyle}>
          Loading clerks and stores...
        </div>
      )}

      {/* FORM */}
      <form onSubmit={submit} style={formStyle}>

        {/* ===============================
            CLERK
        =============================== */}

        <Select
          label="Clerk"
          name="clerk_name"
          value={form.clerk_name}
          options={options.clerks}
          onChange={change}
          placeholder="Select clerk"
        />

        {/* ===============================
            STORE
        =============================== */}

        <Select
          label="Store or Branch"
          name="store_name"
          value={form.store_name}
          options={options.stores}
          onChange={change}
          placeholder="Select store"
        />

        {/* ===============================
            PRODUCT
        =============================== */}

        <TextField
          label="Product Name"
          name="product_name"
          value={form.product_name}
          onChange={change}
          placeholder="e.g. Pishori Rice"
        />

        {/* ===============================
            SUPPLIER
        =============================== */}

        <TextField
          label="Supplier Name"
          name="supplier_name"
          value={form.supplier_name}
          onChange={change}
          placeholder="e.g. Upendo Suppliers"
        />

        {/* ===============================
            ITEMS RECEIVED
        =============================== */}

        <Field
          label="Items Received"
          name="items_received"
          value={form.items_received}
          onChange={change}
          min="1"
        />

        {/* ===============================
            ITEMS IN STOCK
        =============================== */}

        <Field
          label="Items Now in Stock"
          name="items_in_stock"
          value={form.items_in_stock}
          onChange={change}
          min="0"
        />

        {/* ===============================
            SPOILT ITEMS
        =============================== */}

        <Field
          label="Spoilt Items"
          name="items_spoilt"
          value={form.items_spoilt}
          onChange={change}
          min="0"
          required={false}
        />

        {/* ===============================
            BUYING PRICE
        =============================== */}

        <Field
          label="Buying Price (KSh)"
          name="buying_price"
          value={form.buying_price}
          onChange={change}
          min="0"
          step="0.01"
        />

        {/* ===============================
            SELLING PRICE
        =============================== */}

        <Field
          label="Selling Price (KSh)"
          name="selling_price"
          value={form.selling_price}
          onChange={change}
          min="0"
          step="0.01"
        />

        {/* ===============================
            PAYMENT STATUS
        =============================== */}

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            Payment Status
          </label>

          <select
            name="payment_status"
            value={form.payment_status}
            onChange={change}
            style={inputStyle}
          >
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* ===============================
            SUBMIT BUTTON
        =============================== */}

        <button
          type="submit"
          disabled={saving || loadingOptions}
          style={{
            ...primaryButton,
            opacity: saving || loadingOptions ? 0.6 : 1,
            cursor:
              saving || loadingOptions
                ? "not-allowed"
                : "pointer",
          }}
        >
          {saving
            ? "Saving..."
            : "Save Inventory Record"}
        </button>

      </form>
    </main>
  );
}

// =====================================================
// SELECT COMPONENT
// =====================================================

function Select({
  label,
  name,
  value,
  options = [],
  onChange,
  placeholder,
}) {
  return (
    <div style={inputGroupStyle}>

      <label style={labelStyle}>
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        style={inputStyle}
      >
        <option value="">
          {placeholder || `Select ${label}`}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

// =====================================================
// NUMBER FIELD
// =====================================================

function Field({
  label,
  name,
  value,
  onChange,
  required = true,
  ...props
}) {
  return (
    <div style={inputGroupStyle}>

      <label style={labelStyle}>
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        {...props}
      />

    </div>
  );
}

// =====================================================
// TEXT FIELD
// =====================================================

function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div style={inputGroupStyle}>

      <label style={labelStyle}>
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        style={inputStyle}
      />

    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const pageStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#1F2937",
};

const headerStyle = {
  marginBottom: "25px",
};

const titleStyle = {
  margin: "0 0 8px",
  fontSize: "32px",
  fontWeight: "700",
};

const subtitleStyle = {
  margin: 0,
  color: "#64748B",
  fontSize: "16px",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",

  padding: "30px",

  background: "#FFFFFF",

  border: "1px solid #E2E8F0",

  borderRadius: "16px",

  boxShadow:
    "0 8px 25px rgba(15, 23, 42, 0.08)",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",

  padding: "12px 14px",

  border: "1px solid #CBD5E1",

  borderRadius: "8px",

  fontSize: "15px",

  outline: "none",

  background: "#FFFFFF",
};

const primaryButton = {
  gridColumn: "1 / -1",

  background: "#2563EB",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "8px",

  padding: "14px",

  fontSize: "16px",

  fontWeight: "600",

  marginTop: "5px",
};

const backButton = {
  background: "#4B5563",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "8px",

  padding: "10px 16px",

  cursor: "pointer",

  fontWeight: "600",

  marginBottom: "25px",
};

const errorStyle = {
  color: "#B91C1C",

  background: "#FEF2F2",

  border: "1px solid #FECACA",

  padding: "12px 15px",

  borderRadius: "8px",

  marginBottom: "20px",
};

const loadingStyle = {
  color: "#1D4ED8",

  background: "#EFF6FF",

  padding: "12px 15px",

  borderRadius: "8px",

  marginBottom: "20px",
};

export default Records;
