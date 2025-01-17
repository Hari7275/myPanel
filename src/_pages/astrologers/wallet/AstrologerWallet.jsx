import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";

import { WALLETCHARTCOLUMN } from "./astrologerWalletColumn";
import { useGetConsultantsWalletQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

const AstrologerWallet = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData } = useGetConsultantsWalletQuery(consultantId);
  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || []);
    }
  }, fetchData);

  const columns = useMemo(() => WALLETCHARTCOLUMN, []);

  return (
    <>{data.length>0 ?(
      <CommonTable
        columns={columns}
        // data={result}
        data={data}
        includeActions={false}
        tableTitle=" Wallet Chart"
      />):"there is no wallet transaction history" }
    </>
  );
};

export default AstrologerWallet;
