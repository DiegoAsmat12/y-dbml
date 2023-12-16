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
        const newNodes = entities.map(value => ({
            id: value,
            type: "entity",
            data: {name: value},
            position: {x:0, y:0},
            dragHandle: '.custom-drag-heading'
        }))


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