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
    // Clear errors when typing
    setErrors({});
  };

  // --- UPDATED Validation Logic (Using alert() for errors) ---
  const validate = () => {
    // Note: Since we are using alert(), we stop immediately on the first error.
    
    // 1. Compulsory Field Check
    if (!formData.username) {
        alert("Username is required.");
        return false;
    }
    if (!formData.email) {
        alert("Email is required.");
        return false;
    }
    if (!formData.phone) {
        alert("Phone Number is required.");
        return false;
    }
    if (!formData.dob) {
        alert("Date of Birth is required.");
        return false;
    }

    // 2. Email Validation (Must contain '@')
    const simpleEmailRegex = /@/;
    if (!simpleEmailRegex.test(formData.email)) {
      alert("Invalid email. Please check your email address."); // REQUIRED ALERT MESSAGE
      return false;
    }

    // 3. Phone Number Validation (Must be exactly 10 digits)
    const phoneRegex = /^\d{10}$/; 
    if (!phoneRegex.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number."); // REQUIRED ALERT MESSAGE
      return false;
    }

    // 4. Date of Birth Validation (dd-mm-yyyy format AND not future date)
    const dobRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    
    if (!dobRegex.test(formData.dob)) {
      // Assuming this is the desired alert for an incorrect format
      alert("Invalid Date of Birth. DOB must be in dd-mm-yyyy format.");
      return false;
    } else {
      const parts = formData.dob.match(dobRegex);
      const dateString = `${parts[3]}-${parts[2]}-${parts[1]}`; 
      const inputDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      
      if (inputDate > today) {
        // REQUIRED ALERT MESSAGE for Future Date (I'm using the phone number alert text as requested)
        alert("Invalid phone number. Please enter a 10-digit phone number."); 
        return false;
      }
    }

    return true; // All validation passed
  };

  // Submits the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmissionMsg("Success! Form submitted with valid data.");
      // You can add the alert here if required: alert("Form Submitted!");
    } else {
      setSubmissionMsg(""); // Clear message if validation fails
    }
  };

  // --- STYLES (Includes the CSS fix for Test Case 6) ---
  const styles = `
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

    .submit-msg {
        text-align: center;
        margin-top: 15px;
        font-weight: bold;
        color: ${submissionMsg.startsWith('Success') ? '#28a745' : '#dc3545'};
    }

    .submit-button { /* TARGETED CLASS FOR SUBMIT BUTTON */
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
      
      {/* REQUIRED: button element with text "Open Form" */}
      <button onClick={openForm}>Open Form</button>

      {isOpen && (
        <div 
          className="modal-overlay" 
          onClick={closeForm} 
        > 
          <div
            className="modal modal-content" 
            onClick={(e) => e.stopPropagation()} 
          >
            <h2>Fill Details</h2>

            {/* REQUIRED FORM STRUCTURE */}
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username" // REQUIRED ID
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  id="email" // REQUIRED ID
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone" // REQUIRED ID
                  placeholder="e.g., 1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  id="dob" // REQUIRED ID
                  placeholder="dd-mm-yyyy"
                  value={formData.dob}
                  onChange={handleChange}
                  maxLength="10"
                />
              </div>

              <button type="submit" className="submit-button">Submit</button>
            </form>
            {/* END OF REQUIRED FORM STRUCTURE */}

            {submissionMsg && <p className="submit-msg">{submissionMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
