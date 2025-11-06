import ErrorMessage from './ErrorMessage';

// Theme Constants
const THEME = {
  labelText: 'text-gray-700',
  labelSize: 'text-sm',
  labelWeight: 'font-medium',
  inputBg: 'bg-gray-50',
  inputBorder: 'border-gray-200',
  inputText: 'text-gray-900',
  inputPlaceholder: 'placeholder-gray-400',
  inputFocusBorder: 'focus:border-gray-900',
  inputFocusRing: 'focus:ring-2 focus:ring-gray-900/10',
  errorBorder: 'border-red-500',
  errorRing: 'ring-red-500/20'
};

export default function FormInput({ name, label, register, errors, type = 'text', rules, ...props }) {
  const hasError = errors[name];

  const inputClass = `w-full ${THEME.inputBg} border ${hasError ? THEME.errorBorder : THEME.inputBorder} rounded-xl px-4 py-3 ${THEME.inputText} ${THEME.inputPlaceholder} focus:outline-none ${THEME.inputFocusBorder} ${hasError ? THEME.errorRing : THEME.inputFocusRing} transition-all`;
  
  const labelClass = `block ${THEME.labelSize} ${THEME.labelWeight} ${THEME.labelText} mb-2`;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            {...register(name, rules)}
            className={`${inputClass} resize-none`}
            rows="3"
            {...props}
          />
        );
      case 'select':
        return (
          <select id={name} {...register(name, rules)} className={inputClass} {...props}>
            {props.children}
          </select>
        );
      default:
        return (
          <input
            id={name}
            type={type}
            {...register(name, rules)}
            className={inputClass}
            {...props}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {renderInput()}
      <ErrorMessage message={errors[name]?.message} />
    </div>
  );
}