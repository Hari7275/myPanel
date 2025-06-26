import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { FOLLOWERSCOLUMN } from "./listenersFollowersColumn";
import { useGetConsultantsFollowerQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

const ListenerFollowers = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const { data: fetchData } = useGetConsultantsFollowerQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.follower || []);
    }
  }, [fetchData]);

  const columns = useMemo(() => FOLLOWERSCOLUMN, []);

  return (
    <div className="ProfileData-container profile-right-sub-container">
      {data.length > 0 ? (
        <CommonTable
          columns={columns}
          data={data}
          includeActions={false}
          tableTitle="Listener Followers"
        />
      ) : (
        <p>No followers available.</p>
      )}
    </div>
  );
};

export default ListenerFollowers;
