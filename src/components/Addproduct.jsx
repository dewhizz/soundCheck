import { useState } from "react";
import axios from "axios";
import { FaBox, FaAlignLeft, FaDollarSign, FaImage } from "react-icons/fa"; // Importing icons

const Addproduct = () => {
  // React useState hooks for state management of variables
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  // Hooks for loading success and error messages
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");

  // Submit function
  const submit = async (e) => {
    // Prevent reloading of page
    e.preventDefault();

    // Loading progress message
    setLoading("Please wait as we upload your product...........!!!!");

    try {
      // Create an instance of FormData object
      const formdata = new FormData();
      // Appending/adding the key with their values
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // Using axios for HTTP POST request and storing result in response variable
      const response = await axios.post("https://lewis44.pythonanywhere.com/api/add_products", formdata);

      // Set loading to an empty string
      setLoading("");

      // Set success message
      setSuccess(response.data.message);

      // Clear inputs after submission
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          <h5 className="we text-light">Add Product</h5>
          <h5 className="text-success">{success}</h5>
          <h5 className="text-warning">{loading}</h5>
          <h5 className="text-danger">{error}</h5>

          {/* Product Name */}
          <div className="input-group mb-3">
            <span className="input-group-text"><FaBox /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* Product Description */}
          <div className="input-group mb-3">
            <span className="input-group-text"><FaAlignLeft /></span>
            <textarea
              className="form-control"
              placeholder="Product Description"
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          {/* Product Cost */}
          <div className="input-group mb-3">
            <span className="input-group-text"><FaDollarSign /></span>
            <input
              type="number"
              className="form-control"
              placeholder="Cost (Ksh)"
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)}
              required
            />
          </div>

          {/* Product Photo */}
          <div className="input-group mb-3">
            <span className="input-group-text"><FaImage /></span>
            <input
              type="file"
              className="form-control"
              accept="/image/*"
              onChange={(e) => {
                setProductPhoto(e.target.files[0]);
                console.log(e.target.files);
              }}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-warning text-dark form-control" style={{ fontFamily: "didot" }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
