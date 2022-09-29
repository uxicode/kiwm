import { NoticeRoute } from '@/router/appSettings/notice';
import { FaqRoute } from '@/router/appSettings/faq';
import { TermsRoute } from "@/router/appSettings/terms";
import { VersionRoute } from "@/router/appSettings/version";


export const AppSettingsRoute = [
  ...NoticeRoute,
  ...FaqRoute,
  ...VersionRoute,
  ...TermsRoute
];
