import React, { useMemo } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import ReviewData from "../../coaches/reviews_notifications/COACHREVIEWS_DATA.json";
import { REVIEWSCOLUMN } from "./reviewsListingColumns";


const LIstenerNotificationListingTable = () => {
  const columns = useMemo(() => REVIEWSCOLUMN, []);
  const data = useMemo(() => ReviewData.data, []);

  return (
    <div className="ProfileData-container sub-container">
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="NOTIFICATION"
      />
    </div>
  );
};

export default LIstenerNotificationListingTable;
