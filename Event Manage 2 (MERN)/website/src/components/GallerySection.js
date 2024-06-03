import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles

const GallerySection = () => {
  return (
    <section id="gallery">
      <div className="container">
        <div className="section-header">
          <h2>Gallery</h2>
          <p>Check our gallery from the recent events</p>
        </div>
      </div>

      <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={2000}>
        <div>
          <a href="img/gallery/1.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/1.jpg" alt="" />
          </a>
        </div>
        <div>
          <a href="img/gallery/2.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/2.jpg" alt="" />
          </a>
        </div>
        <div>
          <a href="img/gallery/3.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/3.jpg" alt="" />
          </a>
        </div>
        <div>
          <a href="img/gallery/4.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/4.jpg" alt="" />
          </a>
        </div>
        <div>
          <a href="img/gallery/5.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/5.jpg" alt="" />
          </a>
        </div>
        <div>
          <a href="img/gallery/6.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/6.jpg" alt="" />
          </a>
        </div>
        <div>
          <a href="img/gallery/7.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/7.jpg" alt="" />
          </a>
        </div>
        <div>
          <a href="img/gallery/8.jpg" className="venobox" data-gall="gallery-carousel">
            <img src="img/gallery/8.jpg" alt="" />
          </a>
        </div>
      </Carousel>
    </section>
  );
}

export default GallerySection;
