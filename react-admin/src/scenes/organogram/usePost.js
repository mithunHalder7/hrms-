import axios from "axios";
const usePost = async(obj)=>
        {
          try{
            const resp = await axios.post('http://localhost:5000/office_post', JSON.stringify(obj));
            console.log(resp.data);
          }catch(error){
            console.log(error.response)
          }
        };
export default usePost;