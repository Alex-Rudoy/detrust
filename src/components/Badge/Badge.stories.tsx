import React from 'react';
import { Badge } from '.';
import { StorybookContainer } from '@components/StorybookContainer';
import { IconsEnum } from '@components/SvgIcon';
import { BadgeProps } from './Badge.types';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: [
        'gray',
        'primary',
        'error',
        'warning',
        'success',
        'blue-gray',
        'blue-light',
        'blue',
        'indigo',
        'purple',
        'pink',
        'rose',
        'orange',
      ],
    },
    iconPosition: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
    },
  },
};

const Template = ({
  showIcon,
  ...args
}: BadgeProps & { showIcon: boolean }) => {
  return (
    <StorybookContainer>
      <Badge icon={showIcon ? IconsEnum.search : null} {...args} />
    </StorybookContainer>
  );
};

export const badge = Template.bind({});
badge.args = {
  text: "I'm a badge with icon",
  color: 'primary',
  showIcon: true,
  iconPosition: 'left',
};
