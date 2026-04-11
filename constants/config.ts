import { isDevelopment } from "@/utils/utils";

const Config = {
  QrExpiredIn: 1000 * 60 * (isDevelopment() ? 1.5 : 1.5),
  DelayCheckTransaction: 1500,
}

export default Config;
