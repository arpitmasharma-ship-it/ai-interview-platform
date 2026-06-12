interface Props {
  applications: any[];
}

export default function CompanyTrackerTable({
  applications,
}: Props) {
  return (
    <div className="rounded-3xl border p-8">

      <table className="w-full">

        <thead>

          <tr>

            <th>Company</th>

            <th>Role</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {applications.map(
            app => (

              <tr key={app.id}>

                <td>
                  {app.company}
                </td>

                <td>
                  {app.role}
                </td>

                <td>
                  {app.status}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}