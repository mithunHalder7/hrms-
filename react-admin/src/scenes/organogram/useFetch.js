import {useEffect, useState} from 'react';
import axios from 'axios';


// export default function useFetch(url) {
//     const [info, setInfo] = useState([])

//     const fetchUserData = () => {
//       fetch(url)
//         .then(response => {
//           return response.json()
//         })
//         .then(data => {
//           setInfo(data)
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
  
//     useEffect(() => {
//       fetchUserData();
//     }, [])
    
//     return info;
// }

// const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('https://example.com/api/data')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);


const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(response => {
          setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
    
    return data;
}

export default useFetch;
