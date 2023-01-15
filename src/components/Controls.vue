<script lang="ts" setup>

import * as types from '../types'
import { saveAs } from 'file-saver';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

</script>
<script lang="ts">
export default {
  inheritAttrs: false,
  data () {
	return {
		polling: 0
	}
},
created () {
  this.onAutoLoad();
  //clearInterval(this.polling)
	//this.pollData()
},
  methods: {
  pollData () {
		this.polling = setInterval(() => {
			this.onAutoSave();
      console.log("Auto-Saving...");
		}, 5000)
	},
  onCreate() 
  {
    let scen = new types.Scenario();
    this.$emit('json-file-loaded', {scenario: scen, filename: "New Scenario.json"});
    
    clearInterval(this.polling)
    this.pollData()
  },
  onFileChange(event: HTMLInputEvent | DragEvent) {
    let files =
      (event as HTMLInputEvent).target.files
    if (files == null || !files.length) return
    this.doSomethingWithTheFile(files[0])
  },

  onAutoSave() {
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
              if(node.data.questId.id > -1)
              {
                let q = exportScenario.quests.find((e: types.QuestData) => e.id == node.data.questId.id);
                if(q != undefined)
                  node.data.questId.id = q.order;
                else
                  node.data.questId.id = -1;
              }
              delete node.data.quests;

              let temp = node.data.questId.id;
              delete node.data.questId;
              node.data.questId = temp;
            }
            else if(node.type == "npcNode")
            {
              delete node.data.questId;
            }
          })
        })

        exportScenario.quests.forEach((el: any) => {
          el.id = el.order;
          delete el.solved;
          delete el.order;
        });
        
        localStorage.setItem("dialog-editor-storage", JSON.stringify(exportScenario))
      }
  },
  
  onSave() {
    let filename = prompt("Define your file name.")

    if(filename != undefined)
    {

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
              if(node.data.questId.id > -1)
              {
                let q = exportScenario.quests.find((e: types.QuestData) => e.id == node.data.questId.id);
                if(q != undefined)
                  node.data.questId.id = q.order;
                else
                  node.data.questId.id = -1;
              }
              delete node.data.quests;

              let temp = node.data.questId.id;
              delete node.data.questId;
              node.data.questId = temp;
            }
            else if(node.type == "npcNode")
            {
              delete node.data.questId;
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
    }
  },
  onAutoLoad() {
    let save = localStorage.getItem("dialog-editor-storage")
    if(save != null)
    {
      let scenario = JSON.parse(save) as types.Scenario
        
      scenario.conversations.forEach((item) => {
        item.nodes.forEach((n) => {
          let temp: number = n.data.questId;
          n.data.questId = new types.QuestId(temp);
        })
      })

      this.$emit('json-file-loaded', {scenario: scenario, filename: "Auto-Saved dialog"});
      clearInterval(this.polling)
      this.pollData()
    }
  },
  doSomethingWithTheFile(file: File) {
      let reader = new FileReader();
      reader.onload = e => {
        if(e.target != null)
        {
          let scenario = JSON.parse(String(e.target.result))
          
          //id!: number;
          //name!: string;
          scenario.conversations.forEach((item, index) => {
            if(!item.hasOwnProperty('id'))
            {
              item['id'] = index;
            }
            
            if(!item.hasOwnProperty('name'))
            {
              item['name'] = "Dialog " + index
            }

            let nodenamechange = new Map<string,string>()

            item.nodes.forEach((item) => {
              if(item.id.indexOf('-') == -1)
              {
                let nodeid = Number(item.id.substring(4))
                nodenamechange.set(item.id, "node" + index + "-" + nodeid)
                item.id = "node" + index + "-" + nodeid
              }
            })

            item.edges.forEach((item) => {
              if(nodenamechange.has(item.source) && nodenamechange.has(item.target))
              {
                item.source = nodenamechange.get(item.source)
                item.target = nodenamechange.get(item.target)
              }
            })
          })

          scenario.conversations.forEach((item) => {
            item.nodes.forEach((n) => {
              let temp: number = n.data.questId;
              n.data.questId = new types.QuestId(temp);
            })
          })

          this.$emit('json-file-loaded', {scenario: scenario, filename: file.name});
          clearInterval(this.polling)
          this.pollData()
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
    <label class="btn" @click="onCreate">Create scenario</label>
    <label class="btn" @click="onSave">Save scenario</label>
    <!--<label class="btn" @click="onAutoSave">Auto-Save scenario</label>
    <label class="btn" @click="onAutoLoad">Auto-Load scenario</label>-->
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