# kanban-demo

## Build Setup

```bash
# install dependencies
$ npm install or yarn install

# serve with hot reload at localhost:3000
$ npm run dev or yarn dev

# build for production and launch server
$ npm run build or yarn build
$ npm run start or yarn start

# generate static project
$ npm run generate or yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## API documentation

https://app.swaggerhub.com/apis-docs/anhtt3/kanban.demo/1.0.0

## What in this demo

### Task 1
I have created a demo for Kanban board as required 
This project is built using NuxtJS, a framework of VueJS that support many modern features

The demo has the following features:
- Create/Update/Delete board
- Changing background when switching screen (this one is added as a plus)
- Create/Update/Delete Task
- Drag and drop task between columns : Todo, In progress and Done
- Config number of task in columns (Personally I have set the config only affects 'In Progress' and 'Done' column,
  'To do' column should be unlimited)

In this demo, I simplify some features should have in real project such as: 
- validation (We can use 3rd libraries such as Vuelidate)
- API fetching (currently using localstorage as required)

### Task 2
I have created the documentation for API that should implement into this project. You can see the detail as the swagger link above.
