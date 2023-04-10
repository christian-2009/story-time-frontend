import Subtitle from "components/Subtitle";
import Button from "components/Button";

export default function Users() {
  return (
    <div className="leave">
      <Subtitle subtitle="Users" optionalStyles={{ marginTop: "0.2em" }} />
      <div className="users"></div>
      <Button text="Leave" />
    </div>
  );
}
