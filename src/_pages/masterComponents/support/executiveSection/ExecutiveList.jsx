import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Pencil, Trash, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { EXECUTIVELISTCOLUMN } from "./executiveListColumn";
import AddExecutive from "./AddExecutive";
import UpdateExecutive from "./UpdateExecutive";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetSupportExecutiveListQuery,
  useDeleteSupportExecutiveMutation,
} from "../../../../_store/api";
import "../support.css";

const ExecutiveList = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: fetchData, isLoading } = useGetSupportExecutiveListQuery();
  const [deleteData] = useDeleteSupportExecutiveMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data?.rows);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleAddData = () => setAddData(!addData);

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdateData(!updateData);
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow?.id) {
      deleteData({ id: selectedRow?.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const AddButton = () => (
    <button
      className="addButton"
      style={{ position: "absolute", right: "20px", backgroundColor: "#18B164", padding: "6px" }}
      onClick={toggleAddData}
    >
      Add Executive
    </button>
  );

  const columns = useMemo(() => [
    ...EXECUTIVELISTCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span className="deleteIcon">
            <Trash className="iconSmall" onClick={() => toggleDeleteComponent(row.original)} />
          </span>
          <span className="editIcon">
            <Pencil className="iconSmall" onClick={() => toggleUpdateData(row.original)} />
          </span>
        </div>
      ),
    },
  ]);

  const totalPage = Math.ceil((data?.length || 0) / pageSize) || 1;
  const paginatedData = data?.slice((page - 1) * pageSize, page * pageSize) || [];

  if (isLoading) {
    return (
      <div>
        <div className="sup-mobile-view">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="sup-card sup-card-skeleton" key={`skeleton-${i}`}>
              <div className="sup-skeleton-row">
                <div className="sup-skeleton-line" style={{ width: "55%", height: "16px" }} />
                <div className="sup-skeleton-badge" />
              </div>
              <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                <div className="sup-skeleton-line" style={{ width: "45%" }} />
                <div className="sup-skeleton-line" style={{ width: "30%" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="sup-desktop-view">
          <div className="sup-table-card" style={{ padding: 20, textAlign: "center", color: "#94a3b8" }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="sup-mobile-view">
        <div className="sup-filter-row">
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary, #1e293b)" }}>
            Executive List
          </span>
          <button className="sup-add-btn" onClick={toggleAddData}>
            <Plus size={18} />
          </button>
        </div>

        <div className="sup-cards">
          {paginatedData.length === 0 ? (
            <div className="sup-empty">No executives found</div>
          ) : (
            paginatedData.map((item) => (
              <div className="sup-card" key={item.id}>
                <div className="sup-card-row">
                  <div>
                    <span className="sup-card-title">{item.support_executive_name}</span>
                    <span className="sup-card-id" style={{ marginLeft: 8 }}>#{item.id}</span>
                  </div>
                </div>

                <div className="sup-card-row">
                  <span className="sup-card-value">{item.support_executive_email}</span>
                </div>

                <div className="sup-card-footer">
                  {item.support_issue_id && (
                    <span className="sup-card-label">Issue ID: <strong className="sup-card-value">{item.support_issue_id}</strong></span>
                  )}
                  <div className="sup-card-actions">
                    <button className="sup-action-btn sup-action-btn-delete" title="Delete" onClick={() => toggleDeleteComponent(item)}>
                      <Trash size={15} />
                    </button>
                    <button className="sup-action-btn" title="Edit" onClick={() => toggleUpdateData(item)}>
                      <Pencil size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {data?.length > pageSize && (
          <div className="sup-pagination">
            <button className="sup-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </button>
            <span className="sup-page-info">Page {page} of {totalPage}</span>
            <button className="sup-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="sup-desktop-view">
        <div className="sup-table-card">
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Executive List"
            AddPackageButton={AddButton}
          />
        </div>
      </div>

      {addData && <AddExecutive isOpen={addData} onClose={toggleAddData} />}
      {updateData && (
        <UpdateExecutive
          isOpen={updateData}
          onClose={toggleUpdateData}
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

export default ExecutiveList;
