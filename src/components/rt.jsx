import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaCartPlus } from 'react-icons/fa'; // Import trash icon and cart icon from react-icons
import { Modal, Button } from 'react-bootstrap';  // Import Modal components from react-bootstrap

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false); // Manage the modal visibility
    const [mpesaNumber, setMpesaNumber] = useState(''); // M-Pesa number
    const [mpesaPin, setMpesaPin] = useState(''); // M-Pesa pin
    const [errorMessage, setErrorMessage] = useState(''); // Error handling message
    const navigate = useNavigate();

    useEffect(() => {
        // Load cart data from localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        // Calculate total cost
        const total = storedCart.reduce((acc, product) => acc + parseFloat(product.product_cost) * product.quantity, 0);
        setTotalCost(total);
    }, []);

    const handleRemoveFromCart = (productId) => {
        let updatedCart = cart.filter(item => item.product_id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const handleProceedToPayment = () => {
        // Open the M-Pesa prompt/modal
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = () => {
        // Basic validation for M-Pesa number and pin
        if (!mpesaNumber || !mpesaPin) {
            setErrorMessage("Please enter both M-Pesa number and PIN.");
            return;
        }

        // Proceed to the MakePayment page, passing the necessary data
        const cartDetails = {
            products: cart,
            totalCost: totalCost,
            mpesaNumber: mpesaNumber, // Pass M-Pesa number
            mpesaPin: mpesaPin // Pass M-Pesa pin
        };

        // Navigate to the MakePayment component
        navigate("/makepayment", { state: cartDetails });

        // Close the modal after submitting payment
        setShowPaymentModal(false);
    };

    // Function to format total cost with commas for thousands
    const formatCost = (cost) => {
        return cost.toLocaleString();
    };

    return (
        <div className="container mt-5" style={{ fontFamily: 'Poppins, sans-serif', position: 'relative' }}>
            {/* Cart Icon and Title */}
            <div className="d-flex justify-content-center align-items-center mb-4">
                <FaCartPlus size={40} color="#FFD700" />
                <h1 className="ml-3" style={{ color: '#1A1A1A', textAlign: 'center' }}>Your Cart</h1>
            </div>

            {/* Total Cost Section */}
            {cart.length > 0 && (
                <div className="text-center p-3 mb-4" style={{
                    backgroundColor: '#FFD700', 
                    color: '#1A1A1A', 
                    borderRadius: '10px', 
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    letterSpacing: '1px'
                }}>
                    <span>Total Cost: Ksh {formatCost(totalCost)}</span>
                </div>
            )}

            {cart.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
            ) : (
                <div className="row justify-content-center">
                    {/* Display each product in a 2-column grid layout */}
                    {cart.map((product, index) => (
                        <div key={index} className="col-md-6 mb-4 d-flex justify-content-center">
                            <div className="card shadow-lg" style={{ borderRadius: '10px', borderColor: '#FFD700' }}>
                                <img
                                    src={'https://lewis44.pythonanywhere.com/static/images/' + product.product_photo}
                                    alt={product.product_name}
                                    className="product_img"
                                    height="300"
                                    width="450"
                                    style={{ objectFit: "cover", borderRadius: '10px 10px 0 0' }} // Ensure the image has rounded corners
                                />
                                <div className="card-body text-center">
                                    <h5 className="text-dark">{product.product_name}</h5>
                                    <p>Quantity: {product.quantity}</p>
                                    <b className="text-warning">Ksh {parseFloat(product.product_cost) * product.quantity}</b>
                                </div>

                                <div className="p-3">
                                    {/* Remove from Cart Button with Icon */}
                                    <button
                                        className="btn btn-danger w-100 mb-3"
                                        onClick={() => handleRemoveFromCart(product.product_id)}
                                    >
                                        <FaTrash className="mr-2" /> Remove from Cart
                                    </button>

                                    {/* Proceed to Payment Button */}
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={handleProceedToPayment}
                                    >
                                        Proceed to Payment (M-Pesa)
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* M-Pesa Payment Modal */}
            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter M-Pesa Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display error if any */}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    {/* M-Pesa Number Input */}
                    <div className="form-group">
                        <label htmlFor="mpesaNumber">M-Pesa Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mpesaNumber"
                            placeholder="Enter M-Pesa Number"
                            value={mpesaNumber}
                            onChange={(e) => setMpesaNumber(e.target.value)}
                        />
                    </div>

                    {/* M-Pesa PIN Input */}
                    <div className="form-group">
                        <label htmlFor="mpesaPin">M-Pesa PIN</label>
                        <input
                            type="password"
                            className="form-control"
                            id="mpesaPin"
                            placeholder="Enter M-Pesa Pin"
                            value={mpesaPin}
                            onChange={(e) => setMpesaPin(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handlePaymentSubmit}>
                        Proceed to Payment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Cart;
