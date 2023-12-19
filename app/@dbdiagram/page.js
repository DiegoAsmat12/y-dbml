'use client'
import EntityNode from "@/components/node/EntityNode";
import { useDBMLContext } from "@/contexts/global/DBMLContext";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, Controls, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css';


const NodeTypes = {
    entity: EntityNode
}

const initialNodes = [
    {id: '1', type: 'entity', data: {name: "Potential Entity"}, position: {x:0, y:0}, dragHandle: '.custom-drag-heading'}
]
export default function DBDiagram() {

    const {dynamicNodes} = useDBMLContext();
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    useEffect(() => {
        const newNodes = dynamicNodes.reduce((prev,{entity, parentEntity, properties}) => {
            let node = nodes.find(item => item.id === entity);
            if(node?.id){
                return [...prev, {...node, data: {entity, parentEntity, properties}}];
            }
            

            return [...prev, {id: entity,
                type: "entity",
                data: {entity, parentEntity, properties},
                position: {x:0, y:0},
                dragHandle: '.custom-drag-heading'}]
        }, [])

        
        setNodes(prev => [...prev, ...newNodes])
    }, [dynamicNodes])

    return (
        <ReactFlow className="h-full w-full col-span-3 bg-[#ccc]"
            nodeTypes={NodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        >
            <Background color="#000" gap={16} />
            
            <Controls/>
        </ReactFlow>
    )
}