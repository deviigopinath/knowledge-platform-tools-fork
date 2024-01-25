## TaxonomyEditor

### Install latest version of sb-taxonomy-editor.

npm i sb-taxonomy-editor

### Add below element in sunbird-Ed-portal

<lib-taxonomy-view [environment]="environment" [taxonomyConfig]="taxonomyConfig">

### Save below "environment" and "taxonomyConfig" in local storage before initialize above library. (this need to change as input to a library).

         environment =  {
                 frameworkName: string,   
                 channelId: string,
                 authToken: string,
                 isApprovalRequired:  boolen  // set default to false,
          }



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


## Local setup and run app.

### Install the node_modules

    npm install

### Build and watch library.
    ng build sb-taxonomy-edior --watch=true

### Build app.
    npm run start

### open  

    http://localhost:4200

### Unit Test

ng test sb-taxonomy-editor --watch=true

### Code Coverage

ng test sb-taxonomy-editor --code-coverage 