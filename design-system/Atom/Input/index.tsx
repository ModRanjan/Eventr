import React from 'react';

type InputProps={
  label?:string;
  type:React.HTMLInputTypeAttribute;
  id?:string;
  placeholder?:string;
  onChange:()=>void;
  error?:boolean;
  errorMsg?:string;
  inputRef?:any;
}

export const Input = ({
  label,
  type,
  id,
  placeholder,
  onChange,
  error,
  errorMsg,
  inputRef,
}:InputProps) => {
  const className = [
    'bg-transparent',
    'border-2 border-gray-400',
    'w-50',
    'text-lg',
    error && 'border-red-500 outline-red-500',
  ].join(' ');
  return (
    <div className="space-y-1 font-semibold ">
      <h3 className="mb-2">{label}</h3>
      <input
        type={type}
        id={id}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        ref={inputRef}
      />
      {error && <h1 className="inline text-xs text-red-500">{errorMsg}</h1>}
    </div>
  );
};
