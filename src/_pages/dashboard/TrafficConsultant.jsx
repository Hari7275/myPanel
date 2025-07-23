import React from 'react'
import { Link } from "react-router-dom";
import "./CategoriesList.css";

export const CategoryCard = ({ link, label, price, bgcolor }) => (
    <div>
        <div
            className="card dashboard-sub-card"
            style={{ backgroundColor: bgcolor, boxShadow: "none", margin: "10px", border: "none", height: "320px" }}
        >
            <span style={{ fontSize: "20px", fontWeight: "600" }}>{label}</span>
            <span style={{ fontSize: "24px", fontWeight: "700" }}>{price}</span>
        </div>
    </div>
);

const TrafficConsultant = () => {
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
        <>
            <div className='traffic-consultants' style={{ marginLeft: "25px" }}>
                <div className="" style={{ width: "100%", height: "300px" }}>
                    {overviewItems.map((item) => (
                        <CategoryCard
                            key={item.name}
                            label={item.name}
                            price={item.price}
                            bgcolor={item.bgcolor}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default TrafficConsultant