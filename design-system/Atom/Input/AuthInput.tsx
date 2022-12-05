import { Field, ErrorMessage } from 'formik';

type AuthInputProps = {
  customClasses?: string;
  display?: string;
  name: string;
  label: string;
  placeholder?: string;
  textProperties?: string;
  type: React.HTMLInputTypeAttribute;
};

export const AuthInput = ({
  customClasses,
  display,
  name,
  label,
  placeholder,
  textProperties,
  type,
}: AuthInputProps) => {
  const className = [
    'block',
    'border border-gray-300',
    display ? display : 'inline-flex items-center justify-center',
    'focus:ring-sky-500 focus:border-sky-500',
    'outline-0',
    'px-2 py-1',
    'rounded-md',
    'shadow-sm',
    textProperties ? textProperties : 'text-gray-600 text-sm font-normal',
    'w-full',
  ].join(' ');

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="mb-1 font-medium text-gray-600">
          {label}
        </label>
      )}

      <Field name={name}>
        {(props: any) => {
          const { field, form, meta } = props;

          return (
            <>
              <input
                className={customClasses || className}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                {...field}
              />

              <ErrorMessage
                className="text-sm font-light text-red-500 outline-red-500"
                component="span"
                name={name}
              />
            </>
          );
        }}
      </Field>
    </div>
  );
};
