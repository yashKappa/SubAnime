import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./PopUp.css";

const PopUp = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return ReactDOM.createPortal(
    <div className="toast-container">
      <div className="toast-box">
        {message}
      </div>
    </div>,
    document.body
  );
};

export default PopUp;
