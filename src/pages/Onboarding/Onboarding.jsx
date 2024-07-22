import React, { useState } from "react";

const Onboarding = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    surname: "",
    preferredName: "",
    idNumber: "",
    birthDate: "",
    gender: "",
    referredBy: "",
    mobileNumber: "",
    homeAddress: "",
    alternativeNumber: "",
    email: "",
    race: "",
    numberOfChildren: "",
    disabilities: "",
    criminalRecord: "",
    relatedToLIV: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  };

  const labelStyle = {
    marginBottom: "5px",
  };

  const inputStyle = {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const sectionTitleStyle = {
    marginTop: "20px",
    marginBottom: "10px",
  };

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Surname:</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Preferred Name:</label>
        <input
          type="text"
          name="preferredName"
          value={formData.preferredName}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>ID Number:</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Birth Date:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>
          Referred by (How did you find out about the programme):
        </label>
        <input
          type="text"
          name="referredBy"
          value={formData.referredBy}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <h3 style={sectionTitleStyle}>CONTACT DETAILS</h3>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Mobile Number:</label>
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Home Address:</label>
        <input
          type="text"
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Alternative Number:</label>
        <input
          type="text"
          name="alternativeNumber"
          value={formData.alternativeNumber}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Race:</label>
        <select
          name="race"
          value={formData.race}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select</option>
          <option value="Black">Black</option>
          <option value="Coloured">Coloured</option>
          <option value="White">White</option>
          <option value="Indian/Asian">Indian/Asian</option>
        </select>
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>No. Of children (under 18):</label>
        <input
          type="number"
          name="numberOfChildren"
          value={formData.numberOfChildren}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Do you have any disabilities?</label>
        <input
          type="text"
          name="disabilities"
          value={formData.disabilities}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Do You Have a Criminal Record?</label>
        <input
          type="text"
          name="criminalRecord"
          value={formData.criminalRecord}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>
          Are You Related to Anyone employed at LIV?
        </label>
        <input
          type="text"
          name="relatedToLIV"
          value={formData.relatedToLIV}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <button type="submit" style={inputStyle}>
        Submit
      </button>
    </form>
  );
};

export default Onboarding;
