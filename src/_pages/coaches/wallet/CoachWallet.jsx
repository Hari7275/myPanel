import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { WALLETCHARTCOLUMN } from "./coachWalletColumn";
import { useGetConsultantsWalletQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

const CoachWallet = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData } = useGetConsultantsWalletQuery(consultantId);
  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data || []);
    } else {
      setData([]);
    }
  }, fetchData);

  const columns = useMemo(() => WALLETCHARTCOLUMN, []);

  return (
    <div>
      {data.length > 0 ? (
        <CommonTable
          columns={columns}
          // data={result}
          data={data}
          includeActions={false}
          tableTitle=" Wallet Chart"
        />
      ) : (
        "there is no wallet transaction history"
      )}
    </div>
  );
};

export default CoachWallet;
