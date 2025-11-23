import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

const Alert = ({ type, message, onClose }) => {
  if (!message) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      <AlertCircle size={18} className="me-2" style={{ display: "inline" }} />
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
