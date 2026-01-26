import { Button, Form, Image, Space, Table} from 'antd';
import useGet from '../hooks/useGet';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import FavoriteModal from '../components/FavoriteModal';

const FavoritePage = () => {
  const {data , getData} = useGet ({url:"favorite"});
    const [open, setOpen] = useState(false);
    const [editDatas , setEditDatas] = useState(null);
      const [form] = Form.useForm();
      const [favoriteId , setFavoriteId] = useState(null);
    

  const editData = (el) => {
    setOpen (true);
    setEditDatas(el);
    form.setFieldsValue(el);
    setFavoriteId(el.id);
  }

  const deleteData = async ({id}) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/favorite/${id}`);
            toast.success ("Data deleted successfully");
            getData()
        } catch (error) {
            console.log(error);
        }
    }

  const columns = [
  {
    title: 'User Id',
    dataIndex: 'user_id',
    key: 'user_id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'movie Id',
    dataIndex: 'movie_id',
    key: 'movie_id',
    render: text => <p style={{width: "200px" , height: "50px" , overflowY: "auto"}}>{text}</p>,
  },
  {
  title: 'Action',
  key: 'action1',
  render: (_, record) => (
    <Space size="middle">
      <Button onClick={() => editData(record)} type='primary'>Edit</Button>
      <Button onClick={() => deleteData ({id: record.id})} danger>Delete</Button>
    </Space>
  ),
},

];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 , }}>
        <FavoriteModal open={open} setOpen={setOpen} editDatas={editDatas} form={form} favoriteId={favoriteId} setFavoriteId={setFavoriteId} setEditDatas={setEditDatas} />
     </div>
         <Table columns={columns} dataSource={data} rowKey="id"/>
    </div>

  )
}
export default FavoritePage;