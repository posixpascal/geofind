"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
const next_intl_1 = require("next-intl");
const react_1 = __importStar(require("react"));
const UserAvatar_1 = require("@/components/user/UserAvatar");
const FeedbackForm_1 = require("@/components/feedback/FeedbackForm");
const web_1 = require("@react-spring/web");
const trpc_1 = require("@/utils/trpc");
const FeedbackCard_1 = require("@/components/feedback/FeedbackCard");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const PageHeader_1 = require("@/components/layout/PageHeader");
const PageHeaderIcon_1 = require("@/components/layout/PageHeaderIcon");
const Container_1 = require("@/components/layout/Container");
const pick_1 = require("next/dist/lib/pick");
function FeedbackPage() {
    const [skip, setSkip] = (0, react_1.useState)(0);
    const feedback = trpc_1.trpc.feedback.create.useMutation();
    const feedbackQuery = trpc_1.trpc.feedback.list.useQuery({
        skip,
    }, {});
    const t = (0, next_intl_1.useTranslations)("feedback");
    const { scale, opacity } = (0, web_1.useSpring)({
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        config: { mass: 2 },
    });
    const onSubmit = (message, mood, isPublic) => {
        return feedback
            .mutateAsync({
            message,
            mood: mood.icon,
            isPublic,
        })
            .then(() => {
            feedbackQuery.refetch();
        });
    };
    const transitions = (0, web_1.useTransition)(feedbackQuery.isSuccess ? feedbackQuery.data : [], {
        trail: feedbackQuery.isSuccess ? 400 / feedbackQuery.data.length : 0,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
        delay: 300,
    });
    if (feedbackQuery.isLoading || !feedbackQuery.data) {
        return <LoadingSpinner_1.LoadingSpinner isLoading={true}/>;
    }
    return (<Container_1.Container>
      <PageHeader_1.PageHeader title={t("title")} description={t("content")} icon={<PageHeaderIcon_1.PageHeaderIcon icon={"📧"}/>}/>
      <web_1.animated.div style={{ scale, opacity }}>
        <div className="flex items-start my-10 space-x-4">
          <div className="flex-shrink-0">
            <UserAvatar_1.UserAvatar width={64} height={64}/>
          </div>
          <div className="min-w-0 flex-1">
            <FeedbackForm_1.FeedbackForm loading={feedback.isLoading} onSubmit={onSubmit}/>
          </div>
        </div>
      </web_1.animated.div>

      <PageHeader_1.PageHeader title={t("feedback")} description={""}></PageHeader_1.PageHeader>
      {feedbackQuery.data && (<div className={"grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 "}>
          {transitions((style, feedback) => {
                return (<web_1.animated.div style={style} key={feedback.id}>
                <FeedbackCard_1.FeedbackCard feedback={feedback}/>
              </web_1.animated.div>);
            })}
        </div>)}
    </Container_1.Container>);
}
exports.default = FeedbackPage;
const namespaces = ["common", "menu", "feedback"];
const getServerSideProps = async ({ locale, }) => {
    var _a;
    return {
        props: {
            messages: (0, pick_1.pick)((await (_a = `../../public/locales/${locale}.json`, Promise.resolve().then(() => __importStar(require(_a))))).default, namespaces)
        },
    };
};
exports.getServerSideProps = getServerSideProps;
