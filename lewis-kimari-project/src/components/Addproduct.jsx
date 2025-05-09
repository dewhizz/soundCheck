import { useState } from "react";
import axios from "axios";


const Addproduct = () => {
      //React useState hooks for state management of variables
      const[product_name, setProductName] = useState("");
      const[product_description,setProductDescription] = useState("");
      const [product_cost,setProductCost]= useState("");
      const[product_photo,setProductPhoto]= useState("");


    // Hooks for loading success and error messages
   const[error,setError]= useState("");
    const[loading,setLoading] = useState("");
    const[success, setSuccess] = useState("");


       //submit function
      const submit = async(e) =>{

      // prevent reloading of page
      e.preventDefault();

    //   loading progress message
    setLoading("Please wait as we upload your product...........!!!!")

    try {
        //create an instance of FormData object
        const formdata = new FormData();
        //appending/ adding the key withtheir values
        formdata.append("product_name", product_name);
        formdata.append("product_description", product_description);
        formdata.append("product_cost", product_cost);
        formdata.append("product_photo", product_photo);
  
        //using axios for HTTP POST request and storing result in response variable
        const response = await axios.post("https://lewis44.pythonanywhere.com/api/add_products",formdata)
  
        //set loading to an empty string
        setLoading("")

        // set success message
        setSuccess(response.data.message);
  
        
     
        // clear inputs after submission
        setProductName("")
        setProductDescription("")
        setProductCost("")
        setProductPhoto("")
  
    }catch (error){
        setError(error.message)
    }
}
      
  
    
  

    return(
        <div className="row justify-content-center mt-4">

          
            <div className="col-md-6 card shadow p-4">
                <form onSubmit={submit} >
                    <h5 className="we text-light">Add Product</h5>
                    <h5 className="text-success">{success}</h5>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-danger">{error}</h5>
                    <input type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={product_name}
                        onChange={(e)=> setProductName(e.target.value) }
                        required
                        />
                    {/* {product_name} */}
                    <br />

                 <textarea className="form-control text"
                        placeholder="Product Description"
                        value={product_description}
                        onChange={(e) => setProductDescription(e.target.value)} 
                        ></textarea>
                    
                    {/* {product_description} */}
                    <br />

                    <input type="currency"
                        className="form-control text"
                        rows='7'
                        placeholder="Cost (Ksh)"
                        value={product_cost}
                        onChange={(e)=> setProductCost(e.target.value)}
                        required />
                    {/* {product_cost} */}
                    <br />

                    <input type="file"
                        className="form-control text"
                        accept="/image/*"
                        onChange={(e) =>{setProductPhoto(e.target.files[0])
                            console.log(e.target)
                        }}
                     
                        />
             
                    <br />
                {/* submit button */}
                <button 
                type="submit"
                className="btn btn-warning text-dark form-control" style={{fontFamily: "didot"}}>Continue</button>
                </form>

                

                
            </div>
        </div>
    )
}

export default Addproduct;