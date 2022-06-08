<script lang="ts" setup>
import { useZoomPanHelper, FlowExportObject, Node, useVueFlow } from '@braks/vue-flow'

import * as types from '../types'
import { saveAs } from 'file-saver';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
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
      let exportScenario = JSON.parse(JSON.stringify(this.$props.scenario));
      exportScenario.quests.forEach((el: any, index:number) => {
              el.order = index;
            });
      exportScenario.conversations.forEach((convo: any) => {
        convo.nodes.forEach((node: any) => {
          if(node.type == "playerNode")
          {
            if(node.data.questId > -1)
            {
              let q = exportScenario.quests.find((e: types.QuestData) => e.id == node.data.questId);
              if(q != undefined)
                node.data.questId = q.order;
              else
                node.data.questId = -1;
            }
            delete node.data.quests;
          }
        })
      })

      exportScenario.quests.forEach((el: any) => {
        el.id = el.order;
        delete el.solved;
        delete el.order;
      });

      var blob = new Blob([JSON.stringify(exportScenario)], { type: "application/json" })
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