import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createSymptom } from "../store/slices/doctor/symptoms";
import { createDisease } from "../store/slices/doctor/diseases";
import { toast } from "react-toastify";

const AddingFormModal = ({ show, handleClose, type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValue.trim() === "") return;

    setIsProcessing(true);
    try {
      if (type === "symptom") {
        await dispatch(createSymptom({ name: [formValue.trim()] })).unwrap();
        toast.success(t(`${type}_added_successfully`));
      } else {
        await dispatch(createDisease({ name: [formValue.trim()] })).unwrap();
        toast.success(t(`${type}_added_successfully`));
      }
      handleClose();
      setFormValue("");
    }
    catch (error) {
      console.error("Failed to add:", error);
      toast.error(t(`add_${type}_failed`));
    }
    finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{t(`add_${type}`)}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>{t(`enter_${type}`)}</Form.Label>
            <Form.Control
              type="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              autoFocus
            />

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!formValue.trim() || isProcessing}
          >
            {isProcessing ? t("loading...") : t(`add_${type}`)}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddingFormModal;