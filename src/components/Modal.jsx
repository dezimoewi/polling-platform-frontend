
import React from "react";
import "./Modal.css";

/**
 * Reusable modal.
 *
 * Props:
 *  - message: string|null
 *  - onClose: () => void           // called when user clicks OK or Cancel
 *  - confirm?: boolean            // if true, shows Yes / No buttons
 *  - onConfirm?: () => void       // called when user clicks Yes (confirm)
 *  - variant?: "success"|"error"|"info"
 *
 * Note: we accept `props` and destructure to avoid TS complaints in JS projects with type-checking.
 */
/** @param {{ message: string|null, onClose: () => void, confirm?: boolean, onConfirm?: () => void, variant?: string }} props */
export default function Modal(props) {
  const { message, onClose, confirm = false, onConfirm, variant = "info" } = props;

  if (!message) return null;

  // Prevent clicks on overlay from closing modal (require explicit click on buttons)
  const stop = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className={`modal-container modal-${variant}`} onClick={stop}>
        <div className="modal-body">
          <div className="modal-icon">
            {variant === "success" ? "✅" : variant === "error" ? "❌" : "ℹ️"}
          </div>
          <div className="modal-text">
            <p>{message}</p>
          </div>
        </div>

        <div className="modal-actions">
          {confirm ? (
            <>
              <button
                className="modal-btn modal-btn-confirm"
                onClick={() => {
                  if (onConfirm) onConfirm();
                }}
              >
                Yes
              </button>

              <button
                className="modal-btn modal-btn-cancel"
                onClick={() => {
                  if (onClose) onClose();
                }}
              >
                No
              </button>
            </>
          ) : (
            <button
              className="modal-btn modal-btn-ok"
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}