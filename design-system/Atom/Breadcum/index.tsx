import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { RouteLabelMap } from '@/config/routes';
import { IBreadCrumb } from '@/redux/user/types';

/**
 *
 * @param segments: string[] when segments = ['1','2','3']
 * @returns  ['1','1/2','1/2/3']
 */
function CombineAccumulatively(segments: string[]) {
  const links = segments.reduce((acc: string[], cur, curIndex) => {
    const last = curIndex > 1 ? acc[curIndex - 1] : '';
    const newPath = last + '/' + cur;

    acc.push(newPath);

    return acc;
  }, []);

  return links;
}

export const Breadcrumb = () => {
  const router = useRouter();
  const [crumbs, setCrumbs] = useState<IBreadCrumb[]>([]);

  useEffect(() => {
    const segmentsPath = router.asPath.split('/');
    const segmentsRoute = router.route.split('/');
    const crumbLinks = CombineAccumulatively(segmentsPath);
    const crumbLabels = CombineAccumulatively(segmentsRoute);

    const crumbs = crumbLinks.map((link, index) => {
      const route = crumbLabels[index];

      const crumb: IBreadCrumb = {
        link: link,
        route: route,
        label: RouteLabelMap[route] || route,
      };

      return crumb;
    });

    setCrumbs(crumbs);
  }, [router.route]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        {crumbs.map((crumb, index) => (
          <li
            key={crumb.label + index}
            className={`flex items-center gap-x-0.5 ${
              index > 0 ? 'visible' : 'hidden'
            }`}
          >
            {index > 0 && <span className="text-3xl text-gray-400">/</span>}

            <Link href={crumb.link} passHref>
              <span
                className={`${
                  index === crumbs.length - 1
                    ? 'text-blue-500 pointer-events-none opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                } h-full overflow-hidden text-xs font-medium sm:ml-2 sm:text-sm hover:text-gray-700 overflow-ellipsis whitespace-nowrap`}
              >
                {crumb.label}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
