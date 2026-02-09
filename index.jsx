import React, { useState } from 'react';
import { Briefcase, Send, Loader2, CheckCircle, AlertCircle, FileText, Bot, Target } from 'lucide-react';

export default function JobApplicationBot() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    education: '',
    availability: ''
  });
  
  const [jobPosting, setJobPosting] = useState('');
  const [applicationResults, setApplicationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const generateApplication = async () => {
    setLoading(true);
    setApplicationResults(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `You are an expert job application specialist applying for data entry and QA specialist positions. Generate a complete, tailored job application based on the following:

CANDIDATE PROFILE:
Name: ${profile.name}
Email: ${profile.email}
Phone: ${profile.phone}
Location: ${profile.location}
Experience: ${profile.experience}
Skills: ${profile.skills}
Education: ${profile.education}
Availability: ${profile.availability}

JOB POSTING:
${jobPosting}

Generate a complete application package in JSON format:
{
  "matchScore": number (0-100, how well candidate matches the role),
  "matchAnalysis": "detailed analysis of fit",
  "coverLetter": "professional cover letter tailored to this specific job (3-4 paragraphs)",
  "resumeBullets": [
    "achievement-focused bullet points highlighting relevant experience"
  ],
  "applicationAnswers": {
    "why_this_role": "compelling answer",
    "relevant_experience": "specific examples",
    "availability": "clear availability statement",
    "salary_expectations": "professional response"
  },
  "keywordOptimization": [
    "keywords from job posting that were incorporated"
  ],
  "interviewPrep": {
    "likelyQuestions": ["anticipated interview questions"],
    "suggestedAnswers": ["structured answers using STAR method"]
  },
  "recommendations": ["suggestions to strengthen this application"]
}`
            }
          ],
        })
      });

      const data = await response.json();
      const content = data.content.map(item => item.text || "").join("\n");
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const results = JSON.parse(jsonMatch[0]);
        setApplicationResults(results);
      } else {
        setApplicationResults({ rawResponse: content });
      }
    } catch (err) {
      setApplicationResults({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const generateBatchApplications = async () => {
    setLoading(true);
    setApplicationResults(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `You are a job search strategist helping find the best Data Entry and QA Specialist positions. Based on this candidate profile, create a strategic job search plan:

CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

Create a comprehensive job search strategy in JSON:
{
  "targetRoles": [
    {
      "title": "exact role title",
      "companies": ["types of companies to target"],
      "matchScore": number (how well this fits candidate),
      "searchKeywords": ["keywords to use in job boards"]
    }
  ],
  "applicationStrategy": {
    "dailyApplicationGoal": number,
    "priorityOrder": ["which roles to apply to first"],
    "customizationLevel": "how much to customize each application"
  },
  "resumeTemplates": {
    "dataEntry": "resume bullets optimized for data entry roles",
    "qaSpecialist": "resume bullets optimized for QA roles",
    "hybrid": "resume bullets for combined roles"
  },
  "coverLetterTemplates": {
    "standard": "base cover letter template",
    "technical": "template emphasizing technical skills",
    "entrylevel": "template for entry-level positions"
  },
  "searchQueries": [
    "optimized search queries for LinkedIn, Indeed, etc."
  ],
  "timeline": {
    "week1": "actions for first week",
    "week2": "actions for second week",
    "week3": "actions for third week",
    "week4": "actions for fourth week"
  }
}`
            }
          ],
        })
      });

      const data = await response.json();
      const content = data.content.map(item => item.text || "").join("\n");
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setApplicationResults(JSON.parse(jsonMatch[0]));
      } else {
        setApplicationResults({ rawResponse: content });
      }
    } catch (err) {
      setApplicationResults({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const analyzeJobFit = async () => {
    setLoading(true);
    setApplicationResults(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `You are a career advisor analyzing job fit. Evaluate whether this candidate should apply for this position:

CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOB POSTING:
${jobPosting}

Provide detailed analysis in JSON:
{
  "recommendation": "APPLY|CONSIDER|SKIP",
  "matchScore": number (0-100),
  "strengths": [
    {
      "requirement": "job requirement",
      "candidateQualification": "how candidate meets it",
      "evidence": "specific example or skill"
    }
  ],
  "gaps": [
    {
      "requirement": "job requirement",
      "gap": "what's missing",
      "mitigation": "how to address in application"
    }
  ],
  "redFlags": ["concerns about this position or fit"],
  "opportunities": ["why this could be a great opportunity"],
  "applicationStrategy": "specific approach to take with this application",
  "salaryInsights": {
    "likelyRange": "estimated salary range for this role",
    "negotiationTips": "how to approach salary discussion"
  }
}`
            }
          ],
        })
      });

      const data = await response.json();
      const content = data.content.map(item => item.text || "").join("\n");
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setApplicationResults(JSON.parse(jsonMatch[0]));
      } else {
        setApplicationResults({ rawResponse: content });
      }
    } catch (err) {
      setApplicationResults({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const generateFollowUp = async () => {
    setLoading(true);
    setApplicationResults(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `Generate professional follow-up communications for job applications:

CONTEXT:
Applied for: ${jobPosting.slice(0, 200)}...
Candidate: ${profile.name}

Generate follow-up templates in JSON:
{
  "thankYouEmail": {
    "subject": "email subject line",
    "body": "professional thank you email after submitting application"
  },
  "oneWeekFollowUp": {
    "subject": "email subject line",
    "body": "polite follow-up email if no response after 1 week"
  },
  "twoWeekFollowUp": {
    "subject": "email subject line", 
    "body": "second follow-up email if no response after 2 weeks"
  },
  "postInterviewThankYou": {
    "subject": "email subject line",
    "body": "thank you email to send after interview"
  },
  "linkedInMessage": "professional message to send to hiring manager on LinkedIn",
  "followUpSchedule": {
    "day1": "action to take",
    "day3": "action to take",
    "day7": "action to take",
    "day14": "action to take"
  }
}`
            }
          ],
        })
      });

      const data = await response.json();
      const content = data.content.map(item => item.text || "").join("\n");
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setApplicationResults(JSON.parse(jsonMatch[0]));
      } else {
        setApplicationResults({ rawResponse: content });
      }
    } catch (err) {
      setApplicationResults({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const renderResults = () => {
    if (!applicationResults) return null;

    if (applicationResults.error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle size={20} />
            <span className="font-medium">Error: {applicationResults.error}</span>
          </div>
        </div>
      );
    }

    if (applicationResults.rawResponse) {
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{applicationResults.rawResponse}</pre>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Match Score */}
        {applicationResults.matchScore !== undefined && (
          <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Match Score</h3>
              <div className="text-4xl font-bold text-blue-600">{applicationResults.matchScore}%</div>
            </div>
            {applicationResults.matchAnalysis && (
              <p className="text-gray-700">{applicationResults.matchAnalysis}</p>
            )}
            {applicationResults.recommendation && (
              <div className={`mt-4 px-4 py-2 rounded-lg font-semibold text-center ${
                applicationResults.recommendation === 'APPLY' ? 'bg-green-100 text-green-800' :
                applicationResults.recommendation === 'CONSIDER' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Recommendation: {applicationResults.recommendation}
              </div>
            )}
          </div>
        )}

        {/* Cover Letter */}
        {applicationResults.coverLetter && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              Cover Letter
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {applicationResults.coverLetter}
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(applicationResults.coverLetter)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        {/* Resume Bullets */}
        {applicationResults.resumeBullets && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Resume Bullets (Optimized)</h3>
            <ul className="space-y-3">
              {applicationResults.resumeBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Application Answers */}
        {applicationResults.applicationAnswers && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Application Question Answers</h3>
            <div className="space-y-4">
              {Object.entries(applicationResults.applicationAnswers).map(([question, answer]) => (
                <div key={question} className="border-l-4 border-green-400 pl-4">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    {question.replace(/_/g, ' ').toUpperCase()}
                  </div>
                  <div className="text-gray-800">{answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strengths */}
        {applicationResults.strengths && (
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold mb-4 text-green-900">Your Strengths for This Role</h3>
            <div className="space-y-3">
              {applicationResults.strengths.map((strength, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-green-800">{strength.requirement}</div>
                  <div className="text-sm text-gray-700 mt-1">{strength.candidateQualification}</div>
                  {strength.evidence && (
                    <div className="text-sm text-green-600 mt-1">✓ {strength.evidence}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gaps */}
        {applicationResults.gaps && applicationResults.gaps.length > 0 && (
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-bold mb-4 text-yellow-900">Areas to Address</h3>
            <div className="space-y-3">
              {applicationResults.gaps.map((gap, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-yellow-800">{gap.requirement}</div>
                  <div className="text-sm text-gray-700 mt-1">Gap: {gap.gap}</div>
                  <div className="text-sm text-blue-600 mt-1">💡 {gap.mitigation}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interview Prep */}
        {applicationResults.interviewPrep && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Interview Preparation</h3>
            <div className="space-y-4">
              {applicationResults.interviewPrep.likelyQuestions && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Likely Questions:</h4>
                  <ul className="space-y-2">
                    {applicationResults.interviewPrep.likelyQuestions.map((q, idx) => (
                      <li key={idx} className="text-gray-700 pl-4 border-l-2 border-blue-400">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {applicationResults.interviewPrep.suggestedAnswers && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Suggested Answers:</h4>
                  <ul className="space-y-2">
                    {applicationResults.interviewPrep.suggestedAnswers.map((a, idx) => (
                      <li key={idx} className="text-gray-700 bg-gray-50 p-3 rounded">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Target Roles */}
        {applicationResults.targetRoles && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Target Roles</h3>
            <div className="space-y-4">
              {applicationResults.targetRoles.map((role, idx) => (
                <div key={idx} className="border-l-4 border-purple-400 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{role.title}</div>
                    <div className="text-sm font-semibold text-purple-600">{role.matchScore}% match</div>
                  </div>
                  {role.companies && (
                    <div className="text-sm text-gray-600 mt-1">
                      Companies: {role.companies.join(', ')}
                    </div>
                  )}
                  {role.searchKeywords && (
                    <div className="text-sm text-blue-600 mt-1">
                      Keywords: {role.searchKeywords.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Follow-up Emails */}
        {applicationResults.thankYouEmail && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Follow-up Email Templates</h3>
            <div className="space-y-4">
              {Object.entries(applicationResults).filter(([key]) => 
                key.includes('Email') || key.includes('FollowUp') || key.includes('Message')
              ).map(([type, content]) => (
                <div key={type} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-semibold text-gray-800 mb-2">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {typeof content === 'object' ? (
                    <>
                      <div className="text-sm font-medium text-gray-600 mb-1">Subject: {content.subject}</div>
                      <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{content.body}</div>
                    </>
                  ) : (
                    <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{content}</div>
                  )}
                  <button
                    onClick={() => navigator.clipboard.writeText(
                      typeof content === 'object' ? `${content.subject}\n\n${content.body}` : content
                    )}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {applicationResults.recommendations && (
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold mb-4 text-blue-900">Recommendations</h3>
            <ul className="space-y-2">
              {applicationResults.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-blue-900">
                  <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="text-purple-600" size={36} />
            <h1 className="text-3xl font-bold text-gray-900">
              AI Job Application Bot
            </h1>
          </div>
          <p className="text-gray-600">
            Automated job search, application generation, and career strategy for Data Entry & QA Specialist roles
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 Your Profile
              </button>
              <button
                onClick={() => setActiveTab('single')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'single'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🎯 Single Application
              </button>
              <button
                onClick={() => setActiveTab('analyze')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'analyze'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🔍 Job Fit Analysis
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'strategy'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📊 Search Strategy
              </button>
              <button
                onClick={() => setActiveTab('followup')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'followup'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📧 Follow-ups
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Build Your Profile</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Location (City, State)"
                    value={profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <textarea
                  placeholder="Experience (List your work history, internships, projects)"
                  value={profile.experience}
                  onChange={(e) => handleProfileChange('experience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                />
                <textarea
                  placeholder="Skills (Excel, data validation, attention to detail, etc.)"
                  value={profile.skills}
                  onChange={(e) => handleProfileChange('skills', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-24"
                />
                <input
                  type="text"
                  placeholder="Education (Degree, School, Year)"
                  value={profile.education}
                  onChange={(e) => handleProfileChange('education', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Availability (Immediate, 2 weeks notice, etc.)"
                  value={profile.availability}
                  onChange={(e) => handleProfileChange('availability', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    ✓ Profile saved automatically. Complete all fields for best results.
                  </p>
                </div>
              </div>
            )}

            {/* Single Application Tab */}
            {activeTab === 'single' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Generate Custom Application</h2>
                <textarea
                  placeholder="Paste the complete job posting here..."
                  value={jobPosting}
                  onChange={(e) => setJobPosting(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-64 font-mono text-sm"
                />
                <button
                  onClick={generateApplication}
                  disabled={loading || !jobPosting.trim() || !profile.name}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Generating Application...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Generate Complete Application Package
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Analyze Tab */}
            {activeTab === 'analyze' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Analyze Job Fit</h2>
                <p className="text-gray-600 mb-4">
                  Get a detailed analysis of how well you match this position before applying
                </p>
                <textarea
                  placeholder="Paste the job posting to analyze..."
                  value={jobPosting}
                  onChange={(e) => setJobPosting(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-64 font-mono text-sm"
                />
                <button
                  onClick={analyzeJobFit}
                  disabled={loading || !jobPosting.trim() || !profile.name}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target size={20} />
                      Analyze Job Fit
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Strategy Tab */}
            {activeTab === 'strategy' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Job Search Strategy</h2>
                <p className="text-gray-600 mb-4">
                  Get a comprehensive job search plan customized to your profile
                </p>
                <button
                  onClick={generateBatchApplications}
                  disabled={loading || !profile.name}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Creating Strategy...
                    </>
                  ) : (
                    <>
                      <Briefcase size={20} />
                      Generate Job Search Strategy
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Follow-up Tab */}
            {activeTab === 'followup' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Follow-up Templates</h2>
                <p className="text-gray-600 mb-4">
                  Generate professional follow-up emails for your applications
                </p>
                <textarea
                  placeholder="Paste job posting (optional - helps customize follow-ups)"
                  value={jobPosting}
                  onChange={(e) => setJobPosting(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-32 font-mono text-sm"
                />
                <button
                  onClick={generateFollowUp}
                  disabled={loading || !profile.name}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Generate Follow-up Templates
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {applicationResults && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
            {renderResults()}
          </div>
        )}

        {/* Info Box */}
        {!applicationResults && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">How This Bot Works</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">🎯 Single Application</h4>
                <p>Generate a complete, tailored application package for a specific job posting including cover letter, resume bullets, and application answers.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔍 Job Fit Analysis</h4>
                <p>Analyze how well you match a position before applying. Get match scores, identify strengths and gaps, plus mitigation strategies.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">📊 Search Strategy</h4>
                <p>Get a comprehensive job search plan including target roles, daily application goals, resume templates, and a 4-week timeline.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">📧 Follow-ups</h4>
                <p>Generate professional follow-up emails for different scenarios: thank you, 1-week check-in, post-interview, and LinkedIn messages.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
