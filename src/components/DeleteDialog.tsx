import TaskDialog from "./TaskDialog";
import "../../styles/Spinner.css";

interface DeleteDialogProps {
  open: boolean;
  taskTitle: string;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteDialog({
  open,
  taskTitle,
  deleting,
  onCancel,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <TaskDialog open={open} title="Delete this task?" onCancel={onCancel}>
      <p>Are you absolutely sure you want to delete "{taskTitle}"?</p>

      <div className="dialog-actions">
        <button
          className="button"
          type="button"
          onClick={onCancel}
          disabled={deleting}
        >
          Cancel (Esc)
        </button>

        <button
          className="button"
          type="button"
          onClick={onConfirm}
          disabled={deleting}
        >
          {deleting ? (
            <>
              <span className="spinner" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </TaskDialog>
  );
}

export default DeleteDialog;
