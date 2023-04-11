import Text from "components/Text";
import Button from "components/Button";

export default function Users() {
  return (
    <div className="leave">
      <Text.Subtitle optionalStyles={{ marginTop: "0.2em" }}>
        Users
      </Text.Subtitle>
      <div className="users"></div>
      <Button text="Leave" />
    </div>
  );
}
