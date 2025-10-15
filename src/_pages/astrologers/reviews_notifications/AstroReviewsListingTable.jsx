import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { REVIEWSCOLUMN } from "./reviewsListingColumns";
import AddAstrologerReview from "./AddAstrologerReview";
import UpdateAstrologerReview from "./UpdateAstrologerReview";
import DeleteComponent from "../../payments/DeleteComponent";
import { Pencil, Trash, ArrowRight } from "lucide-react";
import {
  useGetReviewsListQuery,
  useDeleteReviewMutation,
} from "../../../_store/api";
import AstroNotificationsListingTable from "./AstroNotificationsListingTable";
import { useSelector } from "react-redux";
import Description from "./Description";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const AstroReviewsListingTable = () => {
  const [addReview, setAddReview] = useState(false);
  const [updateReview, setUpdateReview] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [description, setDescription] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const permissions = usePermissions();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  // Fetching API data for listing reviews
  // Fetching API data for listing reviews
  const { data: fetchData } = useGetReviewsListQuery({
    consultantId,
    page,
    pageSize,
  });
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
            // position: "absolute",
            top: "125px",
            right: "40px",
            backgroundColor: "#18B164",
            padding: "6px",
            // zIndex: "9999",
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
      permissions?.["astrologer"]?.includes(
        "create_astrologer_profile_review"
      ) && (
        <button
          className="addButton right-addButton"
          onClick={() => toggleAddReviews(coachId)}
        >
          Add Review
        </button>
      )
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
            {permissions?.["astrologer"]?.includes(
              "update_astrologer_profile_review"
            ) && (
              <span
                className="editIcon"
                onClick={() => toggleUpdateReviews(row?.original)}
              >
                <Pencil className="iconSmall" />
              </span>
            )}
            {permissions?.["astrologer"]?.includes(
              "delete_astrologer_profile_review"
            ) && (
              <span className="deleteIcon">
                <Trash
                  className="iconSmall"
                  onClick={() => toggleDeleteComponent(row?.original)}
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

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

  return (
    <div>
      <div
        className="ProfileData-container profile-right-sub-container"
        style={{ position: "relative" }}
      >
        {/* <AddPackageButton /> */}

        <DyCommonTable
          columns={columns}
          data={data}
          includeActions={false}
          tableTitle="Review List"
          dynamicPagination={dynamicPagination}
          // customFilterComponent={customFilterComponent}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          includeCheckbox={false}
          AddPackageButton={AddPackageButton}

          // showTableHeading={false}
        />
      </div>

      <AstroNotificationsListingTable />

      {addReview && (
        <AddAstrologerReview
          isOpen={addReview}
          onClose={toggleAddReviews}
          coachId={selectedRow}
        />
      )}
      {updateReview && (
        <UpdateAstrologerReview
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

export default AstroReviewsListingTable;
