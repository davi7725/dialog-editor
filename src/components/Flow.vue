<script lang="ts" setup>
import Controls from './Controls.vue'
import { VueFlow, Elements, useVueFlow, BackgroundVariant, Background, MiniMap, EdgeChange, NodeChange } from '@braks/vue-flow'
import Sidebar from './Sidebar.vue'
import NPCNode from './NPCNode.vue'
import PlayerNode from './PlayerNode.vue'
import { Ref } from 'vue'

import * as types from '../types'

const initialElements: Elements = []


let id = 0
const getId = () => `node_${id++}`

const { instance, onConnect, nodes, edges, addEdges, addNodes, onEdgesChange, onNodesChange } = useVueFlow()

let selectedDialogIndex : Ref<number | null> = ref(null)

const getNodeID = () :number | null => {
  if(Scenario.value != null && selectedDialogIndex.value != null)
  {
    return Scenario.value.conversations[selectedDialogIndex.value].nodes.length + 1
  }
  return null;
}

onNodesChange((params) =>
{
  params.forEach((value: NodeChange) => {
    if(Scenario.value != null && selectedDialogIndex.value != null)
    {
      if(value.type === 'position')
      {
        let index = Scenario.value.conversations[selectedDialogIndex.value as number].nodes.findIndex(function(el) {return el.id == value.id});
        if(index >= 0)
        {
          Scenario.value.conversations[selectedDialogIndex.value as number].nodes[index].position.x = value.position?.x as number
          Scenario.value.conversations[selectedDialogIndex.value as number].nodes[index].position.y = value.position?.y as number
        }
      }
      else if(value.type === 'remove')
      {
        let index = Scenario.value.conversations[selectedDialogIndex.value as number].nodes.findIndex(function(el) {return el.id == value.id});
        Scenario.value.conversations[selectedDialogIndex.value as number].nodes.splice(index, 1)
      }
    }
  })
})

onEdgesChange((params) =>
{
  params.forEach((value: EdgeChange) => {
    if(value.type === 'remove' && Scenario.value != null && selectedDialogIndex.value != null)
    {
      let index = Scenario.value.conversations[selectedDialogIndex.value as number].edges.findIndex(function(el) {return el.id == value.id});
      Scenario.value.conversations[selectedDialogIndex.value as number].edges.splice(index, 1)
    }
  })
})

onConnect((params) => {
  addEdges([params])
  if(Scenario.value != null && selectedDialogIndex.value != null)
  {
    let id = "edge-" + params.source + params.sourceHandle + "-" + params.target + params.targetHandle
    Scenario.value.conversations[selectedDialogIndex.value as number].edges.push(new types.ConversationEdge(id,params.source as string,params.target as string,params.sourceHandle as string,params.targetHandle as string))
  }
})

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onChange = (event: Event) => {
  /*elements.value.forEach((e) => {
    if (isEdge(e) || e.id !== '2') return e
    bgColor.value = (event.target as HTMLInputElement).value
  })*/
}

const onDrop = (event: DragEvent) => {
  if (instance.value) {
    const type = event.dataTransfer?.getData('application/vueflow') as string
    const nodeClass = event.dataTransfer?.getData('application/nodeClass') as string
    const npcName = event.dataTransfer?.getData('application/npcName') as string
    const position = instance.value.project({ x: event.clientX, y: event.clientY - 40 })
    const newNode = {
      id: getId(),
      type,
      class: nodeClass,
      data: {onChange, onConnect, name:npcName, texts:[], playerType: nodeClass},
      connectable: true,
      position,
      label: `${type} node`,
    } as unknown as Node
    addNodes([newNode])

    let nodeId = "node" + getNodeID()
    let node = new types.ConversationNode(nodeId, new types.NodePosition(event.clientX, event.clientY -40), type, nodeClass, new types.NodeData(npcName, nodeClass,[]))
    Scenario.value?.conversations[selectedDialogIndex.value as number].nodes.push(node)
  }
}

const nodeTypes = {
  npcNode: markRaw(NPCNode),
  playerNode: markRaw(PlayerNode),
}

const Scenario: Ref<types.Scenario | null> = ref(null)

const jsonFileLoaded = (scenario : types.Scenario) => {
  Scenario.value = scenario
  
  selectedDialogIndex.value = null
}

const dialogSelected = (index: number) => {
  selectedDialogIndex.value = index
}

const elements = ref(initialElements)
</script>
<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow v-model="elements" @dragover="onDragOver" :node-types="nodeTypes">
      <Background :variant="BackgroundVariant.Lines" pattern-color="#4d4d4d" gap="25" />
      <Controls :scenario=Scenario v-on:json-file-loaded="jsonFileLoaded" />
      <Sidebar :scenario=Scenario v-on:dialog-selected="dialogSelected" />
    </VueFlow>
  </div>
</template>
