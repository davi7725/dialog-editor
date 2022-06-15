<script lang="ts" setup>
import Controls from './Controls.vue'
import { VueFlow, Elements, useVueFlow, BackgroundVariant, Background, MiniMap, EdgeChange, NodeChange, CoordinateExtent,useZoomPanHelper } from '@braks/vue-flow'
import Sidebar from './Sidebar.vue'
import NPCNode from './NPCNode.vue'
import PlayerNode from './PlayerNode.vue'
import { Ref } from 'vue'
import * as types from '../types'

const initialElements: Elements = []
const { setTransform } = useZoomPanHelper()


const { instance, onConnect, nodes, edges, addEdges, addNodes,setNodes, setEdges, onEdgesChange, onNodesChange, setTranslateExtent, setState, store } = useVueFlow()

let id = 0
const getId = () => `node${id++}`
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
  edges.value.forEach((e: any) => {
    delete e.selected
  });
  
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
      /*else if(value.type === 'select' && value.selected)
      {
        let index = Scenario.value.conversations[selectedDialogIndex.value as number].nodes.findIndex(function(el) {return el.id == value.id});
        Scenario.value.conversations[selectedDialogIndex.value as number].nodes[index].data.fullfilsQuest = !Scenario.value.conversations[selectedDialogIndex.value as number].nodes[index].data.fullfilsQuest
      }*/
    }
  })
})

onEdgesChange((params) =>
{
  nodes.value.forEach((n: any) => {
    delete n.selected
  });
  
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
    if(type == "")
      return
    
    const nodeId = getId()
    const texts: Array<types.ResponseQuest> = []
    const triggers: Array<types.NodeTrigger> = []
    const questId: number = -1
    const nodeClass = event.dataTransfer?.getData('application/nodeClass') as string
    const npcName = event.dataTransfer?.getData('application/npcName') as string
    const position = instance.value.project({ x: event.clientX, y: event.clientY - 40 })

    const newNode = {
      id: nodeId,
      type,
      class: nodeClass,
      data: {onChange, onConnect, name:npcName, texts:texts, playerType: nodeClass, questId: questId, quests: Scenario.value?.quests,},
      connectable: true,
      position,
      label: `${type} node`,
    } as unknown as Node
    addNodes([newNode])

    let node = new types.ConversationNode(nodeId, new types.NodePosition(event.clientX, event.clientY -40), type, nodeClass, new types.NodeData(npcName, nodeClass,texts, triggers, false, questId))
    Scenario.value?.conversations[selectedDialogIndex.value as number].nodes.push(node)
  }
}

const nodeTypes = {
  npcNode: markRaw(NPCNode),
  playerNode: markRaw(PlayerNode),
}

const Scenario: Ref<types.Scenario | null> = ref(null)
const Filename: Ref<string | null> = ref(null)

const sideBar : Sidebar | null = ref(null);

const jsonFileLoaded = (data : any) => {
  Scenario.value = null
  Scenario.value = data.scenario
  Filename.value = null
  Filename.value = data.filename

  Scenario.value?.conversations.forEach((convo: types.Conversation) => {
    convo.nodes.forEach((node: any) => {
      if(node.type == "playerNode")
      {
        node.data.quests = Scenario.value?.quests;
      }
    })
  })

  Scenario.value?.quests.forEach((q: any) => 
  {
    q.solved = false;
  })

  const questSolved = new Map<number, boolean>();
  Scenario.value?.conversations.forEach((convo: types.Conversation) =>
  {
    convo.nodes.forEach(( node: types.ConversationNode) => {
      let solves = false;
      node.data.texts.forEach((text: types.ResponseQuest) => 
      {
        if(text.solvesQuest)
        {
          solves = true;
        }
      })

      if(solves)
        questSolved.set(node.data.questId, true)
    })
  })
  Scenario.value?.quests.forEach((q: types.QuestData) =>
  {
    if(questSolved.get(q.id) == true)
    {
      q.solved = true;
    }
    else
    {
      q.solved = false;
    }
  })

  
  selectedDialogIndex.value = null
  sideBar.value?.reset();
}

const dialogSelected = (index: number) => {
  selectedDialogIndex.value = index
  //id = Number(Scenario.value?.conversations[index].nodes.length) + 1;

  let biggestId = 0;
  Scenario.value?.conversations[index].nodes.forEach((item, index) => {
    (Number(item.id.substring(4)) > biggestId)
    biggestId = Number(item.id.substring(4))
  })

  id = biggestId + 1;

  const node = Scenario.value?.conversations[index].nodes[0]

  const xpos = Number(node?.position.x)
  const ypos = Number(node?.position?.y)

   setTransform({ x: xpos + 200 || 0, y:ypos + 200 || 0, zoom: 1 })
}

const elements = ref(initialElements)
</script>
<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow v-model="elements" @dragover="onDragOver" :node-types="nodeTypes">
      <Background :variant="BackgroundVariant.Lines" pattern-color="#4d4d4d" gap="25" />
      <Controls :scenario=Scenario v-on:json-file-loaded="jsonFileLoaded" />
      <Sidebar :scenario=Scenario :filename=Filename v-on:dialog-selected="dialogSelected" ref="sideBar"/>
    </VueFlow>
  </div>
</template>
