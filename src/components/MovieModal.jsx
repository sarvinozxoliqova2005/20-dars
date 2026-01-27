import { Button, Checkbox, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const MovieModal = ({ open , setOpen , editDatas , form , movieId , setMovieId , setEditDatas}) => {
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const formdata = new FormData();
  
  const onFinish = async (values) => {
  const payload = {
    title_uz: values.title_uz,
    title_ru: values.title_ru,
    title_en: values.title_en,
    description_uz: values.description_uz,
    description_ru: values.description_ru,
    description_en: values.description_en,
    poster_url: values.poster_url,
    video_url: values.video_url,
    age_rating: values.age_rating,
    country: values.country,
    language: values.language,
    is_premium: values.is_premium,
    is_featured: values.is_featured,
    view_count: values.view_count,
    is_active: values.is_active
  };

  try {
    if (movieId) {
      await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/dirctor/${movieId}`,
        payload
      );
      setMovieId(null);
      setEditDatas(null);
     form.resetFields();
    } else {
      await axios.post(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie`,
        payload
      );
    }
    toast.success("Data submitted successfully ✅");
  } catch (error) {
    console.log(error);
    toast.error("Data submission failed ❌");
  }
};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        + Add Movies      
      </Button>

      <Modal
       title={editDatas ? "Edit Movie" : "Add Movie"}
        open={open}
        onCancel={handleCancel}
        footer={null} 
        width={600}
        centered
      >
        <Form
        form={form}
          name="actorForm"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title Uz"
            name="title_uz"
            rules={[{ required: true, message: "Please input your Title Uz!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Title Uz" />
          </Form.Item>

          <Form.Item
            label="Title RU"
            name="title_ru"
            rules={[{ required: true, message: "Please input your Title Ru!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Title Ru" />
          </Form.Item>

          <Form.Item
            label="Title En"
            name="title_en"
            rules={[{ required: true, message: "Please input your Title En!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Title En" rows={3} />
          </Form.Item>


          <Form.Item
            label="Description Uz"
            name="description_uz"
            rules={[{ required: true, message: "Please input your Description Uz!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Description Uz" />
          </Form.Item>

          <Form.Item
            label="Description Ru"
            name="description_ru"
            rules={[{ required: true, message: "Please input your Description Ru!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Description Ru" />
          </Form.Item>

          <Form.Item
            label="Description En"
            name="description_en"
            rules={[{ required: true, message: "Please input your Description En!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Description En" />
          </Form.Item>

          <Form.Item
            label="Poster Url"
            name="poster_url"
            rules={[{ required: true, message: "Please input your Poster Url!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Poster Url" />
          </Form.Item>

          <Form.Item
            label="Video Url"
            name="video_url"
            rules={[{ required: true, message: "Please input your Video Url!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Video Url" />
          </Form.Item>

           <Form.Item
            label="Age Rating"
            name="age_rating"
            rules={[{ required: true, message: "Please input your Age Rating!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Age Rating" />
          </Form.Item>

           <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input your Country!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Country" />
          </Form.Item>

           <Form.Item
            label="Language"
            name="language"
            rules={[{ required: true, message: "Please input your Language!" }]}
            style={{ gridColumn: "span 2" }}
          >
            <Input placeholder="Language" />
          </Form.Item>


           <Form.Item
            label="Premium"
            name="is_premium"
            valuePropName="checked"
            style={{ gridColumn: "span 1" }}>
           <Checkbox />
          </Form.Item>

            <Form.Item
            label="Featured"
            name="is_featured"
            valuePropName="checked"
            style={{ gridColumn: "span 1" }}>
           <Checkbox />
        </Form.Item>

           <Form.Item
            label="Active"
            name="is_active"
            valuePropName="checked"
            style={{ gridColumn: "span 1" }}>
           <Checkbox />
        </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ gridColumn: "span 1" }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item style={{ gridColumn: "span 2" }}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MovieModal;
