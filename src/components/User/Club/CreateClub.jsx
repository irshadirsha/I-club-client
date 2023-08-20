import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../../../Api/config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/UserSlice/UserSlice';

function CreateClub() {
  const dispatch=useDispatch()
  const user=useSelector(state=>state.user)
  const navigate = useNavigate()
  const [createClub, setCreateClub] = useState({
    clubName: "",
    registerNo: "",
    address: "",
    category: "",
    securityCode: "",
    confirmSecurityCode: "",
    secretory: "",
    treasurer: ""
  })

  const handleClubSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = JSON.parse(localStorage.getItem("user"))?.user || null;
      const email = user?.email
      if (createClub.securityCode !== createClub.confirmSecurityCode) {
        generateError("securityCode do not match");
        return;
      }

      const regex = {
        clubName: /^[A-Za-z]{3,11}$/gm,
        registerNo: /^\d{6}$/gm,
        securityCode: /^\d{6}$/gm,
        confirmSecurityCode: /^\d{6}$/gm,
      }
      if (createClub.clubName === "") {
        generateError("Name is required")
        return;
      } else if (!regex.clubName.test(createClub.clubName)) {
        generateError("Name: Only allowed characters and space")
        return;
      } else if (createClub.registerNo === "") {
        generateError("registerNo is required")
        return;
      } else if (!regex.registerNo.test(createClub.registerNo)) {
        generateError("registerNo: Only contain six digit")
        return;
      } else if (createClub.address === "") {
        generateError("address is required")
        return;
      } else if (createClub.category === "") {
        generateError("category is required")
        return;
      } else if (createClub.securityCode === "") {
        generateError("securityCode is required")
        return;
      } else if (!regex.securityCode.test(createClub.securityCode)) {
        generateError("securityCode must be six digit")
        return;
      } else if (createClub.confirmSecurityCode === "") {
        generateError("confirmSecurityCode is required")
        return;
      } else if (!regex.confirmSecurityCode.test(createClub.confirmSecurityCode)) {
        generateError("confirmSecurityCode must be number and letter")
        return;
      }

      console.log(createClub)
      console.log(email)
      const response = await axiosInstance.post('/createclub', { ...createClub }, { withCredentials: true });
      console.log("response", response.data);

      if (response.data.message) {
        toast.success(response.data.message);
      }
      if (response.data.created === true) {
        const userRole = "president";
        const club = response.data.newclubs.clubName;

        dispatch(updateUser({
          id:user.id,
          username:user.username,
          email:user.email,
          clubName:club 
        }));

        navigate('/clubhome', { state: { userRole, club } });
      }

      if (response.data.errors) {
        toast.error(response.data.errors);
      }
    } catch (error) {
     console.log("error");
    }
  }
  const generateError = (err) => toast.error(err, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT
  })

  return (
    <div>
      <section className="bg-primary overflow-y-hidden">
        <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-6">
          <div className="md:flex md:gap-x-6 md:items-center mb-10">
            <div className="mt-4 md:w-1/2 ml-10 mb-5  md:mb-0 z-10">
              <h1 className="my-5 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
                I-Club <br />
                <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
              </h1>
              <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
                Empowering Hearts, Building Bridges - The Power of Togetherness.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
              {/* /////////////////////// */}

              <div className="bg-glass rounded-lg   ">

                <div className='text-center text-4xl font-semibold pt-5 '>
                  <h1>Register Club</h1>
                </div>


                <form>
                  <div className="form-outline mb-4 text-center pt-4">
                    <input
                      type="text"
                      id="form3Example3"
                      name="clubName"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Club Name"
                    />
                  </div>
                  <div className="form-outline mb-4 text-center pt-2">
                    <input
                      type="text"
                      id="form3Example3"
                      name="registerNo"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control  p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Register No "
                    />
                  </div>
                  <div className="form-outline mb-4 text-center pt-2">
                    <input
                      type="text"
                      id="form3Example3"
                      name="address"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Place"
                    />
                  </div>
                  <div className="form-outline mb-4 text-center pt-2">
                    <input
                      type="text"
                      id="form3Example3"
                      name="category"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Category"
                    />
                  </div>
                  <div className="form-outline mb-4 text-center pt-2">
                    <input
                      type="text"
                      id="form3Example3"
                      name="securityCode"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Security Code"
                    />
                  </div>
                  <div className="form-outline mb-4 text-center pt-2">
                    <input
                      type="text"
                      id="form3Example3"
                      name="confirmSecurityCode"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Confirm Security Code"
                    />
                  </div>
                  <div className="form-outline mb-4 text-center pt-2">
                    <input
                      type="email"
                      id="form3Example3"
                      name="secretory"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Secretory Email"
                    />
                  </div>
                  <div className="form-outline mb-4 text-center pt-2">
                    <input
                      type="email"
                      id="form3Example3"
                      name="treasurer"
                      onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
                      className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                      placeholder="Treasurer"
                    />
                  </div>

                  <div className='text-center  flex justify-center items-center'>
                    <div className='text-center p-2 border-2 border-slate-500 borde bg-primary w-32  rounded-xl text-white'>
                      <button onClick={handleClubSubmit}>Register</button>
                    </div>
                  </div>
                  <div className="pb-3 text-center">
                    <hr className="my-3"></hr>
                    <a className="text-rgb(0, 0, 0) no-underline">
                      Home
                    </a>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

      </section>
      <ToastContainer />
    </div>
  )
}

export default CreateClub
