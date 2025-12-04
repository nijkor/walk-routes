"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

// компоненты формы
import { RouteConstructor } from "./route-counstructor";

type RouteType = "pedestrian" | "bicycle";

export function NewRouteForm() {
  // состояние формы
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<RouteType>("pedestrian");
  const [points, setPoints] = useState<number[][]>([]);

  const handleTypeChange = (val: string) => setType(val as RouteType);

  return (
    <>
      <FieldSet>
        <FieldLegend>Основная информация о маршруте</FieldLegend>
        <FieldDescription>
          Укажите название маршрута и краткое описание, чтобы пользователи могли
          быстро понять его тематику и особенности.
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="route-name">Название</FieldLabel>
            <Input
              id="route-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="route-description">
              Краткое описание
            </FieldLabel>
            <Textarea
              id="route-description"
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </Textarea>
          </Field>
          <Field>
            <FieldLabel>Тип маршрута</FieldLabel>
            <RadioGroup value={type} onValueChange={handleTypeChange}>
              <Field orientation="horizontal">
                <RadioGroupItem value="pedestrian" id="type-pedestrian" />
                <FieldLabel htmlFor="type-pedestrian">Пешеходный</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="bicycle" id="type-bicycle" />
                <FieldLabel htmlFor="type-bicycle">Велосипедный</FieldLabel>
              </Field>
            </RadioGroup>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Карта маршрута</FieldLegend>
        <FieldDescription>
          Используйте карту, чтобы отметить ключевые точки и построить линию
          маршрута. Это позволит пользователям визуально ориентироваться и
          заранее оценить путь.
        </FieldDescription>

        <Field>
          <RouteConstructor points={points} setPoints={setPoints} />
        </Field>
      </FieldSet>

      <FieldSeparator />

      <Field>
        <Button
          variant="outline"
          className="hover:-translate-y-1 focus:scale-125 sm:focus:scale-100 sm:active:scale-125 duration-500 rounded-full"
        >
          Отправить
        </Button>
      </Field>

      <pre>
        {JSON.stringify(
          {
            name,
            description,
            type,
            points,
          },
          null,
          2,
        )}
      </pre>
    </>
  );
}
