import React from 'react'
import "../CategoriesList.css";

const ReferralTracking = () => {

   const cardContents = [
      { id: 1, heading: 'invited', count: '1234', text: 'people' },
      { id: 1, heading: 'joined', count: '1234', text: 'people' },
   ]
   const totalScore = 7.5;
   const r = 50;
   const C = 2 * Math.PI * r;
   const progress = totalScore / 10;
   const dash = progress * C;
   const gap = C - dash;

   return (
      <div className="dashboard-card-style" style={{ height: '300px', margin: '40px 0px' }}>
         <div className='heading' style={{ marginLeft: '40px' }}>
            <h2 style={{ color: 'var(--dashboard-heading-color)', fontWeight: 700 }}>Referral Tracking</h2>
         </div>
         {/* Card information.................................................... */}
         <div className='card-info'>
            {/* this is in row */}
            <div className='left-cards'>
               {cardContents.map((content) => (
                  <div className='info-container'>
                     <p>{content.heading}</p>
                     <p>{content.count}<span>{"  " + content.text}</span></p>
                  </div>
               ))}
            </div>
            <div className="score-barr">
               <svg width="200" height="200" viewBox="0 0 120 120">
                  <defs>
                     <linearGradient id="strokeGradient" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#00B69B" stopOpacity="0.2" />
                        <stop offset="60%" stopColor="#00B69B" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#00B69B" stopOpacity="1" />
                     </linearGradient>
                  </defs>
                  <circle
                     cx="60"
                     cy="60"
                     r="50"
                     fill="none"
                     stroke="url(#strokeGradient)"
                     strokeWidth="10"
                     strokeDasharray={`${dash} ${gap}`}
                     transform="rotate(60, 60, 60)"
                     strokeLinecap='round'
                  />
                  {/* Centered text */}
                  <text x="60" y="40" className="label-top">Acceptance</text>
                  <text x="60" y="60" className="main-score">{totalScore}</text>
                  <text x="60" y="85" className="label-bottom">Total score</text>
               </svg>
            </div>
         </div>
      </div>
   )
}

export default ReferralTracking