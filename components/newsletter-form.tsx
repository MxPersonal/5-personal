"use client";

import { useState } from "react";
import { Icon } from "./icon";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  return (
    <form onSubmit={(event) => { event.preventDefault(); setMessage("فرم آماده است؛ سرویس ایمیل در مرحله زیرساخت متصل می‌شود."); }}>
      <label className="sr-only" htmlFor="newsletter-email">ایمیل شما</label>
      <input id="newsletter-email" name="email" type="email" placeholder="ایمیل شما" required/>
      <button type="submit" aria-label="عضویت در خبرنامه"><Icon name="arrow"/></button>
      {message && <span className="newsletter-message" role="status">{message}</span>}
    </form>
  );
}
