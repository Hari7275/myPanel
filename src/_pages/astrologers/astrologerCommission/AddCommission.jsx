import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import toast from "react-hot-toast";
import { useGetConsultantsPriceQuery } from "../../../_store/api";
import { useCreateCommissionMutation } from "../../../_store/api";
import { getFetaureLabel } from "../../../_constants/consultantConstant";

const AddCommission = ({ isOpen, onClose, consultantId }) => {
  const [commissions, setCommissions] = useState({});
  console.log("consultantId", consultantId);
  const [data, setData] = useState([]);
  const [selectRadio, setSelectRadio] = useState("single");

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetConsultantsPriceQuery(consultantId);

  const [createCommission, { isLoading: isUpdating, error: updateError }] =
    useCreateCommissionMutation();

  useEffect(() => {
    console.log("fetchData?.data", fetchData?.data);
    if (fetchData && fetchData?.data) {
      setData(
        fetchData?.data
          .filter(
            (cat) =>
              cat.category == "A" &&
              cat.currency == "INR" &&
              cat.status == 2 &&
              ![7, 10].includes(cat.feature) //this filter is updated by ankush sir
          )
          .map((item) => ({
            id: item.feature,
            category: item.category,
            currency: item.currency,
            defaultCommission: item.commission,
          })) || []
      );
    } else setData([]);
  }, [fetchData]);

  const handleRadioInputChange = (e) => {
    setSelectRadio(e.target.value);
  };

  console.log("data", data[0]);

  // if(selectRadio=="single")
  // const handleInputChange = (id, value) => {
  //   setCommissions((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // };

  // const handleInputChange = (id, value) => {
  //   const updatedCommissions = {};
  //   data.forEach((item) => {
  //     updatedCommissions[item.id] = value;
  //   });
  //   setCommissions(updatedCommissions);
  // };

  const handleInputChange = (id, value) => {
    if (selectRadio === "single") {
      const updatedCommissions = {};
      data.forEach((item) => {
        updatedCommissions[item.id] = value;
      });
      setCommissions(updatedCommissions);
    } else {
      setCommissions((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commissionPayload = Object.entries(commissions).map(
      ([key, value]) => ({
        service_type: Number(key),
        commission_rate: Number(value),
      })
    );

    try {
      const response = await createCommission({
        consultantId,
        body: {
          commissions: commissionPayload,
          consultant_category: "A",
        },
      }).unwrap();

      console.log("responsw", response);

      if (response.status) {
        toast.success(response?.message);
      } else {
        toast.error(response.error);
      }
      // toast.success("Commissions updated!");
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update commissions.");
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <h2 className="sub-heading" style={{ marginBottom: 20 }}>
        Update Commission
      </h2>

      <div style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="option"
            value="single"
            checked={selectRadio === "single"}
            onChange={handleRadioInputChange}
          />
          Single
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="option"
            value="multiple"
            checked={selectRadio === "multiple"}
            onChange={handleRadioInputChange}
          />
          Multiple
        </label>
      </div>

      <form onSubmit={handleSubmit} className="simple-form" noValidate>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr ",
            gap: "16px",
            marginBottom: "20px",
            fontWeight: "bold",
            paddingBottom: "8px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div>Feature</div>
          <div>Default Commission (%)</div>
          <div>New Commission (%)</div>
        </div>

        {/* {data.map((item) => ( */}
        {(selectRadio === "single" ? data.slice(0, 1) : data).map((item) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              marginBottom: "12px",
              alignItems: "center",
            }}
          >
            {selectRadio === "single" ? (
              "Flute Commission"
            ) : (
              <div>{getFetaureLabel(item.id)}</div>
            )}

            <div>{item.defaultCommission}%</div>
            <div>
              <input
                type="number"
                min="0"
                placeholder="Enter new value"
                // value={commissions[item.id] || ""}
                value={commissions[item.id] ?? item.defaultCommission}
                // value={item.defaultCommission}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            type="submit"
            className="fifthButton"
            style={{
              marginRight: "10px",
              backgroundColor: "green",
              color: "white",
              padding: "8px 16px",
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="fifthButton"
            style={{ padding: "8px 16px", backgroundColor: 'red' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default AddCommission;
