import { notFound } from "next/navigation";
import { GET__getProfileByHandle } from "@/lib/data-service";
import Container from "@/components/wrappers/Container";
import Bounded from "@/components/wrappers/Bounded";

export default async function ProfilePage({ params }) {
  params = await params;
  let { profile } = params;
  const starting = profile.slice(0, 3);
  if (starting !== "%40") {
    return notFound();
  }
  profile = profile.split("%40")[1];
  const data = await GET__getProfileByHandle(profile);
  console.log(data);
  if (!data.profile) {
    return notFound();
  }
  return (
    <Bounded className="b__size-md">
      <Container>
        Hello {data?.profile?.first_name} {data?.profile?.last_name}
      </Container>
    </Bounded>
  );
}
