import { useEffect, useState } from 'react'
import { renderCanvas } from '../components/ui/canvas'

export default function Apply() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
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
      if (!age.trim()) {
        setErrors({ age: true });
      } else {
        setErrors({});
        setStep(3);
      }
    } else if (step === 3) {
      if (!schoolStatus) {
        setErrors({ schoolStatus: true });
      } else {
        setErrors({});
        setStep(4);
      }
    } else if (step === 4) {
      if (usageType.length === 0) {
        setErrors({ usageType: true });
      } else {
        setErrors({});
        setStep(5);
      }
    } else if (step === 5) {
      if (!callInterest) {
        setErrors({ callInterest: true });
      } else {
        setErrors({});
        if (callInterest === 'yes') {
          // Submit the form data
          submitApplication();
        } else {
          setStep(6);
        }
      }
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const formData = {
        name,
        age,
        schoolStatus,
        usageType,
        callInterest
      };

      console.log('=== SUBMITTING APPLICATION ===');
      console.log('Form Data:', formData);

      // Send to API (works in both dev and production)
      console.log('Sending to:', '/api/submit-application');
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Submission error:', errorData);
        throw new Error(errorData.error || 'Failed to submit application');
      }

      const result = await response.json();
      console.log('✓ Submission successful:', result);

      // Move to thank you page
      setStep(6);
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
  }, [step, name, age, schoolStatus, usageType, callInterest]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black relative">
      <canvas
        className="pointer-events-none fixed inset-0 z-0 hidden"
        id="canvas"
      ></canvas>
      
      <div className="flex flex-col items-center gap-12 z-10">
        {step === 0 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
              we're excited for you to try out 0studio!
            </h1>
            
            <div className="min-h-[60px] flex items-start justify-center pt-0">
              <button 
                onClick={handleNext}
                className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
              >
                &gt;
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
              what is your name?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>[</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: false });
                    }}
                    className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                    placeholder="your name"
                    autoFocus
                  />
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.name && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                    please enter your name
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
              what is your age?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                >
                  &lt;
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>[</span>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setErrors({ ...errors, age: false });
                    }}
                    className="bg-transparent border-none text-white text-xl font-light tracking-wide text-center focus:outline-none min-w-[400px]"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                    placeholder="your age"
                    autoFocus
                  />
                  <span className="text-white text-xl font-light" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>]</span>
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.age && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                    please enter your age
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
              what is your school status?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
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
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.schoolStatus && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                    please select your school status
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
              for what do you plan to use 0studio?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
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
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                >
                  &gt;
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.usageType && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                    please select at least one option
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
              would you be down to setup a 15 minute call with us?
            </h1>
            
            <div className="flex flex-col items-center min-h-[60px] justify-start">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
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
                      <span className="text-white text-lg font-light tracking-wide group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
                >
                  {isSubmitting ? '...' : '>'}
                </button>
              </div>
              
              <div className="h-6 mt-2">
                {errors.callInterest && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                    please select an option
                  </p>
                )}
                {submitError && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                    error submitting application. please try again.
                  </p>
                )}
                {isSubmitting && (
                  <p className="text-white/40 text-sm font-light tracking-wide" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                    submitting your application...
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h1 className="text-white text-3xl font-light tracking-tight text-center max-w-3xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
              thanks for applying!
            </h1>
            
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/80 text-lg font-light tracking-wide text-center max-w-2xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                we'll be in touch soon!
              </p>
              
              <a 
                href="/creator"
                className="text-white text-xl font-light tracking-wide hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 300 }}
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
