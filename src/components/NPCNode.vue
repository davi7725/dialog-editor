<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, Position, Connection, Edge, NodeProps, useVueFlow } from '@braks/vue-flow'
import { ResponseQuest } from '~/types'

interface NPCNodeProps extends NodeProps {
  id: string,
  data: {
    texts: Array<ResponseQuest>
    name: string
    onChange: (event: any) => void
    onConnect: (params: Connection | Edge) => void
  }
}
const props = defineProps<NPCNodeProps>()

const targetHandleStyle: CSSProperties = { background: '#555', position: 'absolute', top: '20px' }
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, position: 'relative', left: "15px", top: "0px", transform: "0" }

const addText = () => {
    let newText: ResponseQuest = new ResponseQuest("", false)
    props.data.texts.push(newText)
  }

const nameChange = (event: any) => {
    props.data.name = (event.target as HTMLInputElement).value
}

const textChange = (event: any, index: number) => {
  props.data.texts[index].text = (event.target as HTMLInputElement).value
}

const removeText = (index: number) => {
  props.data.texts.splice(index, 1)
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
    NPC - <strong>{{ data.name }}</strong>
  </div>
  <!--<input class="nodrag" type="text" :value="data.name" @input="nameChange" />-->
  <hr>
  <div>
    Responses:
  </div>
  <ul id="texts-npcs">
      <li v-for="(text, index) in data.texts" :key="index" style="position:relative;">
            <textarea class="nodrag" :value="data.texts[index].text" @input="textChange($event, index)" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'/>
            <span @click="removeText(index)">x</span>
            <!--<Handle :id="'s' + index" type="source" :position="Position.Right" :style="sourceHandleStyleA" />-->
      </li>
  </ul>
  <br>
  <button @click="addText">Add text</button>
  <div class="footer" v-if="props.data.fullfilsQuest">Fullfils Quest</div>
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
