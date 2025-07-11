import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { DASHBOARDBANNERCOLUMN } from "./dashboardBannerColumn";
import { Trash, ArrowRight, Pencil, Eye } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import AddDashboardBanner from "./AddDashboardBanner";
import UpdateDashboardBanner from "./UpdateDashboardBanner";
import SetDisplayBannerOrder from "./SetDisplayBannerOrder";
// import NoticeDescription from "./NoticeDescription";
import DragAndDropOrder from "./DragAndDropOrder";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import {
  useGetDashboardBannerListQuery,
  useDeleteDashboardBannerMutation,
} from "../../../_store/api";

const DashboardBannerList = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [updateDisplayOrder, setUpdateDisplayOrder] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState(null);
  const [dnd, setDnd] = useState(false);
  const permissions = usePermissions();

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetDashboardBannerListQuery();
  const [deleteData] = useDeleteDashboardBannerMutation();

  // store data
  useEffect(() => {
    // console.log("fetchData gifts", fetchData?.data.rows);
    if (fetchData) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // function for description

  //  toggle function for adding new data

  const toggleAddData = () => {
    setAddData(!addData);
  };
  const toggleOpenDnd = () => {
    setDnd(!dnd);
  };

  //  toggle function for updating data

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdteData(!updateData);
  };

  //  function for delete component
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteData({ id: selectedRow.id }).then(() => {
        setShowDeleteComponent(false);
      });
    }
  };

  const AddButton = () => {
    return (
      <>
        {permissions?.["meta_data_section"]?.includes("create_dashboard_banner") && (
          <button
            className="addButton"
            style={{
              position: "absolute",
              right: "20px",
              backgroundColor: "#18B164",
              padding: "6px",
            }}
            onClick={toggleAddData}
          >
            Add Banner
          </button>
        )}
        {permissions?.["meta_data_section"]?.includes("update_dashboard_banner") && (
          <button
            className="addButton"
            style={{
              position: "absolute",
              right: "220px",
              backgroundColor: "#18B164",
              padding: "6px",
            }}
            onClick={toggleOpenDnd}
          >
            Testing drag and drop
          </button>
        )}
      </>
    );
  };

  const toggleAssignNotice = (row) => {
    setUpdateDisplayOrder(!updateDisplayOrder);

    setAllData(data.map((order) => order));
    setSelectedRow(row);
  };

  const columns = useMemo(
    () => [
      ...DASHBOARDBANNERCOLUMN,
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
              <ArrowRight
                className="iconSmall"
                onClick={() => toggleAssignNotice(row.original)}
              />
            </span>
            {permissions?.["meta_data_section"]?.includes("update_dashboard_banner") && (
              <span className="editIcon">
                <Pencil
                  className="iconSmall"
                  onClick={() => toggleUpdateData(row.original)}
                />
              </span>
            )}
            {permissions?.["meta_data_section"]?.includes("delete_dashboard_banner") && (
              <span className="deleteIcon">
                <Trash
                  className="iconSmall"
                  onClick={() => toggleDeleteComponent(row.original)}
                />
              </span>
            )}
          </div>
        ),
      },
    ],
    [data]
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle=" Dashboard Bannner list"
        AddPackageButton={AddButton}
        showTableHeading={false}
      />

      {addData && (
        <AddDashboardBanner isOpen={addData} onClose={toggleAddData} />
      )}

      {dnd && <DragAndDropOrder isOpen={dnd} onClose={toggleOpenDnd} />}

      {updateData && (
        <UpdateDashboardBanner
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
        />
      )}

      {updateDisplayOrder && (
        <SetDisplayBannerOrder
          isOpen={updateDisplayOrder}
          onClose={toggleAssignNotice}
          selectedRow={selectedRow}
          allData={allData}
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

export default DashboardBannerList;
