import { Handle, Position } from '@xyflow/react';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

export interface ContainerNodeProps {
  id: string
  data: any
}

export function ModalNode({id, data}: ContainerNodeProps) {

  return (
    <div className="rounded-md bg-white shadow-md h-[100px] w-[100px]">
      <Handle type="target" position={Position.Top} />
      <p className='rounded-md text-blue-500 text-center font-bold'>弹窗节点</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
