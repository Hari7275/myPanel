import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { QDLOACTIONCOLUMN } from "./qdColumn";
import UpdateQdLoaction from "./UpdateQdLoaction";
import AddQdLoaction from "./AddQdLoaction";
import DeleteComponent from "../../payments/DeleteComponent";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import {
  useGetqdLoactionListQuery,
  useDeleteqdLoactionListMutation,
} from "../../../_store/api";
import { debounce } from "lodash";

const QDLoaction = () => {
  const [addLocation, setAddLocation] = useState(false);
  const [UpdateLocation, setUpdateLocation] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [citylocation, setCityLocation] = useState("");

  const [pageSize, setPageSize] = useState(10);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetqdLoactionListQuery({
    currentPage: page,
    pageSize: pageSize,
    location: citylocation,
  });
  const [deleteLoaction] = useDeleteqdLoactionListMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddLocation = () => {
    setAddLocation(!addLocation);
  };

  // Toggle function for updating a review
  const toggleUpdateLocation = (row) => {
    setSelectedRow(row);
    setUpdateLocation(!UpdateLocation);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteLoaction({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const debouncedSearchLocation = debounce(
    (value) => setCityLocation(value),
    500
  );

  const handleLocationSearch = (e) => {
    setPage(1);
    debouncedSearchLocation(e?.target?.value);
  };

  const AddButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
        onClick={toggleAddLocation}
      >
        Add city
      </button>
    );
  };

  const columns = useMemo(() => [
    ...QDLOACTIONCOLUMN(),
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span className="deleteIcon">
            <Trash
              className="iconSmall"
              onClick={() => toggleDeleteComponent(row.original)}
            />
          </span>
          <span
            className="editIcon"
            onClick={() => toggleUpdateLocation(row.original)}
          >
            <Pencil className="iconSmall" />
          </span>
        </div>
      ),
    },
  ]);

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by location"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleLocationSearch}
      />
    </div>
  );

  // for pagination

  const totalPage = fetchData?.data?.totalPages;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="QD Trips Location"
        AddPackageButton={AddButton}
        customFilterComponent={customFilterComponent}
        showTableHeading={false}
        includeCheckbox={false}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />

      {addLocation && (
        <AddQdLoaction isOpen={addLocation} onClose={toggleAddLocation} />
      )}

      {UpdateLocation && (
        <UpdateQdLoaction
          isOpen={UpdateLocation}
          onClose={toggleUpdateLocation}
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

export default QDLoaction;
