import React, { useMemo } from "react";
import CommonTable from "../../../_components/table/CommonTable"
import RivewData from "./COACHREVIEWS_DATA.json";
import { NOTIFICATIONCOLUMN } from "./notificationListingColumns"; 



const CoachNotificationsListingTable = () => {

     const columns = useMemo(() => NOTIFICATIONCOLUMN, []);
     const data = useMemo(() => RivewData.data, []);


  return(
   

    <div className="ProfileData-container sub-container">
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Notifications"
      />
    </div>
  )
  
};

export default CoachNotificationsListingTable;
