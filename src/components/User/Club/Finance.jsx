import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../Api/config';
import { useLocation } from 'react-router-dom';
import FinanceTreasur from './FinanceTreasur';
import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
function Finance() {

  const {clubName}=useSelector((state)=>state.user)
  const location = useLocation();
  // const clubName = location.state?.club;
  const [loading, setLoading] = useState(true);
  const [showIncome, setShowIncome] = useState(true);
  const [financeData, setFinanceData] = useState([]);
  const [financeExpData, setFinanceExpData] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [changeData, setChangeData] = useState(false)
  const itemsPerPage = 8;

  const toggleIncomeExpense = () => {
    setShowIncome(!showIncome);
    fetchdata();
    setCurrentPage(1); // Reset current page when toggling
  };

  useEffect(() => {
    fetchdata();
  }, [changeData]);

  const fetchdata = async () => {
    const { data } = await axiosInstance.get('/get-financedata', {
      params: { clubName }
    });
    setFinanceData(data.financedata);
    setFinanceExpData(data.financeexpense);
    setUserRole(data.userRole);
    setLoading(false)
  };

  const callbackChange = (data) => {
    setChangeData(!changeData)
  }

  const filteredData = showIncome ? financeData : financeExpData;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData?.slice(startIndex, endIndex);

  return (
    <div>
         {loading && <Loader/>}
      <div className="bg-primary min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl text-center font-semibold mb-4">Finance</h1>
        {userRole === 'treasurer' && <FinanceTreasur callbackFunction={callbackChange} state={clubName} />}
        <div className=" mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded ${
              showIncome ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'
            }`}
            onClick={toggleIncomeExpense}
          >
            Income
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded ml-2  ${
              !showIncome ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'
            }`}
            onClick={toggleIncomeExpense}
          >
            Expense
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-md font-bold font-mono  text-black uppercase tracking-wider">
                  Index
                </th>
                <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {currentData?.length > 0 ? (
              currentData?.map((item, index) => (
                
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-black">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-black">
                  {new Date(item.date).toLocaleDateString(undefined, {
                 day: 'numeric',
                 month: 'long',
                year: 'numeric'
                })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-black">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-black">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-black">
                    {item.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-black">
                    {item.amount}
                  </td>
                </tr>
              ))):(
                <tr>
                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-md text-black">
                  No Transaction Records
                </td>
              </tr>
              )
            }
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-2 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Finance;







// import React, { useState,useEffect } from 'react';
// import { axiosInstance } from '../../../../Api/config';
// import { useLocation } from 'react-router-dom';
// import FinanceTreasur from './FinanceTreasur';

// function Finance() {
//   const location=useLocation()
//   const clubName=location.state?.club;
// console.log("club home", clubName);
//   const [showIncome, setShowIncome] = useState(true); // Initially showing income table
//   const [financeData, setFinanceData] = useState([]);
//   const [financeExpData, setFinanceExpData] = useState([]);
//   const [userRole, setUserRole] = useState('');

//   const toggleIncomeExpense = () => {
//     setShowIncome(!showIncome);
//     fetchdata()
//   };

//    useEffect(()=>{
//     fetchdata()
//    },[])

//    const fetchdata = async () => {
//     const { data } = await axiosInstance.get('/get-financedata', {
//         params: { clubName }
//     });
//     console.log(data.financedata);
//     console.log(data.userRole)
//     setFinanceData(data.financedata);
//     setFinanceExpData(data.financeexpense)
//     setUserRole(data.userRole); 

// }

//   return (
    
//     <div>
//       <div className="bg-primary min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl text-center font-semibold mb-4">Finance</h1>
//         {/* /////////////////////////////// */}
//        {/* <FinanceTreasur state={clubName}/>
//         */}
//          {userRole === 'treasurer' && <FinanceTreasur state={clubName} />}
//   {/* //////////////////////////////////// */}
//         <div className="mb-4">
//           <button
//             className={`px-4 py-2 text-sm font-medium rounded ${
//               showIncome ? 'bg-gray-900 text-white'  :  'bg-gray-300 text-gray-900'
//             }`}
//             onClick={toggleIncomeExpense}
//           >
//             Income
//           </button>
//           <button
//             className={`px-4 py-2 text-sm font-medium rounded ml-2 ${
//               !showIncome ?'bg-gray-900 text-white'  :  'bg-gray-300 text-gray-900'
//             }`}
//             onClick={toggleIncomeExpense}
//           >
//             Expense
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//   <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
    // <thead className="bg-gray-50">
    //   <tr>
    //     <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
    //       Index
    //     </th>
    //     <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
    //       Date
    //     </th>
    //     <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
    //       Name
    //     </th>
    //     <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
    //       Reason
    //     </th>
    //     <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
    //       Payment Method
    //     </th>
    //     <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
    //       Amount
    //     </th>
    //   </tr>
    // </thead>
    // <tbody className="bg-white divide-y divide-gray-200">
    //   {showIncome && financeData.map((finance, index) => (
    //     <tr key={finance._id}>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {index + 1}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {finance.date}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {finance.name}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {finance.reason}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {finance.paymentMethod}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {finance.amount}
    //       </td>
    //     </tr>
    //   ))}
    //   {!showIncome && financeExpData.map((expense, index) => (
    //     <tr key={expense._id}>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {index + 1}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {expense.date}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {expense.name}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {expense.reason}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {expense.paymentMethod}
    //       </td>
    //       <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
    //         {expense.amount}
    //       </td>
    //     </tr>
    //   ))}
//     </tbody>
//   </table>
// </div>

//       </div>
      
//     </div>
//   );
// }

// export default Finance;






// import React from 'react'

    // function Finance() {
    // return (
    //     <div>
    //     <div className="bg-primary min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    //     <h1 className="text-2xl font-semibold mb-4">Finance Listing</h1>
        // <div className="overflow-x-auto">
        //     <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        //     <thead className="bg-gray-50">
        //         <tr>
        //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //             Index
        //         </th>
        //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //             Date
        //         </th>
        //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //             Name
        //         </th>
        //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //             Reason
        //         </th>
        //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //             Payment Method
        //         </th>
        //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //             Amount
        //         </th>
        //         </tr>
        //     </thead>
        //     <tbody className="bg-white divide-y divide-gray-200">
        //         <tr>
        //         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //             1
        //         </td>
        //         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //             2023-08-09
        //         </td>
        //         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //             Mahammad Irshad
        //         </td>
        //         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //             For new building inauguration
        //         </td>
        //         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //             PayPal
        //         </td>
        //         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //             $12345.00
        //         </td>
        //         </tr>
        //         {/* Add more rows for other finance entries */}
        //     </tbody>
        //     </table>
        // </div>
    //     </div>
    //     </div>
    // )
    // }

    // export default Finance
