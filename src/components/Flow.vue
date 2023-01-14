<script lang="ts" setup>
import Controls from './Controls.vue'
import { VueFlow, Elements, useVueFlow, EdgeChange, NodeChange } from '@vue-flow/core'
import { Background, BackgroundVariant } from '@vue-flow/background'
import Sidebar from './Sidebar.vue'
import NPCNode from './NPCNode.vue'
import PlayerNode from './PlayerNode.vue'
import { Ref } from 'vue'
import * as types from '../types'

let initialElements: Map<number, Elements> = new Map<number, Elements>()


const { project, onConnect, nodes, edges, addEdges, addNodes,setNodes, setEdges, onEdgesChange, onNodesChange, setTranslateExtent, setState, store, setTransform } = useVueFlow()

let id = 0
const getId = () => `node${selectedDialogIndex.value}-${id++}`
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
          let n = Scenario.value.conversations[selectedDialogIndex.value as number].nodes[index].position;
          console.log("old "+n.x+"-"+n.y);
          
          if(value.position?.x != undefined && value.position?.y != undefined)
            Scenario.value.conversations[selectedDialogIndex.value as number].nodes[index].position = new types.NodePosition(value.position?.x as number, value.position?.y as number)

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
    const type = event.dataTransfer?.getData('application/vueflow') as string
    if(type == "")
      return
    
    const nodeId = getId()
    const texts: Array<types.ResponseQuest> = []
    const triggers: Array<types.NodeTrigger> = []
    const questId: types.QuestId = new types.QuestId(-1)
    const nodeClass = event.dataTransfer?.getData('application/nodeClass') as string
    const npcName = event.dataTransfer?.getData('application/npcName') as string
    const position = project({ x: event.clientX, y: event.clientY - 40 })

    const newNode = {
      id: nodeId,
      type,
      class: nodeClass,
      data: {onChange, onConnect, name:npcName, texts:texts, playerType: nodeClass, questId: questId, quests: Scenario.value?.quests},
      connectable: true,
      position,
      label: `${type} node`,
    } as unknown as Node
    addNodes([newNode])

    console.log(newNode)

    let node = new types.ConversationNode(nodeId, new types.NodePosition(position.x, position.y), type, nodeClass, new types.NodeData(npcName, nodeClass,texts, triggers, false, questId))
    node.data.quests = Scenario.value?.quests;
    Scenario.value?.conversations[selectedDialogIndex.value as number].nodes.push(node)
    
    console.log(node)
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

  initialElements.clear()

  if(Scenario.value?.conversations == undefined)
  {
    Scenario.value!.conversations = new Array<types.Conversation>();
  }

  Scenario.value?.conversations.forEach((convo: types.Conversation) => {
    convo.nodes.forEach((node: any, index: number) => {
      initialElements.set(index, [])
      if(node.type == "playerNode")
      {
        node.data.quests = Scenario.value?.quests;
      }
    })
  })

  if(Scenario.value?.quests == undefined)
  {
    Scenario.value!.quests = new Array<types.QuestData>();
  }

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
        questSolved.set(node.data.questId.id, true)
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
    let subsn = +item.id.indexOf('-') + 1;
    (Number(item.id.substring(subsn)) > biggestId)
    biggestId = Number(item.id.substring(subsn))
  })

  id = +(biggestId as number) + 1;

  //const node = Scenario.value?.conversations[index].nodes.find()

  let xpos = 0
  let ypos = 0

  if(Scenario.value?.conversations[index]?.nodes?.length > 0)
  {
    const node = Scenario.value?.conversations[index].nodes.reduce((prev, current) => (prev.position.x < current.position.x) ? prev : current)

    
    let inverseX = +node?.position?.x * -1;
    let inverseY = +node?.position?.y * -1;

    xpos = (+inverseX as number) + (+450 as number);
    ypos = (+inverseY as number) + (+200 as number);

    console.log("positions")
    console.log(xpos+"-"+ypos)
  }

   setTransform({ x: xpos+250, y:ypos+200, zoom: 1 })
}

let elements = ref(initialElements)
</script>
<template>
  <div class="dndflow" @drop="onDrop">
    
    <VueFlow v-if="selectedDialogIndex != null" v-model="elements[selectedDialogIndex.value]" @dragover="onDragOver" :node-types="nodeTypes">
      <Background :variant="BackgroundVariant.Lines" pattern-color="#4d4d4d" gap="25" />
    </VueFlow>
    
    <Controls :scenario=Scenario v-on:json-file-loaded="jsonFileLoaded" />
    <Sidebar :scenario=Scenario :filename=Filename v-on:dialog-selected="dialogSelected" ref="sideBar"/>
  </div>
</template>
