import { Modal } from "antd";
import { useState, useEffect } from "react";
import { useComponetsStore, getComponentById, Component } from "../../stores/components";
import { addEdge, Connection, OnConnect, ReactFlow, useEdgesState, useNodesState, Controls, MiniMap, Background, Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ComponentMethod } from '..//setting/actions/ComponentMethod '
import  { ButtonNode }  from '../../Node/ButtonNode'
import  { ModalNode }  from '../../Node/ModalNode'



export interface FlowModalProps {
  visible: boolean
  action?: any
  handleOk: () => void
  handleCancel: () => void
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];


export default function FlowEditor(props: FlowModalProps) {
  const {
    visible,
    handleOk,
    handleCancel
} = props;

const { components } = useComponetsStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [ ActionModalOpen, setActionModalOpen ] = useState(false);
//  有问题，因为components并不是扁平化的，它里面有children需要处理，一层层嵌套，直接遍历肯定是不行，这里是一个难点

function getFlowNodesFromComponent(component: Component) {
  const nodes = [];
  // 检查当前组件是否需要转换为节点
  if (component.flowEdit) {
    nodes.push({
      id: component.id.toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // 随机位置，你可以根据需求调整
      data: { label: component.desc }, // 使用 desc 作为 label
      type: component.name // 使用 name 作为节点类型
    });
  }

  // 如果组件有 children，递归处理
  if (component.children && component.children.length > 0) {
    component.children.forEach(child => {
      nodes.push(...getFlowNodesFromComponent(child)); // 递归遍历子组件
    });
  }

  return nodes;
}
useEffect(() => {
  // 定义递归函数

  // 遍历所有 components，生成 flowNodes
  const flowNodes = components.flatMap(component => getFlowNodesFromComponent(component));

  // 设置生成的节点
  setNodes(flowNodes);

  console.log(flowNodes); // 输出节点数据以调试
}, [components]); // 依赖 components 数组的变化


  const onConnect = (params: Connection) => {
    const isEdgeExist = edges.some(edge => edge.source === params.source && edge.target === params.target);
    if (!isEdgeExist) {
      setEdges((eds) => addEdge(params, eds));
      setActionModalOpen(true);
    }
  };
  

  return <Modal
        title="页面逻辑编排"
        width={1200}
        open={visible}
        okText="确认"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
  >
    <div className="h-[490px] border-2 border-gray-500">
      <ReactFlow 
       nodes={nodes}
       edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       onConnect={onConnect}
       nodeTypes={{
        Button: ButtonNode,
        Modal: ModalNode
       }}
      >
        <Controls />
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
    {ActionModalOpen && (
    <Modal
      title="组件联动"
      width={600}
      open={ActionModalOpen}
      okText="确认"
      cancelText="取消"
      onOk={() => setActionModalOpen(false)}
      onCancel={() => setActionModalOpen(false)}
  >
     <ComponentMethod />
   </Modal>
       )}
    </Modal>;
}