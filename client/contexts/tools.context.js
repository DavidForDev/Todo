import { createContext, useState } from "react";
import PopupCard from "../components/popupCard/popupCard";
import { UseGraphql } from "../helper/request.helper";

const creators = {
  createCollection: null,
  createTasks: null,
  createTasksItem: null,
};

const editors = {
  editCollection: null,
  editTask: null,
  editTaskItem: null,
};

const removers = {
  removeCollection: null,
  removeTask: null,
  removeTaskItem: null,
};

const initialState = {
  ...creators,
  ...editors,
  ...removers,
  markAsDone: null,
};

export const toolsContext = createContext(initialState);

const ToolsWrapper = ({ children }) => {
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });

  // ========== Creators ========== \\
  const createCollection = async (author, title, color) => {
    const graphqlShcema = `
        mutation {
          createCollection(collectionInput: {collectionAuthor: "${author}", collectionTitle: "${title}", collectionColor: "${color}"}) {
            alert {
              message
              type
            }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.createCollection;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const createTasks = async (collectionId, author, title) => {
    const graphqlShcema = `
        mutation {
          createTasks(taskInput: {collectionId: "${collectionId}", collectionAuthor: "${author}", tasksTitle: "${title}"}) {
            alert {
              message
              type
            }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.createTasks;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const createTaskItem = async (taskId, title, deadline) => {
    const graphqlShcema = `
        mutation {
          createTaskItem(taskItemInput: {taskId: "${taskId}", taskItemTitle: "${title}", deadline: ${
      deadline ? deadline : 0
    }}) {
      alert {
        message
        type
      }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.createTaskItem;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const markAsDone = async (taskItemId) => {
    const graphqlSchema = `
      mutation {
        markAsDone(taskItemId: "${taskItemId}") {
          alert {
            message
            type
          }
        }
      }
    `;

    const { data, errors } = await UseGraphql(graphqlSchema);
    const intoData = data.markAsDone;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  // ========== Editors ========== \\
  const editCollection = async (collectionId, newTitle, newColor) => {
    const graphqlShcema = `
        mutation {
          editCollection(editCollectionInput: {collectionId: "${collectionId}", newCollectionTitle: "${newTitle}", newCollectionColor: "${newColor}"}) {
            alert {
              message
              type
            }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);
    const intoData = data.editCollection;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const editTask = async (taskId, newTitle) => {
    const graphqlShcema = `
        mutation {
          editTask(editTaskInput: {taskId: "${taskId}", newTaskTitle: "${newTitle}"}) {
            alert {
              message
              type
            }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);
    const intoData = data.editTask;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const editTaskItem = async (taskItemId, newTitle, newTaskDeadline) => {
    const graphqlShcema = `
        mutation {
          editTaskItem(editTaskItemInput: {taskItemId: "${taskItemId}", newTaskItemTitle: "${newTitle}", newTaskItemDeadline: ${
      newTaskDeadline ? newTaskDeadline : 0
    }}) {
      alert {
        message
        type
      }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);
    const intoData = data.editTaskItem;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  // ========== Removers ========== \\
  const removeCollection = async (collectionId) => {
    const graphqlShcema = `
        mutation {
          removeCollection(collectionId: "${collectionId}") {
            alert {
              message
              type
            }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.removeCollection;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const removeTask = async (taskId) => {
    const graphqlShcema = `
        mutation {
          removeTask(taskId: "${taskId}") {
            alert {
              message
              type
            }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);

    const intoData = data.removeTask;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  const removeTaskItem = async (taskItemId) => {
    const graphqlShcema = `
        mutation {
          removeTaskItem(taskItemId: "${taskItemId}") {
            alert {
              message
              type
            }
          }
        }
        `;

    const { data, errors } = await UseGraphql(graphqlShcema);
    const intoData = data.removeTaskItem;

    if (intoData ? intoData.alert : false)
      return setMessage({
        type: intoData.alert.type,
        message: intoData.alert.message,
      });
  };

  // =========== Finally ========== \\

  const creators = {
    createCollection: createCollection,
    createTasks: createTasks,
    createTasksItem: createTaskItem,
  };

  const editors = {
    editCollection: editCollection,
    editTask: editTask,
    editTaskItem: editTaskItem,
  };

  const removers = {
    removeCollection: removeCollection,
    removeTask: removeTask,
    removeTaskItem: removeTaskItem,
  };

  const state = {
    ...creators,
    ...editors,
    ...removers,
    markAsDone: markAsDone,
  };
  return (
    <>
      <toolsContext.Provider value={state}>{children}</toolsContext.Provider>
      {message.message !== "" ? (
        <PopupCard
          openStatus={true}
          cardStatus={message.type}
          setMessage={setMessage}
          message={message.message}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ToolsWrapper;
