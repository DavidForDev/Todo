const taskSchema = `
    scalar BigInt

    type Task {
        _id: ID!
        taskName: String!
        taskItems: TaskItemObject
        tags: [Tag]
        author: User!
        createdAt: BigInt!
        alert: Boolean
    }

    type TaskItemObject {
        todo: [TaskItem]
        doing: [TaskItem]
        done: [TaskItem]
    }

    type Tag { 
        name: String!
        color: String!
    }
    input TagInput {
        name: String!
        color: String!
    }

    input TaskInput {
        taskName: String!
        tags: [TagInput]
        userId: String
        taskId: String
    }

    type TaskItem {
        _id: ID!
        taskItemName: String!
        description: String!
        attach: [Link]
        status: String!
        itemFrom: [Task]!
        author: User!
        createdAt: BigInt!
        alert: Boolean
    }

    type Link {
        name: String!
    }
    input LinkInput {
        name: String!
    }

    input TaskItemInput { 
        taskItemName: String!
        description: String!
        attach: [LinkInput]
        taskId: String
        taskItemId: String
    }

    input ChangeStatus {
        taskItemId: String!
        newStatus: String!
    }

    input RemoveTaskInput {
        taskId: String!
        userId: String!
    }

`;

const taskQuerySchema = `
    getTasks(accountId: String!): [Task]!
    specialTask(taskId: String!): Task!
`;

const taskMutationSchema = `
    createTask(taskInput: TaskInput): Task
    editTask(taskInput: TaskInput): Task
    removeTask(removeTaskInput: RemoveTaskInput): Task!

    createTaskItem(taskItemInput: TaskItemInput): TaskItem
    editTaskItem(taskItemInput: TaskItemInput): TaskItem
    removeTaskItem(taskItemId: String!): TaskItem

    changeStatus(changeStatusInput: ChangeStatus): TaskItemObject
`;

exports.taskSchema = taskSchema;
exports.taskQuerySchema = taskQuerySchema;
exports.taskMutationSchema = taskMutationSchema;
