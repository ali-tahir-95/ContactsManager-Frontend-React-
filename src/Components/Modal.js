import React, { useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";

function MyModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Modal
      onClose={closeModal}
      onOpen={openModal}
      open={open}
      trigger={<Button>Open Modal</Button>}
    >
      <Modal.Header>Modal Title</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>This is the content of the modal.</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={closeModal}>
          Close
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          onClick={closeModal}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default MyModal;
