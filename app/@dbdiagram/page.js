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

    const {entities} = useDBMLContext();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    useEffect(() => {
        const newNodes = entities.reduce((prev,current) => {
            if(nodes.some(item => item.id === current)) return prev;
            

            return [...prev, {id: current,
                type: "entity",
                data: {name: current},
                position: {x:0, y:0},
                dragHandle: '.custom-drag-heading'}]
        }, [])

        
        setNodes(prev => [...prev, ...newNodes])
    }, [entities])

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