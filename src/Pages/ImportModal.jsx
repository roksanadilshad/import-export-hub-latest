import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const ImportModal = ({ product, onClose, handleImported }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);

  //console.log(user);
  
  const {productImage,
 productName,
 price,
 originCountry,
 rating,
 _id} = product
  const handleImport = async () => {
    const qty = Number(quantity);

    if (qty < 1 || qty > product.availableQuantity) {
      Swal.fire(
        "Invalid Quantity",
        `You can import between 1 and ${product.availableQuantity} only.`,
        "warning"
      );
      return;
    }

    const modalData = {
          productId:_id,
          productImage:productImage,
          productName:productName,
          price:price,
          rating:rating,
          originCountry:originCountry,
          quantity: qty,
          import_by: user.email,
          createdAt: new Date()
    }
//console.log(modalData);

    try {
      const res = await fetch("http://localhost:3000/imports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify(modalData),
      });

      const data = await res.json();
      
      if (res.ok) {
        Swal.fire("Success", data.message || "Product imported successfully.", "success");
        handleImported(Number(qty)); // update quantity in parent
        onClose();
      } else {
        Swal.fire("Error", data.message || "Failed to import.", "error");
      }
    } catch (err) {
      console.error("❌ Network/Server error:", err);
      Swal.fire("Error", "Server error", "error");
    }
  };

  return (
    <div>
      <div><title>Import Modal</title></div>
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Import {product.productName}
        </h2>

        <p className="mb-2 text-gray-700 text-center">
          Available: <strong>{product.availableQuantity}</strong>
        </p>

        <input
          type="number"
          min="1"
          max={product.availableQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            disabled={quantity < 1 || quantity > product.availableQuantity}
            className="px-4 py-2 bg-secondary text-white rounded border-white hover:bg-accent transition disabled:opacity-50"
          >
            Import
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ImportModal;