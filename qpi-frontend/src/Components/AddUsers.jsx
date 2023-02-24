import { Button } from "antd";
import Papa from "papaparse";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createBulkUsers } from "../api/api";

export const AddUsers = ({ setIsUploadModelOpen }) => {
  const [data, setData] = useState([]);
  const queryClient = useQueryClient();

  const mutation = useMutation(createBulkUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData([...results.data]);
      },
    });
  };

  const handleAdd = () => {
    mutation.mutate({
      users: data,
    });

    setIsUploadModelOpen(false);
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <p>Upload CSV with users details</p>
      <input type="file" name="file" accept=".csv" onChange={changeHandler} />
      <div>
        <Button
          onClick={handleAdd}
          style={{ marginLeft: "400px", marginTop: "16px" }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
