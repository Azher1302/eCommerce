import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './signin.css';

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const updateSigninUsersCount = () => {
    const totalUsersCount = parseInt(localStorage.getItem('signinUsers') || 0) + 1;
    localStorage.setItem('signinUsers', totalUsersCount);
  };

  useEffect(() => {
    if (dateOfBirth) {
      setAge(calculateAge(dateOfBirth));
    }
  }, [dateOfBirth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateSigninUsersCount();
    const userData = {
      name,
      email,
      phoneNumber,
      dateOfBirth,
      age,
      password,
      avatar: avatarPreview,
    };

    localStorage.setItem('signinuser', JSON.stringify(userData));
    const existingUsers = JSON.parse(localStorage.getItem('signinuserdata')) || [];
    existingUsers.push(userData);
    localStorage.setItem('signinuserdata', JSON.stringify(existingUsers));

    setName('');
    setEmail('');
    setPhoneNumber('');
    setDateOfBirth('');
    setAge('');
    setPassword('');
    setAvatar(null);
    setAvatarPreview('');
    setSubmitted(true);

    navigate('/userprofile');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
      setAvatarPreview('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    {showPassword ? <FiEyeOff /> : <FiEye />}
  };

  return (
    <div className="blur-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="form-container">
        <div>
          <h2 className="text-center">Sign in to your account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              id="phone-number"
              name="phone-number"
              type="tel"
              autoComplete="tel"
              required
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
              id="date-of-birth"
              name="date-of-birth"
              type="date"
              autoComplete="bday"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="text"
              readOnly
              placeholder="Age"
              value={age}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="password-toggle-icon" onClick={togglePasswordVisibility}>
              
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          {avatarPreview && (
            <div className="flex justify-center">
              <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />
            </div>
          )}
          <button type="submit">Sign in</button>
        </form>
        {submitted && <p className="text-green-500 text-center">Form submitted successfully!</p>}
      </div>
    </div>
  );
};

export default SignIn;
