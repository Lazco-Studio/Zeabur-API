import { VmPlans } from "../../types/vm";

export const plans: Record<
  VmPlans,
  {
    cores: number;
    memory: number;
    disk: number;
  }
> = {
  [VmPlans.A]: {
    cores: 1,
    memory: 2048,
    disk: 50,
  },
  [VmPlans.B]: {
    cores: 2,
    memory: 4096,
    disk: 80,
  },
  [VmPlans.C]: {
    cores: 4,
    memory: 8192,
    disk: 140,
  },
  [VmPlans.D]: {
    cores: 8,
    memory: 16384,
    disk: 320,
  },
};
