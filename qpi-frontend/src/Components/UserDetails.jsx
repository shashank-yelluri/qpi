import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTasks, getUserById } from "../api/api";
import { Task } from "./Task";
import {
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Divider, Modal, Segmented } from "antd";
import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";

export const UserDetails = () => {
  let { userId: id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segmentValue, setSegmentValue] = useState("Apps");
  const [board, setBoard] = useState(false);

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

  useEffect(() => {
    setBoard(!board);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentValue]);

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

  let devopsCount = data.filter((task) => task?.board === "DevOps").length;
  let appsCount = data.length - devopsCount;

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Segmented
          options={["Apps", "DevOps"]}
          value={segmentValue}
          onChange={setSegmentValue}
        />

        <Badge count={board ? appsCount : devopsCount}>
          <Avatar shape="square" size="small" icon={<MenuOutlined />} />
        </Badge>
      </div>

      <div
        style={{
          height: "200px",
          marginTop: "24px",
          padding: "12px",
          overflowY: "scroll",
        }}
      >
        {data &&
          // eslint-disable-next-line array-callback-return
          data.map((task) => {
            if (segmentValue === "DevOps") {
              if (task?.board === "DevOps") {
                return (
                  <Task
                    task={task}
                    key={task._id}
                    userName={name}
                    isAdmin={isAdmin}
                  />
                );
              }
            } else {
              if (task?.board !== "DevOps") {
                return (
                  <Task
                    task={task}
                    key={task._id}
                    userName={name}
                    isAdmin={isAdmin}
                  />
                );
              }
            }
          })}
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
