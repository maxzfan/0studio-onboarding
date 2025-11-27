import { useState, useEffect, useRef } from 'react';

export default function EarningsCalc() {
  const [totalAds, setTotalAds] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const animationRef = useRef(null);
  
  const avgEarningPerAd = 75;
  const totalEarnings = totalAds * avgEarningPerAd;
  const maxAds = 300;

  useEffect(() => {
    if (isUserInteracting) return;

    let startTime = Date.now();
    const cycleDuration = 8000; // 8 seconds for full cycle (0 -> 300 -> 0)

    const animate = () => {
      if (isUserInteracting) return;
      
      const elapsed = (Date.now() - startTime) % cycleDuration;
      const progress = elapsed / cycleDuration;
      
      // Use sine wave for smooth acceleration/deceleration
      // sine goes from 0 to 1 to 0 in one cycle
      const sineValue = Math.sin(progress * Math.PI);
      const currentValue = Math.round(sineValue * maxAds);
      
      setTotalAds(currentValue);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isUserInteracting, maxAds]);

  const handleSliderChange = (e) => {
    setIsUserInteracting(true);
    setTotalAds(Number(e.target.value));
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <section className="w-full px-4 relative z-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-white space-y-6">
          <h3 className="text-2xl font-light tracking-tight" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
            how much can you make?
          </h3>
          
          <div className="text-5xl font-light tracking-tight" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
            ${totalEarnings.toLocaleString('en-US')} /mo
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-lg font-light text-white/70" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                number of ads you appear in
              </div>
              <div className="text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                {totalAds} ads/month
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={totalAds}
              onChange={handleSliderChange}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer focus:outline-none relative z-10"
              style={{
                background: `linear-gradient(to right, white 0%, white ${(totalAds / 300) * 100}%, rgba(255,255,255,0.2) ${(totalAds / 300) * 100}%, rgba(255,255,255,0.2) 100%)`,
                pointerEvents: 'auto'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

