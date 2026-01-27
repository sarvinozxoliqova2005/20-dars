import { Button, Flex, Form, Image, Space, Table, Tag } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import MovieModal from '../components/MovieModal';

const MoviePage = () => {
    const [open, setOpen] = useState(false);
    const [editDatas , setEditDatas] = useState(null);
      const [form] = Form.useForm();
      const [movieId , setMovieId] = useState(null);
      const queryClient = useQueryClient();

const getData = async () => {
const res = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie");
return res.data;
};


const { data:movies } = useQuery({
queryKey: ["movie"],
queryFn: getData,
staleTime: 60000,
});

const data = movies?.data
    

  const editData = (el) => {
    setOpen (true);
    setEditDatas(el);
    form.setFieldsValue(el);
    setMovieId(el.id);
  }

  const deleteData = async ({id}) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie/${id}`);
            toast.success ("Data deleted successfully");
            queryClient.invalidateQueries({queryKey: ["movie"]});
        } catch (error) {
            console.log(error);
        }
    }

  const columns = [
  {
    title: 'Title_uz',
    dataIndex: 'title_uz',
    key: 'title_uz',
    render: (text) => <h1>{text}</h1>
  },
  {
    title: 'Title_ru',
    dataIndex: 'title_ru',
    key: 'title_ru',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Title_en',
    dataIndex: 'title_en',
    key: 'title_en',
    render: text => <p style={{width: "200px" , height: "50px" , overflowY: "auto"}}>{text}</p>,
  },
  {
    title: 'Description Uz',
    dataIndex: 'description_uz',
    key: 'description_uz',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Description Ru',
    dataIndex: 'description_ru',
    key: 'description_ru',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Description En',
    dataIndex: 'description_en',
    key: 'description_en',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Poster Url',
    dataIndex: 'poster_url',
    key: 'poster_url',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Video Url',
    dataIndex: 'video_url',
    key: 'video_url',
    render: text => <p>{text}</p>,
  },
   {
    title: 'Age Rating',
    dataIndex: 'age_rating',
    key: 'age_rating',
    render: text => <p>{text}</p>,
  },
   {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    render: text => <p>{text}</p>,
  },
   {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
    render: text => <p>{text}</p>,
  },
  {
   title: 'Premium',
   dataIndex: 'is_premium',
   key: 'Premium',
   render: (text) => (
  <Tag color={text ? "green" : "red"}> {text ? "Premium" : "InPremium"}</Tag>)
 },  
 {
   title: 'Featured',
   dataIndex: 'is_featured',
   key: 'Featured',
   render: (text) => (
  <Tag color={text ? "green" : "red"}> {text ? "Featured" : "InFeatured"}</Tag>)
 },  
  {
    title: 'View Count',
    dataIndex: 'view_count',
    key: 'View Count',
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
        <MovieModal open={open} setOpen={setOpen} editDatas={editDatas} form={form} movieId={movieId} setMovieId={setMovieId} setEditDatas={setEditDatas} />
     </div>
         <Table columns={columns} dataSource={data} rowKey="id"/>
    </div>

  )
}
export default MoviePage;