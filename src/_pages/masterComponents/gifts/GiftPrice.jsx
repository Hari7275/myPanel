import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import ReactModal from "react-modal";

import { PARTICULARGIFTPRICECOLUMN } from "./giftColumn";

const GiftPrice = ({ isOpen, onClose, selectedData }) => {
  const columns = useMemo(() => [...PARTICULARGIFTPRICECOLUMN], []);

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <DyCommonTable
          columns={columns}
          data={selectedData}
          includeActions={false}
          tableTitle="Gifts Price List"
          includeCheckbox={false}
          //   showTableHeading={false}
          showGlobalSearch={false}
        />
      </ReactModal>
    </>
  );
};

export default GiftPrice;
