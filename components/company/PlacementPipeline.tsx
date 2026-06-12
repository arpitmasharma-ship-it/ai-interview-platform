interface Props {
  applications: any[];
}

export default function PlacementPipeline({
  applications,
}: Props) {

  const applied =
    applications.filter(
      a => a.status === "Applied"
    ).length;

  const oa =
    applications.filter(
      a => a.status === "OA Cleared"
    ).length;

  const interview =
    applications.filter(
      a =>
        a.status ===
        "Interview Scheduled"
    ).length;

  const offer =
    applications.filter(
      a =>
        a.status ===
        "Offer Received"
    ).length;

  return (
    <div className="rounded-3xl border p-8">

      <h2 className="text-2xl font-bold">
        Placement Pipeline
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-4">

        <div>
          Applied: {applied}
        </div>

        <div>
          OA: {oa}
        </div>

        <div>
          Interview: {interview}
        </div>

        <div>
          Offers: {offer}
        </div>

      </div>

    </div>
  );
}