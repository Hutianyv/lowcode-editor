import { Button, Space, message } from 'antd';
import { useState } from 'react';
import FlowEditor from './FlowEditor/index';
import { useComponetsStore } from '../stores/components';
import { ShareAltOutlined } from '@ant-design/icons';
import  copy  from 'copy-to-clipboard'

export function Header() {

  const { mode, setMode, setCurComponentId } = useComponetsStore();
  const [ flowModalOpen, setFlowModalOpen ] = useState(false);
  
  return (
    <>
    <div className='w-[100%] h-[100%]'>
      <div className='h-[60px] flex justify-between items-center px-[20px]'>
        <div className='text-[20px] font-bold text-blue-600' style={{'userSelect': 'none'}}>codeLego 低代码编辑器</div>
        <Space>
          {mode === 'edit' && (
            <>
            <ShareAltOutlined style={{marginRight: '10px'}}
              onClick={() => {
                copy(window.location.href);
                message.success('分享链接已复制！');
              }}
            />
            <Button
                onClick={() => {
                    setCurComponentId(null);
                    setFlowModalOpen(true);
                }}
                type='primary'
            >
                逻辑编排
            </Button>
            <Button
                onClick={() => {
                    setMode('preview');
                    setCurComponentId(null);
                }}
                type='primary'
            >
                预览
            </Button>
            </>
          )}
          {mode === 'preview' && (
            <Button
              onClick={() => { setMode('edit') }}
              type='primary'
            >
              退出预览
            </Button>
          )}
        </Space>
      </div>
    </div>
    <FlowEditor
      visible={flowModalOpen}
      handleOk={() => setFlowModalOpen(false)}
      handleCancel={() => setFlowModalOpen(false)}
    />
    </>
  )
}
