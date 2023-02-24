import axios from "axios";

export const login = async (data) => {
  const response = await axios.post("http://localhost:3001/login", data);
  const userDetails = response.data;

  return userDetails;
};

export const getTasks = async () => {
  const response = await axios.get("http://localhost:3001/tasks");
  const tasks = response.data.body;

  return tasks;
};

export const getUserById = async (payload) => {
  const { queryKey } = payload;
  const response = await axios.get(
    `http://localhost:3001/users/${queryKey[1]}`
  );
  const user = response.data.body;

  return user;
};

export const getUsers = async () => {
  const response = await axios.get(`http://localhost:3001/users`);
  const users = response.data.body;

  return users;
};

export const updateTask = async (payload) => {
  const response = await axios.put(
    `http://localhost:3001/tasks/${payload.id}`,
    payload.data
  );
  console.log(response);

  return response;
};

export const updateUser = async (payload) => {
  const response = await axios.put(
    `http://localhost:3001/users/${payload.id}`,
    payload.data
  );

  return response;
};

export const deletUser = async (payload) => {
  const response = await axios.delete(
    `http://localhost:3001/users/${payload.id}`
  );

  return response;
};

export const createUser = async (data) => {
  const response = await axios.post(`http://localhost:3001/users`, data);
  return response;
};

export const createTask = async (data) => {
  const response = await axios.post(`http://localhost:3001/tasks`, data);
  return response;
};

export const createBulkUsers = async (data) => {
  const response = await axios.post(`http://localhost:3001/bulkUsers`, data);
  return response;
};
