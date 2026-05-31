'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 6,
  border: "1px solid var(--border)",
  background: "#fff",
  fontSize: 14,
  fontFamily: "var(--font-dm-sans), sans-serif",
  color: "var(--navy)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--navy)",
  marginBottom: 6,
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Submit to the static form definition in /public/__forms.html so
      // @netlify/plugin-nextjs@5 routes the submission to Netlify Forms.
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      })

      if (!res.ok) throw new Error(`Submission failed: ${res.status}`)

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: "center", padding: "32px 8px" }}>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.03em", color: "var(--navy)", marginBottom: 10 }}>
          Thanks — Message Sent!
        </h3>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
          We&apos;ve received your message and will get back to you — usually the same business day.
        </p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ display: "none" }}>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="svc-grid-responsive">
        <div>
          <label style={labelStyle} htmlFor="name">Name</label>
          <input style={inputStyle} type="text" id="name" name="name" required />
        </div>
        <div>
          <label style={labelStyle} htmlFor="business">Business</label>
          <input style={inputStyle} type="text" id="business" name="business" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="svc-grid-responsive">
        <div>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input style={inputStyle} type="email" id="email" name="email" required />
        </div>
        <div>
          <label style={labelStyle} htmlFor="phone">Phone</label>
          <input style={inputStyle} type="tel" id="phone" name="phone" />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle} htmlFor="message">What would you like to grow?</label>
        <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} id="message" name="message" required />
      </div>
      {status === 'error' && (
        <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 14 }}>
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{ width: "100%", background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 6, border: "none", cursor: status === 'submitting' ? 'not-allowed' : 'pointer', opacity: status === 'submitting' ? 0.6 : 1 }}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message →'}
      </button>
    </form>
  )
}
