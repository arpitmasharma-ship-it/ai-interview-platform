interface Props {
  dreamCompanies: boolean;
  productCompanies: boolean;
  serviceCompanies: boolean;
}

export default function CompanyPredictionCard({
  dreamCompanies,
  productCompanies,
  serviceCompanies,
}: Props) {
  return (
    <div className="rounded-3xl border p-8">

      <h2 className="text-2xl font-bold">
        Company Prediction
      </h2>

      <div className="mt-6 space-y-4">

        <p>
          Dream Companies:
          {dreamCompanies ? " ✅" : " ❌"}
        </p>

        <p>
          Product Companies:
          {productCompanies ? " ✅" : " ❌"}
        </p>

        <p>
          Service Companies:
          {serviceCompanies ? " ✅" : " ❌"}
        </p>

      </div>

    </div>
  );
}