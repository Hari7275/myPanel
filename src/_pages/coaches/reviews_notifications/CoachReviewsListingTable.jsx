import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { REVIEWSCOLUMN } from "./reviewsListingColumns";
import AddCoachReviews from "./AddCoachReviews";
import UpdateCoachReview from "./UpdateCoachReview";
import DeleteComponent from "../../payments/DeleteComponent";
import { Pencil, Trash, ArrowRight } from "lucide-react";
import CoachNotificationsListingTable from "./CoachNotificationsListingTable";
import {
  useGetReviewsListQuery,
  useDeleteReviewMutation,
} from "../../../_store/api";
import { useSelector } from "react-redux";
import Description from "../../astrologers/reviews_notifications/Description";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const CoachReviews = () => {
  const [addReview, setAddReview] = useState(false);
  const [updateReview, setUpdateReview] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [description, setDescription] = useState(false);
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const permissions = usePermissions();

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetReviewsListQuery(consultantId);
  const [deleteReview] = useDeleteReviewMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.reviews || []);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddReviews = (coachId) => {
    setSelectedRow({ coach_id: consultantId });
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

  const toggleDescription = (row) => {
    setDescription(!description);
    setSelectedRow(row);
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
          // zIndex: "9999",
        };

    return (
      permissions?.["coach"]?.includes("create_coach_profile_review") && (
        <button
          className="addButton right-addButton"
          onClick={() => toggleAddReviews(coachId)}
        >
          Add Review
        </button>
      )
    );
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
            {permissions?.["coach"]?.includes("update_coach_profile_review") && (

              <span
                className="editIcon"
                onClick={() => toggleUpdateReviews(row.original)}
              >
                <Pencil className="iconSmall" />
              </span>
            )}
            {permissions?.["coach"]?.includes("delete_coach_profile_review") && (

              <span className="deleteIcon">
                <Trash
                  className="iconSmall"
                  onClick={() => toggleDeleteComponent(row.original)}
                />
              </span>
            )}
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
        {/* <AddPackageButton /> */}
        {data.length > 0 ? (
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Review List"
            includeCheckbox={false}
            AddPackageButton={AddPackageButton}
          />
        ) : (
          <p>No reviews available. Please add a review.</p>
        )}
      </div>
      {/* <div>
        <CoachNotificationsListingTable />
      </div> */}
      {addReview && (
        <AddCoachReviews
          isOpen={addReview}
          onClose={toggleAddReviews}
          coachId={selectedRow.coach_id}
        />
      )}
      {updateReview && (
        <UpdateCoachReview
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

export default CoachReviews;
