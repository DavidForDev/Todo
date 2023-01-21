const collectionModel = require("../../mongoose/modal/collection.model");
const tasksModel = require("../../mongoose/modal/tasks.model");

const CalculatePrecent = async (collectioner) => {
  let checkedTaskItem = 0;
  let allTaskItem = 0;

  const collection = await collectionModel.findById(collectioner);

  const tasks = await tasksModel.aggregate([
    {
      $match: { _id: { $in: collection.tasks } },
    },
    { $group: { _id: { done: "$tasksItems.done" } } },
  ]);

  tasks.map((el) => {
    return el._id.done.map((es) => {
      allTaskItem++;
      if (es === true) {
        checkedTaskItem++;
      }
    });
  });

  const oneTaskPrecentage = allTaskItem === 0 ? 0 : 100 / allTaskItem;
  const precentage = oneTaskPrecentage * checkedTaskItem;

  await collection.update({
    donePrecent: precentage,
    doneString: `${checkedTaskItem}/${allTaskItem}`,
  });
  await collection.save();
};

exports.CalculatePrecent = CalculatePrecent;
