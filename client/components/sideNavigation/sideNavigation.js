import { useEffect, useState } from "react";
import Link from "next/link";
import { decode } from "jsonwebtoken";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

// ========== Helper ========== \\
import { UseGraphql } from "../../helper/request.helper";

// ========== Component ========== \\
import List from "./list";

async function getCollection() {
  const cookie = new Cookies();
  const token = cookie.get("token");

  const payload = await decode(token);

  const graphqlSchema = `
    query {
      exactlyUser(id: "${payload.id}") {
        collections {
          _id
          collectionTitle
          collectionColor
        }
      }
    }
  `;

  const { data } = await UseGraphql(graphqlSchema);

  return data;
}

const SideNavigation = (props) => {
  const [collection, setCollection] = useState([]);
  const { side } = props;

  const router = useRouter();
  const { taskId } = router.query;

  const fetchData = async () => {
    const data = await getCollection();
    setCollection(data.exactlyUser.collections);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`h-full ${
        side ? "lg:w-64 w-0" : "lg:w-0 w-64"
      } duration-500 bg-[#21212B] overflow-auto`}
    >
      <h3 className="text-base text-white font-semibold py-4 px-5 pt-8">
        Collections
      </h3>
      <ul className="flex flex-col">
        {collection.map((el, index) => {
          return (
            <Link key={index} href={`/tasks/${el._id}`}>
              <List key={index} data={el} taskId={taskId} />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNavigation;
