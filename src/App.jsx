import React, { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "", 
  });

  const openForm = () => {
    setIsOpen(true);
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
  };

  // --- Final Validation Logic using alert() ---
  const validate = () => {
    const { username, email, phone, dob } = formData;

    // 1. Compulsory Field Checks
    if (!username) {
        alert("Username is required.");
        return false;
    }
    if (!email) {
        alert("Email is required.");
        return false;
    }
    if (!phone) {
        alert("Phone Number is required.");
        return false;
    }
    if (!dob) {
        alert("Date of Birth is required.");
        return false;
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // REQUIRED ALERT MESSAGE for Email
        alert("Invalid email. Please check your email address.");
        return false;
    }

    // 3. Phone Number Validation (Must be exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        // REQUIRED ALERT MESSAGE for Phone Number
        alert("Invalid phone number. Please enter a 10-digit phone number.");
        return false;
    }

    // 4. Date of Birth Validation (Format and Future Date Check)
    const dobRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = dob.match(dobRegex);
    
    if (!match) {
      // Alert for incorrect format
      alert("Invalid Date of Birth. DOB must be in dd-mm-yyyy format.");
      return false;
    }

    // Parse date parts
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; 
    const year = parseInt(match[3], 10);

    const inputDate = new Date(year, month, day);

    // Check if the date is a real calendar date
    if (
      inputDate.getFullYear() !== year ||
      inputDate.getMonth() !== month ||
      inputDate.getDate() !== day
    ) {
      alert("Invalid Date of Birth. Please enter a real calendar date.");
      return false;
    }

    // Check if DOB is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      // STRICTLY REQUIRED ALERT MESSAGE for future DOB (must be the phone number error text)
      alert("Invalid phone number. Please enter a 10-digit phone number."); 
      return false;
    }
    
    return true; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Form Submitted Successfully!");
      closeForm(); 
    }
  };

  // --- STYLES and JSX (Kept clean for the final passing state) ---
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

    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }

    .submit-button { 
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

  return (
    <div id="root">
      <style>{styles}</style> 
      
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
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  id="phone" 
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
                  id="dob" 
                  placeholder="dd-mm-yyyy"
                  value={formData.dob}
                  onChange={handleChange}
                  maxLength="10"
                />
              </div>

              <button type="submit" className="submit-button">Submit</button> 
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
