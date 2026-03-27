import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { NOTIFICATIONTAMPLATECOLUMN } from "./notificationTamplateColumn";
import { Trash, Pencil, Info, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import DeleteComponent from "../../../payments/DeleteComponent";
import GiftDescription from "../../gifts/GiftDescription";
import CreateNotificationTamplate from "./CreateNotificationTamplate";
import UpdateNotificationTamplate from "./UpdateNotificationTamplate";
import { useGetUserNotificationTamplateListQuery } from "../../../../_store/api";
import { useDeleteUserNotificationemplateMutation } from "../../../../_store/api";
import { formatDateTime } from "../../../../_constants/formatedDate";
import "../../support/support.css";

const NotificationTamplateList = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination] = useState(true);

  const { data: fetchData, isFetching, isLoading } = useGetUserNotificationTamplateListQuery({
    page,
    size: pageSize,
  });
  const [deleteData] = useDeleteUserNotificationemplateMutation();

  const totalPage = fetchData?.meta?.total_page || 1;

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.records || []);
    }
  }, [fetchData]);

  const toggleDescription = (row) => {
    setSelectedRow(row.original);
    setShowDescription(!showDescription);
  };

  const toggleAddData = () => {
    setAddData(!addData);
  };

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdteData(!updateData);
  };

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

  const AddButton = () => (
    <button
      className="addButton"
      style={{ position: "absolute", right: "20px", backgroundColor: "#18B164", padding: "6px" }}
      onClick={toggleAddData}
    >
      Create Template
    </button>
  );

  const columns = useMemo(
    () => [
      ...NOTIFICATIONTAMPLATECOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view message"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Info
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
    [],
  );

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
                <div className="sup-skeleton-line" style={{ width: "100%", height: "40px" }} />
              </div>
              <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                <div className="sup-skeleton-line" style={{ width: "40%" }} />
                <div className="sup-skeleton-badge" />
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
            Notification Templates
          </span>
          <button className="sup-add-btn" onClick={toggleAddData}>
            <Plus size={18} />
          </button>
        </div>

        <div className="sup-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="sup-card sup-card-skeleton" key={`skeleton-${i}`}>
                <div className="sup-skeleton-row">
                  <div className="sup-skeleton-line" style={{ width: "55%", height: "16px" }} />
                  <div className="sup-skeleton-badge" />
                </div>
                <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="sup-skeleton-line" style={{ width: "100%", height: "40px" }} />
                </div>
                <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="sup-skeleton-line" style={{ width: "40%" }} />
                  <div className="sup-skeleton-badge" />
                </div>
              </div>
            ))
          ) : data?.length === 0 ? (
            <div className="sup-empty">No notification templates found</div>
          ) : (
            data?.map((item) => (
              <div className="sup-card" key={item.id}>
                {/* Row 1: Title + ID */}
                <div className="sup-card-row">
                  <span className="sup-card-title" style={{ flex: 1, marginRight: 8 }}>
                    {item.title}
                  </span>
                  <span className="sup-card-id">#{item.id}</span>
                </div>

                {/* Row 2: Message preview */}
                {item.message && (
                  <div className="sup-card-message">{item.message}</div>
                )}

                {/* Row 3: Image thumbnail */}
                {item.image_url && (
                  <div>
                    <img
                      src={item.image_url}
                      alt="Template"
                      style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", border: "1px solid var(--border-color, #e2e8f0)" }}
                    />
                  </div>
                )}

                {/* Row 4: Footer - Date + Actions */}
                <div className="sup-card-footer">
                  <span className="sup-card-label">{formatDateTime(item.created_at)}</span>
                  <div className="sup-card-actions">
                    <button className="sup-action-btn" title="View Message" onClick={() => { setSelectedRow(item); setShowDescription(true); }}>
                      <Info size={16} />
                    </button>
                    <button className="sup-action-btn" title="Edit" onClick={() => toggleUpdateData(item)}>
                      <Pencil size={15} />
                    </button>
                    <button className="sup-action-btn sup-action-btn-delete" title="Delete" onClick={() => toggleDeleteComponent(item)}>
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="sup-pagination">
          <button className="sup-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="sup-page-info">Page {page} of {totalPage}</span>
          <button className="sup-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="sup-desktop-view">
        <div className="sup-table-card">
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="User Notifications Template"
            AddPackageButton={AddButton}
            dynamicPagination={dynamicPagination}
            totalPage={totalPage}
            currentPage={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            includeCheckbox={false}
            showTableHeading={false}
            isLoading={isFetching}
          />
        </div>
      </div>

      {showDescription && (
        <GiftDescription
          isOpen={showDescription}
          onClose={toggleDescription}
          Description={selectedRow?.message}
        />
      )}

      {addData && (
        <CreateNotificationTamplate isOpen={addData} onClose={toggleAddData} />
      )}

      {updateData && (
        <UpdateNotificationTamplate
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

export default NotificationTamplateList;
