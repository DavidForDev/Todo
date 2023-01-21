import { decode } from "jsonwebtoken";
import * as cookie from "cookie";
import Link from "next/link";

// ========== Layout ========== \\
import BodyLayout from "../layout/body.layout";
import UseModal from "../layout/useModal";

// ========== Components ========== \\
import Navigation from "../components/navigation/navigation";
import CollectionCard from "../components/collectionCard/collectionCard";
import CollectionForm from "../components/forms/creator/collectionCreator.form";

// ========== Helper ========== \\
import { UseGraphql } from "../helper/request.helper";

// ========== UIEelement ========== \\
import { SecondaryButton } from "../UIElements/ui.elements";

// ========== Icons ========== \\
import PlusSvg from "../public/icons/plus";

const Collections = ({ data }) => {
  const { collections } = data.exactlyUser;

  return (
    <BodyLayout pageTitle="Collections" moreFunction={true}>
      <section className="grid lg:grid-cols-3 gap-4 w-full grid-cols-2">
        {collections.map((el, index) => {
          return (
            <Link key={index} href={`/tasks/${el._id}`}>
              <CollectionCard key={index} data={el} />
            </Link>
          );
        })}
        <SecondaryButton
          aria-label="#collectionCreator"
          className="w-full p-6 rounded-2xl cursor-pointer flex justify-center items-center border-2 border-solid h-20 border-[#21212B]"
        >
          <PlusSvg />
        </SecondaryButton>
      </section>
      <UseModal modalName="collectionCreator">
        <CollectionForm />
      </UseModal>
    </BodyLayout>
  );
};

export default Collections;

export async function getServerSideProps(context) {
  const { token } = await cookie.parse(context.req.headers.cookie);

  const payload = await decode(token);

  const graphqlSchema = `
    query {
      exactlyUser(id: "${payload.id}") {
        collections {
          _id
          collectionTitle
          collectionColor
          doneString
          donePrecent
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

// this function gives us opportunity to control navigation and sideNavigation in the every page
Collections.appLayout = (page) => {
  return (
    <>
      <header className="w-full">
        <Navigation />
      </header>
      <main className="flex w-full h-full">
        <div className="p-5 w-full h-full overflow-auto">{page}</div>
      </main>
    </>
  );
};
