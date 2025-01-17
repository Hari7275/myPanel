import React,{useMemo , useState , useEffect} from 'react' 
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil , Trash } from 'lucide-react'
import { COACHSKILSSCOLUMN } from './coachSkillsColumn'
import AddCoachSkills from './AddCoachSkills';
import UpdateCoachSkills from './UpdateCoachSkills';
import DeleteComponent from "../../payments/DeleteComponent";
import {
  useGetCoachSkillsListQuery,
  useDeleteCoachSkillsMutation,
} from "../../../_store/api";

const CoachSkills = () => {
  const [addCard, setAddCard] = useState(false);
  const [UpdateCard, setUpdateCard] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetCoachSkillsListQuery();
  const [deleteCard] = useDeleteCoachSkillsMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);


  console.log("............../////////" , data)

  // Toggle function for adding a review
  const toggleAddCard = () => {
    setAddCard(!addCard);
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

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Coach Skills"
        AddPackageButton={AddButton}
      />

      {addCard && (
        <AddCoachSkills isOpen={addCard} onClose={toggleAddCard} />
      )}

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
}

export default CoachSkills