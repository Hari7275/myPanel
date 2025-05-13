import React, { useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { DATINGPRODUCTSCOLUMN } from "./qdProductsColumn";
import { Pencil, Trash, Info } from "lucide-react";
import DatingDescription from "../datingProducts/DatingDescription";
import DeleteComponent from "../DeleteComponent";
import AddDatingProducts from "./AddQdProducts";
import UpdateDatingProducts from "./UpdateQdProducts";

import {
  useGetQdProductListQuery,
  useDeleteQdProductsMutation,
} from "../../../_store/api";

const QdProducts = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showUpdateProducts, setShowUpdateProducts] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination] = useState(true); // Enable or disable dynamic pagination

  // Fetching Dating products  data using RTK Query.
  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetQdProductListQuery({
    page: page,
    size: pageSize,
  });

  const result = useMemo(() => fetchData?.data || [], [fetchData]);

  // Deleting Dating products  data using RTK Query.
  const [deleteProduct] = useDeleteQdProductsMutation();

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
        Add Product
      </button>
    );
  };

  // Memoized columns definition for the table

  const columns = useMemo(
    () => [
      ...DATINGPRODUCTSCOLUMN,
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

  const totalPage = fetchData?.meta?.total_page || 1;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle=" QD Products List"
        AddPackageButton={AddPackageButton}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />

      {showDescriptionModal && (
        <DatingDescription
          isOpen={showDescriptionModal}
          onClose={toggleDescriptionModal}
          Description={selectedRow.description}
        />
      )}

      {showAddProducts && (
        <AddDatingProducts
          isOpen={showAddProducts}
          onClose={toggleAddProducts}
        />
      )}

      {showUpdateProducts && (
        <UpdateDatingProducts
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

export default QdProducts;
