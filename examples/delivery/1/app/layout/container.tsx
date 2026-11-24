import type { ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';

export const Container = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={clsx(`mx-3 pb-20 lg:pb-0 xl:mx-auto xl:max-w-[85rem]`, className)} {...props}>
    {children}
  </div>
);
