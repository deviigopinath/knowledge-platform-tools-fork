export declare namespace NSFramework {
    type TCardSubType = 'standard' | 'minimal' | 'space-saving';
    type TNodeStatus = 'draft' | 'live';
    interface ICategory {
        identifier?: string;
        name?: string;
        description?: string;
        status?: TNodeStatus;
        code: string;
        translations?: any;
        index: number;
        terms: any[];
    }
    interface ITerm {
        associations?: ICategory[];
        code: string;
        translations?: string | null;
        name: string;
        description: string;
        index?: number;
        category: string;
        status: TNodeStatus;
    }
    interface ITermCard {
        children: any;
        cardSubType: TCardSubType;
        deletedMode?: 'greyOut' | 'hide';
        stateData?: any;
        selected?: boolean;
        category: string;
        isViewOnly?: boolean;
        highlight?: boolean;
    }
    interface ISelectedCategory {
        columnCode: string;
        children: IFrameworkView[];
    }
    interface ITermsByCategory {
        categoryIdentifier: string;
        categoryLevel: number;
        categoryName: string;
        categoryCode: string;
        terms: ITerm[];
    }
    interface IFrameworkView {
        identifier: string;
        code: string;
        name: string;
        description: string;
        children: [];
        parent?: any;
    }
    interface IColumnView {
        identifier: string;
        name: string;
        selected: boolean;
        description?: string;
        status: TNodeStatus;
        code: string;
        translations?: any;
        index: number;
        children: any[];
        category: string;
        associations: any[];
        config: any;
    }
    interface ParentsElements {
        identifier: string;
    }
    interface AdditionalProperties {
    }
    interface ICreateTerm {
        code: string;
        name: string;
        description: string;
        category?: string;
        status: string;
        approvalStatus: string;
        parents?: ParentsElements[] | null;
        additionalProperties: AdditionalProperties;
    }
}
