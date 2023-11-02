import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../Api/config';

function ClubsView() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axiosInstance.get('/club-list');
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className=' w-full h-full  lg:grid-cols-3 sm:grid  grid-cols-3  gap-6 p-3'>
{clubs.map((item, index) => (
  <div key={index} className= 'bg-gray-200  p-6 rounded-2xl  w-full  '>
     <div className='  w-full h-56 '>
      {item.clubimg?(
      <img className='object-cover w-full h-full rounded-lg'  
       src={item.clubimg}
       alt="" />):(
        <img className='object-cover w-full h-full rounded-lg'  
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAMAAABCfAldAAAAVFBMVEXy8vJmZmbz8/P29vZgYGDg4OD7+/ugoKCXl5fPz89TU1OCgoJdXV3JycljY2Pu7u6KiopYWFh5eXmvr6/n5+fY2Nhvb2+2trampqaRkZHAwMBMTEy61I9aAAAFGUlEQVR4nO2a25arIAyGNZGogwpSz/P+77mj1p60rfVAZ+3lv+aiYxG+JpAE0XH+tuDbAO90AK7VAbhWB+BaHYBrdQCu1QG4VgfgWh2Aa3UArtUBuFYH4FodgGt1AK7VR4CAG+mDUT9oiiDCjZTD7HHnAyLq6GcjeXq2Eef/EgjSIthIRRrMJZwPmLmFwE1mIaAo3GxzQBHJjZY8AMhIbA/oSW4NG4i7kd5egBvpjwP+eQtaA1zKawsQkAg/IrsMagMQKItPZY4wP21dB7UBiI37E6Wpzj43ohVAPKWJy/Jm5wS7gCjcs7z6mQnhWV1lBbCKBsJ02oSccbmsmoS3AUgyuQCGExSAmXaTxEx9ZwfQeC8BOZu1Jk4iMUX/B1xMQf99UqjxtzYAIR9czNXxuDXGA78X0GgMS2HmpwdIJobCzL1M0Z/xDLBiQYDSTaMolfk4lgDqywxlJ4+moaVUh6Lxq9iZcDCVlwnaz4FRkWEFsC0WeIcxborix71VdKJvAD5tCOoaI8+ED07+csFKfnTP5yZ8573xvwmIsec+KvLvnPxNQHawm4wA3egu1nzVglg/OriPNbdl4zcB7yPMTawJvgT4cAWz8QQ8O7m5pjxrgKNNEzhmYgL2+r062RIgp5Ky3TTdFmGnaQd301CrIdbYSnUB5+KfWl0TGYbeUwNyWXZJKFYAQenOWpG5FHzgJC/43MQbYo0dwCGceKa/DICjFPJAWJw7sAAIyBV9MhD20x+b9CUfWzsgO4CcLm7DcWdDAPGcbDAhxxo7gHSfLiLp4F2R+tyGCi0AAtYPLK2X8/TVChkadn3sC8jFfjBaDOxlDF+u4bPSEncHpKlywDOKwhmArpfjvoBT9hsI89dhplMfa3YEHNfLA6F0KJ5BGFW0IyBO+newYUb5jJWcxrQfIFQvbMQrZc485OIV9gIk/2WyiCSvlFf1wvmH1LgTILxJtv1KeU+YlnoXQF29S7ZzvewWewAmyZxc1sXD94i7WPA9nnuO2O+bfg+wWynB27Z7AM7ja23YvOVLdjjQduaUU/3o7+ua+QeTswFbH6eRt4mi1Jt6tr4S0EFV+hupzLZ/66NtS5vpA8d9APgV/beAMNy69y9c3H/79Bxuzwr5nz1gF1swb/cWKry5osKJU6/VFl56P1apAsjMzcOGrMh6x3/+jsALLQY8yRIhk7wJPZ+VAKj+BcP+HPt8uX9bECbPU/YFrBrTAaLyg7x/XBA6Im/qmE61QFBVEKKDcd2EGf+cOlw4Q5cDhlWMDKhMKIpur6uME0eNMCYXSUam4csUm6z8FaRLpeNlNlwOGGeSAbHxCcO6f1wAcUB0OiHpXPlAVcwfkBKhDFIe0PtetwXk0Rmwatidpu1JSSf2GbDkvSlz8d4ydowC0iKvnSw39gHDWknimQbQHquzBS+AbDgRaBMrA0C1CIsgqH3rgAgyZ8C4s+AjIBQNnRiQlzEDBm2BsGygNYAYa42nklDI/pnaDWBYE89BlBmQEblGEN+wIBYGeXCqzs/UbgBzicrE5JekfgUYQWVleRWfOGxgKZlUatnFQaWduGLABogjo5baLygzWss22mj9+RtUqwDbYgEc5MoTnfNJCVcObfHQ5gy+gFmbRISjSApOJGppJbH0Nuj+nCHxXkqv66X2M5W1Cvs3Z2ynupnCUgdqKVunnQG5Rpx+v2x+DxuRvOh+3RD/7Z7Emg7AtToA1+oAXKsDcK0OwLX6+4D/ALUUSi928TxeAAAAAElFTkSuQmCC"
        alt="" />
       )
       }
      </div>
      <div className=' '>
        <h1 className="text-md text-center font-mono  font-bold " >
          {item.clubName}
        </h1> 
        <h1 className="text-md text-center font-mono  font-bold " >
     {item.category}
        </h1> 
        <h1 className="text-md text-center font-mono font-bold">
      {item.address.split(' ').slice(0, 3).join(' ')}
        </h1>

        </div>
    
  </div>
)
)}
</div>
  );
}

export default ClubsView;
