import React, { useState } from "react";
import ReactModal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial categories data
const initialCategories = [
  { id: "1", src: "girl-avtar.png", label: "Call" },
  { id: "2", src: "girl-avtar.png", label: "Chat" },
  { id: "3", src: "girl-avtar.png", label: "Wallet" },
  { id: "4", src: "girl-avtar.png", label: "Waitlist" },
  { id: "5", src: "girl-avtar.png", label: "Reviews" },
  { id: "6", src: "girl-avtar.png", label: "Support" },
  { id: "7", src: "girl-avtar.png", label: "Profile" },
  { id: "8", src: "girl-avtar.png", label: "Followers" },
  { id: "9", src: "girl-avtar.png", label: "Settings" },
  { id: "10", src: "girl-avtar.png", label: "Blocked Users" },
];

const CategoryCard = ({ src, label, provided, snapshot }) => (
  <div
    className="card-container"
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      ...provided.draggableProps.style,
      userSelect: "none",
      backgroundColor: snapshot.isDragging ? "#e0e0e0" : "white",
    }}
  >
    <div
      className="card category-card"
      style={{
        width: "200px",
        minHeight: "16vh",
        cursor: "grab",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card-img">
        <img src={src} alt="Card Image" width="40" height="40" />
      </div>
      <span style={{ paddingTop: "18px" }}>{label}</span>
    </div>
  </div>
);

const SetOrderList = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState(initialCategories);

  // Handle drag end to reorder categories
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <h2
        className="sub-heading"
        style={{
          marginBottom: "20px",
          display: "block",
          backgroundColor: "#f0f0f0",
          textAlign: "center",
        }}
      >
        Set Order List
      </h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories" direction="vertical">
          {(provided) => (
            <div
              className="category-card-container-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", // 4 items per row
                gap: "10px",
              }}
            >
              {categories.map(({ id, src, label }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <CategoryCard
                      src={src}
                      label={label}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ReactModal>
  );
};

export default SetOrderList;
