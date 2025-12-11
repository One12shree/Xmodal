import React, { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "", // Date of Birth (dd-mm-yyyy)
  });
  const [errors, setErrors] = useState({});
  const [submissionMsg, setSubmissionMsg] = useState("");

  const openForm = () => {
    setIsOpen(true);
    setErrors({});
    setSubmissionMsg("");
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
        ...errors,
        [e.target.name]: '' 
    });
  };

  // --- Validation Logic (For Test Cases 2, 3, 4) ---
  const validate = () => {
    const newErrors = {};
    let isValid = true;
    
    // Check all fields for presence
    if (!formData.username) {
        newErrors.username = "Username is required";
        isValid = false;
    }

    // Test Case 2: Validates email input field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required (e.g., user@example.com)";
      isValid = false;
    }

    // Test Case 3: Validates phone number input field (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    // Test Case 4: Validates date of birth input field (dd-mm-yyyy format)
    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!formData.dob || !dobRegex.test(formData.dob)) {
      newErrors.dob = "DOB must be in dd-mm-yyyy format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Test Case 5: Submits the form with valid data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmissionMsg("Success! Form submitted with valid data.");
      setErrors({});
    } else {
      setSubmissionMsg("Please correct the errors above.");
    }
  };

  // --- STYLES (Includes the CSS fix for Test Case 6) ---
  const styles = `
    /* Cypress Fix 3: Ensures the overlay uses the class .modal-overlay */
    .modal-overlay {
      position: fixed; 
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7); 
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000; 
      font-family: Arial, sans-serif;
    }
    
    /* Cypress Fix 3: Ensure the content uses both .modal and .modal-content */
    .modal, .modal-content {
      background: white;
      padding: 30px 40px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
      max-width: 450px;
      width: 90%;
      text-align: left;
    }

    .modal-content h2 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 25px;
      font-weight: bold;
      color: #333;
    }

    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #555;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }

    .error-msg {
      color: #dc3545;
      font-size: 0.85em;
      margin-top: 5px;
      display: block;
    }

    .submit-msg {
        text-align: center;
        margin-top: 15px;
        font-weight: bold;
        color: ${submissionMsg.startsWith('Success') ? '#28a745' : '#dc3545'};
    }

    .modal-content button[type="submit"] {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1em;
      font-weight: bold;
      margin-top: 10px;
      transition: background-color 0.3s;
    }

    #root > button {
        padding: 10px 20px;
        background-color: #5a5f73; 
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1em;
    }
  `;
  // --- END OF STYLES ---


  return (
    <div id="root">
      <style>{styles}</style> 
      
      <button onClick={openForm}>Open Form</button>

      {isOpen && (
        <div 
          className="modal-overlay" // Cypress Fix 3
          onClick={closeForm} // Test Case 6: Close on outside click
        > 
          <div
            className="modal modal-content" // Cypress Fix 1 & 3: Added .modal class
            onClick={(e) => e.stopPropagation()} // Keeps modal open on content click
          >
            <h2>Fill Details</h2>

            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username" // Cypress Fix 2
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <span className="error-msg">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  id="email" // Cypress Fix 2
                  value={formData.email}
                  onChange={handleChange}
                />
                {/* Test Case 2: Validates email input field */}
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone" // Cypress Fix 2
                  placeholder="e.g., 1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                />
                {/* Test Case 3: Validates phone number input field */}
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  id="dob" // Cypress Fix 2
                  placeholder="dd-mm-yyyy"
                  value={formData.dob}
                  onChange={handleChange}
                  maxLength="10"
                />
                {/* Test Case 4: Validates date of birth input field */}
                {errors.dob && <span className="error-msg">{errors.dob}</span>}
              </div>

              <button type="submit">Submit</button>
            </form>

            {/* Submission message output (for Test Case 5) */}
            {submissionMsg && <p className="submit-msg">{submissionMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
