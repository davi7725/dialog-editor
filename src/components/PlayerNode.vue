<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, Position, Connection, Edge, NodeProps } from '@braks/vue-flow'
import { QuestData, QuestId, ResponseQuest } from '~/types'
import useEventsBus from './eventBus';

const {emit}=useEventsBus()

interface PlayerNodeProps extends NodeProps {
  id: string,
  data: {
    texts: Array<ResponseQuest>
    playerType: string
    questId: QuestId
    quests: Array<QuestData>
    onChange: (event: any) => void
    onConnect: (params: Connection | Edge) => void
  }
}
const props = defineProps<PlayerNodeProps>()

const targetHandleStyle: CSSProperties = { background: '#555', position: 'absolute', top: '20px' }
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, position: 'relative', left: "15px", top: "0px", transform: "0" }

const addText = () => {
    let newText: ResponseQuest = new ResponseQuest("", false)
    props.data.texts.push(newText)
}

const typeChange = (event: any) => {
    props.data.playerType = (event.target as HTMLInputElement).value
}

const textChange = (event: any, index: number) => {
  props.data.texts[index].text = (event.target as HTMLInputElement).value
}

const removeText = (index: number) => {
  props.data.texts.splice(index, 1)
}

const sendQuestEvent = () =>
{
  let solved = false;
  props.data.texts.forEach((v, i) => {
    if(v.solvesQuest)
      solved = true;
  })

  let solvedData = {
    isSolved: solved,
    questId: props.data.questId.id
  }
  
  emit("questChange", solvedData)
}

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
  <div style="position:relative;">
    <Handle type="target" id="gi1" :position="Position.Left" :style="targetHandleStyle" :on-connect="props.data.onConnect" />
    <Handle type="source" id="go1" :position="Position.Right" :style="targetHandleStyle" :on-connect="props.data.onConnect" />
    <div>
      <strong v-if="props.data.playerType == 'player1'">Player 1</strong>
      <strong v-if="props.data.playerType == 'player2'">Player 2</strong>
      <strong v-if="props.data.playerType == 'playerAll'">All Players</strong>
    </div>
    <hr>
    <div>
      Responses:
    </div>
      <!--<Handle id="index" type="source" :style="sourceHandleStyleA" />    
      <Handle id="index2" type="source" :style="sourceHandleStyleA" />  -->    
    <ul id="texts-npcs">
        <li v-for="(text, index) in data.texts" :key="index" style="position:relative;">
          <input v-if="data.questId.id != -1" type="checkbox" v-model="data.texts[index].solvesQuest" @change="sendQuestEvent()"/>  
          <textarea class="nodrag" :value="data.texts[index].text" @input="textChange($event, index)" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' />
          <Handle :id="'p' + index" type="source" :position="Position.Right" :style="sourceHandleStyleA" />    
          <span @click="removeText(index)">x</span>
        </li>


    </ul>
    <br>
    <button @click="addText">Add response</button>
    <hr>
    <div>
      Quest:
      <select v-if="data.quests != undefined" v-model="data.questId.id" style="max-width: 170px" @change="sendQuestEvent()">
        <option value="-1">None</option>
        <option v-for="q in data.quests.filter(x => x.questType == 0)" :value="q.id" :key="q.id">
          <span>{{ q.quest }}</span>
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: -60px;
  color: rgb(0, 255, 34);
  border: 1px solid green;
  border-radius: 10px;
  padding: 10px;
  left: 15px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
 }

 li {
     display: flex;
     align-items: center;
     margin-top:10px;
 }

 button {
   color: white;
   border: 2px solid white;
   background-color: transparent;
   border-radius: 5px;
   cursor: pointer;
 }

 button:hover {
   color: rgb(34, 34, 34);
   background-color: white;
 }

 textarea {
  resize: none;
}

span {
  position: absolute;
  top:-10px;
  right: -5px;
  color:black;
  font-weight: bolder;
  cursor: pointer;
  border: 2px solid black;
  background: white;
  border-radius: 15px;
  width: 15px;
  height: 15px;
  font-size: 12px;
}

</style>
