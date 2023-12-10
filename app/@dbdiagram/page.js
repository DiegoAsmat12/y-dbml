'use client'
import EntityNode from "@/components/node/EntityNode";
import { useCallback, useState } from "react";
import ReactFlow, { Background, Controls, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import 'reactflow/dist/style.css';


const NodeTypes = {
    entity: EntityNode
}

const initialNodes = [
    {id: '1', type: 'entity', data: {name: "test"}, position: {x:0, y:0}}
]
export default function DBDiagram() {

    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState([]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );


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