
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';


const UpdateExport = ({ product, onClose, setProducts }) => {
     const navigate = useNavigate()
  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
     productName: e.target.productName.value,
      productImage: e.target.productImage.value,
      price: e.target.price.value,
      originCountry: e.target.originCountry.value,
      availableQuantity: e.target.availableQuantity.value,
      rating: e.target.rating.value

    }

    fetch(`http://localhost:3000/exports/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      .then((res) => res.json())
      .then((data) => {
        
  //console.log(data)
  if (data.success) {
     toast.success("Successfully updated!");
      navigate('/'); // or wherever your home/latest-products route is
    }

  // Update local product list without refetching
  setProducts((prev) =>
    prev.map((p) => (p._id.toString() === product._id.toString() ? product : p))
  );

  onClose();
});
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