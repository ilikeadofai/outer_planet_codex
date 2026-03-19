async function parseJsonSafe(response, providerName) {
  try {
    return await response.json();
  } catch {
    throw new Error(`${providerName} 응답 형식을 읽지 못했습니다. 잠시 후 다시 시도해 주세요.`);
  }
}

async function requestOpenAI({ apiKey, systemPrompt, userPrompt }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI 요청에 실패했습니다. (${response.status})`);
  }

  const data = await parseJsonSafe(response, 'OpenAI');
  if (typeof data.output_text !== 'string') {
    throw new Error('OpenAI 응답 형식이 예상과 다릅니다.');
  }

  return data.output_text.trim();
}

async function requestOpenRouter({ apiKey, systemPrompt, userPrompt }) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter 요청에 실패했습니다. (${response.status})`);
  }

  const data = await parseJsonSafe(response, 'OpenRouter');
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== 'string') {
    throw new Error('OpenRouter 응답 형식이 예상과 다릅니다.');
  }

  return content.trim();
}

export async function generateAiNarration({ openaiKey, openrouterKey, systemPrompt, userPrompt }) {
  if (!openaiKey.trim() && !openrouterKey.trim()) {
    throw new Error('API 키를 먼저 입력해 주세요.');
  }

  const text = openaiKey.trim()
    ? await requestOpenAI({ apiKey: openaiKey.trim(), systemPrompt, userPrompt })
    : await requestOpenRouter({ apiKey: openrouterKey.trim(), systemPrompt, userPrompt });

  if (!text) {
    throw new Error('AI 설명이 비어 있습니다. 다시 시도해 주세요.');
  }

  return text;
}
