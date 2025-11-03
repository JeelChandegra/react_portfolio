import knowledgeBase from '../public/knowledge-base.json' assert { type: 'json' };

// Simple keyword-based search function
function searchKnowledgeBase(question) {
  const lowerQuestion = question.toLowerCase();
  const relevantContext = [];

  // Search in profile
  if (lowerQuestion.match(/\b(who|name|about|bio|contact|email|location)\b/)) {
    relevantContext.push({
      section: 'Profile',
      content: `Name: ${knowledgeBase.profile.name}
Title: ${knowledgeBase.profile.title}
Location: ${knowledgeBase.profile.location}
Email: ${knowledgeBase.profile.contact.email}
GitHub: ${knowledgeBase.profile.contact.github}
Bio: ${knowledgeBase.profile.bio}`
    });
  }

  // Search in skills
  if (lowerQuestion.match(/\b(skill|technology|tech|know|experience|language|framework|database)\b/)) {
    const allSkills = [
      ...(knowledgeBase.skills.languages || []),
      ...(knowledgeBase.skills.frameworks || []),
      ...(knowledgeBase.skills.databases || []),
      ...(knowledgeBase.skills.ai || []),
      ...(knowledgeBase.skills.cloudDevOps || []),
      ...(knowledgeBase.skills.tools || [])
    ];
    
    relevantContext.push({
      section: 'Skills',
      content: `Technical Skills:
Languages: ${(knowledgeBase.skills.languages || []).join(', ')}
Frameworks: ${(knowledgeBase.skills.frameworks || []).join(', ')}
AI/ML: ${(knowledgeBase.skills.ai || []).join(', ')}
Databases: ${(knowledgeBase.skills.databases || []).join(', ')}
Cloud & DevOps: ${(knowledgeBase.skills.cloudDevOps || []).join(', ')}
Tools: ${(knowledgeBase.skills.tools || []).join(', ')}`
    });

    // Check for specific technologies mentioned
    const mentionedSkills = allSkills.filter(skill => 
      lowerQuestion.includes(skill.toLowerCase())
    );
    if (mentionedSkills.length > 0) {
      relevantContext.push({
        section: 'Specific Skills',
        content: `Yes, proficient in: ${mentionedSkills.join(', ')}`
      });
    }
  }

  // Search in projects
  if (lowerQuestion.match(/\b(project|app|application|built|created|developed|work)\b/)) {
    knowledgeBase.projects.forEach(project => {
      const projectLower = project.title.toLowerCase() + ' ' + 
                          project.shortDescription.toLowerCase() + ' ' +
                          project.tech.join(' ').toLowerCase();
      
      // Check if question mentions this project or its technologies
      const isRelevant = project.tech.some(tech => lowerQuestion.includes(tech.toLowerCase())) ||
                        lowerQuestion.includes(project.title.toLowerCase().split(' ')[0]);
      
      if (isRelevant || lowerQuestion.match(/\b(all projects|your projects|best project|complex project)\b/)) {
        relevantContext.push({
          section: `Project: ${project.title}`,
          content: `${project.title}
${project.shortDescription}
Technologies: ${project.tech.join(', ')}
${project.fullDescription.substring(0, 500)}...
Key Features: ${project.features ? project.features.slice(0, 3).join('. ') : 'Multiple advanced features'}
${project.challengesSolved ? 'Major Challenge Solved: ' + project.challengesSolved[0].challenge : ''}`
        });
      }
    });
  }

  // Search in experience
  if (lowerQuestion.match(/\b(experience|work|job|position|role|career|company)\b/)) {
    knowledgeBase.experience.forEach(exp => {
      relevantContext.push({
        section: 'Experience',
        content: `${exp.role} at ${exp.company} (${exp.period})
${exp.description}
Achievements: ${exp.achievements.join('. ')}
Technologies: ${exp.tech.join(', ')}`
      });
    });
  }

  // Search in achievements
  if (lowerQuestion.match(/\b(achievement|award|certificate|recognition|accomplish)\b/)) {
    if (knowledgeBase.certificates && knowledgeBase.certificates.length > 0) {
      relevantContext.push({
        section: 'Certificates & Awards',
        content: knowledgeBase.certificates.map(c =>
          `${c.title} from ${c.organization} (${c.year}): ${c.description}`
        ).join('\n')
      });
    }
  }

  // If no specific context found, provide general overview
  if (relevantContext.length === 0) {
    relevantContext.push({
      section: 'General',
      content: `${knowledgeBase.profile.name} is a ${knowledgeBase.profile.title} based in ${knowledgeBase.profile.location}.
${knowledgeBase.profile.professionalSummary}
Contact: ${knowledgeBase.profile.contact.email}`
    });
  }

  return relevantContext;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Search knowledge base for relevant context
    const context = searchKnowledgeBase(question);
    const contextText = context.map(c => `${c.section}:\n${c.content}`).join('\n\n');

    // Call Gemini API
    const geminiApiKey = process.env.VITE_GEMINI_API_KEY;
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an AI assistant for Jeel Chandegra's portfolio. Answer questions about his work, skills, and experience using ONLY the provided context. Be friendly, professional, and concise.

Context:
${contextText}

Question: ${question}

Answer (be specific and helpful, mention relevant projects/skills if applicable):`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      }
    );

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const answer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
                  'Sorry, I could not generate a response. Please try rephrasing your question.';

    return res.status(200).json({ answer });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      answer: 'Sorry, I encountered an error. Please try again later.'
    });
  }
}
