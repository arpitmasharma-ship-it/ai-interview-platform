import Link from "next/link";

interface Props {
  company: any;
}

export default function CompanyCard({
  company,
}: Props) {
  return (
    <Link
      href={`/dashboard/placements/${company.id}`}
      className="block rounded-3xl border bg-white p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold">
        {company.companyName}
      </h3>

      <p className="mt-2">
        {company.role}
      </p>

      <p className="mt-2 text-green-600 font-semibold">
        {company.package}
      </p>
    </Link>
  );
}