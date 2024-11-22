import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css'; // استيراد تنسيق CSS للتوب بار
import profileImage from '../../img/Ran-prof.png'; // استيراد صورة الملف الشخصي

const TopBar = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(profileImage); // تعيين صورة الملف الشخصي الافتراضية

    useEffect(() => {
        // تحميل صورة الملف الشخصي من localStorage إذا كانت متاحة
        const savedProfilePic = localStorage.getItem('profilePic');
        if (savedProfilePic) {
            setProfilePic(savedProfilePic);
        } 
        // لا حاجة لتعيين صورة افتراضية هنا لأننا نقوم بتعيين profileImage مسبقًا

        // تحميل مكتبة أيقونات Ionicons
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        script.type = 'module';
        document.body.appendChild(script);

        const scriptNoModule = document.createElement('script');
        scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        scriptNoModule.setAttribute('nomodule', '');
        document.body.appendChild(scriptNoModule);

        // تنظيف التحميل عند إلغاء تركيب المكون
        return () => {
            document.body.removeChild(script);
            document.body.removeChild(scriptNoModule);
        };
    }, []);

    // دالة للتوجيه إلى صفحة الإعدادات
    const goToProfileSettings = () => {
        navigate('/profile');
    };

    return (
        <div className="topbar">
            <div className="topbar-search">
                <label>
                    <input type="text" placeholder="Search..." />
                    <ion-icon name="search-outline"></ion-icon>
                </label>
            </div>

            <div className="topbar-right">
                <div className="topbarnotification-icon">
                    <ion-icon name="notifications-outline"></ion-icon>
                </div>
                <div className="topbar-profile" onClick={goToProfileSettings} style={{ cursor: 'pointer' }}>
                    <img 
                        src={profilePic} 
                        alt="Profile" 
                        style={{ borderRadius: '50%', width: '40px', height: '40px' }} // تنسيق الصورة
                    />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
