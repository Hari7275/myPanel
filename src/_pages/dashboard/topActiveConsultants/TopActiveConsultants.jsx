import React from 'react'
import "../CategoriesList.css";

export const CategoryCard = ({ src, count, text }) => (
    <div>
        <div className="active-consultant-card">
            <img src={src} alt="card-icon" style={{ width: "40px", height: "40px" }} />
            <span style={{ fontSize: "24px", fontWeight: "700" }}>{count}</span>
            <span style={{ fontSize: "20px", fontWeight: "600" }}>{text}</span>
        </div>
    </div>
);

const TopActiveConsultants = () => {

    const images = [
        { id: 1, src: 'avatar11.png', desc: 'Description 1' },
        { id: 1, src: 'avatar11.png', desc: 'Description 1' },
        { id: 1, src: 'avatar11.png', desc: 'Description 1' },
        { id: 1, src: 'avatar11.png', desc: 'Description 1' },
        { id: 1, src: 'avatar11.png', desc: 'Description 1' },
    ]
    const cardContents = [
        { id: 1, src: 'bell.png', count: '1234', text: 'Description 1' },
        { id: 1, src: 'bell.png', count: '1234', text: 'Description 1' },
    ]

    return (
        <div style={{ width: '100%', height: "auto", }}>
            <div className='top-active-consultant'>
                <h2> Top Active Consultants</h2>
                <p>View all</p>
            </div>
            {/* Image Section...................................... */}
            <div className='top-active-image-container'>
                {images.map((image) => (
                    <>
                        <div key={image.id} className="image-wrapper">
                            <img
                                src={image.src}
                                alt={image.desc}
                                className="consultant-image"
                            />
                            <div style={{}}>
                                <h3>{image.desc}</h3>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            {/* Card Section....................................... */}
            <div className='consultant-card-container'>
                {cardContents.map((card) => (
                    <CategoryCard
                        key={card.id}
                        src={card.src}
                        count={card.count}
                        text={card.text}
                    />
                ))}
            </div>
        </div>
    )
}

export default TopActiveConsultants