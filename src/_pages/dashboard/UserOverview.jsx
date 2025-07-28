import React from 'react'
import { Link } from "react-router-dom";
import "./CategoriesList.css";

export const CategoryCard = ({ link, label, price, bgcolor }) => (
    <div>
        <div
            className="dashboard-sub-card"
            style={{ backgroundColor: bgcolor, boxShadow: "none" }}
        >
            <span style={{ fontSize: "20px", fontWeight: "600" }}>{label}</span>
            <span style={{ fontSize: "24px", fontWeight: "700" }}>{price}</span>
        </div>
    </div>
);

const UserOverview = () => {
    // List of all possible metadata items with their routes
    const overviewItems = [
        {
            name: "Total Users",
            link: "/coach-category_metadata",
            permissions: "view_coach_categories_list",
            price: "₹3781",
            bgcolor: "#E3F5FF"
        },
        {
            name: "Today's downloads",
            link: "/language-metadata",
            permissions: "view_app_languages_list",
            price: "30.1%",
            bgcolor: "#E5ECF6"
        },
        {
            name: "Weekly downloads",
            link: "/promotional-card-metadata",
            permissions: "view_promotional_cards_list",
            price: "1219",
            bgcolor: "#FFFFFF"
        },
        {
            name: "Monthly downloads",
            link: "/dashboard-banner-metadata",
            permissions: "view_dashboard_banner_list",
            price: "$694",
            bgcolor: "#FFFFFF"
        },
    ];
    return (
        <>
            <div className='useroverview' style={{ paddingLeft: '25px' }}>
                <span>
                    <h2 style={{ padding: "15px 5px" }}>UserOverview</h2>
                </span>
                <div className="dashboard-card-container-grid" style={{ marginTop: '10px' }}>
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

export default UserOverview