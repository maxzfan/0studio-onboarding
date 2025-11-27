import { useEffect, useState } from 'react'
import { renderCanvas } from '../components/ui/canvas'

export default function Apply() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [vibes, setVibes] = useState([]);
  const [otherVibe, setOtherVibe] = useState('');
  const [videoPrompt, setVideoPrompt] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    renderCanvas();
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateAge = (birthday) => {
    if (!birthday) return false;
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const handleNext = () => {
    if (step === 0) {
      setErrors({});
      setStep(1);
    } else if (step === 1) {
      if (!name.trim()) {
        setErrors({ ...errors, name: true });
      } else {
        setErrors({});
        setStep(2);
      }
    } else if (step === 2) {
      if (!email.trim()) {
        setErrors({ email: 'empty' });
      } else if (!validateEmail(email)) {
        setErrors({ email: 'invalid' });
      } else {
        setErrors({});
        setStep(3);
      }
    } else if (step === 3) {
      if (!birthday.trim()) {
        setErrors({ birthday: 'empty' });
      } else if (!validateAge(birthday)) {
        setErrors({ birthday: 'underage' });
      } else {
        setErrors({});
        setStep(4);
      }
    } else if (step === 4) {
      if (!instagram.trim() && !tiktok.trim()) {
        setErrors({ socialMedia: true });
      } else {
        setErrors({});
        setStep(5);
      }
    } else if (step === 5) {
      if (vibes.length === 0) {
        setErrors({ vibe: true });
      } else {
        setErrors({});
        setStep(6);
      }
    } else if (step === 6) {
      if (!videoPrompt) {
        setErrors({ videoPrompt: true });
      } else {
        setErrors({});
        // Submit the form data
        submitApplication();
      }
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const formData = {
        name,
        email,
        birthday,
        instagram,
        tiktok,
        vibes,
        otherVibe,
        videoFileName: videoPrompt ? videoPrompt.name : null
      };

      // Check if we're in development mode
      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDev) {
        // In development, just log the data and simulate success
        console.log('=== FORM SUBMISSION (DEV MODE) ===');
        console.log('This would be emailed to: cik@mit.edu, rhahami@gmail.com, maxfan070601@gmail.com');
        console.log('Form Data:', formData);
        console.log('====================================');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Move to thank you page
        setStep(7);
        return;
      }

      // Production: send to API
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Submission error:', errorData);
        throw new Error('Failed to submit application');
      }

      // Move to thank you page
      setStep(7);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [step, name, birthday, email, instagram, tiktok, vibes, otherVibe, videoPrompt]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black relative">
      <canvas
        className="pointer-events-none fixed inset-0 z-0"
        id="canvas"
      ></canvas>
      
      <div className="flex flex-col items-center gap-12 z-10">
        {step === 0 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              we're excited to have you join the adari family!
            </h1>
            
            <div className="min-h-[60px] flex items-start justify-center pt-0">
              <button 
                onClick={handleNext}
                className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
              >
                &gt;
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              what is your name?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>[</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: false });
                    }}
                    className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                    style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                    placeholder="your name"
                    autoFocus
                  />
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.name && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    please enter your name
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              what is your email address?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>[</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: false });
                    }}
                    className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                    style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                    placeholder="your email"
                    autoFocus
                  />
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.email === 'empty' && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    please enter your email address
                  </p>
                )}
                {errors.email === 'invalid' && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    please enter a valid email address
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              what is your birthday?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>[</span>
                  <div className="flex items-center justify-center min-w-[400px]">
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) => {
                        setBirthday(e.target.value);
                        setErrors({ ...errors, birthday: false });
                      }}
                      className="bg-transparent border-none text-white text-xl font-light tracking-wide focus:outline-none"
                      style={{ 
                        fontFamily: 'Segoe UI, sans-serif', 
                        fontWeight: 300,
                        colorScheme: 'dark'
                      }}
                      autoFocus
                    />
                  </div>
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.birthday === 'empty' && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    please enter your birthday
                  </p>
                )}
                {errors.birthday === 'underage' && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    you must be at least 18 years of age to apply to adari
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              what are your social media links?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &lt;
                </button>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>[</span>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => {
                        setInstagram(e.target.value);
                        setErrors({ ...errors, socialMedia: false });
                      }}
                      className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                      style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                      placeholder="instagram"
                      autoFocus
                    />
                    <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>]</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>[</span>
                    <input
                      type="text"
                      value={tiktok}
                      onChange={(e) => {
                        setTiktok(e.target.value);
                        setErrors({ ...errors, socialMedia: false });
                      }}
                      className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                      style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                      placeholder="tiktok"
                    />
                    <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>]</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.socialMedia && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    please enter at least one social media link
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              what is your vibe? select all that apply.
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &lt;
                </button>
                
                <div className="flex flex-col gap-3 min-w-[400px]">
                  {['beauty / skincare', 'fitness / health', 'fashion / lifestyle', 'food / travel', 'education / motivation', 'tech / gaming', 'comedy / entertainment'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={vibes.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setVibes([...vibes, option]);
                            } else {
                              setVibes(vibes.filter(v => v !== option));
                            }
                            setErrors({ ...errors, vibe: false });
                          }}
                          className="w-5 h-5 bg-transparent border border-white/30 rounded appearance-none cursor-pointer checked:bg-white checked:border-white transition-all"
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        />
                        {vibes.includes(option) && (
                          <svg className="absolute left-0 top-0 w-5 h-5 pointer-events-none" viewBox="0 0 20 20" fill="none">
                            <path d="M6 10l2 2 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                        {option}
                      </span>
                    </label>
                  ))}
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={vibes.includes('other') || otherVibe !== ''}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setVibes([...vibes, 'other']);
                            setOtherVibe('');
                          } else {
                            setVibes(vibes.filter(v => v !== 'other'));
                            setOtherVibe('');
                          }
                          setErrors({ ...errors, vibe: false });
                        }}
                        className="w-5 h-5 bg-transparent border border-white/30 rounded appearance-none cursor-pointer checked:bg-white checked:border-white transition-all"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none'
                        }}
                      />
                      {(vibes.includes('other') || otherVibe !== '') && (
                        <svg className="absolute left-0 top-0 w-5 h-5 pointer-events-none" viewBox="0 0 20 20" fill="none">
                          <path d="M6 10l2 2 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {vibes.includes('other') || otherVibe !== '' ? (
                      <input
                        type="text"
                        value={otherVibe}
                        onChange={(e) => {
                          setOtherVibe(e.target.value);
                          if (!vibes.includes('other')) {
                            setVibes([...vibes, 'other']);
                          }
                          setErrors({ ...errors, vibe: false });
                        }}
                        className="bg-transparent border-none text-white text-lg font-light tracking-wide focus:outline-none"
                        style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                        placeholder="please specify"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                        other
                      </span>
                    )}
                  </label>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.vibe === true && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    please select at least one category
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              answer in a video: you just woke up with $100 million in your bank account and never have to work again...
            </h1>
            
            <div className="flex flex-col items-center gap-12 min-h-[60px] justify-start">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white/80 text-lg font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    what would you do everyday?
                  </p>
                  <p className="text-white/80 text-lg font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    how would you spend your time (and the money)?
                  </p>
                  <p className="text-white/80 text-lg font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                    paint the picture — where are you, who's with you, what's your vibe?
                  </p>
                </div>
                
                <p className="text-white/40 text-sm font-light tracking-wide text-center max-w-xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                  use good lighting, keep your camera still, and film vertical.
                  <br />
                  please keep videos under 1 minute long.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-2 min-h-[60px] justify-start">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleBack}
                    className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                    style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                  >
                    &lt;
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>[</span>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          setVideoPrompt(e.target.files[0]);
                          setErrors({ ...errors, videoPrompt: false });
                        }}
                        className="hidden"
                      />
                      <span className="text-white text-xl font-light tracking-wide text-center min-w-[400px] inline-block" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                        {videoPrompt ? videoPrompt.name : 'upload video'}
                      </span>
                    </label>
                    <span className="text-white text-xl font-light" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>]</span>
                  </div>
                  
                  <button 
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
                  >
                    {isSubmitting ? '...' : '>'}
                  </button>
                </div>
                
                <div className="h-6 mt-2">
                  {errors.videoPrompt && (
                    <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                      please upload your video
                    </p>
                  )}
                  {submitError && (
                    <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                      error submitting application. please try again.
                    </p>
                  )}
                  {isSubmitting && (
                    <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                      submitting your application...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              thanks for applying!
            </h1>
            
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/80 text-lg font-light tracking-wide text-center max-w-2xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
                within 48 hours, you'll receive an email from us with the details of your contract/thank-you bonus. we do not have permission to use your likeness yet. we hope to see you soon!
              </p>
              
              <a 
                href="/creator"
                className="text-white text-xl font-light tracking-wide hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
              >
                go back
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
