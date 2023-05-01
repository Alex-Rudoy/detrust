import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { Badge, BadgeColorsEnum } from '@components/Badge';
import { Scrolling } from '@components/Scrolling';
import { Skeleton } from '@components/Skeleton';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { routes } from '@views/routes';
import { navItems } from './SideMenu.constants';

import { useGroupsSelector } from '@store/degens/groups/useGroupsSelector';
import { useDegensActions } from '@store/degens/useDegensActions';

import { requestStatusEnum } from '@typings/requestStatus';

import { SideMenuProps } from './SideMenu.types';

import styles from './SideMenu.module.scss';

export const SideMenuComponent = ({ activeMenuLink }: SideMenuProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { groups, status } = useGroupsSelector();
  const { fetchGroupsAction } = useDegensActions();

  useEffect(() => {
    if (status === requestStatusEnum.INITIAL) {
      fetchGroupsAction();
    }
  }, []);

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
                <Text
                  size={TextSizeEnum.S10}
                  fontWeight={FontWeightEnum.FW700}
                  className={styles.headingName}
                >
                  {item.heading}
                </Text>
                {item.disabled ? (
                  <Badge color={BadgeColorsEnum.gray} text="Soon"></Badge>
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
                    <Text size={TextSizeEnum.S14} className={styles.link}>
                      {link.text}
                    </Text>
                    {link.disabled ? (
                      <Badge
                        color={BadgeColorsEnum.gray}
                        text="Soon"
                        className={styles.badge}
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.group}>
            <div className={styles.groupHeading}>
              <Text
                size={TextSizeEnum.S10}
                fontWeight={FontWeightEnum.FW700}
                className={styles.headingName}
              >
                GROUPS
              </Text>
            </div>
            <div>
              {status !== requestStatusEnum.SUCCESS
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className={styles.groupsSkeleton} />
                    ))
                : groups.map((group) => (
                    <Link
                      href={routes.groupPage(group.category_id)}
                      key={group.category_id}
                      className={classNames(styles.linkRow, {
                        [styles.active]: activeMenuLink === group.category,
                      })}
                    >
                      {/* <SvgIcon src={link.icon} size={16} /> */}
                      <Text size={TextSizeEnum.S14} className={styles.link}>
                        {group.category}
                      </Text>
                    </Link>
                  ))}
            </div>
          </div>
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
