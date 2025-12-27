import { useEffect, useState } from 'react'
import { renderCanvas } from '../components/ui/canvas'
import emailjs from '@emailjs/browser'

// EmailJS Configuration - Replace these with your actual values from emailjs.com
const EMAILJS_SERVICE_ID = 'service_80nvv2p'
const EMAILJS_TEMPLATE_ID = 'template_gcivxum'
const EMAILJS_PUBLIC_KEY = 'X-Pss5H1jq-OsZq5h'

export default function Apply() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [schoolStatus, setSchoolStatus] = useState('');
  const [usageType, setUsageType] = useState([]);
  const [callInterest, setCallInterest] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    // renderCanvas();
  }, []);

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
      if (!email.trim() || !email.includes('@')) {
        setErrors({ email: true });
      } else {
        setErrors({});
        setStep(3);
      }
    } else if (step === 3) {
      if (!age.trim()) {
        setErrors({ age: true });
      } else {
        setErrors({});
        setStep(4);
      }
    } else if (step === 4) {
      if (!schoolStatus) {
        setErrors({ schoolStatus: true });
      } else {
        setErrors({});
        setStep(5);
      }
    } else if (step === 5) {
      if (usageType.length === 0) {
        setErrors({ usageType: true });
      } else {
        setErrors({});
        setStep(6);
      }
    } else if (step === 6) {
      if (!callInterest) {
        setErrors({ callInterest: true });
      } else {
        setErrors({});
        if (callInterest === 'yes') {
          // Submit the form data
          submitApplication();
        } else {
          setStep(7);
        }
      }
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: name,
        user_name: name,
        user_email: email,
        user_age: age,
        user_school_status: schoolStatus,
        user_usage_type: usageType.join(', '),
        user_call_interest: callInterest,
        submitted_at: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
      };

      console.log('%c=== SUBMITTING APPLICATION VIA EMAILJS ===', 'background: #222; color: #bada55; font-size: 16px; padding: 4px;');
      console.log('%cTemplate Parameters:', 'color: #00bcd4; font-weight: bold;', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('%c✓ EmailJS Response:', 'color: #4caf50; font-weight: bold;', result);
      console.log('  - Status:', result.status);
      console.log('  - Text:', result.text);

      // Move to thank you page
      setStep(7);
    } catch (error) {
      console.error('%c❌ Error submitting application:', 'color: #f44336; font-size: 14px; font-weight: bold;');
      console.error('  - Name:', error.name);
      console.error('  - Message:', error.message);
      console.error('  - Text:', error.text);
      console.error('  - Status:', error.status);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
      console.log('%c=== SUBMISSION COMPLETE ===', 'background: #222; color: #bada55; font-size: 16px; padding: 4px;');
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
  }, [step, name, email, age, schoolStatus, usageType, callInterest]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black relative">
      <canvas
        className="pointer-events-none fixed inset-0 z-0 hidden"
        id="canvas"
      ></canvas>
      
      <div className="flex flex-col items-center gap-12 z-10">
        {step === 0 && (
          <>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                we're excited for you to try out 0studio!
              </h1>
              <p className="text-white/70 text-sm font-light tracking-wide text-center" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                questions? reach out to{' '}
                <a 
                  href="mailto:founders@0studio.xyz"
                  className="text-white hover:opacity-70 transition-opacity underline"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  founders@0studio.xyz
                </a>
              </p>
            </div>
            
            <div className="min-h-[60px] flex items-start justify-center pt-0">
              <button 
                onClick={handleNext}
                className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'InputMono', fontWeight: 400 }}
              >
                &gt;
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
              what is your name?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>[</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: false });
                    }}
                    className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                    style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                    placeholder="your name"
                    autoFocus
                  />
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.name && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    please enter your name
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
              what is your email?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>[</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: false });
                    }}
                    className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                    style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                    placeholder="your email"
                    autoFocus
                  />
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.email && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    please enter a valid email address
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
              what is your age?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>[</span>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setErrors({ ...errors, age: false });
                    }}
                    className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                    style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                    placeholder="your age"
                    autoFocus
                  />
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.age && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    please enter your age
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
              what is your school status?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &lt;
                </button>
                
                <div className="flex flex-col gap-3 min-w-[400px] items-center justify-center">
                  {['bachelor\'s', 'master\'s', 'professional'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="schoolStatus"
                          checked={schoolStatus === option}
                          onChange={() => {
                            setSchoolStatus(option);
                            setErrors({ ...errors, schoolStatus: false });
                          }}
                          className="w-5 h-5 bg-transparent border border-white/30 rounded-full appearance-none cursor-pointer checked:bg-white checked:border-white transition-all"
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        />
                        {schoolStatus === option && (
                          <div className="absolute left-1 top-1 w-3 h-3 bg-black rounded-full pointer-events-none"></div>
                        )}
                      </div>
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.schoolStatus && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    please select your school status
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
              for what do you plan to use 0studio?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &lt;
                </button>
                
                <div className="flex flex-col gap-3 min-w-[400px] items-center justify-center">
                  {['personal', 'school', 'professional'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={usageType.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUsageType([...usageType, option]);
                            } else {
                              setUsageType(usageType.filter(u => u !== option));
                            }
                            setErrors({ ...errors, usageType: false });
                          }}
                          className="w-5 h-5 bg-transparent border border-white/30 rounded appearance-none cursor-pointer checked:bg-white checked:border-white transition-all"
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        />
                        {usageType.includes(option) && (
                          <svg className="absolute left-0 top-0 w-5 h-5 pointer-events-none" viewBox="0 0 20 20" fill="none">
                            <path d="M6 10l2 2 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.usageType && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    please select at least one option
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
              would you be down to setup a 15 minute call with us?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  &lt;
                </button>
                
                <div className="flex flex-col gap-3 min-w-[400px] items-center justify-center">
                  {['yes', 'no'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="callInterest"
                          checked={callInterest === option}
                          onChange={() => {
                            setCallInterest(option);
                            setErrors({ ...errors, callInterest: false });
                          }}
                          className="w-5 h-5 bg-transparent border border-white/30 rounded-full appearance-none cursor-pointer checked:bg-white checked:border-white transition-all"
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        />
                        {callInterest === option && (
                          <div className="absolute left-1 top-1 w-3 h-3 bg-black rounded-full pointer-events-none"></div>
                        )}
                      </div>
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'InputMono', fontWeight: 400 }}
                >
                  {isSubmitting ? '...' : '>'}
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.callInterest && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    please select an option
                  </p>
                )}
                {submitError && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    error submitting application. please try again.
                  </p>
                )}
                {isSubmitting && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                    submitting your application...
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <h1 className="text-white text-2xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
              thanks for applying!
            </h1>
            
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/80 text-lg font-light tracking-wide text-center max-w-2xl" style={{ fontFamily: 'InputMono', fontWeight: 400 }}>
                we'll be in touch soon!
              </p>
              
              <a 
                href="/"
                className="text-white text-xl font-light tracking-wide hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'InputMono', fontWeight: 400 }}
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
