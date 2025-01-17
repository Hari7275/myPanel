import React, { useState } from 'react';
import "../../cssfolder/LogoutPopup.css";
import { useNavigate } from 'react-router-dom';
import AcUnitIcon from "@mui/icons-material/AcUnit";
 
import { Link } from 'react-router-dom';

const LogoutPopup = () => {
    const navigate = useNavigate();

    // const [showLoginForm, setShowLoginForm] = useState(false);

    // const handleLogoutClick = () => {
    //     setShowLoginForm(!showLoginForm);
    // }

    return (
        <section className='main'>
            <div className="logout-container">
                <Link to="/">
                    
                    <div className='logout-content'>
                        <span className='logout-firstSpan'><AcUnitIcon/></span>
                        <span className='logout-secondSpan'> Logout</span>
                    </div>
                </Link>
            </div>
        </section>
        
    );
}

export default LogoutPopup;
