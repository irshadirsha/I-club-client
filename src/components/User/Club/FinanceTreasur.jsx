import React,{useState} from 'react'
import { axiosInstance } from '../../../../Api/config';
import { ToastContainer,toast } from 'react-toastify'
function FinanceTreasur({state}) {
  const clubName=state
console.log("tresurer",clubName);
const [expenseData, setExpenseData] = useState({
  name: '',
  reason: '',
  date: '',
  amount: '',
});

const handleExpense = async (e) => {
  e.preventDefault();

  try {
    console.log("adddd exxxpppennnssseee",expenseData)
    const response = await axiosInstance.post('/add-expense', {
      clubName,
      ...expenseData,
    });
    console.log(response);
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
  {/* Existing table */}
  <div className=" border rounded-xl p-2 w-1/2 px-4">
    <div className="mb-8">
      <h2 className="text-xl text-center font-medium mb-2">Add Expense</h2>
      <form onSubmit={handleExpense}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={expenseData.name}
              onChange={(e) => setExpenseData({ ...expenseData, [e.target.name]: e.target.value })}
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Reason
            </label>
            <input
              type="text"
              name="reason"
              value={expenseData.reason}
              onChange={(e) => setExpenseData({ ...expenseData, [e.target.name]: e.target.value })}
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={expenseData.date}
              onChange={(e) => setExpenseData({ ...expenseData, [e.target.name]: e.target.value })}
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            />
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
              onChange={(e) => setExpenseData({ ...expenseData, [e.target.name]: e.target.value })}
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            />
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
