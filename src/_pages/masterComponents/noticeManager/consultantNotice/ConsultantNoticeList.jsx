import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { ASSIGNCONSULTANTNOTICECOLUMN } from "../noticeList/noticeColumn";
import { Pencil, Eye } from "lucide-react";

import NoticeDescription from "../noticeList/NoticeDescription";

import AssignConsultantNotice from "./AssignConsultantNotice";
import UpdateParticularNotice from "./UpdateParticularNotice";
import UnAssignConsultantNotice from "./UnAssignConsultantNotice";

import { useGetConsultantAssignedNoticeListQuery } from "../../../../_store/api";

const ConsultantNoticeList = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showAssigneNotice, setShowAssigneNotice] = useState(false);
  const [showUnAssignNotice, setShowUnAssignNotice] = useState(false);

  const [updateData, setUpdteData] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // handeling api  fetching data
  const { data: fetchData } = useGetConsultantAssignedNoticeListQuery();

  // store data

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // function for description

  const toggleDescription = (row) => {
    setSelectedRow(row.original);
    setShowDescription(!showDescription);
  };
  // function for description

  const toggleAssignNotice = (row) => {
    setShowAssigneNotice(!showAssigneNotice);
    setSelectedRow(row.original);
  };

  const toggleUnAssignNoticeNotice = (row) => {
    setShowUnAssignNotice(!showUnAssignNotice);
    setSelectedRow(row.original);
  };

  //  toggle function for adding new data

  const toggleAddData = () => {
    setShowAssigneNotice(!showAssigneNotice);
  };

  //  toggle function for updating data

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdteData(!updateData);
  };

  const AddButton = () => {
    return (
      <>
        <button
          className="addButton"
          style={{
            position: "absolute",
            right: "20px",
            backgroundColor: "#18B164",
            padding: "6px",
          }}
          onClick={() => toggleUnAssignNoticeNotice(data)}
        >
          Remove Notice
        </button>

        <button
          className="addButton"
          style={{
            position: "absolute",
            right: "175px",
            backgroundColor: "#18B164",
            padding: "6px",
          }}
          onClick={toggleAddData}
        >
          Add Notice
        </button>
      </>
    );
  };

  const columns = useMemo(
    () => [
      ...ASSIGNCONSULTANTNOTICECOLUMN,
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
              <Eye
                className="iconSmall"
                onClick={() => toggleDescription(row)}
              />
            </span>

            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateData(row.original)}
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
        data={data}
        includeActions={false}
        tableTitle="Notice Logs"
        AddPackageButton={AddButton}
        showTableHeading={false}
      />

      {showDescription && (
        <NoticeDescription
          isOpen={showDescription}
          onClose={toggleDescription}
          Description={selectedRow?.description}
        />
      )}

      {/* assign notic */}
      {showAssigneNotice && (
        <AssignConsultantNotice
          isOpen={showAssigneNotice}
          onClose={toggleAssignNotice}
          selectedRow={selectedRow}
        />
      )}
      {/* unAssign notic */}
      {showUnAssignNotice && (
        <UnAssignConsultantNotice
          isOpen={showUnAssignNotice}
          onClose={toggleUnAssignNoticeNotice}
          selectedRow={selectedRow}
        />
      )}

      {/* update particular description */}

      {updateData && (
        <UpdateParticularNotice
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};

export default ConsultantNoticeList;
