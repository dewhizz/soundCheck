import React from 'react';

const Home = () => {
  return (
    <div className="container mt-4">
      {/* Carousel Section */}
      <div className="row">
        <div className="col-md-12">
          <div
            id="mycarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000" // Slide interval reduced to 2 seconds
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/images/home.jpg"
                  alt="Slide 1"
                  className="d-block w-100"
                  height="600px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images/home1.jpg"
                  alt="Slide 2"
                  className="d-block w-100"
                  height="600px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images/home2.jpg"
                  alt="Slide 3"
                  className="d-block w-100"
                  height="600px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images/home3.jpg"
                  alt="Slide 4"
                  className="d-block w-100"
                  height="600px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mt-5">
        <p style={{ fontFamily: 'Roboto', fontSize: '18px' }}>
          <b>
            Welcome to <u>soundCheck</u> — your ultimate destination for premium sound equipment.
            We take pride in offering top-of-the-line gear that ensures an exceptional audio experience.
            Whether you're a casual listener, music professional, or event planner, our equipment stands out in clarity, performance, and durability.
          </b>
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mt-4">
        <h5><b><u>Frequently Asked Questions (FAQ)</u></b></h5>

        <p><b>What types of sound machines do you offer?</b></p>
        <p>
          We provide a wide range of sound machines, including white noise generators, nature ambiance players, and professional-grade studio sound systems —
          all designed to enhance sleep, relaxation, focus, or entertainment.
        </p>

        <p><b>Are your sound machines portable?</b></p>
        <p>
          Yes, many of our products are compact and travel-friendly. Look for models labeled "portable" for maximum convenience when you're on the move.
        </p>
      </div>
    </div>
  );
};

export default Home;
