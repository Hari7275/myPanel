import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { GIFTCOLUMN } from "./giftColumn";
import { Trash, ArrowRight, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import GiftDescription from "./GiftDescription";
import GiftPrice from "./GiftPrice";
import AddGift from "./AddGift";
import UpdateGifts from "./UpdateGifts";
import {
  useGetGiftListQuery,
  useDeleteGiftMutation,
} from "../../../_store/api";
import toast from "react-hot-toast";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const GiftLists = () => {
  const permissions = usePermissions();
  const hasUpdateGift = permissions?.["gifts"]?.includes("update_gift");

  const [showGiftPrice, setshowGiftPrice] = useState(false);
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdteData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic paginations
  const [giftId, setGiftId] = useState(null);

  // handeling api  fetching data and deleting data
  const { data: fetchData, refetch } = useGetGiftListQuery(
    {
      page,
      size: pageSize,
    },
    {
      refetchOnMountOrArgChange: true, // Force refetch when component mounts or args change
    }
  );
  const [deleteData] = useDeleteGiftMutation();

  const totalPage = fetchData?.meta?.total_page || 1;

  // store data
  // Store data with proper dependency
  // useEffect(() => {
  //   if (fetchData?.data?.rows) {
  //     setData(fetchData.data.rows);
  //   }
  // }, [fetchData?.data?.rows]); // Changed dependency to be more specific

  const data = fetchData?.data?.rows || [];
  // function for description

  const toggleGiftPrice = (row) => {
   
    setGiftId(row?.original?.id);
    setSelectedRow(row?.original?.gift_prices);
    setshowGiftPrice(!showGiftPrice);
  };

  //  toggle function for adding new data

  const toggleAddData = () => {
    setAddData(!addData);
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

  const handleDelete = async () => {
    if (!selectedRow?.id) return;

    try {
      const response = await deleteData({ id: selectedRow.id }).unwrap();

      toast.success(response?.message || "Deleted successfully");
      setShowDeleteComponent(false);
      setSelectedRow(null); // Clear selected row
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
    }
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
        onClick={toggleAddData}
      >
        Add Gift
      </button>
    );
  };

  const columns = useMemo(
    () => [
      ...GIFTCOLUMN,
      ...(hasUpdateGift
        ? [
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
                      onClick={() => toggleGiftPrice(row)}
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
          ]
        : []),
    ],
    [hasUpdateGift]
  );

  return (
    <>
      {!showGiftPrice && (
        <DyCommonTable
          columns={columns}
          data={data}
          includeActions={false}
          tableTitle="Gifts List"
          AddPackageButton={AddButton}
          dynamicPagination={dynamicPagination}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          includeCheckbox={false}
          showTableHeading={false}
        />
      )}

      {addData && <AddGift isOpen={addData} onClose={toggleAddData} />}

      {updateData && (
        <UpdateGifts
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

      {showGiftPrice && (
        <GiftPrice
          isOpen={showGiftPrice}
          onClose={toggleGiftPrice}
          selectedData={selectedRow}
          giftId={giftId}
        />
      )}
    </>
  );
};

export default GiftLists;
