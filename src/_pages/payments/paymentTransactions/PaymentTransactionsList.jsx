import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { PAYMENTTRANSACTIONSCOLUMN } from "./paymentTransactionsColumn";

import { useGetPaymentListQuery } from "../../../_store/api";

const PaymentTransactionsList = () => {
  const [result, setResult] = useState([]);

  const { data: fetchdata } = useGetPaymentListQuery();

  useEffect(() => {
    if (fetchdata) {
      setResult(fetchdata?.data || []);
    }
  }, [fetchdata]);

  // Memoized columns definition for the table

  const columns = useMemo(() => [...PAYMENTTRANSACTIONSCOLUMN], []);

  return (
    <>
      <CommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle="Payment Transaction"
        showTableHeading={false}
        includeCheckbox={false}
      />
    </>
  );
};

export default PaymentTransactionsList;
