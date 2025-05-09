import React, { useState } from 'react'
import {  useLocation, } from 'react-router-dom'
import '../App.css';
import axios from 'axios';

const Makepayment = () => {
    // recieving the product from getproduct in Makepayment component
    const { product } = useLocation().state || {};
    // console.log(product)

    // image path
    const image_url = "https://Lewis44.pythonanywhere.com/static/images/"

    // react hooks to hold phone number and processing messages

    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");


    // submit logic for making payments
    const submit = async (e) => {

        e.preventDefault();

        // set processing message
        setMessage("Payment is being processed, please wait")

        const formdata = new FormData();
        // Appending values
        formdata.append("phone", phone)

        // pass amount directly from product available
        formdata.append("amount", product.product_cost)

        //axios HTTP post request and store results in request
        const response = await axios.post("https://lewis44.pythonanywhere.com/api/mpesa_payment", formdata)

        // set message to tell the user to await a prompt
        setMessage(response.data.message)

    };

    return (
        <div className="row justify-content-center mt-4">
            <h1 className='text bg-warning'><b>Make Payment-Lipa na Mpesa</b> </h1>
            <h6 className='text-success'>{message}</h6>
            <div className="col-md-6 card shadow">
                <img src={image_url + product.product_photo} alt={product.product_photo} className='product_img' />
                <h4>Product Name:{product.product_name}</h4>
                <h5>Product Description{product.product_description}</h5>
                <b>Product Cost: Ksh.{product.product_cost}</b>

                <div className="card-body">
                    <form onSubmit={submit}>
                        <input type="text"
                            className='form-control text'
                            placeholder='Enter m-pesa number start with 254xxxxxxxxx'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                        {/* {phone} */}

                        <br />

                        <button
                            type='submit'
                            className='btn btn-outline-warning text-shadow'><b>Make Your Payment</b></button>
                    </form>
                   
              

            </div>
        </div>
        </div >
    )
}

export default Makepayment
