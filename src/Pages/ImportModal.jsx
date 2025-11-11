import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const ImportModal = ({ product, onClose, handleImported }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);

  const handleImport = async () => {
     const {productImage,
    productName,
    price,
    originCountry,
    rating,
    _id} = product
    try {
      const res = await fetch("http://localhost:3000/imports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({
          productId: _id,
          productImage:productImage,
          productName:productName,
          price:price,
          rating:rating,
          originCountry:originCountry,
          availableQuantity: Number(quantity),
          import_by: user.email,
            createdAt: new Date()
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", data.message, "success");
        handleImported(Number(quantity)); // update quantity in parent
        setQuantity(1);
        onClose();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-xl font-bold mb-4">Import {product.productName}</h2>
        <p>Available:{product.availableQuantity}</p>
        <input
          type="number"
          min="1"
          max={product.availableQuantity}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={quantity < 1 || quantity > product.availableQuantity}
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
