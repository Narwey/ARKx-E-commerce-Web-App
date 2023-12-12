import React from 'react'

import NavBar from './NavBar';

import HeroSec from '../../Components/HeroSec'
import Carousel from '../../Components/Carousel'
import Discover from '../../Components/Discover'
import SpecialOffer from '../../Components/SpecialOffer'
import Footer from './Footer';
import Announcement from './Annoncement';


export default function LandingPage() {
  return (
   <>
<Announcement />
<NavBar />
<HeroSec />

<Carousel />
<Discover />
<SpecialOffer />
<Footer />

   </>

   
  )
}
