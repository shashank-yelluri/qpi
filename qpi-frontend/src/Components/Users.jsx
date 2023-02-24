import {
  ArrowLeftOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Divider, Modal, Segmented } from "antd";
import { useEffect, useState } from "react";
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
  const [segmentValue, setSegmentValue] = useState("Users");
  const [admin, setAdmin] = useState(false);
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

  useEffect(() => {
    setAdmin(!admin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentValue]);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>{JSON.stringify(error)}</p>;

  let usersCount = data.filter((user) => !user.isAdmin).length;
  let adminsCount = data.filter((user) => user.isAdmin).length;

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Segmented
          options={["Users", "Admins"]}
          value={segmentValue}
          onChange={setSegmentValue}
        />
        <Badge count={admin ? usersCount : adminsCount}>
          <Avatar shape="square" size="small" icon={<UserOutlined />} />
        </Badge>
      </div>

      <div
        style={{
          height: "200px",
          marginTop: "32px",
          overflowY: "scroll",
          padding: "12px",
        }}
      >
        {data &&
          // eslint-disable-next-line array-callback-return
          data.map((user) => {
            if (segmentValue === "Users") {
              if (!user.isAdmin) return <User key={user._id} user={user} />;
            } else {
              if (user.isAdmin) return <User key={user._id} user={user} />;
            }
          })}
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
