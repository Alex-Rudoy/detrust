import React from 'react';
import { BadgeDelta } from '.';
import { StorybookContainer } from '@components/StorybookContainer';

export default {
  title: 'Components/Badge Delta',
  component: BadgeDelta,
};

const Template = (args) => {
  return (
    <StorybookContainer>
      <BadgeDelta {...args} />
    </StorybookContainer>
  );
};

export const badgeDelta = Template.bind({});
badgeDelta.args = {
  value: 5.6,
  percent: true,
};
