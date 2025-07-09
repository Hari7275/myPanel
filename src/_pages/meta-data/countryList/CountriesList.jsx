import React, { useState, useEffect, useMemo } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { COUNTRYLISTCOLUMN } from "./countryListColumn";
import UpdateCountry from "./UpdateCountry";
import { useGetCountryListQuery } from "../../../_store/api/meta-data/countryList";

const CountriesList = () => {
  const [updateCountry, setUpdateCountry] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching API data for listing country
  const { data: fetchData } = useGetCountryListQuery();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleUpdateCountry = (value) => {
    setSelectedRow(value);
    setUpdateCountry(!updateCountry);
  };

  const columns = useMemo(() => [
    ...COUNTRYLISTCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span
            className="editIcon"
            onClick={() => toggleUpdateCountry(row.original)}
          >
            <Pencil className="iconSmall" />
          </span>
        </div>
      ),
    },
  ]);

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Country List"
        showTableHeading={false}
      />

      {updateCountry && (
        <UpdateCountry
          isOpen={updateCountry}
          onClose={toggleUpdateCountry}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};

export default CountriesList;
