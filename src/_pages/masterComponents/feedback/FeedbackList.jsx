import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { FEEDBACKCOLUMNS } from "./feedbackListsColumns";
import { ArrowRight, Trash, Pencil } from "lucide-react";
import FeedbackDescription from "./FeedbackDescription";
// import UpdateFeedback from "./UpdateFeedback";
import DeleteComponent from "../../payments/DeleteComponent";
import { useGetUserFeedbackListQuery } from "../../../_store/api";

const FeedbackList = () => {
  // const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching data from API
  const { data: fetchData } = useGetUserFeedbackListQuery();

  useEffect(() => {
    if (fetchData ) {
      setData(fetchData.data.feedback);
    }
  }, [fetchData]);

  // const toggleUpdateComponent = (row) => {
  //   setSelectedRow(row.original);
  //   setShowUpdateComponent(!showUpdateComponent);
  // };

  const toggleDescription = (row) => {
    setSelectedRow(row.original);
    setShowDescription(!showDescription);
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row.original);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
   
    // if (selectedRow && selectedRow.id) {
    //   deleteFeedback({ id: selectedRow.id }).then(() => {
    //     setShowDeleteComponent(false);
    //   });
    // }
  };

  const columns = useMemo(
    () => [
      ...FEEDBACKCOLUMNS,
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
                onClick={() => toggleDescription(row)}
              />
            </span>
            {/* <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateComponent(row)}
              />
            </span> */}
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row)}
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
        tableTitle="Feedback List"
        includeActions={false}
      />

      {/* {showUpdateComponent && (
        <UpdateFeedback
          isOpen={showUpdateComponent}
          onClose={() => setShowUpdateComponent(false)}
          data={selectedRow}
        />
      )} */}

      {showDescription && (
        <FeedbackDescription
          isOpen={showDescription}
          onClose={() => setShowDescription(false)}
          Description={selectedRow?.feedback}
        />
      )}

      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={() => setShowDeleteComponent(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default FeedbackList;
