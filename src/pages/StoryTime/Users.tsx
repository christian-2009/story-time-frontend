import Text from "components/Text";
import Button from "components/Button";

export default function Users() {
  return (
    <div className="leave">
      <Text.Subtitle optionalStyles={{ marginTop: "0.2em" }}>
        Users
      </Text.Subtitle>
      <div className="users"></div>
      <div
        style={{
          display: "flex",
          flex: "1 1 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button text="Leave" optionalStyles={{ marginTop: 0 }} />
      </div>
    </div>
  );
}
