"use client";

import { useRoute } from "@/contexts/route-context";
import {
  YMaps,
  Map as YMap,
  Polyline,
  Placemark,
} from "@iminside/react-yandex-maps";
import { Spinner } from "../ui/spinner";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export function Map() {
  const { points, type } = useRoute();

  // рассчет параметров карты
  const center = (points as number[][])[0];

  // рассчет цвета линии и маркеров
  let color = "";
  switch (type) {
    case "bicycle":
      color = "#00B804";
      break;
    case "pedestrian":
      color = "#0065B8";
      break;
    default:
      color = "#8C8C8C";
      break;
  }

  return (
    <YMaps
      query={{
        lang: "ru_RU",
        apikey: "API_KEY",
      }}
    >
      <div className="w-full h-full">
        <YMap
          defaultState={{
            center,
            zoom: 13,
          }}
          className="w-full h-full"
        >
          <Polyline
            geometry={points as number[][]}
            options={{
              strokeWidth: 4,
              strokeColor: color,
            }}
          />

          {/* точки А и Б */}
          <Placemark
            geometry={(points as number[][])[0]}
            properties={{
              iconContent: "А",
            }}
            options={{ iconColor: color }}
          />
          <Placemark
            geometry={(points as number[][])[(points as number[][]).length - 1]}
            properties={{
              iconContent: "Б",
            }}
            options={{ iconColor: color }}
          />
        </YMap>

        <Empty className="h-full w-full bg-muted/30">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyDescription>Карта загружается...</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </YMaps>
  );
}
