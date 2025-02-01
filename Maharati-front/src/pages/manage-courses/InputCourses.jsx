import './Input.jsx';
export default function InputCourses({
  label,
  id,
  type,
  value,
  onChange,
  ...props
}) {
  return (
    <div className="col">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        id={id}
        name={id}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
