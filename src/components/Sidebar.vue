<script lang="ts" setup>
import { useVueFlow } from '@vue-flow/core'
import { Ref } from 'vue'
import * as types from '../types'
import useEventsBus from './eventBus';
import draggable from 'vuedraggable'

const { nodes, edges, addNodes, setNodes, setEdges, dimensions } = useVueFlow()

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
let questId : number = 1000;

const props = defineProps({
  scenario: types.Scenario,
  filename: String
})

const emit = defineEmits(['dialogSelected'])


const reset = () => {
  selectedDialog = null
  selectedDialogIndex.value = null
  setNodes([])
  setEdges([])
}

defineExpose({ reset });

const setDialog = (dialog: types.Conversation, change: boolean = true) => {
  if(change)
    reset();

  selectedDialog = dialog
  selectedDialogIndex.value = dialog.id

  console.log(dialog)

  emit('dialogSelected', dialog.id);

  
  if(change)
  {  
    setNodes(dialog.nodes)
    setEdges(dialog.edges)
  }
}

const addDialog = () => {
  if(props.scenario != null)
  {
    let dialog: types.Conversation = {
      id: props.scenario.conversations.length,
      name: "Dialog " + props.scenario.conversations.length,
      nodes: new Array<types.ConversationNode>(),
      edges: new Array<types.ConversationEdge>(),
      actors: new Array<string>(),
    }
    props.scenario.conversations.push(dialog)
  }
}

const addNPC = () => {
  if(selectedDialog != null)
  {
    console.log(selectedDialog)
    let actor =  prompt("Please enter the new NPC name", "") as string;
    selectedDialog.actors?.push(actor)
  }
}

const checkConvoMove = (evt: any) => {

  /*console.log(evt.newIndex)
  let id = evt.newIndex;*/
  if(props.scenario != null)
  {
    let od = props.scenario.conversations.find((el: types.Conversation) => el.id == selectedDialogIndex.value)
    
    props.scenario.conversations.forEach((value, index) => {
      value.id = index
    })

    if(od != null)
      setDialog(od, false);
  }
}


const addQuest = () => {
  if(props.scenario != null)
  {
    questId = questId * 2;
    let quest: types.QuestData = {
      id: questId,
      navigationPoint: {
        x: 0,
        y: 0,
        z: 0
      },
      quest: "",
      questType: 0,
      solved: false
    }
    props.scenario.quests.push(quest)
  }
}

const removeQuest = (id: number) => {
  if(props.scenario != null)
  {
    let q = props.scenario.quests.find((el: types.QuestData) => el.id == id)
    let i = props.scenario.quests.indexOf(q)
    props.scenario.quests.splice(i,1)
  }
}

const removeDialog = (id: number) => {
  if(props.scenario != null)
  {
    let d = props.scenario.conversations.find((el: types.Conversation) => el.id == id)
    let i = props.scenario.conversations.indexOf(d)
    let od = props.scenario.conversations.find((el: types.Conversation) => el.id == selectedDialogIndex.value)
    
    props.scenario.conversations.splice(i,1)

    props.scenario.conversations.forEach((value, index) => {
      if(value.name == "Dialog " + value.id)
      {
        value.name = "Dialog " + index
      }
      value.id = index
    })

    if(id == selectedDialogIndex.value)
      setDialog(props.scenario.conversations[0]);
    else
      setDialog(od);
  }
}

const { bus } = useEventsBus()
const questSolved = new Map<number, boolean>();

