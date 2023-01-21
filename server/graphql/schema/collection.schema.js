const collectionSchema = `
    type Collection {
        _id: String!
        collectionTitle: String!
        collectionColor: String!
        donePrecent: Float!
        doneString: String!
        tasks: [Tasks!]!
        collectionAuthor: User!
        alert: ActionMessage
    }

    input CollectionInput {
        collectionAuthor: String!
        collectionTitle: String!
        collectionColor: String!
    }

    #====== Task in Collection.tasksItems
    type Tasks {
        _id: String!
        tasksItems: [TaskItem]
        collectionId: String!
        collectioner: [Collection]
        tasksTitle: String!
        alert: ActionMessage
    }

    input TasksInput {
        collectionId: String!
        collectionAuthor: String!
        tasksTitle: String!
    }

    #====== Task item in Collection.tasksItems.items
    type TaskItem {
        _id: String!
        taskItemTitle: String!
        done: String!
        deadline: Float
        alert: ActionMessage
    }

    input TaskItemInput {
        taskId: String!
        taskItemTitle: String!
        deadline: Float
    }

    #====== edit Collection / Task / Taskitem
    input EditCollectionInput {
        collectionId: String!
        newCollectionTitle: String!
        newCollectionColor: String!
    }
    input EditTaskInput {
        taskId: String!
        newTaskTitle: String!
    }
    input EditTaskItemInput {
        taskItemId: String!
        newTaskItemTitle: String
        newTaskItemDeadline: Float
    }
`;

const collectionRootMutation = `
createCollection(collectionInput: CollectionInput): Collection
createTasks(taskInput: TasksInput): Tasks
createTaskItem(taskItemInput: TaskItemInput): [TaskItem]

markAsDone(taskItemId: String!): [TaskItem]

editCollection(editCollectionInput: EditCollectionInput): Collection
editTask(editTaskInput: EditTaskInput): Tasks
editTaskItem(editTaskItemInput: EditTaskItemInput): [TaskItem]

removeCollection(collectionId: String!): Collection
removeTask(taskId: String!): Tasks
removeTaskItem(taskItemId: String!): [TaskItem]
`;

const collectionRootQuery = `
collections: [Collection]
exactlyCollection(collectionId: String!): Collection
`;

exports.collectionSchema = collectionSchema;
exports.collectionRootMutation = collectionRootMutation;
exports.collectionRootQuery = collectionRootQuery;
