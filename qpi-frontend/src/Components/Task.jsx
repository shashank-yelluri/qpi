import { Button, message, Select } from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsers, updateTask } from "../api/api";

export const Task = ({ task, userName, isAdmin }) => {
  const { name, owner, status, _id } = task;
  const [showBtn, setShowBtn] = useState(false);
  const [ownerName, setOwnerName] = useState(owner.name);
  const [taskStatus, setTaskStatus] = useState(status);
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();

  const { isError, error, isLoading, data } = useQuery(["users"], getUsers);
  const mutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>{JSON.stringify(error)}</p>;

  const handleUsersChange = (value) => {
    setShowBtn(true);
    setOwnerName(value);
  };

  const handleStatusChange = (value) => {
    setShowBtn(true);
    setTaskStatus(value);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Task edited successfully ",
    });
  };

  const handleUpdate = (id) => {
    mutation.mutate({
      id: id,
      data: {
        status: taskStatus,
        owner: ownerName,
      },
    });
    success();

    setShowBtn(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {contextHolder}
      <div style={{ display: "flex", alignItems: "center", columnGap: "48px" }}>
        <p>{name}</p>

        <Select
          defaultValue={owner.name}
          disabled={!isAdmin && true}
          style={{ width: 160 }}
          onChange={handleUsersChange}
          options={data.map((user) => {
            return { value: user.name, label: user.name };
          })}
        />

        <Select
          defaultValue={status}
          disabled={!(isAdmin || userName === owner.name)}
          style={{ width: 160 }}
          onChange={handleStatusChange}
          options={[
            { value: "To Do", label: "To Do" },
            { value: "In Progress", label: "In Progress" },
            { value: "Complete", label: "Complete" },
          ]}
        />
      </div>

      <div>
        {showBtn && <Button onClick={() => handleUpdate(_id)}>Edit</Button>}
      </div>
    </div>
  );
};
