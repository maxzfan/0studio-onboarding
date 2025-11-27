const steps = [
  { title: "apply & verify", desc: "fill out a quick form and join the program." },
  { title: "we build your ai clone", desc: "we train your digital twin with your voice, face, and style." },
  { title: "earn royalties for life", desc: "every time your twin is used in an ad, you get paid." },
];

export default function Steps() {
  return (
    <section className="w-full px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {steps.map((s, i) => (
          <div key={i} className="text-white">
            <h3 className="text-2xl font-light tracking-tight mb-2" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              {i + 1}. {s.title}
            </h3>
            <p className="text-lg font-light text-white/70 ml-7" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

