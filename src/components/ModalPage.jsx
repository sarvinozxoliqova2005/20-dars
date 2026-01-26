import { Button, Checkbox, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const ModalPage = ({ open , setOpen , editDatas , form , setActorId , actorId , setEditDatas}) => {
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const formdata = new FormData();
  
  const onFinish = async (values) => {
  const payload = {
    full_name: values.full_name,
    photo_url: values.photo_url,
    birth_year: Number (values.birth_year),
    biography: values.biography,
    country: values.country,
  };

  try {
    if (actorId) {
      await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/actor/${actorId}`,
        payload
      );
      setActorId(null);
      setEditDatas(null);
      form.recetFields();
    } else {
      await axios.post(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/actor`,
        payload
      );
    }
    setOpen(false);
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
        + Add Actors
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
            label="Birthday"
            name="birth_year"
            rules={[{ required: true, message: "Please input your birthday!" }]}
            style={{ gridColumn: "span 1" }}
          >
            <Input placeholder="YYYY-MM-DD" />
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

export default ModalPage;
