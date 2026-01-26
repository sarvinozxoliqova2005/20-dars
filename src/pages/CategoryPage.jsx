import { Button, Checkbox, Flex, Form, Image, Space, Table, Tag } from 'antd';
import useGet from '../hooks/useGet';
import { toast } from 'react-toastify';
import axios from 'axios';
import ModalPage from '../components/ModalPage';
import { useState } from 'react';
import CategoryModal from '../components/CategoryModal';

const CategoryPage = () => {
  const {data , getData} = useGet ({url:"category"});
    const [open, setOpen] = useState(false);
    const [editDatas , setEditDatas] = useState(null);
      const [form] = Form.useForm();
      const [categoryId , setCategoryId] = useState(null);
    

  const editData = (el) => {
    setOpen (true);
    setEditDatas(el);
    form.setFieldsValue(el);
    setCategoryId(el.id);
  }

  const deleteData = async ({id}) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/category/${id}`);
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
    key: 'name',
    render: (text) => <h1>{text}</h1>
  },
  {
    title: 'Name',
    dataIndex: 'name_ru',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name_en',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
    render: text => <p style={{width: "200px" , height: "50px" , overflowY: "auto"}}>{text}</p>,
  },
  {
    title: 'Order',
    dataIndex: 'order_number',
    key: 'order',
     render: text => <p>{text === 0 ? "Undefined" : `${text}-year`}</p>,
  },
   {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created',
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
        <CategoryModal open={open} setOpen={setOpen} editDatas={editDatas} form={form} categoryId={categoryId} setCategoryId={setCategoryId} setEditDatas={setEditDatas} />
     </div>
         <Table columns={columns} dataSource={data} rowKey="id"/>
    </div>

  )
}
export default CategoryPage;