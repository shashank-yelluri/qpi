import { Button } from "antd";

export const DeleteUser = ({ setIsDeleteModalOpen, mutation, userId }) => {
  const handleDelete = (userId) => {
    mutation.mutate({
      id: userId,
    });

    setIsDeleteModalOpen(false);
  };
  return (
    <div>
      <p>Are you sure you want to delete the user ?</p>
      <div style={{ display: "flex", columnGap: "8px", marginLeft: "300px" }}>
        <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
        <Button danger onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
