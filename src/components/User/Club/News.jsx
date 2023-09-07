import React, { useState, useEffect } from 'react';
import ClubNav from './ClubNav';
import axios from 'axios';
import Loader from '../../Loader/Loader';

function News() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  

  useEffect(() => {

    const apiKey = '1c58477c8f25464b99f032ff79cfb601'
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKey}`

    // // const apiKey="40e8bb805278062e42b667b66f2de862"
    // // const apiUrl = `https://gnews.io/api/v4/top-headlines?country=in&category=sports&apikey=${apiKey}`

    axios.get(apiUrl)
      .then(response => {
        setNews(response.data.articles);
        console.log("---------------------------------news response",response);
        setLoading(false)
      })
      .catch(error => {
        console.log("error in news api ");
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div>
      <ClubNav/>
      {loading && <Loader/>}
      <div className="bg-primary container mb-4 mx-auto md:px-6">
        <h1 className='text-4xl text-center pb-4 font-mono font-bold'>News</h1>
        {news.length > 0 ? (
            <section className="mb-32 text-center">
           {news?.map((article, index) => (
            <div key={index} className="mb-12 flex flex-wrap justify-center">
              <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12">
                <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                  <img src={article.urlToImage} className="w-full" alt="News" />
                  <a href={article.url}>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                    </div>
                  </a>
                </div>
              </div>

              <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-8/12 xl:w-6/12">
                <h5 className="mb-3 text-lg font-bold">
                  {article.title}
                </h5>

                <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                  <small>Published <u>{article.publishedAt}</u> by
                    <a href="#!">{article.author}</a></small>
                </p>
                <p className="mb-6">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </section>):(
        <div className='flex justify-center items-center'>
        <img
          src= "https://media.istockphoto.com/id/1264074047/vector/breaking-news-background.jpg?s=612x612&w=0&k=20&c=C5BryvaM-X1IiQtdyswR3HskyIZCqvNRojrCRLoTN0Q="/>
        </div>)}
      </div>
    </div>
  )
}

export default News;

   // const apiKey = "40e8bb805278062e42b667b66f2de862";
    // // API URL for GNews
    // const apiUrl = `https://gnews.io/api/v4/top-headlines?country=in&category=sports&apikey=${apiKey}`;

    // Fetch news data

// import React from 'react'
// import ClubNav from './ClubNav'

// function News() {
//   return (
//     <div>
//       <ClubNav/>
//       <div class="bg-primary container my-4 mx-auto md:px-6">

//    <h1 className='text-4xl text-center pb-4 font-mono font-bold'>News</h1>
//   <section class="mb-32 text-center">
//     <div class="mb-12 flex flex-wrap justify-center">
//       <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12">
//         <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
//           <img src="https://mdbcdn.b-cdn.net/img/new/slides/101.jpg" class="w-full" />
//           <a href="#!">
//             <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
//             </div>
//           </a>
//         </div>
//       </div>

//       <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-8/12 xl:w-6/12">
//         <h5 class="mb-3 text-lg font-bold">
//           This is a very long post title
//         </h5>

//         <p class="mb-4 text-neutral-500 dark:text-neutral-300">
//           <small>Published <u>13.01.2022</u> by
//             <a href="#!">Anna Maria Doe</a></small>
//         </p>
//         <p class="mb-6">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
//           atque hic, officiis blanditiis accusantium veritatis ullam?
//           Maiores atque autem velit officiis molestiae voluptates suscipit
//           eligendi, vero expedita sequi, doloremque modi?
//         </p>
       
//       </div>
//     </div>
//   </section>
// </div>
//     </div>
//   )
// }

// export default News
