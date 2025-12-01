// UI

// Части профиля
import { Header } from "./header";

// SA
import { getProfile } from "@/actions/profile";

export async function Profile() {
  const res = await getProfile();

  if (!res.ok) {
    return <p>Произошла ошибка: {res.error}</p>;
  }

  return (
    <>
      <Header profile={res.data} />
    </>
  );
}
