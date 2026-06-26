import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { task, anxietyLevel } = await request.json();

    const systemPrompt = `You are an empathetic, expert coach for neurodiverse students (ADHD, Autism). 
    Your job is to break down a stressful task into tiny, non-overwhelming, actionable micro-steps.
    
    The student's task is: "${task}". 
    Their current anxiety level is ${anxietyLevel}/5. (Higher anxiety means shorter, gentler steps).

    You MUST respond with a valid JSON array of objects, and absolutely NO conversational text before or after. 
    Each object must have exactly these keys: "id" (number), "step" (string), "duration" (string), and "emoji" (string).
    
    Example response structure:
    [
      {"id": 1, "step": "Clear your desk space.", "duration": "2 mins", "emoji": "🧹"},
      {"id": 2, "step": "Open your book to page one.", "duration": "1 min", "emoji": "📖"}
    ]`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });

    const data = await response.json();
    let aiTextOutput = data.candidates[0].content.parts[0].text;
    
    // Safety check if markdown syntax accidentally leaks through
    aiTextOutput = aiTextOutput.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const microTasks = JSON.parse(aiTextOutput);
    return NextResponse.json({ success: true, tasks: microTasks });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to compile roadmap." }, { status: 500 });
  }
}