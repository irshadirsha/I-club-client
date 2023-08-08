import axios from "axios"

const baseURL=import.meta.env.VITE_BASEURL

const axiosInstance=axios.create({
    baseURL:baseURL
})
axiosInstance.interceptors.request.use(
    config => {
      const token = JSON.parse(localStorage.getItem('user'))?.token || null;

      if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  export { axiosInstance };





// axiosInstance.interceptors.request.use(

// )
// export{axiosInstance}
// (config)=>{
//     let token=localStorage.getItem('user')
//     if(token) config.headers['token']=token
//     return config 
// },