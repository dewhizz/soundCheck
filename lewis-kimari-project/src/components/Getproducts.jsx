import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import CustomCarousel from "./Carousel"



const Getproducts = () => {

    // react hooks
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered data
    const [searchQuery, setSearchQuery] = useState(""); // Search input


    // create an instance of useNavigate
    const navigate = useNavigate();


    const getproducts = async () => {

        setLoading("Attempting to fetch the available products, please wait..................");



        try {
            const response = await axios.get('https://lewis44.pythonanywhere.com/api/getproduct')

            setLoading("");
            setProducts(response.data)


        } catch (error) {
            setLoading("");
            setError(error.message);


        }

    };

    useEffect(() => {
        getproducts()
    }, [])
    // / filter logic
    // Search filter logic
    useEffect(() => {
        if (!products) return; // Prevent errors if products is undefined

        const filtered = products.filter((product) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);
    //The above hook enables us to fetch all data at once
    //[]-Fetch all data once
    const img_url = 'https://lewis44.pythonanywhere.com/static/images/'


    // console.log('products', products)
    return (

        <div className="row container-fluid ">
            <CustomCarousel />



            <h1>Available products</h1>
            <input
                type="text"
                className="form-control shadow-sm p-2"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {loading}
            {error}
            {filteredProducts?.map((product, index) => (
                <div className="col-md-3 justify-content-center mb-4 mt-4">
                    <div className="card shadow">
                        <img src={img_url + product.product_photo} alt="" className="product_img" height="350"/>
                        <div className="card-body">
                            <h5 className="mt-2 text-dark text">{product.product_name}</h5>
                            <p className="text-muted text">{product.product_description.slice(0, 10)}</p>
                            <b className="text-warning">{product.product_cost}</b> <br />
                            <button className="rate btn-success text-dark  w-100 mt-2" onClick={() => navigate('/makepayment', { state: { product } })}>Purchase Now</button>



                        </div>

                    </div>

                </div>
                
            ))}
        </div>
    )
}
export default Getproducts;