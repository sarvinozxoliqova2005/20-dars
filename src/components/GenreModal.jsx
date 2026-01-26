import { Button, Checkbox, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import axios from "axios";


const GenreModal
 = ({ open , setOpen , editDatas , form , setGenreId , genreId , setEditDatas}) => {
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const formdata = new FormData();
  
const onFinish = async (values) => {
  const payload = {
    name_uz: values.name_uz,
    name_ru: values.name_ru,
    name_en: values.name_en,
    slug: values.slug,
    icon: values.icon,
    is_active: values.is_active || false,
  };

  try {
    if (genreId) {
      await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/genre/${genreId}`,
        payload
      );
      setGenreId(null);
      setEditDatas(null);
    form.resetFields(); 
    } else {
      await axios.post(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/genre`,
        payload
      );
    }
    toast.success("Data submitted successfully ✅");
    setOpen(false);
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
        + Add Genres
      </Button>

      <Modal
       title={editDatas ? "Edit Genre" : "Add Genre"}
        open={open}
        onCancel={handleCancel}
        footer={null} 
        width={600}
        centered
      >
        <Form
        form={form}
          name="genreForm"
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
            label="Name"
            name="name_uz"
            rules={[{ required: true, message: "Please input your Name!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Name_uz" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name_ru"
            rules={[{ required: true, message: "Please input your Name!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Name_ru" rows={3} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name_en"
            rules={[{ required: true, message: "Please input your Name!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Name_en" rows={3} />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Please input your slug!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Slug" />
          </Form.Item>

          <Form.Item
            label="Icon"
            name="icon"
            rules={[{ required: true, message: "Please input your Icon!" }]}
            style={{ gridColumn: "span 2" }}
          >
            <Input placeholder="Icon URL" />
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

export default GenreModal
;
