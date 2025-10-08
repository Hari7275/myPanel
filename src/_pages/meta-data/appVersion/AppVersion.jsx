import React, { useState, useMemo, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { APPVERSIONCOLUMN } from "./appVersionColumn";
import { Pencil, Trash } from "lucide-react";

import AddAppVersion from "./AddAppVersion";

import { useGetAppVersionListQuery } from "../../../_store/api";

import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const AppVersion = () => {
  const [addAppVersion, setAddAppVersion] = useState(false);

  const [data, setData] = useState([]);

  const { data: fetchData } = useGetAppVersionListQuery();

  const permissions = usePermissions();

  useEffect(() => {
    if (fetchData && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddAppVersion = () => {
    setAddAppVersion(!addAppVersion);
  };

  const columns = useMemo(() => [...APPVERSIONCOLUMN], [toggleAddAppVersion]);

  const AddButton = () => (
    // permissions?.["meta_data_section"]?.includes("create_app_language") && (
    <button
      className="addButton"
      style={{
        position: "absolute",
        right: "20px",
        backgroundColor: "#18B164",
        padding: "6px",
      }}
      onClick={toggleAddAppVersion}
    >
      Add App Version
    </button>
  );
  // );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="App Version"
        AddPackageButton={AddButton}
        showTableHeading={false}
      />

      {addAppVersion && (
        <AddAppVersion isOpen={addAppVersion} onClose={toggleAddAppVersion} />
      )}
    </>
  );
};

export default AppVersion;
