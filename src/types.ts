export class ResponseQuest {
  text!: string;
  solvesQuest!: Boolean;

  constructor(text: string, solvesQuest: Boolean) {
    this.text = text;
    this.solvesQuest = solvesQuest;
  }
}

export class NodeTrigger {
  nameOfTrigger!: string;
  waitTime!: number;
}

export class QuestId {
  id!: number;
  constructor(id: number) {
    this.id = id;
  }
}

export class NodeData {
    name!: string;
    playerType!: string;
    texts!: Array<ResponseQuest>;
    triggers!: Array<NodeTrigger>
    useSocialActions!: Boolean;
    questId!: number | QuestId;
    quests: QuestData[]|undefined;

    constructor(name: string, playerType: string, texts: Array<ResponseQuest>, triggers: Array<NodeTrigger>, useSocialActions: Boolean, questId: QuestId) {
      this.name = name;
      this.playerType = playerType;
      this.texts = texts;
      this.useSocialActions = useSocialActions;
      this.triggers = triggers;
      this.questId = questId;
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

  export class NodePosition3 {
    x!: number;
    y!: number;
    z!: number;
  }

  export class QuestData {
    id!: number;
    navigationPoint!: NodePosition3;
    quest!: string;
    questType!: number;
    solved!: boolean;
  }
  
  export class Scenario  {
    briefing!: string;
    quests!: Array<QuestData>;
    conversations!: Array<Conversation>;
  }