import { VmRegions, VmPlans } from "../../../../types/vm";

export type CreateVmServiceOption = {
  name: "string";
  region: VmRegions;
  plan: VmPlans;
  password: "string";
  labels: Record<string, string>;
};
export async function createVmService(option: CreateVmServiceOption) {
  return {
    option,
    ip: "127.0.0.1",
    managedId: "123",
  };
}
