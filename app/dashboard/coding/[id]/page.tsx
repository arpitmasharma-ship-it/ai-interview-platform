import {
  getProblem,
  getSubmissions,
} from "@/actions/coding";

import CodingEditor from "@/components/coding/coding-editor";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(
  props: Props
) {
  const params = await props.params;

  const problem =
    await getProblem(params.id);

  const submissions =
    await getSubmissions(
      params.id
    );

  if (!problem) {
    return (
      <div>
        Problem Not Found
      </div>
    );
  }

  return (
    <CodingEditor
      problem={problem}
      submissions={submissions}
    />
  );
}