import { isDevelopment } from "@/utils/utils";

const Config = {
  QrExpiredIn: 1000 * 60 * (isDevelopment() ? 0.1 : 2.5),
  DelayCheckTransaction: 1500,
}

export default Config;
