import React from 'react'

const Home = () => {
    return (
        <div>

            <section class="row mt-4" />
            
            <div class="col-md-6" />
            {/* <!-- Carousel Container --> */}
            <div class="carousel slide" data-bs-ride="carousel" id="mycarousel">
                {/* <!-- Carousel Inner:Holds the Carousel items/images  --> */}
                <div class="carousel-inner">
                    {/* <!-- slide one --> */}
                    <div class="carousel-item active">
                        <img src="/images/home.jpg" alt="" class="w-100  d-block" height="600px" width="450px" />
                    </div>

                    {/* <!-- Slide two --> */}
                    <div class="carousel-item">
                        <img src="/images/home1.jpg" alt="slide2" class="w-100  d-block" height="600px" width="450px" />
                    </div>
                    {/* <!-- Slide three --> */}
                    <div class="carousel-item">
                        <img src="/images/home2.jpg" alt="slide3" class="w-100 h-5px d-block" height="600px"
                            width="450px" />
                    </div>
                    {/* <!-- Slide four --> */}
                    <div class="carousel-item">
                        <img src="/images/home3.jpg" alt="slide4" class="w-100  d-block" height="600px" width="450px" />
                    </div>

                    <a href="#mycarousel" class="carousel-control-prev" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-danger "></span>
                    </a>
                    {/* <!-- Next Control --> */}
                    <a href="#mycarousel" class="carousel-control-next" data-bs-slide="next">

                        <span class="carousel-control-next-icon bg-danger"></span>
                    </a>



                </div>


                {/* <!-- End of container Inner --> */}


            </div>
            <br /><br />
            {/* <!-- End of carousel --> */}

            <p style={{ fontFamily: 'roboto' }}> <b> Welcome to <u>soundCheck</u>, we take pride in offering top-of-the-line sound equipment that ensures an exceptional audio experience for all users. Whether you’re a casual listener, a music professional, or someone in search of premium audio for entertainment, we have carefully selected products that stand out in performance, clarity, and durability.
            </b>
            </p> <br /><br />

            <p><b><u>Frequently Asked Questions (FAQ)</u></b></p>
         
                <b>What types of sound machines do you sell?</b>
                <p className='text'>We offer a variety of sound machines designed to create a relaxing and immersive auditory experience. Our selection includes white noise machines, nature sound machines, sleep sound machines, and relaxation soundscapes. Each product is designed to improve sleep quality, focus, and relaxation.

                </p>

              <b>Are your sound machines portable?</b>
                <p className='text'>Yes! Many of our sound machines are compact and portable, making them perfect for travel or use in different rooms of your home or office. Look for products marked as "portable" or "travel-friendly" in the description.</p>
     




        </div>
    )
}

export default Home