import { useState, useEffect } from 'react';

let sharedCreators = 2847;

export function useCreatorsCount() {
  const [count, setCount] = useState(sharedCreators);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => {
        const newCount = c + Math.floor(Math.random() * 3) + 1;
        sharedCreators = newCount;
        return newCount;
      });
    }, Math.random() * 7000 + 8000);
    return () => clearInterval(interval);
  }, []);
  
  return count;
}

export default function SocialProof() {
  const creators = useCreatorsCount();
  const [earnings, setEarnings] = useState(1247893);

  useEffect(() => {
    // Randomly update earnings every 5-10 seconds
    const earningsInterval = setInterval(() => {
      setEarnings(prev => prev + Math.floor(Math.random() * 150) + 50);
    }, Math.random() * 5000 + 5000);

    return () => {
      clearInterval(earningsInterval);
    };
  }, []);

  return (
    <section className="container py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl p-6 md:p-8 lg:p-10" style={{ background: 'linear-gradient(135deg, #6675FF 0%, #9A6BFF 100%)' }}>
          <div className="text-center text-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
              Join {creators.toLocaleString()}+ creators who are earning passively
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/20">
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                  {creators.toLocaleString()}+
                </div>
                <div className="text-white/90 text-base md:text-lg">Active Creators</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/20">
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                  ${(earnings / 1000).toFixed(1)}K+
                </div>
                <div className="text-white/90 text-base md:text-lg">Total Earned This Month</div>
              </div>
            </div>
            <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-white/80 text-xs md:text-sm">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Live updates • New creator joins every few minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

