import { Button, Checkbox, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const FavoriteModal = ({ open , setOpen , editDatas , form , favoriteId , setFavoriteId , setEditDatas}) => {
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const formdata = new FormData();
  
 const onFinish = async (values) => {
  const payload = {
    user_id: Number(values.user_id),
    movie_id: Number(values.movie_id),  
 };
 
  try {
    if (favoriteId) {
      await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/favorite/${favoriteId}`,
        payload
      );
        form.resetFields();
        setFavoriteId(null);
        setEditDatas(null);
        setOpen(false);
    } else {
      await axios.post(
        `https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/favorite`,
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
        + Add Favorites
      </Button>

      <Modal
       title={editDatas ? "Edit Favorite" : "Add Favorite"}
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
            label="User Id"
            name="user_id"
            rules={[{ required: true, message: "Please input your User Id!" }]}
            style={{ gridColumn: "span 2" }}
          >
            <Input placeholder="User Id" />
          </Form.Item>

          <Form.Item
            label="Movie Id"
            name="movie_id"
            rules={[{ required: true, message: "Please input your Movie Id!" }]}
            style={{ gridColumn: "span 2" }}
          >
            <Input placeholder="Movie Id" rows={3} />
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

export default FavoriteModal;
