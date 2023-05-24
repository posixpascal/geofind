import { trpc } from "@/utils/trpc";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import React, { useEffect, useRef } from "react";
// TODO: big bundle, choose treeshakable bundle
import { lookupThemeColor } from "@/utils/colors";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { init, use } from "echarts/core";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useTranslations } from "next-intl";

use([LineChart, CanvasRenderer]);

export const ExperienceList = () => {
  const t = useTranslations("experience");
  const chart = useRef<HTMLCanvasElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const experiences = trpc.profile.experiences.useQuery({});
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!chart.current || !chartContainer.current || !experiences.data) {
      return;
    }

    const chartElement = init(chart.current!);
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
            user.data!.experience,
          ],
          type: "line",
          itemStyle: {
            color: lookupThemeColor("tertiary"),
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
  }, [user.data!, chartContainer, chart, experiences.data]);

  const expToday =
    user.data! && experiences.data?.length
      ? user.data!.experience! - experiences.data[0].experience
      : 0;

  return (
    <div ref={chartContainer}>
      <h3
        className={"font-black text-xl flex justify-between text-card-headline"}
      >
        {t("overview.title")} <span>{user.data!.experience} Exp</span>
      </h3>
      <p className={"text-card-paragraph"}>
        {t("overview.earnedToday", { exp: expToday })}
      </p>
      <div className={"relative"}>
        <canvas width={350} height={350} ref={chart}></canvas>
        <LoadingSpinner isLoading={experiences.isLoading} />
      </div>
    </div>
  );
};

export default ExperienceList;
