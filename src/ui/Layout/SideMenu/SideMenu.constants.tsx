import { IconsEnum } from '@components/SvgIcon';
import { routes } from '@views/routes';

export const navItems = [
  {
    heading: 'SUBJECTS',
    links: [
      {
        link: routes.tokens(),
        text: 'Tokens',
        icon: IconsEnum.tokens,
      },
      {
        link: routes.game(),
        text: 'Game',
        icon: IconsEnum.game,
        disabled: true,
      },
      {
        link: routes.nft(),
        text: 'NFT',
        icon: IconsEnum.nft,
        disabled: true,
      },
      {
        link: routes.fund(),
        text: 'Fund',
        icon: IconsEnum.fund,
        disabled: true,
      },
      {
        link: routes.account(),
        text: 'Account',
        icon: IconsEnum.account,
        disabled: true,
      },
    ],
  },
  {
    heading: 'PEER 2 PEER',
    links: [],
    disabled: true,
  },
  {
    heading: 'CUSTOM SCORE',
    links: [],
    disabled: true,
  },
  {
    heading: 'API',
    links: [],
    disabled: true,
  },
  {
    heading: 'SETTINGS',
    links: [],
    disabled: true,
  },
];
