import { Button, Checkbox, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const DirectorModal = ({ open , setOpen , editDatas , form , directorId , setDirectorId , setEditDatas}) => {
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const formdata = new FormData();
  
  const onFinish = async (values) => {
  const payload = {
    full_name: values.full_name,
    photo_url: values.photo_url,
    biography: values.biography,
    country: values.country,
  };

  try {
    if (directorId) {
      await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/dirctor/${directorId}`,
        payload
      );
      setDirectorId(null);
      setEditDatas(null);
      form.recet();
    } else {
      await axios.post(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/director`,
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
        + Add Directors      
      </Button>

      <Modal
       title={editDatas ? "Edit Actor" : "Add Actor"}
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
            label="Photos"
            name="photo_url"
            rules={[{ required: true, message: "Please input your Photos!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Photo URL" />
          </Form.Item>

          <Form.Item
            label="Your Full Name"
            name="full_name"
            rules={[{ required: true, message: "Please input your Full Name!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="Biography"
            name="biography"
            rules={[{ required: true, message: "Please input your biography!" }]}
            style={{ gridColumn: "span 2" }}
          >
            <Input.TextArea placeholder="Biography" rows={3} />
          </Form.Item>


          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="Country" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ gridColumn: "span 2" }}
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

export default DirectorModal;
