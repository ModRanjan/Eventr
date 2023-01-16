import { CreateEventProcessType } from '@/config/CreateEventProcess';
import { FaCheck } from 'react-icons/fa';
import { Icon } from '../Icon';

type StatusItemProps = {
  item: CreateEventProcessType;
  pipeClass: string;
  circleClass: string;
  blinkclass: string;
  bodyClass: string;
};

export const StatusItem = ({
  item,
  pipeClass,
  circleClass,
  blinkclass,
  bodyClass,
}: StatusItemProps) => {
  return (
    <li key={item.title} className="relative pb-10">
      {!item.lastStep && <div className={pipeClass} />}

      <div className="relative flex items-start group">
        <span className="flex items-center h-9">
          <span className={circleClass}>
            {item.progress === 0 ? (
              <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
            ) : (
              <>
                <Icon className={blinkclass} icon={FaCheck} />
              </>
            )}
          </span>
        </span>

        <span className={bodyClass}>
          <span className="text-xs font-semibold tracking-wide uppercase">
            {item.title}
          </span>
          <span className="text-sm">{item.description}</span>
        </span>
      </div>
    </li>
  );
};
