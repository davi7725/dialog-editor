
export class NodeData {
    name!: string;
    playerType!: string;
    texts!: Array<string>;
    fullfilsQuest!: Boolean;

    constructor(name: string, playerType: string, texts: Array<string>, fullfilsQuest: Boolean) {
      this.name = name;
      this.playerType = playerType;
      this.texts = texts;
      this.fullfilsQuest = fullfilsQuest;
    }
  }
  
  export class NodePosition {
    x!: number;
    y!: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
  
  export class ConversationNode {
    id!: string;
    position!: NodePosition;
    type!: string;
    class!: string;
    data!: NodeData;

    constructor(id: string, position: NodePosition, type: string, nodeClass: string, data: NodeData) {
      this.id = id;
      this.position = position;
      this.type = type;
      this.class = nodeClass;
      this.data = data;
    }
  }
  
  export class ConversationEdge {
    id!: string;
    source!: string;
    target!: string;
    sourceHandle!: string;
    targetHandle!: string;

    constructor(id: string, source: string, target: string, sourceHandle: string, targetHandle: string) {
      this.id = id;
      this.source = source;
      this.target = target;
      this.sourceHandle = sourceHandle;
      this.targetHandle = targetHandle;
    }
  }
  
  export class Conversation {
    nodes!: Array<ConversationNode>;
    edges!: Array<ConversationEdge>;
    actors!: Array<string>;
  }
  
  export class Scenario  {
    briefing!: string;
    quests!: Array<string>;
    conversations!: Array<Conversation>;
  }