import { IconsEnum } from '@/components/SvgIcon';
import { routes } from '@/views/routes';

export const navItems = [
  {
    heading: 'SUBJECTS',
    links: [
      {
        link: routes().tokens,
        text: 'Tokens',
        icon: IconsEnum.search,
      },
      {
        link: routes().game,
        text: 'Game',
        icon: IconsEnum.search,
        disabled: true,
      },
      {
        link: routes().nft,
        text: 'NFT',
        icon: IconsEnum.search,
        disabled: true,
      },
      {
        link: routes().fund,
        text: 'Fund',
        icon: IconsEnum.search,
        disabled: true,
      },
      {
        link: routes().account,
        text: 'Account',
        icon: IconsEnum.search,
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
