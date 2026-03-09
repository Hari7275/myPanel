import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { QUICKDATECOLUMN } from "./quickDateColumns";
import { ArrowRight } from "lucide-react";
import EventsParticipantsModal from "./EventsParticipantsModal";
import { useGetQDEventsListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

const QuickDateEvents = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetQDEventsListQuery(userId);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.results || []);
    }
  }, [fetchData]);

  const [showParticipantsModal, setShowParticipantsModal] = useState(false);

  const toggleParticipantsModal = (row) => {
    setSelectedRow(row);
    setShowParticipantsModal(!showParticipantsModal);
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...QUICKDATECOLUMN,
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
                onClick={() => toggleParticipantsModal(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (isError) return <div>Error loading data.</div>;

  return (
    <>
      {data.length > 0 ? (
        <CommonTable
          columns={columns}
          data={data}
          includeActions={false}
          tableTitle="Quick Date Events"
        />
      ) : (
        <div>No Trip found.</div>
      )}

      {showParticipantsModal && (
        <EventsParticipantsModal
          isOpen={showParticipantsModal}
          onClose={toggleParticipantsModal}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};

export default QuickDateEvents;
