import { Modal } from "react-bootstrap";
import Signin from "./form/Signin";
const ModalSignin = (props) => {
  const { handleClose, handleSignin, show } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
      <Signin handleSignin={handleSignin}/>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignin;
