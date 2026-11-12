"use client";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "WON Bridge has transformed our operations. Real-time data, accurate weighing and easy reporting have improved our productivity and transparency.",
    name: "Ramesh Kumar",
    role: "Operations Head, Superior Mining",
  },
  {
    quote: "The automation features saved us countless hours of manual data entry. Our accuracy rate has never been this high before.",
    name: "Priya Sharma",
    role: "Fleet Manager, Bharat Aggregates",
  },
  {
    quote: "Excellent support team and a very intuitive platform. Setting up across 5 locations was seamless with WON Bridge.",
    name: "Arvind Nair",
    role: "Director, Nair Cement Works",
  },
  {
    quote: "Cloud-based access means I can monitor all my sites from anywhere. It's exactly what we needed for our growing operations.",
    name: "Sunita Reddy",
    role: "CEO, Reddy Stone Industries",
  },
];

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [quoteHeight, setQuoteHeight] = useState<number | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // Measure the tallest quote after mount
  useEffect(() => {
    if (!measureRef.current) return;
    const children = Array.from(measureRef.current.children) as HTMLElement[];
    const max = Math.max(...children.map((el) => el.offsetHeight));
    setQuoteHeight(max);
  }, []);

  const goTo = (index: number) => {
    setActiveSlide((index + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white">
      {/* Hidden measurement container — renders all quotes off-screen */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute pointer-events-none w-full max-w-3xl px-4 sm:px-6 lg:px-8"
        style={{ top: -9999, left: 0 }}
      >
        {testimonials.map((t, i) => (
          <p
            key={i}
            className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed"
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-8">
          What Our Customers Say
        </p>

        <div className="text-orange-200 mb-6">
          <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Fixed height locked to tallest quote */}
        <div
          className="flex items-center justify-center mb-8 overflow-hidden"
          style={{ height: quoteHeight ?? "auto" }}
        >
          <blockquote className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed">
            &ldquo;{testimonials[activeSlide].quote}&rdquo;
          </blockquote>
        </div>

        <p className="font-bold text-gray-900">{testimonials[activeSlide].name}</p>
        <p className="text-sm text-gray-500 mt-1">{testimonials[activeSlide].role}</p>

        {/* Prev / Dots / Next */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => goTo(activeSlide - 1)}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === activeSlide ? "w-5 h-3 bg-orange-500" : "w-3 h-3 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(activeSlide + 1)}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;