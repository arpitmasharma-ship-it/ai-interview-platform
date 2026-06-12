interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlacementDetailsPage(
  { params }: PageProps
) {
  const { id } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Placement Details
      </h1>

      <p className="mt-2 text-gray-500">
        Placement ID: {id}
      </p>
    </div>
  );
}