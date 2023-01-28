import Link from "next/link";
import { decode } from "jsonwebtoken";
import * as cookie from "cookie";

// ========== Layout ========== \\
import BodyLayout from "../layout/body.layout";

// ========== UIElement ========== \\
import { PrimaryButton, SecondaryButton } from "../UIElements/ui.elements";

// ========== Helper ========== \\
import { UseGraphql } from "../helper/request.helper";

const Dashboard = ({ data }) => {
  const { username } = data.exactlyUser;
  const hour = new Date().getHours();
  const dayPeriod = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";

  return (
    <BodyLayout pageTitle="Dashboard">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl text-white font-normal">Good {dayPeriod},</h1>
          <h1 className="text-4xl text-white font-normal">{username}</h1>
        </div>
        <div className="flex w-full gap-3 lg:flex-row flex-col">
          <Link href="/collections" className="w-full">
            <PrimaryButton>My Collection</PrimaryButton>
          </Link>
          <Link href="/profile" className="w-full">
            <SecondaryButton>My Account</SecondaryButton>
          </Link>
        </div>
      </div>
    </BodyLayout>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const { token } = await cookie.parse(context.req.headers.cookie);
  const payload = await decode(token);

  const graphqlSchema = `
  query {
    exactlyUser(id: "${payload.id}") {
      username
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
