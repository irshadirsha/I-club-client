import React from 'react'

function Notification() {
  return (
    <div className="bg-primary min-h-screen">
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
        Notifications
          </h2>
        </div>
        <form className="mt-2 space-y-6" action="#" method="POST">
         
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your message"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className=" py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Notification</h1>
    <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                </th>
               
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2023-08-09
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                messagess
                </td>
                </tr>
                {/* Add more rows for other finance entries */}
            </tbody>
            </table>
        </div>
        </div>
  </div>
  )
}

export default Notification
