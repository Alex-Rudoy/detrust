import Link from 'next/link';

import { Avatar } from '@components/Avatar';
import { CustomImage } from '@components/CustomImage';
import { CustomTooltip } from '@components/CustomTooltip';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { Text, TextSizeEnum } from '@components/Text';
import { DropdownBase } from '@ui/Dropdown/DropdownBase';
import { DropdownItem } from '@ui/Dropdown/DropdownItem';
import { routes } from '@views/routes';
import logoImg from './logo-white-text.png';

import styles from './Header.module.scss';

export const HeaderComponent = () => {
  return (
    <div className={styles.header}>
      <Link href={routes.tokens()}>
        <CustomImage src={logoImg} alt="logo" fill className={styles.logo} />
      </Link>

      <a
        href="https://www.detrust.me/"
        target="_blank"
        rel="noreferrer noopener"
        className={styles.headerLink}
      >
        <Text size={TextSizeEnum.S14}>Landing page</Text>
      </a>

      <div className={styles.divider}></div>

      <DropdownBase
        caller={
          <div className={styles.avatarContainer}>
            <Text size={TextSizeEnum.S14}>Nazar</Text>
            <Avatar name="Nazar" src={'/images/temp_avatar.jpg'} />
            <SvgIcon src={IconsEnum.arrowChevron} size={14} />
          </div>
        }
      >
        <DropdownItem
          icon={IconsEnum.account}
          text={'Account'}
          className={styles.dropdownItem}
          data-tooltip-id={'header_dropdown_account'}
          data-tooltip-content={'Coming soon'}
        />
        <CustomTooltip data-tooltip-id={'header_dropdown_account'} />

        <DropdownItem
          icon={IconsEnum.settings}
          text={'Settings'}
          className={styles.dropdownItem}
          data-tooltip-id={'header_dropdown_settings'}
          data-tooltip-content={'Coming soon'}
        />
        <CustomTooltip data-tooltip-id={'header_dropdown_settings'} />

        <DropdownItem
          icon={IconsEnum.logout}
          text={'Log out'}
          className={styles.dropdownItem}
          data-tooltip-id={'header_dropdown_logout'}
          data-tooltip-content={'Coming soon'}
        />
        <CustomTooltip data-tooltip-id={'header_dropdown_logout'} />
      </DropdownBase>
    </div>
  );
};

HeaderComponent.displayName = 'Header';
