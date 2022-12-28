import { Field, ErrorMessage } from 'formik';

type AuthInputProps = {
  border?: string;
  customClasses?: string;
  display?: string;
  name: string;
  label: string;
  labelClasses?: string;
  padding?: string;
  placeholder?: string;
  textProperties?: string;
  type: React.HTMLInputTypeAttribute;
  width?: string;
  options?: string[];
};
export const AuthInput = ({
  border,
  customClasses,
  labelClasses,
  display,
  name,
  label,
  padding,
  placeholder,
  textProperties,
  type,
  width,
  options,
}: AuthInputProps) => {
  const className = [
    border ? border : 'border border-gray-300',
    display ? display : 'inline-flex items-center justify-center',
    'focus:outline-none focus:ring-blue-500 focus:border-blue-500',
    'outline-0',
    padding ? padding : 'px-2 py-1 sm:px-3 sm:py-2',
    'rounded-md',
    'shadow-sm',
    textProperties
      ? textProperties
      : 'font-Roboto sm:text-base placeholder-gray-400 text-sm',
    width ? width : 'w-full',
  ].join(' ');

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="mb-1 font-medium text-gray-600">
          {label}
        </label>
      )}

      <Field
        className={customClasses || className}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />

      <ErrorMessage
        className="text-sm font-light text-red-500 outline-red-500"
        component="span"
        name={name}
      />
    </div>
  );
};
