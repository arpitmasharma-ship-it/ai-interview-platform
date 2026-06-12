interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({
  params,
}: Props) {
  const { username } = await params;

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        {username}
      </h1>
    </main>
  );
}