import React, { useState } from "react";

import Modal from "react-modal";

Modal.setAppElement("#root"); // Important for accessibility

const ImageModal = ({ src, alt }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <img
        src={src}
        alt={alt}
        onClick={openModal}
        style={{ cursor: "pointer", width: "200px" }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Expanded Image"
      >
        <button onClick={closeModal}>Close</button>
        <img src={src} alt={alt} style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

export default ImageModal;
