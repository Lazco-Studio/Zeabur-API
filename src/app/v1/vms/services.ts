import { ClientError } from "../../../../modules/clientError";
import { HttpStatus } from "../../../../modules/http/statusCodes";
import { VmRegions, VmPlans } from "../../../../types/vm";

export type CreateVmServiceOption = {
  name: string;
  region: VmRegions;
  plan: VmPlans;
  password: string;
  labels: Record<string, string>;
};
export async function createVmService(option: CreateVmServiceOption) {
  return {
    option,
    ip: "127.0.0.1",
    managedId: "123",
  };
}

export type DeleteVmServiceOption = {
  managedId: string;
};
export async function deleteVmService(option: DeleteVmServiceOption) {
  const { managedId } = option;

  if (managedId === "failed") {
    throw new ClientError(
      {
        errorMessage: "Failed to delete VM",
        errorObject: { managedId, test: "true" },
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  return true;
}
