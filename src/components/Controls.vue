<script lang="ts" setup>
import { useZoomPanHelper, FlowExportObject, Node, useVueFlow } from '@braks/vue-flow'

import * as types from '../types'
import { saveAs } from 'file-saver';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

const flowKey = 'example-flow'
const state = useStorage<FlowExportObject>(flowKey, {
  nodes: [],
  edges: [],
  position: [NaN, NaN],
  zoom: 1,
})

const getNodeId = () => `randomnode_${+new Date()}`

const { setTransform } = useZoomPanHelper()
const { nodes, edges, addNodes, setNodes, setEdges, instance, dimensions } = useVueFlow()

const onRestore = () => {

const test = {"nodes":[{"id":"node1","position":{"x":216,"y":8},"type":"npcNode","class":"npc","data":{"name":"Bruno Gruber","playerType":"npc","texts":["Schatz, unsere Gäste sind da."]}},{"id":"node2","position":{"x":568,"y":-24},"type":"npcNode","class":"npc","data":{"name":"Elisabeth","playerType":"npc","texts":["Wie schön! Herzlich Wilkommen! Ich bin Elisabeth"]}},{"id":"node3","position":{"x":872,"y":168},"type":"playerNode","class":"player1","data":{"name":"","playerType":"player1","texts":["Hallo","Hallo, Elisabeth","Hallo, Elisabeth Vielen Dank für die Einladung","Vielen Dank für die Einladung"]}},{"id":"node4","position":{"x":1176,"y":-24},"type":"npcNode","class":"npc","data":{"name":"Elisabeth","playerType":"npc","texts":["Wo kommst du her?"]}},{"id":"node5","position":{"x":1464,"y":168},"type":"playerNode","class":"player1","data":{"name":"","playerType":"player1","texts":["Aus Bristol","Aus England","Aus Bristol in England "]}},{"id":"node6","position":{"x":1784,"y":-40},"type":"npcNode","class":"npc","data":{"name":"Elisabeth","playerType":"npc","texts":["Spannend"]}},{"id":"node7","position":{"x":2120,"y":-40},"type":"npcNode","class":"npc","data":{"name":"Elisabeth","playerType":"npc","texts":["Hallo! "]}},{"id":"node8","position":{"x":2440,"y":168},"type":"playerNode","class":"player2","data":{"name":"","playerType":"player2","texts":["Hallo","Hallo, ich bin *Name*","Hallo, ich bin *Name*  Vielen Dank für die Einladung","Hallo Vielen Dank für die Einladung"]}},{"id":"node9","position":{"x":2792,"y":-8},"type":"npcNode","class":"npc","data":{"name":"Elisabeth","playerType":"npc","texts":["Kommst du auch aus Bristol? "]}},{"id":"node10","position":{"x":3117,"y":178},"type":"playerNode","class":"player2","data":{"name":"","playerType":"player2","texts":["Ja","Nein","Nein, aus *City/country*","Nein, ich komme aus *City/country*"]}},{"id":"node11","position":{"x":3448,"y":-8},"type":"npcNode","class":"npc","data":{"name":"Elisabeth","playerType":"npc","texts":["Unsere Tochter Paula. Ich bin noch mal kurz in der Küche. Das Essen ist gleich fertig."]}},{"id":"node12","position":{"x":3768,"y":-8},"type":"npcNode","class":"npc","data":{"name":"Paula","playerType":"npc","texts":["Hallo"]}},{"id":"node13","position":{"x":4072,"y":152},"type":"playerNode","class":"player1","data":{"name":"","playerType":"player1","texts":["Hallo","Hallo Paula"]}},{"id":"node14","position":{"x":4376,"y":-8},"type":"npcNode","class":"npc","data":{"name":"Paula","playerType":"npc","texts":["Sprichst du deutsch?"]}},{"id":"node15","position":{"x":4696,"y":152},"type":"playerNode","class":"player1","data":{"name":"","playerType":"player1","texts":["Ja","Ja, ein wenig","Nein","Leider nein"]}},{"id":"node16","position":{"x":5016,"y":8},"type":"npcNode","class":"npc","data":{"name":"Paula","playerType":"npc","texts":["Ich füttere Wuschel noch"]}},{"id":"node17","position":{"x":5320,"y":168},"type":"playerNode","class":"player1","data":{"name":"","playerType":"player1","texts":["Wer ist Wuschel?","Was ist Wuschel?","Wuschel?","Wo ist Wuschel?"]}},{"id":"node18","position":{"x":5720,"y":-8},"type":"npcNode","class":"npc","data":{"name":"Paula","playerType":"npc","texts":["Mein Kaninchen. Möchtet ihr es sehen?"]}},{"id":"node19","position":{"x":6024,"y":248},"type":"playerNode","class":"player1","data":{"name":"","playerType":"player1","texts":["Ja","Ja, gerne","Nein"]}},{"id":"node20","position":{"x":6360,"y":40},"type":"npcNode","class":"npc","data":{"name":"Paula","playerType":"npc","texts":["Kommt mit! "]}},{"id":"node21","position":{"x":5656,"y":280},"type":"npcNode","class":"npc","data":{"name":"Paula","playerType":"npc","texts":["In meinem Zimmer. Möchtet ihr es sehen? "]}},{"id":"node22","position":{"x":6360,"y":328},"type":"npcNode","class":"npc","data":{"name":"Paula","playerType":"npc","texts":[""]}}],"edges":[{"id":"edge-node1go1-node2gi1","source":"node1","target":"node2","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node2go1-node3gi1","source":"node2","target":"node3","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node3go1-node4gi1","source":"node3","target":"node4","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node4go1-node5gi1","source":"node4","target":"node5","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node5go1-node6gi1","source":"node5","target":"node6","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node6go1-node7gi1","source":"node6","target":"node7","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node7go1-node8gi1","source":"node7","target":"node8","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node8go1-node9gi1","source":"node8","target":"node9","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node9go1-node10gi1","source":"node9","target":"node10","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node10go1-node11gi1","source":"node10","target":"node11","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node11go1-node12gi1","source":"node11","target":"node12","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node12go1-node13gi1","source":"node12","target":"node13","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node13go1-node14gi1","source":"node13","target":"node14","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node14go1-node15gi1","source":"node14","target":"node15","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node15go1-node16gi1","source":"node15","target":"node16","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node16go1-node17gi1","source":"node16","target":"node17","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node17s0-node18gi1","source":"node17","target":"node18","sourceHandle":"p0","targetHandle":"gi1"},{"id":"edge-node17s1-node18gi1","source":"node17","target":"node18","sourceHandle":"p1","targetHandle":"gi1"},{"id":"edge-node17s2-node18gi1","source":"node17","target":"node18","sourceHandle":"p2","targetHandle":"gi1"},{"id":"edge-node17s3-node21gi1","source":"node17","target":"node21","sourceHandle":"p3","targetHandle":"gi1"},{"id":"edge-node18go1-node19gi1","source":"node18","target":"node19","sourceHandle":"go1","targetHandle":"gi1"},{"id":"edge-node19s0-node20gi1","source":"node19","target":"node20","sourceHandle":"p0","targetHandle":"gi1"},{"id":"edge-node19s1-node20gi1","source":"node19","target":"node20","sourceHandle":"p1","targetHandle":"gi1"},{"id":"edge-node19s2-node22gi1","source":"node19","target":"node22","sourceHandle":"p2","targetHandle":"gi1"},{"id":"edge-node21go1-node19gi1","source":"node21","target":"node19","sourceHandle":"go1","targetHandle":"gi1"}]}


setNodes(test.nodes)
setEdges(test.edges)

/*
  const flow: FlowExportObject | null = state.value

  if (flow) {
    const [x = 0, y = 0] = flow.position
    setNodes(state.value.nodes)
    setEdges(state.value.edges)
    setTransform({ x, y, zoom: flow.zoom || 0 })
  }*/
}

