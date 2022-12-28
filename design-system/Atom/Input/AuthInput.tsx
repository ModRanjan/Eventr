import { Field, ErrorMessage } from 'formik';

type AuthInputProps = {
  customClasses?: string;
  display?: string;
  disabled?: boolean;
  name: string;
  label: string;
  labelClasses?: string;
  placeholder?: string;
  textProperties?: string;
  type: React.HTMLInputTypeAttribute;
  width?: string;
  options?: string[];
};

export const AuthInput = ({
  customClasses,
  labelClasses,
  display,
  disabled,
  name,
  label,
  placeholder,
  textProperties,
  type,
  width,
  options,
}: AuthInputProps) => {
  const className = [
    'block',
    'border border-gray-300',
    display ? display : 'inline-flex items-center justify-center',
    disabled && 'disabled cursor-pointer disabled:opacity-50 border-2',
    'focus:outline-none focus:ring-blue-500 focus:border-blue-500',
    'outline-0',
    'px-2 py-1 sm:px-3 sm:py-2',
    'rounded-md',
    'shadow-sm',
    textProperties
      ? textProperties
      : 'font-Roboto sm:text-base placeholder-gray-400 text-sm',
    width ? width : 'w-full',
  ].join(' ');

  const CustomField = (type: string, options?: string[]) => {
    switch (type) {
      case 'input':
        return (
          <>
            <Field
              className={customClasses || className}
              as="input"
              id={name}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
            />

            <ErrorMessage
              className="text-sm font-light text-red-500 outline-red-500"
              component="span"
              name={name}
            />
          </>
        );

      case 'select': {
        return (
          <>
            <Field className={customClasses} as="select" id={name} name={name}>
              {options !== undefined &&
                options.map((option: string) => {
                  return (
                    <option
                      className="text-2xl font-Roboto hover:bg-gray-400 active:text-white"
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  );
                })}
            </Field>

            <ErrorMessage
              className="text-sm font-light text-red-500 outline-red-500"
              component="span"
              name={name}
            />
          </>
        );
      }

      default:
        return (
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
                    disabled={disabled}
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
        );
        break;
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        // disabled && 'text-gray-400'
        <label
          htmlFor={name}
          className={labelClasses || `mb-1 text-xs font-bold uppercase`}
        >
          {label}
        </label>
      )}

      {CustomField(type, options)}
    </div>
  );
};
