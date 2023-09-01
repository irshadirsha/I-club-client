import React,{useEffect, useState} from 'react'
import { axiosInstance } from '../../../../Api/config';
import { ToastContainer,toast } from 'react-toastify'
import Loader from '../../Loader/Loader';

function FinanceTreasur({state,callbackFunction}) {
  const clubName=state
console.log("tresurer",clubName);
const [loading, setLoading] = useState(true);
const [account,setAccount]=useState([])
const [expenseData, setExpenseData] = useState({
  name: '',
  reason: '',
  date: '',
  amount: '',
});
const [errors, setErrors] = useState({
  name: "",
  reason: "",
  date: "",
  amount:""
});
useEffect(()=>{
  fetchdata()
},[])
const fetchdata=async ()=>{
  try {
    const {data}=await axiosInstance.get('/get-accounts',{
        params:{clubName}
    })
    console.log("acc",data);
    setAccount(data)
    setLoading(false)
  } catch (error) {
    console.log("error in get counts");
  }
}
const handleExpense = async (e) => {
  e.preventDefault();

  try {
    console.log("adddd exxxpppennnssseee",expenseData)
    if (expenseData.name.trim() === "" &&
       expenseData.reason.trim() === "" &&
       expenseData.date.trim() === "" &&
       expenseData.amount.trim() === "" ) {
      setErrors({
        ...errors,
        name: "Enter The Reciver Name",
        reason: "Enter The Reason",
        date: "Select The Date",
        amount:"Enter The Amount"
      });
      return;
    }
    const response = await axiosInstance.post('/add-expense', {
      clubName,
      ...expenseData,
    });
    callbackFunction(response.data)
    console.log(response);
    fetchdata()
    if (response.data.message) {
      toast.success(response.data.message);
    }

    console.log('Expense added successfully:', response.data);
    // Clear the expense form after successful submission
    setExpenseData({
      name: '',
      reason: '',
      date: '',
      amount: '',
    });
  } catch (error) {
    console.log('Error adding expense:', error);
  }
};

  return (
    <div>
      <div className="flex">
         {loading && <Loader/>}
  {/* Existing table */}
  <div className=" border flex  rounded-xl p-2 w-full px-4">
    <div className="  w-1/2 mb-8">
      <h2 className="text-xl text-center font-medium mb-2">Add Expense</h2>
      <form onSubmit={handleExpense}>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={expenseData.name}
              onChange={(e) =>{ setExpenseData({ ...expenseData, [e.target.name]: e.target.value })
                    setErrors({})
                  }}
              className={`block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200
              ${errors.name && "border-red-500"}`}
            />
              {errors.name && <p className="text-red-500 text-center">{errors.name}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Reason
            </label>
            <input
              type="text"
              name="reason"
              value={expenseData.reason}
              onChange={(e) =>{ setExpenseData({ ...expenseData, [e.target.name]: e.target.value })
                    setErrors({})
                  }}
              className={`block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200
              ${errors.reason && "border-red-500"}`}
            />
              {errors.reason && <p className="text-red-500 text-center">{errors.reason}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={expenseData.date}
              onChange={(e) =>{ setExpenseData({ ...expenseData, [e.target.name]: e.target.value })
                    setErrors({})
                  }}
              className={`block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200
              ${errors.date && "border-red-500"}`}
            />
              {errors.date && <p className="text-red-500 text-center">{errors.date}</p>}
          </div>
         
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              value={expenseData.amount}
              onChange={(e) =>{ setExpenseData({ ...expenseData, [e.target.name]: e.target.value })
              setErrors({})
            }}
        className={`block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200
        ${errors.amount && "border-red-500"}`}
      />
        {errors.amount && <p className="text-red-500 text-center">{errors.amount}</p>}
          </div>
        </div>
        <div className='flex justify-center items-center'>
        <button
          type="submit"
          className="mt-4 px-4 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>

        </div>
      </form>
    </div>
    <div className='  w-1/2 p-2'>
      <div className=' p-6'>
      <div className="bg-white p-6 pt-4 rounded-md shadow-md">
      <h2 className="text-xl text-center font-medium mb-2">Income & Expense Summary</h2>
      <div className="">
        <div className=' p-2'>
          <p className=" text-center text-green-950 font-semibold">Total Income</p>
          <p className="text-xl text-center">{account?.totalIncome}</p>
        </div>
        <div className=' '>
          <p className=" text-center text-red-700 font-semibold">Total Expense</p>
          <p className="text-xl text-center">{account?.totalexpense}</p>
        </div>
        {/* <div className=''>
          <p className="text-center text-lg font-semibold">
            {account?.totalIncome > account?.totalExpense ? "Profit" : "Loss"}
          </p>
          <p className="text-xl text-center">
            {Math.abs(account?.totalIncome - account?.totalExpense)}
          </p>
        </div> */}
      </div>
    </div>
      </div>
    </div>
  </div>
  {/* ///////////////////////////// */}
  {/* <div className="bg-gray-300 border rounded-xl p- w-1/2 px-4">
    <div className="mb-8">
      <h2 className="text-xl text-center p-4 font-medium mb-2">Income Expense</h2>
      <h1></h1>
    </div>
  </div> */}
  {/* ///////////////////////////// */}
</div>
      <br></br>  
      <ToastContainer/> 
    </div>
  )
}

export default FinanceTreasur
