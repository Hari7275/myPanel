import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { COACHSKILSSCOLUMN } from "./coachSkillsColumn";
import AddCoachSkills from "./AddCoachSkills";
import UpdateCoachSkills from "./UpdateCoachSkills";
import DeleteComponent from "../../payments/DeleteComponent";
import {
  useGetCoachSkillsListQuery,
  useDeleteCoachSkillsMutation,
  useUpdateCoachSkillsOrderMutation,
} from "../../../_store/api";
import SkillsDragAndDropOrder from "./SkillsDragAndDropOrder";
import toast from "react-hot-toast";

const CoachSkills = () => {
  const [addCard, setAddCard] = useState(false);
  const [UpdateCard, setUpdateCard] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [updateOrder, setUpdateOrder] = useState(false);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetCoachSkillsListQuery();
  const [deleteCard] = useDeleteCoachSkillsMutation();

  const [updateCoachSkillsOrder, { isLoading: isUpdating, error }] =
    useUpdateCoachSkillsOrderMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

  // console.log("............../////////", data);

  // Toggle function for adding a review
  const toggleAddCard = () => {
    setAddCard(!addCard);
  };
  // Toggle function for set order for  skills
  const toggleSetOrderData = (row) => {
    console.log("row", row);
    setSelectedRow(row);
    setUpdateOrder(!updateOrder);
  };

  // Toggle function for updating a review
  const toggleUpdateCard = (row) => {
    setSelectedRow(row);
    setUpdateCard(!UpdateCard);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteCard({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const AddButton = () => {
    return (
      <>
        <button
          className="addButton"
          style={{
            position: "absolute",
            right: "20px",
            backgroundColor: "#18B164",
            padding: "6px",
          }}
          onClick={toggleAddCard}
        >
          Add Skills
        </button>

        <button
          className="addButton"
          style={{
            position: "absolute",
            right: "125px",
            backgroundColor: "#18B164",
            padding: "6px",
          }}
          // onClick={toggleMenuOrder}
          onClick={() => toggleSetOrderData(data)}
        >
          Set order Skills
        </button>
      </>
    );
  };

  const columns = useMemo(() => [
    ...COACHSKILSSCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span
            className="deleteIcon"
            onClick={() => toggleDeleteComponent(row.original)}
          >
            <Trash className="iconSmall" />
          </span>

          <span
            className="editIcon"
            onClick={() => toggleUpdateCard(row.original)}
          >
            <Pencil className="iconSmall" />
          </span>
        </div>
      ),
    },
  ]);

  const handleOrderUpdate = async (newOrder) => {
    try {
      // Prepare the data in the exact format the API expects
      const requestBody = {
        display_order_data: newOrder.map((item) => ({
          skill_id: item.id,
          display_order: item.display_order,
        })),
      };

      // return;

      // Call your API mutation with the properly formatted object
      const response = await updateCoachSkillsOrder(requestBody).unwrap();

      if (response.status) {
        toast.success(response.message || "Skills order updated successfully");
        // Optionally refresh your data or update local state
        // setData(newOrder); // Uncomment if you want to update local state immediately
      } else {
        toast.error(response.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Error updating skills order:", error);
      toast.error(error.data?.message || "Failed to update skills order");
    } finally {
      setUpdateOrder(false);
    }
  };

  // In your component's render:
  <SkillsDragAndDropOrder
    isOpen={updateOrder}
    onClose={() => setUpdateOrder(false)}
    selectedRow={data} // Your original data from API
    onSubmit={handleOrderUpdate}
  />;
  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Coach Skills"
        AddPackageButton={AddButton}
      />

      {updateOrder && (
        <SkillsDragAndDropOrder
          isOpen={updateOrder}
          onClose={toggleSetOrderData}
          selectedRow={selectedRow}
          onSubmit={handleOrderUpdate}
        />
      )}

      {addCard && <AddCoachSkills isOpen={addCard} onClose={toggleAddCard} />}

      {UpdateCard && (
        <UpdateCoachSkills
          isOpen={UpdateCard}
          onClose={toggleUpdateCard}
          selectedRow={selectedRow}
        />
      )}
      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default CoachSkills;
