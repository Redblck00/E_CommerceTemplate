import React from 'react';
import { Button, Flex } from 'antd';

export default function useButton() {
  return (
  <Flex gap="Large" wrap>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Flex>
);
}
