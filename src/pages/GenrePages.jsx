import { Button, Form, Image, Space, Table, Tag} from 'antd';
import useGet from '../hooks/useGet';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import GenreModal from '../components/GenreModal';

const GenrePages = () => {
  const {data , getData} = useGet ({url:"genre"});
    const [open, setOpen] = useState(false);
    const [editDatas , setEditDatas] = useState(null);
      const [form] = Form.useForm();
      const [genreId , setGenreId] = useState(null);
    

  const editData = (el) => {
    setOpen (true);
    setEditDatas(el);
    form.setFieldsValue(el);
    setGenreId(el.id);
  }

  const deleteData = async ({id}) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/genre/${id}`);
            toast.success ("Data deleted successfully");
            getData()
        } catch (error) {
            console.log(error);
        }
    }

  const columns = [
  {
    title: 'Name',
    dataIndex: 'name_uz',
    key: 'name_uz',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name_ru',
    key: 'name_ru',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Name',
    dataIndex: 'name_en',
    key: 'name_en',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon',
    render: text => <p>{text}</p>,
  },
 {
   title: 'Active',
   dataIndex: 'is_active',
   key: 'active',
   render: (text) => (
  <Tag color={text ? "green" : "red"}> {text ? "Active" : "Inactive"}</Tag>)
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
        <GenreModal open={open} setOpen={setOpen} editDatas={editDatas} form={form} genreId={genreId} setGenreId={setGenreId} setEditDatas={setEditDatas} />
     </div>
         <Table columns={columns} dataSource={data} rowKey="id"/>
    </div>

  )
}
export default GenrePages;