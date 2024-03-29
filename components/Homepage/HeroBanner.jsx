import React from 'react';
import Link from 'next/link';

import { urlFor } from '../../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div className="hero-banner-contents">
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <img
          src={urlFor(heroBanner.image)}
          alt="banner"
          className="hero-banner-image"
        />

        <div>
          <Link href={`men`}>
            {/* href={`products/${heroBanner.product}`} */}
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
