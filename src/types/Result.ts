
export interface RootObject {
    reqId: number;
    code: number;
    msg: string;
    data: Children;
    timestamp: number;
}
export interface Children {
    today: Today;
    total: Total;
    extData: ExtData;
    name: string;
    id: string;
    lastUpdateTime: string;
    children: Children[];
}

export interface Today {
    confirm: number;
    suspect?: any;
    heal: number;
    dead: number;
    severe?: any;
    storeConfirm: number;
    input: number;
}
export interface Total {
    confirm: number;
    suspect: number;
    heal: number;
    dead: number;
    severe: number;
}

export interface ExtData {
    noSymptom: number;
    incrNoSymptom: number;
}

export interface Item {
    name: string,
    value: number,
}