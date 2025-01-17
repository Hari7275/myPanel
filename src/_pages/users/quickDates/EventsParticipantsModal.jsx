import React, { useMemo, useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Trash } from "lucide-react";
import CommonTable from "../../../_components/table/CommonTable";
import { EVENTPARTICIPANTSCOLUMN } from "./eventParticipantsColumn";
import { useGetQDParticipantsListQuery } from "../../../_store/api";

const EventsParticipantsModal = ({ isOpen, onClose, selectedRow }) => {
  const {
    data: fetchData,
    isLoading,
    isError,
    isFetching,
  } = useGetQDParticipantsListQuery(selectedRow?.id);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (fetchData?.data?.records) {
      const participantsData = fetchData.data.records.flatMap((record) =>
        record.users_quickdate_events_participants.map((participant) => ({
          ...participant,
          qd_type: record.qd_type,
          fullName: `${participant.first_name} ${participant.last_name}`,
        }))
      );
      console.log("participant data", participantsData);
      setData(participantsData);
    }
  }, [fetchData]);

  const description = (
    <p className="info-item">
      <strong style={{ fontSize: "20px" }}>Description: </strong>
      <span style={{ fontSize: "14px" }}>{selectedRow.description}</span>
    </p>
  );

  const columns = useMemo(
    () => [
      ...EVENTPARTICIPANTSCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="deleteIcon">
              <Trash className="iconSmall" />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="userProfile-footer-content">
        <div className="info-pair">{description}</div>
      </div>

      {data.length > 0 ? (
        <CommonTable
          columns={columns}
          data={data}
          includeActions={false}
          tableTitle="Participants"
        />
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          No participants available.
        </div>
      )}
    </ReactModal>
  );
};

export default EventsParticipantsModal;
