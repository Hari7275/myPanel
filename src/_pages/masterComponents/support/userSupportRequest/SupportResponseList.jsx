import React, { useMemo, useState, useEffect } from "react";
import ReactModal from "react-modal";
import UpdateSupportRequest from "./UpdateSupportRequest";
import DeleteComponent from "../../../payments/DeleteComponent";
import { Pencil, Trash, X } from "lucide-react";
import { formatDateTime } from "../../../../_constants/formatedDate";
import CommonTable from "../../../../_components/table/CommonTable";
import { useDeleteSupportResponseListMutation } from "../../../../_store/api";
import { useGetUserSupportResponseListQuery } from "../../../../_store/api";
import "../support.css";

const SupportResponseList = ({ isOpen, onClose, selectedData }) => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [deleteSupportResponse] = useDeleteSupportResponseListMutation();

  const { data: fetchData, isLoading } = useGetUserSupportResponseListQuery({
    user_ticket_id: selectedData?.id,
  });

  useEffect(() => {
    if (fetchData?.data?.rows && Array.isArray(fetchData.data.rows)) {
      setData(fetchData.data.rows);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdateData(!updateData);
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteSupportResponse({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const columns = useMemo(() => {
    const baseColumns = [
      {
        Header: "Response Id",
        accessor: "id",
      },
      {
        Header: "Support Executive",
        accessor: "support_executive_id",
      },
      {
        Header: "Response Message",
        accessor: "response_message",
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => formatDateTime(value),
      },
    ];

    if (selectedData?.status !== 2) {
      baseColumns.push({
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              className="deleteIcon"
              onClick={() => toggleDeleteComponent(row.original)}
            >
              <Trash className="iconSmall" />
            </span>
            <span
              className="editIcon"
              onClick={() => toggleUpdateData(row.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          </div>
        ),
      });
    }

    return baseColumns;
  }, [selectedData?.status, toggleDeleteComponent, toggleUpdateData]);

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        {/* ===== MOBILE VIEW ===== */}
        <div className="sup-resp-mobile">
          <div className="sup-resp-header">
            <h3 className="sup-resp-title">Support Responses</h3>
            <button className="sup-resp-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {isLoading ? (
            <div className="sup-cards">
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="sup-card sup-card-skeleton" key={`skeleton-${i}`}>
                  <div className="sup-skeleton-row">
                    <div className="sup-skeleton-line" style={{ width: "30%", height: "14px" }} />
                    <div className="sup-skeleton-line" style={{ width: "35%", height: "14px" }} />
                  </div>
                  <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                    <div className="sup-skeleton-line" style={{ width: "100%", height: "40px" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="sup-empty">No responses found</div>
          ) : (
            <div className="sup-cards">
              {data.map((item) => (
                <div className="sup-card" key={item.id}>
                  <div className="sup-card-row">
                    <span className="sup-card-id">Response #{item.id}</span>
                    <span className="sup-card-label">{formatDateTime(item.createdAt)}</span>
                  </div>

                  <div className="sup-card-message" style={{ WebkitLineClamp: 5 }}>
                    {item.response_message}
                  </div>

                  <div className="sup-card-footer">
                    <span className="sup-card-label">
                      Executive: <strong className="sup-card-value">{item.support_executive_id || "N/A"}</strong>
                    </span>
                    {selectedData?.status !== 2 && (
                      <div className="sup-card-actions">
                        <button className="sup-action-btn sup-action-btn-delete" title="Delete" onClick={() => toggleDeleteComponent(item)}>
                          <Trash size={15} />
                        </button>
                        <button className="sup-action-btn" title="Edit" onClick={() => toggleUpdateData(item)}>
                          <Pencil size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== DESKTOP VIEW ===== */}
        <div className="sup-resp-desktop">
          <CommonTable
            columns={columns}
            data={data}
            tableTitle="Support Response List"
            includeActions={false}
            includeCheckbox={false}
          />
        </div>
      </ReactModal>

      {updateData && (
        <UpdateSupportRequest
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
          isUpdate={true}
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

export default SupportResponseList;
