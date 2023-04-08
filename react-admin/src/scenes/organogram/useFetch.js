import {useEffect, useState} from 'react';


export default function useFetch(url) {
    const [info, setInfo] = useState([])

    const fetchUserData = () => {
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setInfo(data)
        })
    }
  
    useEffect(() => {
      fetchUserData()
    }, [])
    
    return info;
}
