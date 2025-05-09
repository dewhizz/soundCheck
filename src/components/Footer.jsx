
import React from 'react';


const Footer = () => {
    return (
        <footer>
            <section className="row p-5 fein ">


                {/* Stay connected */}
                <div className="col-md-4">
                    <h4 className='f-heads text-light '>Our Socials</h4>
                    <a href="https://www.instagram.com" id='flinks'>
                        <img src="/images/instagram.jpeg" alt="Instagram" width="150px" height="90px" />Instagram
                    </a><br /><br />
                    <a href="https://x.com" id='flinks'><br />
                        <img src="/images/x.png" alt="X (Twitter)" width="100px" height="90px" />X (Twitter)
                    </a>
                </div>

                {/* Contact us */}
                <div className="col-md-4">
                    <h4 className='f-heads text-light'>Contact Us</h4>


                    <img src="/images/phone.png" alt="Phone" width="100px" height="60px p-4" />
                    +254793990268 <br /><br />

                    <img src="/images/whatsapp.png" alt="WhatsApp" width="100px" height="60  p-4" />

                    +254793990268 <br /><br />


                    <img src="/images/email.jpeg" alt="Email" width="100px" height="60px  p-4" />

                    lewiskimari44@gmail.com <br /><br />
                </div>

                {/* About us */}
                <div className="col-md-4">
                    <h1 className='f-heads text-light' style={{ fontSize: "25px" }}>Location</h1>
                    <p style={{ fontFamily: 'Bebas Neue' }}>We are located at Kitsuru Mall shop number 10</p>
                </div>


            </section>
        </footer>
    );
};

export default Footer;