<script lang="ts" setup>
import { useVueFlow } from '@braks/vue-flow'
import { Ref } from 'vue'
import * as types from '../types'


const { nodes, edges, addNodes, setNodes, setEdges, instance, dimensions } = useVueFlow()

const onDragStart = (event: DragEvent, nodeType: string, nodeClass: string, npcName: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.setData('application/nodeClass', nodeClass)
    event.dataTransfer.setData('application/npcName', npcName)
    event.dataTransfer.effectAllowed = 'move'
  }
}

let selectedDialog : types.Conversation | null = null
let selectedDialogIndex : Ref<number | null>  = ref(null)
let currentActors : Ref<Array<string> | null> = ref(null)

const props = defineProps({
  scenario: types.Scenario
})

const emit = defineEmits(['dialogSelected'])


const reset = () => {
  selectedDialog = null
  selectedDialogIndex.value = null
  setNodes([])
  setEdges([])
}

defineExpose({ reset });

const setDialog = (dialog: types.Conversation, index: number) => {
  console.log(selectedDialogIndex)
  selectedDialog = dialog
  selectedDialogIndex.value = index

  emit('dialogSelected', index);

  setNodes(dialog.nodes)
  setEdges(dialog.edges)
}

const addNPC = () => {
  if(selectedDialog != null)
  {
    let actor =  prompt("Please enter the new NPC name", "") as string;
    selectedDialog.actors?.push(actor)
  }
}

const addQuest = () => {
  if(props.scenario != null)
  {
    props.scenario.quests.push("")
  }
}
</script>
<template>
<div class="hidemenu">
  <container>
      <aside v-if="scenario != null"> 
          <div class="description">Here you can select the dialogs from this scenario</div>
          <hr>
          <div v-for="(dialog, index) in scenario.conversations" :key="index" class="vue-flow__node-default" :class="{ 'active' : index === selectedDialogIndex }" @click="setDialog(dialog, index)">
            Dialog {{index}}
          </div>
      </aside>
      <aside v-if="scenario != null"> 
        <div class="description">Here you can see and edit the quests for the scenario</div>
        <hr>
        <div v-for="(text, index) in scenario.quests" :key="index">
          <textarea name="quest" v-model="scenario.quests[index]" rows="" />
        </div>
        <button @click="addQuest">Add Quest</button>
      </aside>
      <aside v-if="scenario != null"> 
        <div class="description">Here you can see and edit the briefing for the scenario</div>
        <hr>
        <textarea name="briefing" id="briefing" v-model="scenario.briefing" rows="10" />
      </aside>
  </container>
  </div>
  <div class="sidemenu">
    
    <aside v-if="selectedDialogIndex != null"> 
      <div class="description">You can drag these nodes to the pane.</div>
      <hr>
      <div class="description">Player Nodes</div>
      <div class="vue-flow__node-default player1" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'playerNode', 'player1')">
        Player1 Node
      </div>
      <div class="vue-flow__node-default player2" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'playerNode', 'player2')">
        Player2 Node
      </div>
      <div class="vue-flow__node-default playerAll" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'playerNode', 'playerAll')">
        All Players Node
      </div>
        <hr>
        <div class="description">NPC Nodes</div>
        <div v-for="(text, index) in scenario.conversations[selectedDialogIndex].actors" :key="index" class="vue-flow__node-default npc" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'npcNode', 'npc', text)">
          {{text}}
        </div>
        <button @click="addNPC">Add NPC</button>
    </aside>
  </div>
</template>


<style scoped>
.active {
  background-color: rgb(50, 63, 59);
  color:white;
}

.hidemenu > container > aside {
  margin-left: 15px;
  margin-right: 15px;
}

::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
</style>