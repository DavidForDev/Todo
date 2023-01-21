// ========== Layout ========== \\
import BodyLayout from "../../layout/body.layout";
import UseModal from "../../layout/useModal";

// ========== Components ========== \\
import Task from "../../components/tasks/task";
import TasksForm from "../../components/forms/creator/tasksCreator.form";
import CollectionEditForm from "../../components/forms/editor/collectionEdit.form";

// ========== UIElement ========== \\
import { PrimaryButton } from "../../UIElements/ui.elements";

// ========= Helper ========== \\
import { UseGraphql } from "../../helper/request.helper";

// ========== Icons ========== \\
import PlusSvg from "../../public/icons/plus";

const Tasks = ({ data }) => {
  const { _id, collectionTitle, tasks } = data.exactlyCollection;
  return (
    <BodyLayout
      pageTitle={collectionTitle}
      backButton="/collections"
      modalComponent={<CollectionEditForm data={data.exactlyCollection} />}
      editorOpener={_id}
    >
      <div
        aria-label="#taskCreator"
        className="opacity-70 hover:opacity-100 cursor-pointer mb-8 flex justify-start items-center gap-3 border-2 border-solid py-2 px-4 rounded-full border-[#BCBCBF2B]"
      >
        <PrimaryButton padding="3px" className="!w-7">
          <PlusSvg width="20px" height="20px" />
        </PrimaryButton>
        <p className="text-[#96969A] text-sm">Add a Tasks</p>
      </div>
      <div className="flex flex-col gap-9">
        {tasks.length === 0 ? (
          <h3 className="text-center text-[#96969A]/50 text-2xl">
            You have no tasks yet
          </h3>
        ) : (
          ""
        )}
        {tasks.map((el, index) => {
          return <Task key={index} data={el} />;
        })}
      </div>
      <UseModal modalName="taskCreator">
        <TasksForm data={data.exactlyCollection} />
      </UseModal>
    </BodyLayout>
  );
};

export async function getServerSideProps(context) {
  const { taskId } = context.params;

  const graphqlSchema = `
    query {
      exactlyCollection(collectionId: "${taskId}") {
        _id
        collectionTitle
        collectionColor
        collectionAuthor {
          _id
        }
        tasks {
          _id
          tasksTitle
          tasksItems {
            _id
            taskItemTitle
            done
            deadline
          }
        }
      }
    }
  `;

  const { data } = await UseGraphql(graphqlSchema);

  return {
    props: {
      data: data,
    },
  };
}

export default Tasks;
