import React, { useState, useRef, useEffect } from "react";

export default function XModal() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
        resetForm();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const resetForm = () => {
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    // Field validations
    if (!username) {
      alert("Please fill out the Username field.");
      return;
    }
    if (!email) {
      alert("Please fill out the Email field.");
      return;
    }
    if (!phone) {
      alert("Please fill out the Phone Number field.");
      return;
    }
    if (!dob) {
      alert("Please fill out the Date of Birth field.");
      return;
    }

    // Email validation
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Phone validation
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB validation (future date)
    const today = new Date();
    const userDOB = new Date(dob);

    if (userDOB > today) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // All good → close modal and reset
    setOpen(false);
    resetForm();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "40px",
        textAlign: "center",
        background: "#f0f2f5",
      }}
    >
      <h1>User Details Modal</h1>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Open Form
        </button>
      )}

      {open && (
        <div
          className="modal"
          style={{
            position: "fixed",
            inset: "0",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            ref={modalRef}
            className="modal-content"
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "420px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Fill Details</h2>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <label>Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                style={inputStyle}
              />

              {/* Email */}
              <label>Email Address:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={inputStyle}
              />

              {/* Phone */}
              <label>Phone Number:</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                style={inputStyle}
              />

              {/* DOB */}
              <label>Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                style={inputStyle}
              />

              <button
                type="submit"
                className="submit-button"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "20px",
                  background: "#1d4ed8",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px 0",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
};
