import React from "react";

type SortButtonProps = {
  sortOrder: "ASC" | "DESC";
  onChange: (order: "ASC" | "DESC") => void;
};

const SortButton: React.FC<SortButtonProps> = ({ sortOrder, onChange }) => {
  const toggleSortOrder = () => {
    onChange(sortOrder === "ASC" ? "DESC" : "ASC");
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={toggleSortOrder}
    >
      Sort: {sortOrder === "ASC" ? "Ascending" : "Descending"}
    </button>
  );
};

export default SortButton;
