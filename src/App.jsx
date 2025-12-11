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

  // --- UPDATED Validation Logic ---
  const validate = () => {
    const newErrors = {};
    let isValid = true;
    
    // 1. Compulsory Field Check (Must fill all fields)
    if (!formData.username) {
        newErrors.username = "Username is required"; // Example error for empty field
        isValid = false;
    }

    // 2. Email Validation (Must contain '@')
    const simpleEmailRegex = /@/; // Simplified check for just the '@' symbol
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!simpleEmailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required (must include '@')"; // Custom error message
      isValid = false;
    }

    // 3. Phone Number Validation (Must be exactly 10 digits)
    const phoneRegex = /^\d{10}$/; 
    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits"; // Custom error message
      isValid = false;
    }

    // 4. Date of Birth Validation (Must be valid format and not future date)
    const dobRegex = /^(\d{2})-(\d{2})-(\d{4})$/; // dd-mm-yyyy format
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
      isValid = false;
    } else if (!dobRegex.test(formData.dob)) {
      newErrors.dob = "DOB must be in dd-mm-yyyy format";
      isValid = false;
    } else {
      const parts = formData.dob.match(dobRegex);
      // Re-order to yyyy-mm-dd for JavaScript Date object
      const dateString = `${parts[3]}-${parts[2]}-${parts[1]}`; 
      const inputDate = new Date(dateString);
      const today = new Date();
      
      // Clear time part for accurate comparison
      today.setHours(0, 0, 0, 0); 
      
      // Check if the date is in the future
      if (inputDate > today) {
        newErrors.dob = "DOB cannot be a future date"; // Custom error message
        isValid = false;
      }
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
    /* Cypress Fix 3 / Test Case 6 Fix */
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

    /* Cypress Fix 1 & 3 */
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
          className="modal-overlay" 
          onClick={closeForm} // Test Case 6: Close on outside click
        > 
          <div
            className="modal modal-content" 
            onClick={(e) => e.stopPropagation()} 
          >
            <h2>Fill Details</h2>

            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username" 
                  value={formData.username}
                  onChange={handleChange}
                />
                {/* Error message for empty field */}
                {errors.username && <span className="error-msg">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                />
                {/* Error message for empty/invalid email */}
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone" 
                  placeholder="dd-mm-yyyy"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                />
                {/* Error message for empty/invalid phone */}
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  id="dob" 
                  placeholder="dd-mm-yyyy"
                  value={formData.dob}
                  onChange={handleChange}
                  maxLength="10"
                />
                {/* Error message for empty/invalid DOB */}
                {errors.dob && <span className="error-msg">{errors.dob}</span>}
              </div>

              <button type="submit">Submit</button>
            </form>

            {submissionMsg && <p className="submit-msg">{submissionMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
