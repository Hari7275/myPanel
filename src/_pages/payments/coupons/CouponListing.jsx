import React, { useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { COUPONCOLUMN } from "./couponListingColumn";
import { Pencil, Trash, Info } from "lucide-react";
import CouponDiscription from "./CouponDiscription";
import DeleteComponent from "../DeleteComponent";
import AddCoupon from "./AddCoupon";
import UpdateCoupon from "./UpdateCoupon";

import {
  useGetCouponsListQuery,
  useDeleteCouponsMutation,
} from "../../../_store/api";

const CouponListing = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showUpdateProducts, setShowUpdateProducts] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetching Dating products  data using RTK Query.
  const { data: fetchData, isLoading, error } = useGetCouponsListQuery();

  const result = useMemo(() => fetchData?.data || [], [fetchData]);

  // Deleting Dating products  data using RTK Query.
  const [deleteProduct] = useDeleteCouponsMutation();

  // handeling function description

  const toggleDescriptionModal = (row) => {
    setShowDescriptionModal(!showDescriptionModal);
    setSelectedRow(row);
  };

  const toggleAddProducts = () => {
    setShowAddProducts(!showAddProducts);
  };

  const toggleUpdateProducts = (row) => {
    setSelectedRow(row);
    setShowUpdateProducts(!showUpdateProducts);
  };

  // Function to toggle the delete component and set the selected row
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteProduct({ id: selectedRow.id }).then(() => {
        setShowDeleteComponent(false);
      });
    }
  };

  // Button component to add package
  const AddPackageButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
        onClick={toggleAddProducts}
      >
        Add Coupon
      </button>
    );
  };

  // Memoized columns definition for the table

  const columns = useMemo(
    () => [
      ...COUPONCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view description"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Info
                className="iconSmall"
                onClick={() => toggleDescriptionModal(row.original)}
              />
            </span>
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateProducts(row.original)}
              />
            </span>
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle="Coupon List"
        AddPackageButton={AddPackageButton}
        showTableHeading={false}
      />

      {showDescriptionModal && (
        <CouponDiscription
          isOpen={showDescriptionModal}
          onClose={toggleDescriptionModal}
          Description={selectedRow.description}
        />
      )}

      {showAddProducts && (
        <AddCoupon isOpen={showAddProducts} onClose={toggleAddProducts} />
      )}

      {showUpdateProducts && (
        <UpdateCoupon
          isOpen={showUpdateProducts}
          onClose={toggleUpdateProducts}
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
    </>
  );
};

export default CouponListing;
