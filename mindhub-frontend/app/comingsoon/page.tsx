'use client'

import { useState } from 'react'

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email sent")

    try {
      const res = await fetch('https://formspree.io/f/movwrdga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        console.log('Email submitted:', email)
        setSubmitted(true)
      } else {
        console.error('Formspree submission failed')
        alert('Submission failed. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting to Formspree:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">We&apos;re Launching Soon!</h1>
      <p className="text-lg mb-6">Leave your email and be the first to know when we go live.</p>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-72"
            required
          />
          <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
            Notify Me
          </button>
        </form>
      ) : (
        <p className="text-green-600 text-lg">Thank you! We&apos;ll be in touch soon.</p>
      )}
    </main>
  )
}
