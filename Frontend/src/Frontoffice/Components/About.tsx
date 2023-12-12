import React from "react";
import NavBar from "../Pages/Home/NavBar";
import Footer from "../Pages/Home/Footer";

const About = () => {
  return (
    <>
      <NavBar />
      <div
        className="max-w-screen-xl container mx-auto xl:px-24 px-4  from-0%  to-100% bg-cover bg-center h-min"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5709869/pexels-photo-5709869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl text-white font-bold md:leading-snug leading-snug font-primary ">
              For the Love of Handmade{" "}
              <span className="text-customColor">Goods</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row bg-backgroundColor">
          <img
            src="https://images.pexels.com/photos/3817497/pexels-photo-3817497.jpeg?auto=compress&cs=tinysrgb&w=800"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="px-8">
            <h1 className="text-4xl text-yellow-900 font-bold font-primary">
              Welcome to HANDMADE HAVEN..
            </h1>
            <p className="py-6 font-primary text-black ">
              a vibrant hub celebrating the artistry and craftsmanship of
              handmade goods. We curate a diverse collection of exquisite
              handcrafted treasures, ranging from intricate ceramic and pottery
              crafts to delicately woven crochets, mesmerizing embroidery, and
              even culinary delights crafted with love. Our platform is a
              celebration of artisanal mastery, where each piece tells a unique
              story, making every purchase a testament to creativity and
              dedication.
            </p>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-backgroundColor">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.pexels.com/photos/7585850/pexels-photo-7585850.jpeg?auto=compress&cs=tinysrgb&w=800"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="px-8">
            <h1 className="text-5xl font-bold font-primary text-yellow-900">
              Our story..
            </h1>
            <p className="py-6 font-primary">
              Our journey began from a fervent passion for authentic
              craftsmanship and a profound appreciation for the artistry behind
              handmade creations. Fueled by the desire to provide a platform for
              artisans to showcase their talents and for enthusiasts to discover
              exceptional pieces, Handmade Haven was born.
              <br />
              <br />
              The concept emerged as a response to the growing need to preserve
              traditional art forms while embracing innovation. We envisioned a
              digital haven where artisans, skilled in their respective crafts,
              could showcase their talent, and where patrons seeking
              one-of-a-kind, handcrafted treasures could find them conveniently.
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* <div className="hero-overlay bg-opacity-60"></div> */}
        <div className="hero-content text-center text-neutral-content h-[25rem]">
          <div className="max-w-[40rem]">
            <h1 className="mb-5 text-5xl font-bold font-primary text-yellow-900 ">
              At Handmade Haven
            </h1>
            <p className="mb-5 font-primary  text-black">
              {" "}
              we take pride in fostering a community that cherishes and supports
              the artisans behind each masterpiece. Every piece featured on our
              platform is a testament to the skill, dedication, and creativity
              of these artisans, each infused with a story that resonates with
              the soul. Join us in celebrating the art of handmade crafts as we
              continue our quest to bring the magic of artisanal creations to
              the world, one exquisite piece at a time.
            </p>
            <a href="/products"><button className="btn btn-outline border h-9 w-[10rem] font-primary text-yellow-900 rounded-md hover:bg-customColor"> Discover our crafts</button></a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
