import { FaSpinner } from 'react-icons/fa';

export const Spinner = ({ className }: { className: string }) => {
  return (
    <FaSpinner
      className={className}
      style={{ verticalAlign: 'middle' }}
      role="status"
    />
  );
};
