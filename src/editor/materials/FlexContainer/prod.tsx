import { CommonComponentProps } from '../../interface';
import { Flex } from 'antd';

export function FlexContainer({id, children, vertical, gap, flex, wrap, justify, align, styles}: CommonComponentProps) {
 

  return (
    <Flex
      data-component-id={id}
      className={'p-[20px]'}
      style={styles}
      vertical={vertical}
      gap={gap}
      wrap={wrap}
      justify={justify}
      align={align}
      flex={flex}
    >
      {children}
    </Flex>
  );
}

export default FlexContainer;