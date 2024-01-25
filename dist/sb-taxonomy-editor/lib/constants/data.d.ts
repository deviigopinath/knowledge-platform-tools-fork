export declare const FRAMEWORK: {
    id: string;
    ver: string;
    ts: string;
    params: {
        resmsgid: string;
        msgid: string;
        status: string;
        err: any;
        errmsg: any;
    };
    responseCode: string;
    result: {
        framework: {
            identifier: string;
            code: string;
            name: string;
            description: string;
            categories: {
                identifier: string;
                code: string;
                terms: ({
                    associations: {
                        identifier: string;
                        code: string;
                        translations: any;
                        name: string;
                        description: string;
                        index: number;
                        category: string;
                        status: string;
                    }[];
                    identifier: string;
                    code: string;
                    translations: any;
                    name: string;
                    description: string;
                    index: number;
                    category: string;
                    status: string;
                } | {
                    identifier: string;
                    code: string;
                    translations: any;
                    name: string;
                    description: string;
                    index: number;
                    category: string;
                    status: string;
                    associations?: undefined;
                })[];
                translations: any;
                name: string;
                description: string;
                index: number;
                status: string;
            }[];
            type: string;
            objectType: string;
        };
    };
};
export declare const categoryRepresentations: ({
    name: string;
    description: string;
    terms: ({
        name: string;
        description: string;
        domId: string;
        selected?: undefined;
        connected?: undefined;
        connectedDomId?: undefined;
    } | {
        name: string;
        description: string;
        selected: boolean;
        connected: boolean;
        domId: string;
        connectedDomId: string;
    })[];
} | {
    name: string;
    description: string;
    terms: ({
        name: string;
        description: string;
        selected: boolean;
        connected: boolean;
        domId: string;
    } | {
        name: string;
        description: string;
        domId: string;
        selected?: undefined;
        connected?: undefined;
    })[];
})[];
export declare const categoryRepresentationsV1: {
    name: string;
    description: string;
    terms: ({
        name: string;
        description: string;
        domId: string;
        selected?: undefined;
        connected?: undefined;
        parent?: undefined;
    } | {
        name: string;
        description: string;
        selected: boolean;
        connected: boolean;
        domId: string;
        parent: string;
    })[];
}[];
