import { Handle, Position } from '@xyflow/react';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

export interface ButtonNodeProps {
  id: string
  data: any
}

export function ButtonNode({id, data}: ButtonNodeProps) {

  return (
    <div className="rounded-md bg-white shadow-md h-[100px] w-[100px]">
      <Handle type="target" position={Position.Top} />
      <p className='rounded-md text-blue-500 text-center font-bold'>按钮节点</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
