import { ClientError } from "../../../../modules/clientError";
import { HttpStatus } from "../../../../modules/http/statusCodes";
import { VmRegions, VmPlans, VmPowerActions } from "../../../../types/vm";

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

  if (managedId === "not-found") {
    throw new ClientError(
      {
        errorMessage: "VM not found",
        errorObject: { managedId, test: "true" },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  return true;
}

export type OperateVmPowerServiceOption = {
  managedId: string;
  action: VmPowerActions;
};
export async function operateVmPowerService(
  option: OperateVmPowerServiceOption,
) {
  const { managedId, action } = option;

  if (managedId === "not-found") {
    throw new ClientError(
      {
        errorMessage: "VM not found",
        errorObject: { managedId, action, test: "true" },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  return true;
}
