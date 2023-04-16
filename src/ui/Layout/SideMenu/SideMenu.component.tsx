import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { Badge, BadgeColorsEnum } from '@components/Badge';
import { Scrolling } from '@components/Scrolling';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { navItems } from './SideMenu.constants';
import { SideMenuProps } from './SideMenu.types';

import styles from './SideMenu.module.scss';

export const SideMenuComponent = ({
  activeMenuLink = 'Tokens',
}: SideMenuProps) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={classNames(styles.wrapper, { [styles.collapsed]: collapsed })}
    >
      <Scrolling
        vertical
        className={classNames(styles.sideMenu, {
          [styles.collapsed]: collapsed,
        })}
      >
        <div className={styles.content}>
          {navItems.map((item) => (
            <div key={item.heading} className={styles.group}>
              <div className={styles.groupHeading}>
                <Text size={TextSizeEnum.S10} fontWeight={FontWeightEnum.FW600}>
                  {item.heading}
                </Text>
                {item.disabled ? (
                  <Badge color={BadgeColorsEnum.error} text="soon"></Badge>
                ) : null}
              </div>
              <div>
                {item.links.map((link) => (
                  <Link
                    href={link.disabled ? '#' : link.link}
                    key={link.link}
                    className={classNames(styles.linkRow, {
                      [styles.active]: activeMenuLink === link.text,
                      [styles.disabled]: link.disabled,
                    })}
                  >
                    <SvgIcon src={link.icon} size={16} />
                    <Text
                      size={TextSizeEnum.S14}
                      fontWeight={FontWeightEnum.FW500}
                      className={styles.link}
                    >
                      {link.text}
                    </Text>
                    {link.disabled ? (
                      <Badge
                        color={BadgeColorsEnum.error}
                        text="soon"
                        className={styles.badge}
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Scrolling>
      <div className={styles.arrow}>
        <SvgIcon
          src={IconsEnum.arrowChevron}
          size={24}
          rotate={collapsed ? '270' : '90'}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    </div>
  );
};

SideMenuComponent.displayName = 'SideMenu';
