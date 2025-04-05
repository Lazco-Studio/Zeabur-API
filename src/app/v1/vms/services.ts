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
export type CreateVmServiceReturn = {
  ip: string;
  managedId: string;
};
export async function createVmService(
  option: CreateVmServiceOption,
): Promise<CreateVmServiceReturn> {
  const { name, region, plan, password, labels } = option;

  if (name === "failed") {
    throw new ClientError(
      {
        errorMessage: "Failed to create VM",
        errorObject: { name, region, plan, password, labels, test: "true" },
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return {
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

export type GetVmStatusServiceOption = {
  managedId: string;
};
export type GetVmStatusServiceReturn = {
  status: string;
};
export async function getVmStatusService(
  option: GetVmStatusServiceOption,
): Promise<GetVmStatusServiceReturn> {
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

  if (managedId === "status-off") {
    return {
      status: "off",
    };
  }

  return {
    status: "on",
  };
}
