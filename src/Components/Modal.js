import React from "react";

const Modal = ({ handleCloseModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-3/4 md:w-1/2 p-6 relative">
        <h2 className="text-2xl font-bold mb-4">Game Rules</h2>
        <ul className="text-left list-disc ml-5 mb-4">
          <li>Drag and drop your moves from the available moves list.</li>
          <li>Each move can be placed in either Action 1 or Action 2 box.</li>
          <li>Complete the game by organizing all moves in proper order.</li>
          <li>Moves in Action 1 will impact Player 1's score.</li>
          <li>Moves in Action 2 will impact Player 2's score.</li>
        </ul>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={handleCloseModal}
        >
          &times;
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
