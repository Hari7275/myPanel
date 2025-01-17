import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { GIFTSCOLUMN } from "./giftsColumn";
import { Trash, ArrowRight, Pencil } from "lucide-react";
import DeleteComponent from "../../payments/DeleteComponent";
import Discriptions from "./Discriptions";
import { useGetConsultantsOrderQuery } from "../../../_store/api";
import { useSelector } from "react-redux";


const CoachGifts = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData } = useGetConsultantsOrderQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      const response = fetchData?.data?.filter(
        (result) => result?.order_type === 6
      );
      setData(response);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleDescriptionModal = () => {
    setShowDescriptionModal(!showDescriptionModal);
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    const updateReasult = data.filter((record) => record.id !== selectedRow.id);
    console.log("record deleted", selectedRow);
  };

  const columns = useMemo(
    () => [
      ...GIFTSCOLUMN,
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
                onClick={toggleDescriptionModal}
              />
            </span>
            <span className="editIcon">
              <Pencil className="iconSmall" />
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
    <div className="ProfileData-container sub-container">
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Coach Gifts"
      />

      {showDescriptionModal && (
        <Discriptions
          isOpen={showDescriptionModal}
          onClose={toggleDescriptionModal}
        />
      )}
      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CoachGifts;
