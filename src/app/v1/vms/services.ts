import { VmRegions, VmPlans } from "../../../../types/vm";

export type CreateVmsServiceOption = {
  name: "string";
  region: VmRegions;
  plan: VmPlans;
  password: "string";
  labels: Record<string, string>;
};
export async function createVmsService(option: CreateVmsServiceOption) {
  return {
    option,
    ip: "127.0.0.1",
    managedId: "123",
  };
}
