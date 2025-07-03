import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { REVIEWSCOLUMN } from "./reviewsListingColumns";

import AddListenerReview from "./AddListenerReview";
import UpdateListenerReview from "./UpdateListenerReview";
import DeleteComponent from "../../payments/DeleteComponent";
import { Pencil, Trash, ArrowRight } from "lucide-react";
import {
  useGetReviewsListQuery,
  useDeleteReviewMutation,
} from "../../../_store/api";
import LIstenerNotificationListingTable from "./LIstenerNotificationListingTable";
import { useSelector } from "react-redux";
import Description from "../../astrologers/reviews_notifications/Description";

const ListenerReviewsListingTable = () => {
  const [addReview, setAddReview] = useState(false);
  const [updateReview, setUpdateReview] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [description, setDescription] = useState(false);

  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetReviewsListQuery(consultantId);
  const [deleteReview] = useDeleteReviewMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.reviews || []); // Ensure data is always an array
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddReviews = (coachId) => {
    setSelectedRow(consultantId);
    setAddReview(!addReview);
  };

  // Toggle function for updating a review
  const toggleUpdateReviews = (row) => {
    setSelectedRow(row);
    setUpdateReview(!updateReview);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteReview({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  // Button component to add a review
  const AddPackageButton = () => {
    const coachId = data.length > 0 ? data[0].coach_id : null;

    // Conditional styling based on whether data is present
    const buttonStyle =
      data.length > 0
        ? {
          position: "absolute",
          top: "125px",
          right: "40px",
          backgroundColor: "#18B164",
          padding: "6px",
          zIndex: "9999",
        }
        : {
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
          zIndex: "9999",
        };

    return (
      <button
        className="addButton"
        style={buttonStyle}
        onClick={() => toggleAddReviews(coachId)}
      >
        Add Review
      </button>
    );
  };

  const toggleDescription = (row) => {
    setDescription(!description);
    setSelectedRow(row);
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...REVIEWSCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              className="editIcon"
              onClick={() => toggleUpdateReviews(row.original)}
            >
              <Pencil className="iconSmall" />
            </span>
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
            <span className="secondIcon">
              <ArrowRight
                className=""
                onClick={() => toggleDescription(row?.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div
        className="ProfileData-container profile-right-sub-container"
        style={{ position: "relative" }}
      >
        <AddPackageButton />
        {data.length > 0 ? (
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Review List"
            includeCheckbox={false}
          />
        ) : (
          <p>No reviews available. Please add a review.</p>
        )}
      </div>

      {/* <LIstenerNotificationListingTable /> */}

      {addReview && (
        <AddListenerReview
          isOpen={addReview}
          onClose={toggleAddReviews}
          coachId={selectedRow}
        />
      )}
      {updateReview && (
        <UpdateListenerReview
          isOpen={updateReview}
          onClose={toggleUpdateReviews}
          selectedRow={selectedRow}
        />
      )}

      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}

      {description && selectedRow && (
        <Description
          isOpen={description}
          onClose={toggleDescription}
          Descriptions={selectedRow?.review_text || ""}
        />
      )}
    </div>
  );
};

export default ListenerReviewsListingTable;
