import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const onFinish = async values => {
  console.log('Success:', values);
  try {
  let res = await axios.post("https://v1.turbotravel.uz/api/auth/signin", values);
  const token = res?.data?.data?.tokens?.accessToken?.token;
  localStorage.setItem("token" , token);
  navigate("/travel")
  toast.success("Successfully logged in ✅");
} catch (error) {
  toast.error("Something went wrong ❌");
  console.log(error);
}
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
    return(
        <div className='form'>
    <Form
    name="basic"
    labelCol={{ span: 32 }}
    wrapperCol={{ span: 32 }}
    style={{ width: 450 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      layout='vertical'
      label="Phone Number"
      name="phone_number"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      layout='vertical'
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item >
      <Button block type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
    )
}
export default LoginPage;