import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import PendingApproval from "./PendingApproval";
import { Alert,AlertTitle,CircularProgress } from '@mui/material';
import '../Onboarding/Onboarding.css'


const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    idNumber: "",
    birthDate: "",
    gender: "",
    referredBy: "",
    mobileNumber: "",
    city:"",
    streetAddress:"",
    province: "",
    alternativeNumber: "",
    email: "",
    race: "",
    numberOfChildren: "",
    disabilities: "",
    criminalRecord: "",
    relatedToLIV: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validationFail, setValidationFail] = useState(false);
  const [validationMessage,setValidationMessage]=useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Replace non-letter and non-number characters with a space, except for birthDate
    const sanitizedValue = name === 'birthDate' || name ==='email' || name ==='mobileNumber' ? value : value.replace(/[^a-zA-Z0-9\s]/g, ' ');
  
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true); 
    // Perform validations
    if (!validateEmail(formData.email)) {
      // alert("Please enter a valid email address.");
      setValidationFail(true);
      setValidationMessage("Please enter a valid email address.")
      setLoading(false);
      return;
    }
    
    if (!validateRequiredFields(formData)) {
      // alert("Please fill in all required fields.");
      setValidationFail(true);
      setValidationMessage(`Please fill all required fields * `)
      setLoading(false);
      return;
    }

    console.log("Form Data Submitted:", formData);
    try {
      // Call the resetPassword API endpoint
      const response = await axios.post('/api/register/addApplicant', {
        formData
      });
      console.log('Applicant',response)
      setSubmitted(true);
    } catch (error) {
      console.error('Registration failed', error);
    }finally{
      setLoading(false);
    }
  }

  // Validate email address format
  const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  }

  // Validate required fields
  const validateRequiredFields = (data) => {
    const requiredFields = [
      "name", "surname", "idNumber", "birthDate", "gender", "mobileNumber", "city", "streetAddress", 
      "province", "email", "race", "numberOfChildren", "disabilities", "criminalRecord", "relatedToLIV"
    ];
    return requiredFields.every(field => data[field].trim() !== "");
  };
  // Utility function for rendering labels
  const renderLabel = (label, isRequired) => (
    <label className="labelStyle">
       {isRequired && <span className="requiredLabel">*</span>} {label}
    </label>
  );

  const provinces = [
    'KwaZulu-Natal',
    'Mpumalanga',
    'Gauteng',
    'North West',
    'Eastern Cape',
    'Northern Cape',
    'Western Cape'
  ];

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="formContainer">
          <div className='formGroup'>
            {renderLabel("Name", true)}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Surname", true)}
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("ID Number", true)}
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Birth Date", true)}
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Gender", true)}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className='formGroup'>
            {renderLabel("How did you find out about the programme?", false)}
            <input
              type="text"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Mobile Number", true)}
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Province", true)}
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="">Select a province</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className='formGroup'>
            {renderLabel("City", true)}
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Street Address", true)}
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Alternative Number", false)}
            <input
              type="text"
              name="alternativeNumber"
              value={formData.alternativeNumber}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Email", true)}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Race", true)}
            <select
              name="race"
              value={formData.race}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="">Select</option>
              <option value="Black">Black</option>
              <option value="Coloured">Coloured</option>
              <option value="White">White</option>
              <option value="Indian/Asian">Indian/Asian</option>
            </select>
          </div>
          <div className='formGroup'>
            {renderLabel("No. Of children (under 18)", true)}
            <input
              type="number"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              className="inputStyle"
            />
          </div>
          <div className='formGroup'>
            {renderLabel("Do you have any disabilities?", true)}
            <select
              name="disabilities"
              value={formData.disabilities}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className='formGroup'>
            {renderLabel("Do You Have a Criminal Record?", true)}
            <select
              name="criminalRecord"
              value={formData.criminalRecord}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className='formGroup'>
            {renderLabel("Are You Related to Anyone employed at LIV?", true)}
            <select
              name="relatedToLIV"
              value={formData.relatedToLIV}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {validationFail && (
            <div style={{ marginBottom: "10px" }}>
              <Alert severity="warning">
                <AlertTitle>Incorrect Field</AlertTitle>
                {validationMessage}
              </Alert>
            </div>
          )}
          <button type="submit" className="inputStyle" style={{color:'black'}}>
            {loading ? (<CircularProgress size={24}/>  ) : ("Submit")}
          </button>
        </form>
      ) : (
        <PendingApproval
          name={formData.name}
          surname={formData.surname}
        />
      )}
    </div>
  );
};

export default Onboarding;
