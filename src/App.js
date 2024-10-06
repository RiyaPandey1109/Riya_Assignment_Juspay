import React, { useState, useEffect } from "react";
import { Body } from "./Components/Body";
import { DragDropContext } from "react-beautiful-dnd";
import { MOVES } from "./constants";
import Modal from "./Components/Modal"; // Import the Modal component

export default function App() {
  const [moves, setMoves] = useState(MOVES);
  const [actions, setActions] = useState([]);
  const [actions2, setActions2] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control the modal

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onHandleDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source, destination);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add,
      active = moves,
      complete = actions,
      complete2 = actions2;

    // take a move to drag and drop
    add = active[source.index];

    // Destination Logic
    if (destination.droppableId === "MovesActions") {
      // add the move to action 1
      complete.push(add);
    } else {
      // add the move to action 2
      complete2.push(add);
    }
    setActions2(complete2);
    setActions(complete);
    setMoves(active);
  };

  return (
    <div className="bg-gray-100 font-sans text-center">
      {/* Show modal when the page is refreshed */}
      {isModalOpen && <Modal handleCloseModal={handleCloseModal} />}

      <DragDropContext onDragEnd={onHandleDragEnd}>
        <Body
          moves={moves}
          setMoves={setMoves}
          actions={actions}
          actions2={actions2}
          setActions2={setActions2}
          setActions={setActions}
        />
      </DragDropContext>
    </div>
  );
}
