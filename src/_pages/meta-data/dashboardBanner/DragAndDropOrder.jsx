import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Add this helper function to maintain animation during drag
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: "12px 16px",
  marginBottom: "10px",
  backgroundColor: isDragging ? "#d0f0ff" : "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxShadow: isDragging
    ? "0 4px 12px rgba(0, 0, 0, 0.15)"
    : "0 1px 3px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease",
  // Remove position absolute and transform from dragging styles
  ...draggableStyle,
});

const DragAndDropOrder = ({
  isOpen,
  onClose,
  isDragModal = true,
  selectedRow,
  onSubmit, // Add this prop
}) => {
  const [dragItems, setDragItems] = useState([
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
    "item7",
    "item8",
    "item9",
    "item10",
    "item11",
    "item12",
    "item13",
    "item14",
    "item15",
  ]);

  // Update dragItems when selectedRow changes
  useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
      setDragItems(selectedRow);
    }
  }, [selectedRow]);

  console.log("selectedRow", selectedRow);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(dragItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDragItems(items);

    // Call the onSubmit prop with the new order
    // onSubmit(items);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modalx"
      overlayClassName="overlayx"
      style={{
        content: {
          width: "400px",
          margin: "auto",
          padding: "20px",
          overflow: "scroll",
          zIndex: 1001,
          // Apply centering styles conditionally
          position: isDragModal ? "relative" : "absolute",
          top: isDragModal ? "auto" : "50%",
          left: isDragModal ? "auto" : "50%",
          transform: isDragModal ? "none" : "translate(-50%, -50%)",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          overflow: "hidden",
        },
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>Drag and Drop List</h2>
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided, snapshot) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  minHeight: "200px",
                  backgroundColor: snapshot.isDraggingOver
                    ? "#f0f8ff"
                    : "white",
                  transition: "background-color 0.2s ease",
                  // Add position relative to contain absolutely positioned placeholder
                  position: "relative",
                }}
              >
                {dragItems.map((item, index) => (
                  <Draggable
                    key={item}
                    draggableId={item.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{item}</span>
                          <span style={{ color: "#999" }}>☰</span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          className="fifthButton"
          style={{ backgroundColor: "green" }}
          onClick={() => onSubmit(dragItems)}
          // disabled={isLoading}
        >
          {"Submit"}
        </button>
      </div>
    </ReactModal>
  );
};

export default DragAndDropOrder;
