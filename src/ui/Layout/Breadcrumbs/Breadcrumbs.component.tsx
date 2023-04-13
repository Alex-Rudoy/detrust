import { Fragment } from 'react';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { BreadcrumbsProps } from './Breadcrumbs.types';

import styles from './Breadcrumbs.module.scss';

export const BreadcrumbsComponent = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={breadcrumb}>
          <Text size={TextSizeEnum.S32} fontWeight={FontWeightEnum.FW600}>
            {breadcrumb}
          </Text>
          {index !== breadcrumbs.length - 1 && (
            <SvgIcon src={IconsEnum.arrowChevron} size={12} rotate="270" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

BreadcrumbsComponent.displayName = 'Breadcrumbs';
