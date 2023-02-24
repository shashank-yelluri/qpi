import { Button, Form, Input, Select } from "antd";
import { useQuery } from "react-query";
import { getUsers } from "../api/api";

export const AddTask = ({ mutation, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const statusValues = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Complete", label: "Complete" },
  ];

  const { isError, error, isLoading, data } = useQuery(["users"], getUsers);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>{JSON.stringify(error)}</p>;

  const onFinish = (values) => {
    form.resetFields();
    mutation.mutate({
      name: values.name,
      status: values.status,
      owner: values.owner,
    });

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
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Select>
          {statusValues.map(({ value, label }) => (
            <Select.Option value={value} key={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Owner" name="owner">
        <Select>
          {data.map(({ name }) => (
            <Select.Option value={name} key={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit" style={{ marginLeft: "220px" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
