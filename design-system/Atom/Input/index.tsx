import React from 'react';

type InputProps = {
  customClasses?: string;
  error?: boolean;
  errorMsg?: string;
  display?: string;
  id?: string;
  inputRef?: any;
  label?: string;
  onChange: () => void;
  placeholder?: string;
  required?: boolean;
  textProperties?: string;
  type: React.HTMLInputTypeAttribute;
};

export const Input = ({
  customClasses,
  error,
  errorMsg,
  display,
  id,
  inputRef,
  label,
  onChange,
  placeholder,
  required,
  textProperties,
  type,
}: InputProps) => {
  const className = [
    'block',
    'border border-gray-300',
    display ? display : 'inline-flex items-center justify-center',
    error && 'border-red-500 outline-red-500',
    'focus:ring-sky-500 focus:border-sky-500',
    'outline-0',
    'px-2 py-1.5 ',
    'rounded-md',
    'shadow-sm',
    textProperties ? textProperties : 'text-sm font-normal',
    'w-full',
  ].join(' ');

  return (
    <div className="space-y-1 font-semibold ">
      <h3 className="mb-2">{label}</h3>
      <input
        type={type}
        id={id}
        className={customClasses || className}
        placeholder={placeholder}
        onChange={onChange}
        ref={inputRef}
      />
      {error && <h1 className="inline text-xs text-red-500">{errorMsg}</h1>}
    </div>
  );
};
