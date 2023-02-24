import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createUser } from "../api/api";

export const AddUser = ({ setIsModalOpen }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const success = () => {
    messageApi.open({
      type: "success",
      content: "User added successfully ",
    });
  };

  const onFinish = (values) => {
    form.resetFields();

    mutation.mutate({
      name: values.name,
      password: values.password,
      email: values.email,
      isAdmin: isAdmin,
    });
    success();

    setIsModalOpen(false);
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
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password">
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
