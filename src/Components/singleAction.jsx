import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

export const SingleAction = (props) => {
  const {
    move,
    moves,
    setMoves,
    index,
    disableDelete = false,
    refresh, // assuming refresh function is passed as a prop
  } = props;

  const handleDelete = (idx) => {
    let active = [...moves]; // Create a new array instead of modifying the existing one
    active.splice(idx, 1);
    setMoves(active); // Update the moves state

    // Null-check for refresh function and safe invocation
    if (typeof refresh === "function") {
      try {
        refresh(); // Safely call the refresh function
      } catch (error) {
        console.error("Error calling refresh:", error); // Log any errors during refresh
      }
    }
  };

  return (
    <div>
      {disableDelete ? (
        <Draggable key={move.id} draggableId={move.id.toString()} index={index}>
          {(provided) => (
            <div
              className="moves__single"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <span className="moves__single--text">{move.todo}</span>
            </div>
          )}
        </Draggable>
      ) : (
        <div className="moves__single">
          <span className="moves__single--text">{move.todo}</span>
          <div>
            {/* Replaced the cross icon with DeleteIcon */}
            <span className="icon" onClick={() => handleDelete(index)}>
              <DeleteIcon
                sx={{
                  ":hover": { cursor: "pointer", color: "red" },
                  fontSize: "1.2em",
                }}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAction;
