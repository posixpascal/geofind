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
exports.ExperienceList = void 0;
const trpc_1 = require("@/utils/trpc");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const react_1 = __importStar(require("react"));
// TODO: big bundle, choose treeshakable bundle
const colors_1 = require("@/utils/colors");
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const core_1 = require("echarts/core");
const charts_1 = require("echarts/charts");
const renderers_1 = require("echarts/renderers");
const next_intl_1 = require("next-intl");
(0, core_1.use)([
    charts_1.LineChart,
    renderers_1.CanvasRenderer
]);
const ExperienceList = () => {
    var _a;
    const t = (0, next_intl_1.useTranslations)("experience");
    const chart = (0, react_1.useRef)(null);
    const chartContainer = (0, react_1.useRef)(null);
    const experiences = trpc_1.trpc.profile.experiences.useQuery({});
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    (0, react_1.useEffect)(() => {
        if (!chart.current || !chartContainer.current || !experiences.data) {
            return;
        }
        const chartElement = (0, core_1.init)(chart.current);
        chartElement.setOption({
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                    ...experiences.data.map((exp) => exp.createdAt.toLocaleDateString()),
                    new Date().toLocaleDateString(),
                ],
            },
            tooltip: {},
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "Experience",
                    data: [
                        ...experiences.data
                            .map((exp) => exp.experience)
                            .sort((a, b) => (a > b ? 1 : -1)),
                        user.data.experience,
                    ],
                    type: "line",
                    itemStyle: {
                        color: (0, colors_1.lookupThemeColor)("tertiary"),
                    },
                    areaStyle: {},
                    smooth: true,
                },
            ],
            dataZoom: [
                {
                    type: "inside",
                    start: 60,
                    end: 100,
                },
                {
                    start: 30,
                    end: 60,
                },
            ],
        });
        return () => {
            chartElement.dispose();
        };
    }, [user.data, chartContainer, chart, experiences.data]);
    const expToday = user.data && ((_a = experiences.data) === null || _a === void 0 ? void 0 : _a.length)
        ? user.data.experience - experiences.data[0].experience
        : 0;
    return (<div ref={chartContainer}>
      <h3 className={"font-black text-xl flex justify-between text-card-headline"}>
        {t("overview.title")} <span>{user.data.experience} Exp</span>
      </h3>
      <p className={"text-card-paragraph"}>
        {t("overview.earnedToday", { exp: expToday })}
      </p>
      <div className={"relative"}>
        <canvas width={350} height={350} ref={chart}></canvas>
        <LoadingSpinner_1.LoadingSpinner isLoading={experiences.isLoading}/>
      </div>
    </div>);
};
exports.ExperienceList = ExperienceList;
exports.default = exports.ExperienceList;