</script>
<script lang="ts">
export default {
  inheritAttrs: false,
  methods: {

  onFileChange(event: HTMLInputEvent | DragEvent) {
    let files =
      (event as HTMLInputEvent).target.files
    if (files == null || !files.length) return

    this.doSomethingWithTheFile(files[0])
  },
  
  onSave() {
    let filename = prompt("Define your file name.")

    if(this.$props.scenario != null)
    {
      var blob = new Blob([JSON.stringify(this.$props.scenario)], { type: "text/plain;charset=utf-8" })
      saveAs(blob, filename);
    }
  },

  doSomethingWithTheFile(file: File) {
      let reader = new FileReader();
      reader.onload = e => {
        if(e.target != null)
        {
          let scenario = JSON.parse(String(e.target.result)) as types.Scenario;
          console.log(scenario)
          //this.setNodes(scenario..nodes)
          //this.setEdges(json.edges)
          this.$emit('json-file-loaded', scenario);
        }
      };
      reader.readAsText(file)
    }
},
props: {
  scenario: types.Scenario
}
}
</script>
<template>
  <div class="save__controls">
    <label class="btn" @click="onSave">Save scenario</label>
    <label class="btn">
        <input id="hiddenInput" type="file" @change="onFileChange"/>
        Load scenario
    </label>
  </div>
</template>


<style scoped>
#hiddenInput {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #f8f9fa;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    color: #f8f9fa;
    background-color: transparent;
    border-color: #f8f9fa;
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
    margin: 5px;
    cursor: pointer;
    text-transform:none;
}

.btn:hover {
    color: #212529;
    background-color: #e2e6ea;
    border-color: #dae0e5;
}
  
</style>