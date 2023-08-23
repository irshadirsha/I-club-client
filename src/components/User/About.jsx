import React from 'react'

function About() {
  return (
    <div>
          <div className="container-fluid bg-gray-200 ">
      <div className="container text-center">
        <div className='bg-primary flex justify-center items-center'>
        <img
          style={{ width: '70%', height: 'auto' }}
          src="https://res.cloudinary.com/de8nd9vxi/image/upload/v1687579036/aboutus/people-concept-illustration-of-our-team-management-about-us-for-graphic-and-web-design-business-presentation-and-marketing-material-vector-removebg-preview_1_lcl1rz.png"
          alt=""
        />

        </div>
      </div>
      <div className="container">
        <div className="text-center">
          <h3 className="font-bold font-mono p-4 text-xl md:text-3xl text-brown-600 mb-2">
            Welcome to I-Club:Bringing Individuals Together, Enabling Collectives
          </h3>
          <p className="text-lg font-normal text-center text-gray-700 mb-8 px-16 ">
           Embracing the Strength of Bonds: Here at I-Club, we hold a firm belief in the potential of connections.
             Our online platform is meticulously crafted to unite 
            individuals, nurturing impactful exchanges and emboldening entire communities to flourish. Whether you're a sole seeker of broader
             social horizons or a dynamic group in pursuit of kindred spirits, I-Club offers an avenue that seamlessly links you with 
             fitting individuals and propitious prospects.
          </p>
        </div>
        <h4 className="font-semibold font-mono text-2xl text-center md:text-4xl text-brown-600 mb-6">Our Features:</h4>
        <ul className="list-none pl-0 mb-8">
          <li className="mb-6">
            <h5 className="font-semibold font-mono text-xl text-center md:text-2xl text-brown-600 mb-2">Group Chat</h5>
            <p className="text-lg text-center text-gray-700 px-16">
              Stay connected with your friends, colleagues, and community members through our intuitive group chat
              feature. Create private or public groups, share ideas, collaborate on projects, and never miss out on
              important conversations.
            </p>
          </li>
          <li className="mb-6">
            <h5 className="font-semibold font-mono text-xl text-center md:text-2xl text-brown-600 mb-2">Group Video Call</h5>
            <p className="text-lg text-center text-gray-700 px-16">
              Bridge distances and host virtual gatherings effortlessly with our group video call feature. Whether it's a
              team meeting, a study group session, or a club event, I-Club ensures that everyone can participate and
              engage face-to-face, no matter where they are.
            </p>
          </li>
          <li className="mb-6">
            <h5 className="font-semibold font-mono text-xl text-center md:text-2xl text-brown-600 mb-2">News</h5>
            <p className="text-lg text-center text-gray-700 px-16">
              Stay informed and up-to-date with the latest happenings in your community. Our curated news section delivers
              relevant and timely news articles, ensuring that you're always in the loop and ready to engage in
              meaningful discussions.
            </p>
          </li>
          <li className="mb-6">
            <h5 className="font-semibold font-mono text-xl text-center md:text-2xl text-brown-600 mb-2">Club Profiles</h5>
            <p className="text-lg text-center text-gray-700 px-16">
              I-Club provides a dedicated space for clubs and organizations to showcase their mission, activities, and
              achievements. Create a club profile, attract like-minded individuals, and build a thriving community around
              your shared interests.
            </p>
          </li>
          <li className="mb-6">
            <h5 className="font-semibold font-mono text-center tex- md:text-2xl text-brown-600 mb-2">Club Details</h5>
            <p className="text-lg text-center text-gray-700 px-16">
              Discover a wide range of clubs and organizations that align with your passions. Explore detailed club
              profiles, learn about their objectives, upcoming events, and join the ones that resonate with you. I-Club
              makes it easy to find your tribe and engage with communities that inspire you.
            </p>
          </li>
        </ul>
        <div className="text-center pb-6">
          <p className="text-lg text-center text-gray-700 mb-4 px-16">
            At I-Club, we prioritize user experience, privacy, and security. Our platform is built with state-of-the-art
            technology to ensure that your interactions are seamless and protected. We value diversity, inclusivity, and
            fostering a positive environment for all users.
          </p>
          <p className="text-lg text-gray-700 mb-4 px-16">
            Join us today and unlock a world of connections and opportunities. Whether you're seeking personal growth,
            professional networking, or simply looking to make new friends, I-Club is here to support you every step of
            the way.
          </p>
          <p className="text-lg  text-gray-700 mb-4 px-16">
            Together, let's build stronger communities, forge lasting relationships, and make a positive impact. Join the
            I-Club family and experience the power of connections like never before.
          </p>
          <p className="text-lg text-gray-700 px-16">
            Start your journey with I-Club today and embark on a path of endless possibilities.
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default About
