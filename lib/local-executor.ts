import vm from "node:vm";

export async function executeCode(
  code: string
) {
  try {
    const sandbox = {
      result: null,
    };

    vm.createContext(sandbox);

    vm.runInContext(
      code,
      sandbox,
      {
        timeout: 2000,
      }
    );

    return {
      output:
        sandbox.result ??
        "Executed Successfully",
    };
  } catch (error) {
    return {
      output: String(error),
    };
  }
}