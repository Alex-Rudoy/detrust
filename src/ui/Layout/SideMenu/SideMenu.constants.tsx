import { routes } from '@/views/routes';

export const navItems = [
  {
    heading: 'SUBJECTS',
    links: [
      {
        link: routes().tokens,
        text: 'TOKEN',
      },
      {
        link: routes().game,
        text: 'GAME',
        disabled: true,
      },
      {
        link: routes().nft,
        text: 'NFT',
        disabled: true,
      },
      {
        link: routes().fund,
        text: 'FUND',
        disabled: true,
      },
      {
        link: routes().account,
        text: 'ACCOUNT',
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
