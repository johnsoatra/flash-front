import { isDevelopment } from "@/utils/utils";

const Config = {
  QrExpiredIn: 1000 * 60 * (isDevelopment() ? 10 : 2.5),
}

export default Config;
