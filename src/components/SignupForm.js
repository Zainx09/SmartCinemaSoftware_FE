import React, { useState } from "react";
import "../App.css"; // You can use custom CSS to center the form
import { signup } from "../fetch/agent";
import { notification, Button } from "antd";

function SignupForm(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.username) {
      formErrors.username = "Username is required.";
    }
    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid.";
    }
    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
    }
    if (!formData.repassword) {
      formErrors.repassword = "Please re-enter the password.";
    } else if (formData.repassword !== formData.password) {
      formErrors.repassword = "Passwords do not match.";
    }
    if (!formData.phone) {
      formErrors.phone = "Phone number is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (validateForm()) {
  //       console.log("Form submitted successfully", formData);
  //       // Submit your form or perform further actions
  //     } else {
  //       console.log("Form has errors");
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await signup(formData);
        if (response?.status) {
          alert(response?.status);
        } else {
          alert(response?.status);
        }
        console.log(response.data); // Handle success message
      } catch (error) {
        console.error("Signup error:", error);
        notification.error({
          message: "Signup Failed",
          description:
            "There was an issue with the signup process. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <text style={{ fontSize: 35, fontWeight: "bold" }}>Sign Up</text>
        </div>

        <div className="form-group-signup">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? "error-input" : ""}
          />
          {errors.username && (
            <small className="error-msg">{errors.username}</small>
          )}
        </div>

        <div className="form-group-signup">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <small className="error-msg">{errors.email}</small>}
        </div>

        <div className="form-group-signup">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password must be at least 6 characters long"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && (
            <small className="error-msg">{errors.password}</small>
          )}
        </div>

        <div className="form-group-signup">
          <label>Re-enter Password:</label>
          <input
            type="password"
            name="repassword"
            placeholder="Password must be at least 6 characters long"
            value={formData.repassword}
            onChange={handleInputChange}
            className={errors.repassword ? "error-input" : ""}
          />
          {errors.repassword && (
            <small className="error-msg">{errors.repassword}</small>
          )}
        </div>

        <div className="form-group-signup">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? "error-input" : ""}
          />
          {errors.phone && <small className="error-msg">{errors.phone}</small>}
        </div>

        {/* <button type="submit" className="submit-btn">
          Submit
        </button> */}

        <div style={{ display: "flex", flexDirection: "row", width:'100%' }}>
          
          <Button
            className="submit-btn"
            loading={isLoading}
            disabled={isLoading}
            type={"primary"}
            style={{ fontSize: 18, fontWeight: "bold", width:'70%'}}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            // type={"ghost"}
            style={{ fontSize: 18, fontWeight: "bold", width:'29%', marginLeft:5}}
            onClick={()=>props.setShowSignUp?.(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
