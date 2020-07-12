---
title:      "Deploy Storybook to an Azure storage static website with Azure Devops Pipelines"
path:       /deploy-storybook-with-azure-devops-pipelines
date:       2020-07-12 12:54:11
description: "A guide to deploying Storybook to an Azure Blob Storage static website with Azure Devops Pipelines"
tags: ['Azure', 'Devops']
references: [
    'https://storybook.js.org/|Storybook',
    'https://azure.microsoft.com/en-gb/services/devops/pipelines/|Azure Devops Pipelines',
    'https://azure.microsoft.com/en-gb/pricing/details/storage/blobs/|Azure Storage Blobs Pricing'
]
---
Storybook is a great front end development tool. It is also a good platform for team
collaboration, allowing designers and QA an early preview. This provides early feedback
reducing the cycle time of the feature developed.

Azure Storage static website hosting is a perfect choice as the hosting
provider. It is [cheap](https://azure.microsoft.com/en-gb/pricing/details/storage/blobs/)
and quick to get started.

This guide demonstrates how to configure a pipeline that publishes Storybook to a static
website hosted in Azure storage for each feature branch.

<div class="list--nopadding list--h2">

1. ## Setup a Static website in Azure Storage
There are a few different ways to achieve this. The [how to guide](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-how-to) from Microsoft Docs is the best place
to getting your static website setup.

2. ## Connect Azure Devops to Azure
Next, you'll need to connect your Azure Devops project to your Azure subscription. To do this,
a [service connection](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/connect-to-azure?view=azure-devops)
 will need to be setup.

3. ## Setup the pipeline
  The best way to configure Azure Devops Pipelines is with code using YAML.
  The pipeline is then part of your repository enabling version control. This
  provides history and comments about how the pipeline evolved.

  <div class="list--reset">
  
  The pipeline below performs the following steps:
    1. Restores & caches NPM packages to enhance performance
    2. Runs `npm ci` to restore NPM packages
    3. Runs `npm run build-storybook` to build Storybook
    4. Copies the static website to Azure storage with a folder prefix of
    the current branch name (`$(Build.SourceBranchName`)

  </div>

```yml
trigger:
- none

pool:
  vmImage: 'ubuntu-latest'

variables:
  SrcFolder: 'src'
  StorageAccountName: 'StorageAccountName'
  npm_config_cache: $(Pipeline.Workspace)/.npm
  FolderPrefix: $(Build.SourceBranchName)

jobs:
- job: Publish_Storybook_to_Static_Site
  steps:
  - task: Cache@2
    inputs:
      key: 'npm | "$(Agent.OS)" | $(SrcFolder)/package-lock.json'
      restoreKeys: |
          npm | "$(Agent.OS)"
      path: $(npm_config_cache)
    displayName: Cache npm

  - task: Npm@1
    inputs:
      command: 'custom'
      customCommand: 'ci'
      workingDir: '$(SrcFolder)'
    displayName: 'npm ci'
      
  - task: Npm@1
    inputs:
      command: 'custom'
      workingDir: '$(SrcFolder)'
      customCommand: 'run build-storybook'
    displayName: 'Build Storybook'

  - task: AzureFileCopy@3
    displayName: 'AzureBlob File Copy'
    inputs:
      SourcePath: '$(SrcFolder)/storybook-static'
      azureSubscription: 'ServiceConnection_Name'
      Destination: AzureBlob
      storage: $(StorageAccountName)
      ContainerName: '$web'
      BlobPrefix: $(FolderPrefix)
```
</div>

  Once committed to the repository, log into Azure Devops and create
  a new pipeline using the wizard. Select where your code is and then
  pick the YAML file of your pipeline.
