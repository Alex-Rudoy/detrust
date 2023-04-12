import React from 'react';
import classNames from 'classnames';

import { Badge, BadgeColorsEnum } from '@/components/Badge';
import { CustomImage } from '@/components/CustomImage';
import { IconsEnum, SvgIcon } from '@/components/SvgIcon';
import {
  CustomLink,
  FontWeightEnum,
  Text,
  TextSizeEnum,
} from '@/components/Text';
import logoImg from './logo-white-text.png';
import { navItems } from './SideMenu.constants';
import styles from './SideMenu.module.scss';

export const SideMenuComponent = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div
      className={classNames(styles.wrapper, { [styles.collapsed]: collapsed })}
    >
      <div className={styles.sideMenu}>
        <div className={styles.logoLine}>
          <CustomImage src={logoImg} alt="logo" fill className={styles.logo} />
        </div>
        {navItems.map((item) => (
          <div key={item.heading} className={styles.group}>
            <div className={styles.groupHeading}>
              <Text size={TextSizeEnum.S18} fontWeight={FontWeightEnum.FW600}>
                {item.heading}
              </Text>
              {item.disabled ? (
                <Badge color={BadgeColorsEnum.error} text="soon"></Badge>
              ) : null}
            </div>
            <div>
              {item.links.map((link) => (
                <div className={styles.linkRow} key={link.link}>
                  <CustomLink
                    href={link.link}
                    size={TextSizeEnum.S14}
                    fontWeight={FontWeightEnum.FW500}
                    disabled={link.disabled}
                  >
                    {link.text}
                  </CustomLink>
                  {link.disabled ? (
                    <Badge color={BadgeColorsEnum.error} text="soon"></Badge>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <SvgIcon
        src={IconsEnum.arrowChevron}
        size={24}
        rotate={collapsed ? '270' : '90'}
        onClick={() => setCollapsed(!collapsed)}
        className={styles.arrow}
      />
    </div>
  );
};

SideMenuComponent.displayName = 'SideMenu';
