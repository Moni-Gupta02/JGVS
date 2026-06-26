import { cn } from '../../utils';
import './FormField.css';

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options,
  rows,
  hint,
  className,
  disabled,
}) {
  const id = `field-${name}`;
  const inputClass = cn('form-field__input', error && 'form-field__input--error');

  return (
    <div className={cn('form-field', className)}>
      {label && (
        <label htmlFor={id} className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      {hint && <p className="form-field__hint">{hint}</p>}

      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClass}
          disabled={disabled}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 4}
          placeholder={placeholder}
          className={inputClass}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          disabled={disabled}
        />
      )}

      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}

export default FormField;
