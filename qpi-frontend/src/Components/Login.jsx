import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { Error } from "./Error";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      const {
        response: { _id },
      } = data;
      navigate(`${_id}`);
    },
    onError: (data) => {
      const { message } = data.response.data;
      console.log(message);
      setError(message);
    },
  });

  const onFinish = (values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: "32px" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {error && <Error message={error} />}

      <Form.Item label="Username" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password">
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit" style={{ marginLeft: "260px" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
