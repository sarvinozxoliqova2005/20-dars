import axios from 'axios';
import { toast } from 'react-toastify';
import useGet from './useGet';

const useDelete = ({mainUrl}) => {
    const {getData} = useGet ({url:mainUrl});
    const deleteData = async ({url}) => {
        try {
            await axios.delete(`https://x8ki-let1-twmt.n7.xano.io/api:j6hO02gL/actor/${url}`);
            toast.success ("Data deleted successfully");
            getData()
        } catch (error) {
            console.log(error);
        }
    }
  return  {deleteData}
}

export default useDelete