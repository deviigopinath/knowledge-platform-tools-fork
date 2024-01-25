export declare const APPROVAL: {
    INITIATE: string;
    LEVEL1: string;
    LEVEL2: string;
    SEND_FOR_PUBLISH: string;
    ACTION: string;
    SERVICE_NAME: string;
    CREATE: string;
    SEARCH: string;
    READ: string;
    UPDATE: string;
    APPROVE: string;
    REJECT: string;
};
export declare const LIVE = "Live";
export declare const DRAFT = "Draft";
declare type plugType = 'disc' | 'square' | 'hand' | 'arrow1' | 'arrow2' | 'arrow3';
declare type pathType = 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';
export interface LLOptions {
    startPlug?: plugType;
    startPlugColor?: string;
    startPlugSize?: Number;
    startPlugOutlineColor?: string;
    endPlug?: plugType;
    endPlugColor?: string;
    endPlugSize?: Number;
    endPlugOutlineColor?: string;
    color?: string;
    size?: number;
    path?: pathType;
    startSocket?: string;
    endSocket?: string;
    dash?: any;
}
export declare const defaultConfig: LLOptions;
export declare const headerLineConfig: {
    endPlugColor: string;
    endPlugOutlineColor: string;
    color: string;
    startPlug: string;
};
export {};
