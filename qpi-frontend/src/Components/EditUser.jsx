import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";

export const EditUser = ({ setIsEditModalOpen, mutation, user }) => {
  const [form] = Form.useForm();
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "User edited successfully ",
    });
  };

  const onFinish = (values) => {
    form.resetFields();

    mutation.mutate({
      id: user._id,
      data: {
        name: values.name,
        password: values.password,
        email: values.email,
        isAdmin: isAdmin,
      },
    });

    success();

    setIsEditModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: "32px" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item label="Name" name="name" initialValue={user.name}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" initialValue={user.email}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" initialValue={user.password}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="isAdmin" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)}>
          IsAdmin
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit" style={{ marginLeft: "220px" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
