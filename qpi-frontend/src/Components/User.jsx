import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deletUser, updateUser } from "../api/api";
import { DeleteUser } from "./DeleteUser";
import { EditUser } from "./EditUser";

export const User = ({ user }) => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const deletMutation = useMutation(deletUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "450px",
          justifyContent: "space-between",
        }}
      >
        <p>{user.email}</p>
        <p>{user.name}</p>
        {user.isAdmin ? <p>Admin</p> : <p>User</p>}
      </div>

      <div
        style={{
          display: "flex",
          columnGap: "32px",
        }}
      >
        <EditOutlined onClick={showEditModal} />
        <DeleteOutlined onClick={showDeleteModal} />
      </div>

      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <EditUser
          setIsEditModalOpen={setIsEditModalOpen}
          mutation={mutation}
          user={user}
        />
      </Modal>

      <Modal
        title="Delete User"
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        footer={null}
      >
        <DeleteUser
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          mutation={deletMutation}
          userId={user._id}
        />
      </Modal>
    </div>
  );
};
