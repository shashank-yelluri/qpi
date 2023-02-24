import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTasks, getUserById } from "../api/api";
import { Task } from "./Task";
import {
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Divider, Modal } from "antd";
import { AddTask } from "./AddTask";
import { useState } from "react";

export const UserDetails = () => {
  let { userId: id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isError: userIsError,
    error: userError,
    isLoading: userIsLoading,
    data: userData,
  } = useQuery(["users", id], getUserById);

  const { isError, error, isLoading, data } = useQuery(["tasks"], getTasks);

  const mutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (userIsLoading) return <h2>Loading...</h2>;
  if (userIsError) return <p>{JSON.stringify(userError)}</p>;

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>{JSON.stringify(error)}</p>;

  const { name, isAdmin } = userData;

  const handleUsers = () => {
    navigate("/users");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "32px",
        border: "1px solid black",
        borderRadius: "12px",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontWeight: "bolder" }}>Hi, {name}</p>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "24px" }}
        >
          {isAdmin && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "24px",
              }}
            >
              <PlusOutlined onClick={showModal} />
              <SettingOutlined onClick={handleUsers} />
            </div>
          )}
          <LogoutOutlined onClick={handleLogout} />
        </div>
      </div>

      <Divider />

      <div
        style={{
          height: "200px",
          marginTop: "24px",
          padding: "12px",
          overflowY: "scroll",
        }}
      >
        {data &&
          data.map((task) => (
            <Task
              task={task}
              key={task._id}
              userName={name}
              isAdmin={isAdmin}
            />
          ))}
      </div>

      <Modal
        title="Add Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <AddTask setIsModalOpen={setIsModalOpen} mutation={mutation} />
      </Modal>
    </div>
  );
};
