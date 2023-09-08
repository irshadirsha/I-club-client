

import React, { useState, useEffect } from 'react';
import ClubNav from './ClubNav';
import Loader from '../../Loader/Loader';
import { axiosInstance } from '../../../../Api/config';

function News() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get('/api/news'); // Make a request to your backend route
        console.log("news response-----",response);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
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


// import React, { useState, useEffect } from 'react';
// import ClubNav from './ClubNav';
// import axios from 'axios';
// import Loader from '../../Loader/Loader';

// function News() {
//   const [loading, setLoading] = useState(true);
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const options = {
//         method: 'GET',
//         url: 'https://bing-news-search1.p.rapidapi.com/news',
//         params: {
//           textFormat: 'Raw',
//           safeSearch: 'Off'
//         },
//         headers: {
//           'X-BingApis-SDK': 'true',
//           'X-RapidAPI-Key': 'ea1a506487msh5ce9cfcc5a6ff1dp1d3947jsn404693482ee6',
//           'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
//         }
//       };

//       try {
//         const response = await axios.request(options);
//         console.log(response)
//         setNews(response.data.value);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         // You can handle errors here, e.g., display an error message to the user
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <ClubNav />
//       {loading && <Loader />}
//       <div className="bg-primary container mb-4 mx-auto md:px-6">
//         <h1 className="text-4xl text-center pb-4 font-mono font-bold">News</h1>
//         {news.length > 0 ? (
//           <section className="mb-32 text-center">
//             {news?.map((article, index) => (
//               <div key={index} className="mb-12 flex flex-wrap justify-center">
//                 <div className="w-full shrink-0 grow-0 basis-auto px-3 flex justify-center items-center md:w-10/12">
//                   <div className="relative h-72 md:w-96 mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
//                     <img src={article.image?.thumbnail?.contentUrl} className="w-full" alt="News" />
//                     <a href={article.url}>
//                       <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
//                     </a>
//                   </div>
//                 </div>

//                 <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-8/12 xl:w-6/12">
//                   <h5 className="mb-3 text-lg font-bold">{article.name}</h5>
//                   <p className="mb-4 text-neutral-500 dark:text-neutral-300">
//                     <small>Published <u>{article.datePublished}</u> by <a href="#!">{article.provider[0]?.name}</a></small>
//                   </p>
//                   <p className="mb-6">{article.description}</p>
//                 </div>
//               </div>
//             ))}
//           </section>
//         ) : (
//           <div className='flex justify-center items-center'>
//             <img src="https://media.istockphoto.com/id/1264074047/vector/breaking-news-background.jpg?s=612x612&w=0&k=20&c=C5BryvaM-X1IiQtdyswR3HskyIZCqvNRojrCRLoTN0Q=" alt="No news available" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default News;



//   useEffect(() => {

//     const apiKey = '1c58477c8f25464b99f032ff79cfb601'
//     const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKey}`

//      // const apiKey="40e8bb805278062e42b667b66f2de862"
//      // const apiUrl = `https://gnews.io/api/v4/top-headlines?country=in&category=sports&apikey=${apiKey}`

//     axios.get(apiUrl)
//       .then(response => {
//         setNews(response.data.articles);
//         console.log("---------------------------------news response",response);
//         setLoading(false)
//       })
//       .catch(error => {
//         console.log("error in news api ");
//         console.error('Error fetching news:', error);
//       });
//   }, []);
