import React, { useState } from 'react';

const FAQSection = () => {
  // State to keep track of which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState({});

  // Function to toggle the expanded state of an FAQ item
  const toggleItem = (id) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [id]: !prevExpandedItems[id],
    }));
  };

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <h2>F.A.Q</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <ul id="faq-list">
              <li>
                <a
                  data-toggle="collapse"
                  className={expandedItems['faq1'] ? '' : 'collapsed'}
                  href="#faq1"
                  onClick={() => toggleItem('faq1')}
                  style={{ textDecoration: 'none' }} // Add this line to remove underline

                >
                  Non consectetur a erat nam at lectus urna duis?{' '}
                  <i className="fa fa-minus-circle"></i>
                </a>
                <div
                  id="faq1"
                  className={`collapse ${expandedItems['faq1'] ? 'show' : ''}`}
                  data-parent="#faq-list"
                >
                  <p>
                    Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus
                    laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor
                    rhoncus dolor purus non.
                  </p>
                </div>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  className={expandedItems['faq2'] ? '' : 'collapsed'}
                  href="#faq2"
                  onClick={() => toggleItem('faq2')}
                  style={{ textDecoration: 'none' }} // Add this line to remove underline

                >
                  Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?{' '}
                  <i className="fa fa-minus-circle"></i>
                </a>
                <div
                  id="faq2"
                  className={`collapse ${expandedItems['faq2'] ? 'show' : ''}`}
                  data-parent="#faq-list"
                >
                  <p>
                    Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id
                    interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus
                    scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim.
                    Mauris ultrices eros in cursus turpis massa tincidunt dui.
                  </p>
                </div>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  className={expandedItems['faq3'] ? '' : 'collapsed'}
                  href="#faq3"
                  onClick={() => toggleItem('faq3')}
                  style={{ textDecoration: 'none' }} // Add this line to remove underline

                >
                  Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?{' '}
                  <i className="fa fa-minus-circle"></i>
                </a>
                <div
                  id="faq3"
                  className={`collapse ${expandedItems['faq3'] ? 'show' : ''}`}
                  data-parent="#faq-list"
                >
                  <p>
                    Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci.
                    Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl
                    suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis
                    convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                  </p>
                </div>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  className={expandedItems['faq4'] ? '' : 'collapsed'}
                  href="#faq4"
                  onClick={() => toggleItem('faq4')}
                  style={{ textDecoration: 'none' }} // Add this line to remove underline

                >
                  Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?{' '}
                  <i className="fa fa-minus-circle"></i>
                </a>
                <div
                  id="faq4"
                  className={`collapse ${expandedItems['faq4'] ? 'show' : ''}`}
                  data-parent="#faq-list"
                >
                  <p>
                    Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id
                    interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus
                    scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim.
                    Mauris ultrices eros in cursus turpis massa tincidunt dui.
                  </p>
                </div>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  className={expandedItems['faq5'] ? '' : 'collapsed'}
                  href="#faq5"
                  onClick={() => toggleItem('faq5')}
                  style={{ textDecoration: 'none' }} // Add this line to remove underline

                >
                  Tempus quam pellentesque nec nam aliquam sem et tortor consequat?{' '}
                  <i className="fa fa-minus-circle"></i>
                </a>
                <div
                  id="faq5"
                  className={`collapse ${expandedItems['faq5'] ? 'show' : ''}`}
                  data-parent="#faq-list"
                >
                  <p>
                    Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim
                    suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan.
                    Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis
                    cursus in
                  </p>
                </div>
              </li>
              <li>
                <a
                  data-toggle="collapse"
                  className={expandedItems['faq6'] ? '' : 'collapsed'}
                  href="#faq6"
                  onClick={() => toggleItem('faq6')}
                  style={{ textDecoration: 'none' }} // Add this line to remove underline

                >
                  Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem
                  dolor? <i className="fa fa-minus-circle"></i>
                </a>
                <div
                  id="faq6"
                  className={`collapse ${expandedItems['faq6'] ? 'show' : ''}`}
                  data-parent="#faq-list"
                >
                  <p>
                    Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies
                    leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis
                    nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu
                    scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla
                    phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
