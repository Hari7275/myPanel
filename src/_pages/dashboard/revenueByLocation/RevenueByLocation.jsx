import React from 'react'
import { Link } from "react-router-dom";
import "../CategoriesList.css";

const RevenueByLocation = () => {
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
    const overviewItems = [
        {
            name: "Traffic - Consultants",
            link: "/coach-category_metadata",
            permissions: "view_coach_categories_list",
            price: "₹3781",
            bgcolor: "#ffFfFF"
        },
    ];
    return (
        <div className='' style={{ height: '100%', paddingLeft: '25px' }}>
            <div className="revenue-card-style" style={{ height: '100%' }}>
                <div className='heading' style={{ marginLeft: '40px' }}>
                    <h2>Referral Tracking</h2>
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
                                    <stop offset="0%" stop-color="#00B69B" stop-opacity="0.2" />
                                    <stop offset="60%" stop-color="#00B69B" stop-opacity="0.7" />
                                    <stop offset="100%" stop-color="#00B69B" stop-opacity="1" />
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
                            <text x="60" y="40" class="label-top">Acceptance</text>
                            <text x="60" y="60" class="main-score">{totalScore}</text>
                            <text x="60" y="85" class="label-bottom">Total score</text>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RevenueByLocation