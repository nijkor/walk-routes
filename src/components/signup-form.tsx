'use client'
import { useActionState, useEffect } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { ChevronRightIcon } from "lucide-react";

import { register } from "@/actions/auth";

import { toast } from "sonner";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [state, action, isPending] = useActionState(register, undefined);

  useEffect(() => {
    if (!state?.ok && state?.error) {
      toast.error(state.error);
    }

    if (state?.ok) {
      toast.success('Отправили Вам на почту письмо с сылкой для подтверждения аккаунта. Если не нашли письмо, то проверьте папку "Спам"');
    }
  }, [state]);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Введите информацию о Вас ниже, чтобы создать аккаунт.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Имя и фамилия</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Василий Пупкин"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Почта</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={state?.fields?.email}
                required
              />
              <FieldDescription>
                Почта будет использоваться для входа в аккаунт и для его верификации.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
              <FieldDescription>
                Не менее 8 символов.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Повторите пароль
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button disabled={isPending} type="submit">
                  Создать аккаунт
                  <ChevronRightIcon />
                </Button>

                <FieldDescription className="px-6 text-center">
                  Уже зарегистрированы? <Link href="/auth/login">Войти</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
