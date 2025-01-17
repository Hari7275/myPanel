import React, { useMemo } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import RivewData from "./COACHREVIEWS_DATA.json";
import { NOTIFICATIONCOLUMN } from "./notificationListingColumns";
// import { REVIEWSCOLUMN } from "../../commonComponents/tableComponents/columns";

const AstroNotificationsListingTable = () => {
  const columns = useMemo(() => NOTIFICATIONCOLUMN, []);
  const data = useMemo(() => RivewData.data, []);

  return;
  <div>
    <div className="ProfileData-container sub-container">
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="NOTIFICATION"
      />
    </div>
  </div>;
};

export default AstroNotificationsListingTable;
