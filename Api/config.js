import axios from "axios"

const baseURL=import.meta.env.VITE_BASEURL
// const adminbaseURL=import.meta.env.VITE_ADMINBASEURL
const adminUrl=import.meta.env.VITE_ADMINBASEURL
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




  
  const adminaxios=axios.create({
    baseURL:adminUrl
})
adminaxios.interceptors.request.use(
    config => {
      const token = JSON.parse(localStorage.getItem('admin'))?.token || null;

      if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  export { adminaxios };





// axiosInstance.interceptors.request.use(

// )
// export{axiosInstance}
// (config)=>{
//     let token=localStorage.getItem('user')
//     if(token) config.headers['token']=token
//     return config 
// },