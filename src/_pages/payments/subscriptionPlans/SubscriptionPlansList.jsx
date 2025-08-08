import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { SUBSCRIPTIONPLANCOLUMN } from "./subscriptionPlansColumn";
import { Info, Pencil, Trash } from "lucide-react";
import PackageDescription from "./PackageDescription";
import AddSubscriptionPlan from "./AddSubscriptionPlan";
import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";
import DeleteComponent from "../DeleteComponent";

import {
  useGetSubscriptionListQuery,
  useDeleteSubscriptionMutation,
} from "../../../_store/api";

const SubscriptionPlanList = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [addSubscriptionPlan, setAddSubscriptionPlan] = useState(false);
  const [showPlanUpdate, setShowPlanUpdate] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination

  // Fetching subscription plans data using RTK Query.
  const { data: fetchData } = useGetSubscriptionListQuery({
    page,
    size: pageSize,
  });

  const result = useMemo(() => fetchData?.data || [], [fetchData]);

  // Deleting subscription plans data using RTK Query.
  const [deletePlan] = useDeleteSubscriptionMutation();

  // handeling function description

  const toggleDescriptionModal = (row) => {
    setShowDescriptionModal(!showDescriptionModal);
    setSelectedRow(row);
  };

  const toggleAddPlans = () => {
    setAddSubscriptionPlan(!addSubscriptionPlan);
  };

  const toggleUpdatePlans = (row) => {
    setSelectedRow(row);
    setShowPlanUpdate(!showPlanUpdate);
  };

  // Function to toggle the delete component and set the selected row
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  // Function to handle delete operation
  const handleDelete = () => {
    if (selectedRow && selectedRow?.id) {
      deletePlan({ id: selectedRow?.id }).then(() => {
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
        onClick={toggleAddPlans}
      >
        Add Plan
      </button>
    );
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...SUBSCRIPTIONPLANCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view details"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Info
                className="iconSmall"
                onClick={() => toggleDescriptionModal(row?.original)}
              />
            </span>
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdatePlans(row?.original)}
              />
            </span>
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row?.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const totalPage = fetchData?.meta?.total_page || 1;
  // ? Math.ceil(fetchData.data.totalRecords / pageSize)
  // : 1;

  return (
    <>
      {/* <CommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle="Subscription Plan"
        AddPackageButton={AddPackageButton}
        showTableHeading={false}
      /> */}

      <DyCommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle="Subscription Plan"
        AddPackageButton={AddPackageButton}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {showDescriptionModal && (
        <PackageDescription
          isOpen={showDescriptionModal}
          onClose={toggleDescriptionModal}
          Description={selectedRow?.description}
        />
      )}
      {addSubscriptionPlan && (
        <AddSubscriptionPlan
          isOpen={addSubscriptionPlan}
          onClose={toggleAddPlans}
        />
      )}
      {showPlanUpdate && (
        <UpdateSubscriptionPlan
          isOpen={showPlanUpdate}
          onClose={toggleUpdatePlans}
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

export default SubscriptionPlanList;
