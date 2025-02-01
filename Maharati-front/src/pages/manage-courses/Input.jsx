export default function input({ id, label, ...props }) {
  return (
    <div className="col">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input id={id} name={id} required {...props} className="form-control" />
    </div>
  );
}
