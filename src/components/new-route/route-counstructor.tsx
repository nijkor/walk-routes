"use client";

import { Activity, type Dispatch, type SetStateAction, useState } from "react";

// яндекс карты
import { YMaps, Map, Polyline, Placemark } from "@iminside/react-yandex-maps";

// UI
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { Delete, Trash2Icon } from "lucide-react";

type Props = {
  points: number[][];
  setPoints: Dispatch<SetStateAction<number[][]>>;
};

export function RouteConstructor({ points, setPoints }: Props) {
  const handleMapClick = (e: ymaps.MapEvent) => {
    const coords: number[] = e.get("coords");
    setPoints((prev) => [...prev, coords]);
  };

  const clearLine = () => setPoints([]);
  const removeLastPoint = () =>
    setPoints((prev) => prev.slice(0, Math.max(prev.length - 1, 0)));

  return (
    <YMaps
      query={{
        apikey: "ВАШ_API_KEY",
        lang: "ru_RU",
      }}
    >
      <div style={{ width: "100%", height: 500 }}>
        <Map
          defaultState={{
            center: [55.751574, 37.573856], // Москва
            zoom: 9,
          }}
          onClick={handleMapClick}
          className="w-full h-full"
        >
          {/* Ломаная линия по кликам */}
          <Activity mode={points.length > 1 ? "visible" : "hidden"}>
            <Polyline
              geometry={points}
              options={{
                strokeColor: "#00a6f4",
                strokeWidth: 4,
                strokeOpacity: 0.9,
              }}
            />
          </Activity>

          {/* маркеры на крайних точках */}
          <Activity mode={points.length > 0 ? "visible" : "hidden"}>
            <Placemark
              geometry={points[0]!}
              properties={{ iconContent: "A" }}
              options={{
                iconColor: "#00a6f4",
              }}
            />
          </Activity>
          <Activity mode={points.length > 1 ? "visible" : "hidden"}>
            <Placemark
              geometry={points[points.length - 1]!}
              properties={{ iconContent: "B" }}
              options={{
                iconColor: "#00a6f4",
              }}
            />
          </Activity>
        </Map>
      </div>

      <Field className="mt-4" orientation="responsive">
        <Button
          variant="outline"
          onClick={removeLastPoint}
          disabled={points.length < 2}
        >
          <Delete />
          Удалить последнюю точку
        </Button>
        <Button
          variant="destructive"
          onClick={clearLine}
          disabled={points.length === 0}
        >
          <Trash2Icon />
          Очистить линию
        </Button>
      </Field>
    </YMaps>
  );
}
