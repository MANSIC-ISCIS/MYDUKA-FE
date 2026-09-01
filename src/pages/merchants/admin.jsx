import React, { useState } from "react";
import ActiveButton from "../../components/active_button";
import Sidebar from "../../components/sidebar";


function Admin() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Admin One",
      email: "admin1@gmail.com",
      active: true,
    },
    {
      id: 2,
      name: "Admin Two",
      email: "admin2@gmail.com",
      active: false,
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addAdmin = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      return;
    }

    const newAdmin = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      active: true,
    };

    setAdmins((currentAdmins) => [...currentAdmins, newAdmin]);

    setName("");
    setEmail("");
  };

  const toggleAdminStatus = (id) => {
    setAdmins((currentAdmins) =>
      currentAdmins.map((admin) =>
        admin.id === id
          ? { ...admin, active: !admin.active }
          : admin
      )
    );
  };

  const deleteAdmin = (id) => {
    setAdmins((currentAdmins) =>
      currentAdmins.filter((admin) => admin.id !== id)
    );
  };

  return (
    <div className="admin-dashboard">
      <Sidebar role="merchant" />
      
      <h1 className="stadmin">Store Administrators</h1>

      <form onSubmit={addAdmin} className="addadmin">
        <h2>Add Administrator</h2>

        <input
          type="text"
          placeholder="Administrator name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Administrator email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button className="buttons" type="submit">Add Account</button>
      </form>

      <table className="table-container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>

              <td>
                <ActiveButton
                  active={admin.active}
                  onClick={() => toggleAdminStatus(admin.id)}
                />
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => toggleAdminStatus(admin.id)}
                >
                  {admin.active ? "Deactivate" : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteAdmin(admin.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;