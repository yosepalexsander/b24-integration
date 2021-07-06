import { Modal } from "react-bootstrap";
import Signup from "./form/Signup";
const ModalSignup = (props) => {
  const { handleClose, show } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
      <Signup />
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignup;