watch(()=>bus.value.get('questChange'), (val) => {
  questSolved.clear();
  props.scenario?.conversations.forEach((convo: types.Conversation) =>
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
  props.scenario?.quests.forEach((q: types.QuestData) =>
  {
    if(questSolved.get(q.id) == true)
      q.solved = true;
    else
      q.solved = false;
  })
})

</script>
<script lang="ts">
  export default {
    inheritAttrs: false,
    mounted() {
      document.querySelectorAll('textarea').forEach(textarea => {
          textarea.style.height = '';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
    }
  }
</script>
<template>
<div class="hidemenu">
  <container>
      <aside v-if="scenario != null"> 
          <div class="description">Current file being edited:</div>
          <hr>
          <div>
            {{filename}}
          </div>
      </aside>
      <aside v-if="scenario != null"> 
          <div class="description">Here you can select the dialogs from this scenario</div>
          <hr>
          <draggable class="list-container" :list="scenario.conversations " item-key="id" handle=".handle"  @end="checkConvoMove">
          <template #item="{element}">
            <div class="list-item">
              <font-awesome-icon icon="grip" class="handle" />
              <div class="vue-flow__node-default dialog-wrapper" :class="{ 'active' : element.id === selectedDialogIndex }" @click="setDialog(element)">
                <textarea class="dialog-name" name="dialog" v-model="element.name" rows="1"/>
              </div>
              <font-awesome-icon icon="trash" style="cursor:pointer;" @click="removeDialog(element.id)"/>
            </div>
          </template>
        </draggable>

          <!--<div v-for="(dialog, index) in scenario.conversations" :key="index" class="vue-flow__node-default" :class="{ 'active' : index === selectedDialogIndex }" @click="setDialog(dialog, index)">
            <textarea class="dialog-name" name="dialog" v-model="scenario.conversations[index].name" rows="1"/>
          </div>-->
          <button @click="addDialog">Add Dialog</button>
      </aside>
      <aside v-if="scenario != null"> 
        <div class="description">Here you can see and edit the quests for the scenario</div>
        <div class="description small">Order them in cronological order (top to bottom) using the left handle to drag the quests.</div>
        <hr>
        <draggable class="list-container" :list="scenario.quests" item-key="id" handle=".handle">
          <template #item="{element}">
            <div class="list-item">
              <font-awesome-icon icon="grip" class="handle" />
              <textarea class="quest-name" v-bind:disabled="element.questType != 0" name="quest" v-model="element.quest" rows="" :class="{'solved': element.solved == true}" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'/>
              <font-awesome-icon v-if="element.questType == 0" icon="trash" style="cursor:pointer;" @click="removeQuest(element.id)"/>
            </div>
          </template>
        </draggable>
        
        <button @click="addQuest">Add Quest</button>
      </aside>
      <aside v-if="scenario != null"> 
        <div class="description">Here you can see and edit the briefing for the scenario</div>
        <hr>
        <textarea class="briefing-name" name="briefing" id="briefing" v-model="scenario.briefing" rows="10" />
      </aside>
  </container>
  </div>
  <div class="sidemenu">
    
    <aside v-if="selectedDialogIndex != null"> 
      <div class="description">You can drag these nodes to the pane.</div>
      <hr>
      <div class="description">Player Nodes</div>
      <div class="vue-flow__node-default player1" :draggable="true" @dragstart="(event) => onDragStart(event, 'playerNode', 'player1')">
        Player1 Node
      </div>
      <div class="vue-flow__node-default player2" :draggable="true" @dragstart="(event) => onDragStart(event, 'playerNode', 'player2')">
        Player2 Node
      </div>
      <div class="vue-flow__node-default playerAll" :draggable="true" @dragstart="(event) => onDragStart(event, 'playerNode', 'playerAll')">
        All Players Node
      </div>
        <hr>
        <div class="description">NPC Nodes</div>
        <div v-for="(text, index) in scenario.conversations[selectedDialogIndex].actors" :key="index" class="vue-flow__node-default npc" :draggable="true" @dragstart="(event) => onDragStart(event, 'npcNode', 'npc', text)">
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
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
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
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

.solved {
  border: 3px solid green; 
}

.list-container
{
  display: flex;
  flex-direction: column;
  gap:10px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.handle {
  cursor: move;
}

</style>