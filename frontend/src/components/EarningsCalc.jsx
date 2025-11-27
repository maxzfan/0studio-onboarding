import { useState } from 'react';

export default function EarningsCalc() {
  const [totalAds, setTotalAds] = useState(200);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const avgEarningPerAd = 75;
  const totalEarnings = totalAds * avgEarningPerAd;
  const maxAds = 300;

  const handleSliderChange = (e) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setTotalAds(Number(e.target.value));
  };

  const handleSliderInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
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
                when you appear in
              </div>
              <div className="text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                {totalAds} ads /mo
              </div>
            </div>
            <div className="relative select-auto">
              {!hasInteracted && (
                <div 
                  className="absolute -top-6 flex items-center gap-1 pointer-events-none z-20"
                  style={{
                    left: `calc(${(totalAds / maxAds) * 100}% - 4px)`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <input
                type="range"
                min="0"
                max="300"
                value={totalAds}
                onChange={handleSliderChange}
                onMouseDown={handleSliderInteraction}
                onTouchStart={handleSliderInteraction}
                onInput={handleSliderChange}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer focus:outline-none relative z-50 select-auto"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(totalAds / 300) * 100}%, rgba(255,255,255,0.2) ${(totalAds / 300) * 100}%, rgba(255,255,255,0.2) 100%)`,
                  pointerEvents: 'auto',
                  isolation: 'isolate',
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

