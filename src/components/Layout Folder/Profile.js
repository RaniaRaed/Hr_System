import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // استيراد useNavigate
import './Profile.css';

function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    name: 'Rania Raed',
    email: 'RaniaRaed@example.com',
    phone: '123-456-7890'
  });
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();  // استخدام useNavigate لتوجيه المستخدم

  useEffect(() => {
    // تحميل صورة الملف الشخصي من localStorage
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      localStorage.setItem('profilePic', imageUrl); // حفظ الصورة في localStorage
    }
  };

  const handleSaveChanges = () => {
    // يمكنك إضافة منطق لتخزين المعلومات الجديدة هنا
    alert('Profile updated successfully!');
    navigate('/dashboard'); // إعادة التوجيه إلى صفحة الداشبورد بعد حفظ التغييرات
  };

  const handleLogout = () => {
    // إضافة منطق لتسجيل الخروج
    alert('Logged out successfully!');
    localStorage.clear(); // مسح البيانات المخزنة في localStorage
    navigate('/login'); // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      
      {/* Profile Picture Section */}
      <div className="profile-pic-section">
        <img 
          src={profilePic || 'default-profile-pic.jpg'} 
          alt="Profile" 
          className="profile-pic"
        />
        {/* Button to trigger the file input */}
        <label className="profile-pic-upload">
          Upload Picture
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleProfilePicChange} 
            style={{ display: 'none' }} // إخفاء حقل الإدخال
          />
        </label>
      </div>

      {/* Profile Information */}
      <section className="profile-info-section">
        <h2>Profile Information</h2>
        <label>
          Name:
          <input 
            type="text" 
            name="name" 
            value={profileInfo.name} 
            onChange={handleProfileChange} 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={profileInfo.email} 
            onChange={handleProfileChange} 
          />
        </label>
        <label>
          Phone:
          <input 
            type="tel" 
            name="phone" 
            value={profileInfo.phone} 
            onChange={handleProfileChange} 
          />
        </label>
      </section>

      {/* Buttons */}
      <div className="profile-actions">
        <button className="save-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
