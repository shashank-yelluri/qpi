export const Error = ({ message }) => {
  return (
    <div
      style={{
        marginLeft: "85px",
        backgroundColor: "#ff9494",
        borderRadius: "8px",
        marginBottom: "32px",
        marginTop: "12px",
      }}
    >
      <p style={{ marginLeft: "12px", padding: "5px" }}>{message}</p>
    </div>
  );
};
