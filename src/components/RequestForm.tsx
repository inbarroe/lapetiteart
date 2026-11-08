"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitRequest, type RequestFormState } from "@/app/contact/actions";
import { eventTypes, locationTypes } from "@/lib/requests/schema";
import { whatsappLink } from "@/lib/site";

const initialState: RequestFormState = { status: "idle" };

const inputClass =
  "mt-1 block w-full rounded-xl border border-brown/25 bg-paper px-4 py-2.5 text-lg focus:border-flag-teal aria-[invalid=true]:border-red-700";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1 text-base text-red-700">
      {errors[0]}
    </p>
  );
}

export function RequestForm() {
  const [state, formAction, pending] = useActionState(submitRequest, initialState);
  const values = state.values ?? {};
  const errors = state.fieldErrors ?? {};
  const [locationType, setLocationType] = useState(values.locationType ?? "");

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl bg-paper p-8 text-center ring-1 ring-brown/10">
        <p className="text-5xl" aria-hidden="true">🎉</p>
        <h2 className="mt-3 font-display text-3xl">תודה! הבקשה התקבלה</h2>
        <p className="mt-3 text-xl text-brown-soft">
          תמי תחזור אליכם בהקדם לשיחה קצרה, כדי לתאם את כל הפרטים.
        </p>
        <Link href="/" className="mt-6 inline-block font-semibold underline-offset-4 hover:underline">
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  // Shared accessibility props for a text field with possible errors.
  const fieldProps = (name: string) => ({
    id: name,
    name,
    defaultValue: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: inputClass,
  });

  return (
    <form action={formAction} noValidate className="space-y-8 rounded-3xl bg-paper p-6 ring-1 ring-brown/10 sm:p-8">
      {state.status === "error" && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">
          <p>{state.message}</p>
          {!state.fieldErrors && (
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold underline">
              שליחת הודעה בוואטסאפ
            </a>
          )}
        </div>
      )}

      {/* Honeypot for bots, hidden from people and screen readers. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          חברה
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset aria-describedby={errors.eventType ? "eventType-error" : undefined}>
        <legend className="font-display text-xl">מה תרצו לעשות? *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {Object.entries(eventTypes).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-brown/20 px-4 py-3 has-[:checked]:border-flag-teal has-[:checked]:bg-flag-mint/20"
            >
              <input
                type="radio"
                name="eventType"
                value={value}
                defaultChecked={values.eventType === value}
                className="h-5 w-5 accent-flag-teal"
              />
              {label}
            </label>
          ))}
        </div>
        <FieldError id="eventType-error" errors={errors.eventType} />
      </fieldset>

      <fieldset aria-describedby={errors.locationType ? "locationType-error" : undefined}>
        <legend className="font-display text-xl">איפה? *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {Object.entries(locationTypes).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-brown/20 px-4 py-3 has-[:checked]:border-flag-teal has-[:checked]:bg-flag-mint/20"
            >
              <input
                type="radio"
                name="locationType"
                value={value}
                defaultChecked={values.locationType === value}
                onChange={() => setLocationType(value)}
                className="h-5 w-5 accent-flag-teal"
              />
              {label}
            </label>
          ))}
        </div>
        <FieldError id="locationType-error" errors={errors.locationType} />

        {locationType === "customer" && (
          <div className="mt-4">
            <label htmlFor="city">באיזו עיר? *</label>
            <input type="text" autoComplete="address-level2" {...fieldProps("city")} />
            <FieldError id="city-error" errors={errors.city} />
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl">פרטי הפעילות</legend>
        <p className="text-base text-brown-soft">לא חובה – אבל עוזר לתמי להכין תשובה.</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredDate">תאריך מועדף</label>
            <input type="date" {...fieldProps("preferredDate")} />
            <FieldError id="preferredDate-error" errors={errors.preferredDate} />
          </div>
          <div>
            <label htmlFor="alternativeDate">תאריך חלופי</label>
            <input type="date" {...fieldProps("alternativeDate")} />
            <FieldError id="alternativeDate-error" errors={errors.alternativeDate} />
          </div>
          <div>
            <label htmlFor="childAge">גיל הילד/ה</label>
            <input type="number" inputMode="numeric" min={1} max={120} {...fieldProps("childAge")} />
            <FieldError id="childAge-error" errors={errors.childAge} />
          </div>
          <div>
            <label htmlFor="kidsCount">מספר משתתפים משוער</label>
            <input type="number" inputMode="numeric" min={1} max={500} {...fieldProps("kidsCount")} />
            <FieldError id="kidsCount-error" errors={errors.kidsCount} />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl">איך לחזור אליכם?</legend>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="parentName">שם *</label>
            <input type="text" autoComplete="name" required {...fieldProps("parentName")} />
            <FieldError id="parentName-error" errors={errors.parentName} />
          </div>
          <div>
            <label htmlFor="phone">טלפון *</label>
            <input type="tel" dir="ltr" autoComplete="tel" required placeholder="050-0000000" {...fieldProps("phone")} />
            <FieldError id="phone-error" errors={errors.phone} />
          </div>
          <div>
            <label htmlFor="email">מייל</label>
            <input type="email" dir="ltr" autoComplete="email" {...fieldProps("email")} />
            <FieldError id="email-error" errors={errors.email} />
          </div>
          <div>
            <label htmlFor="callTime">מתי נוח שתמי תתקשר?</label>
            <input type="text" placeholder="למשל: ערב, אחרי 18:00" {...fieldProps("callTime")} />
            <FieldError id="callTime-error" errors={errors.callTime} />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="notes">עוד משהו שכדאי לדעת?</label>
          <textarea rows={4} {...fieldProps("notes")} />
          <FieldError id="notes-error" errors={errors.notes} />
        </div>
      </fieldset>

      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={values.consent === "on"}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1.5 h-5 w-5 accent-flag-teal"
          />
          <span>
            אני מאשר/ת שתמי תשמור את הפרטים כדי לחזור אליי, בהתאם ל
            <Link href="/privacy" className="underline">
              מדיניות הפרטיות
            </Link>
            . *
          </span>
        </label>
        <FieldError id="consent-error" errors={errors.consent} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brown px-7 py-3.5 text-lg font-semibold text-paper hover:bg-brown/90 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "שולח…" : "שליחת בקשה"}
      </button>
    </form>
  );
}
