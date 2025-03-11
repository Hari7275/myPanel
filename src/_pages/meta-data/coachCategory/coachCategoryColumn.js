import React from "react";
import { Switch } from "@mui/material";
import { useUpdateCoachCategoryMutation } from "../../../_store/api";

export const COACHCATEGORYCOLUMN = (toggleModal) => {
  // Mutation hook for updating coach category status
  const [updateCategoryStatus] = useUpdateCoachCategoryMutation();

  const handleStatusToggle = async (id, currentStatus) => {
    // Toggling status between 'active' and 'inactive'
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateCategoryStatus({ id, body: { status: newStatus } });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Category Name",
      accessor: "category_name",
    },
    {
      Header: "Category Background Color",
      accessor: "category_bg_color",
      Cell: ({ row }) => {
        const gradientColors = row?.original?.category_bg_color
          .map((color) => `${color.color} ${color.offset * 100}%`)
          .join(", ");
        return (
          <div
            style={{
              width: "25%",
              height: "50px",
              borderRadius: "10%",
              background: `linear-gradient(to right, ${gradientColors} )`,
            }}
          ></div>
        );
      },
    },
    {
      Header: "Category Card Background Color",
      accessor: "category_card_bg_color",
      Cell: ({ row }) => {
        const gradientColors = row.original.category_card_bg_color
          .map((color) => `${color.color} ${color.offset * 100}% `)
          .join(", ");
        return (
          <div
            style={{
              width: "25%",
              height: "50px",
              borderRadius: "10%",
              background: `linear-gradient(to right, ${gradientColors} )`,
            }}
          ></div>
        );
      },
    },
    {
      Header: "Card Image",
      accessor: "image",
      Cell: ({ row }) => (
        <div className="card-img">
          <img
            src={row.original.image || "snake.jpg"}
            alt="Card"
            width="40"
            height="40"
            onClick={() => toggleModal(row.original.image || "snake.jpg")}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <Switch
          checked={row.original.status === "active"}
          onChange={() =>
            handleStatusToggle(row?.original?.id, row?.original?.status)
          }
          color="primary"
        />
      ),
    },
  ];
};
