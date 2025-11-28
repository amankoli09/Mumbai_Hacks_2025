export async function InvokeLLM({ prompt }) {
  // Mocked response for local dev
  return {
    credibility_score: 75,
    verdict: 'verified',
    title: 'Sample Analysis',
    ai_analysis: 'This is a mocked AI analysis for local development.',
    key_claims: [
      { claim: 'Example claim one', verdict: 'verified' },
      { claim: 'Example claim two', verdict: 'unverified' },
    ],
    viral_score: 50,
    engagement_metrics: { views: 1000, shares: 50, comments: 20 },
    is_trending: false,
    sources: [
      { name: 'Example Source', url: 'https://example.com', credibility: 'high' },
    ],
  }
}

export async function UploadFile({ file }) {
  // Mock upload
  return { file_url: URL.createObjectURL(file) }
}
