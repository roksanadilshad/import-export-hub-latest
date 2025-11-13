
import { use } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';


const UpdateExport = ({ product, onClose, setProducts }) => {
  const {user} = use(AuthContext)
     const navigate = useNavigate()
  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();


     if (!user?.accessToken) return;

    const formData = {
     productName: e.target.productName.value,
      productImage: e.target.productImage.value,
      price: e.target.price.value,
      originCountry: e.target.originCountry.value,
      availableQuantity: e.target.availableQuantity.value,
      rating: e.target.rating.value

    }

    try {
      const res = await fetch(
        `https://import-export-server.vercel.app/exports/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`, // Firebase token
          },
          body: JSON.stringify(formData),
        }
      );
       let data;
      try {
        data = await res.json();
      } catch (err) {
        const text = await res.text();
        console.error("Backend returned non-JSON response:", text);
        toast.error("Server did not return valid JSON.");
        return;
      }
  //console.log(data)
 
      if (res.ok && data.success) {
        toast.success("Product updated successfully!");

        // Update local state
        setProducts((prev) =>
          prev.map((p) =>
            p._id === product._id ? { ...p, ...formData } : p
          )
        );

        onClose();
        navigate('/'); // or your latest-products route
      } else {
        toast.error(data.message || "Unauthorized or failed to update.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Something went wrong while updating.");
    }
  };



    
    return (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral p-6 rounded-2xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-center text-primary">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              defaultValue={product.productName}
              className="w-full border rounded p-2"
            />
          </div>
         <div>
            <label className="block text-sm font-medium">Product Image</label>
            <input
              type="url"
              name="productImage"
              defaultValue={product.productImage}
              required
              className="w-full border rounded p-2"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rating</label>
            <input
              type="text"
              name="rating"
              defaultValue={product.rating}
              required
              className="w-full border rounded p-2"
              placeholder="Ratings"
            />
          </div>  

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Available Quantity</label>
            <input
              type="text"
              name="availableQuantity"
              defaultValue={product.availableQuantity}
              
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Origin Country</label>
            <input
              type="text"
              name="originCountry"
              defaultValue={product.originCountry}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-400 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-secondary border-white text-white hover:bg-accent"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default UpdateExport;