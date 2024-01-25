
## Install taxonomy-editor

npm install sb-taxonomy-editor@latest

## Store Environment and Framework configuration in localstorage.

    environment = {
            frameworkName: string,
            channelId: string,
            authToken: string,
            isApprovalRequired: false
    };

## Column Color configuration

    taxonomyConfig = {
        frameworkId: string,
        config: [
            {
                index:number,
                category:string,
                icon: 'string',
                color: 'string'
            }
        ]
    } 
### defalut configuration is available. if you don't specify.

## Adding lib tag into template
 <lib-taxonomy-view [environment]="environment" [taxonomyConfig]="taxonomyConfig"></lib-taxonomy-view>
