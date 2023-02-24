import {
  ArrowLeftOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Divider, Modal } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/api";
import { AddUser } from "./AddUser";
import { AddUsers } from "./AddUsers";
import { User } from "./User";

export const Users = () => {
  const { isError, error, isLoading, data } = useQuery(["users"], getUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModelOpen, setIsUploadModelOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showUploadModal = () => {
    setIsUploadModelOpen(true);
  };

  const handleUploadCancel = () => {
    setIsUploadModelOpen(false);
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>{JSON.stringify(error)}</p>;

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
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <p style={{ fontWeight: "bolder" }}>Admin Console</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "24px",
          }}
        >
          <UsergroupAddOutlined
            onClick={showUploadModal}
            style={{ fontSize: "20px" }}
          />
          <UserAddOutlined onClick={showModal} style={{ fontSize: "20px" }} />
        </div>
      </div>

      <Divider />

      <div
        style={{
          height: "200px",
          marginTop: "32px",
          overflowY: "scroll",
          padding: "12px",
        }}
      >
        {data && data.map((user) => <User key={user._id} user={user} />)}
      </div>

      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <AddUser setIsModalOpen={setIsModalOpen} />
      </Modal>

      <Modal
        title="Add Users"
        open={isUploadModelOpen}
        onCancel={handleUploadCancel}
        footer={null}
      >
        <AddUsers setIsUploadModelOpen={setIsUploadModelOpen} />
      </Modal>
    </div>
  );
};
