import '../App.css';
import OpenAI from 'openai';
import { useState, useRef } from 'react';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const AIParsing = () => {
  
  const [input, setInput] = useState('');
  const inputEl = useRef<HTMLInputElement | null>(null);

  async function parseInput(rawInput: string) {
    let pages: string[] = rawInput.split('Linn-Mar Program of Studies').filter((page: string) => page.includes('Course#') || page.includes('Course #'));
  
    const promises = pages.map(async (page) => {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            "role": "system",
            "content": "You are a text parser. Organize the data given in a JSON format as demonstrated below, fields within the example \"course-name\" are optional, and fix spelling:\n\n\"model-car-making\": {\n    \"considerations\": \"gradelevels of 80% or higher for second quarter of Woods, Materials and Processes is required.\",\n    \"courseid\": \"IND250\",\n    \"coursename\": \"Model Car Making\",\n    \"credits\": \"10\",\n    \"description\": \"This course is designed to expand basic skills learned in Woods, Materials and Processes. A review of machine safety will precede project work. Students will design and draw plans for their project, calculate costs and devise a plan of procedure for completion of their project prior to starting work. Project work will be required to include at least one dovetailed drawer, rail, stile and panel piece.\",\n    \"fees\": \"Students will be allotted materials for required projects. Additional fees may be charged if a student exceeds the allotted amount\",\n    \"format\": \"Block\",\n    \"gradelevels\": \"10-12\",\n    \"length\": \"2 Quarters\",\n    \"prerequisites\": \"Woods, Materials and Processes\",\n    \"subsequent\": \"Cabinet Making\",\n    \"tags\": [\"Engineering\"]\n  },\n\nThe only valid options of tags are: AP, Agriculture, Art, Business, Engineering, English, FCS, Science, Foreign Lang, Music, TAG, Venture. Do not repeat the sample data, ignore the first number"
          },
          {
            "role": "user",
            "content": `${page}`
          },
          {
            "role": "user",
            "content": ""
          }
        ],
        temperature: 0,
        max_tokens: 3399,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      return response.choices[0].message.content || '';
    });
  
    const parsedPages = await Promise.all(promises);

    console.log(parsedPages);
  
    setInput(parsedPages.join('\n'));
  }


  return (
    <div className="main">
      <h1>Update Database</h1>
      <input ref={inputEl} type="text" placeholder="Copy & paste the Program of Studies..." />
      <button onClick={() => parseInput(inputEl.current?.value || '')}>Submit</button>
      <p>{input}</p>
    </div>
  );
}

export default AIParsing;
