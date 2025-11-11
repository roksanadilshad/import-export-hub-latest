import axios from "axios";
import React, { useState } from "react";

import Swal from "sweetalert2";

const ImportModal = ({ product, onClose, handleImported }) => {
  
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value);

    if (value > product.availableQuantity) {
      setError("Import quantity exceeds available stock!");
    } else if (value <= 0) {
      setError("Quantity must be greater than 0");
    } else {
      setError("");
    }
  };

 
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/import", {
        productId: product._id,
        quantity: Number(quantity),
      });

      Swal.fire({
        icon: "success",
        title: "Imported!",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      handleImported(quantity); // optional: update parent UI
      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Import {product.productName}
        </h2>

        <p className="text-gray-600 mb-2">
          Available Quantity:{" "}
          <span className="font-semibold">{product.availableQuantity}</span>
        </p>

        <input
          type="number"
          min="1"
          max={product.availableQuantity}
          value={quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded-md w-full p-2 mb-3"
          placeholder="Enter import quantity"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex justify-between">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`${
              error || !quantity
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded-md`}
            onClick={handleSubmit}
            disabled={!!error || !quantity}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
