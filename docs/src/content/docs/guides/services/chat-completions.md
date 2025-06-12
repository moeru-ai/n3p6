---
title: Chat Completions
---

moeChat supports any OpenAI-compatible LLM API, for example:

## [OpenAI](https://openai.com)

- baseURL: https://api.openai.com/v1/
- apiKey: required
- model: see https://platform.openai.com/docs/models

## [Google Gemini Developer API](https://cloud.google.com/ai/generative-ai)

- baseURL: https://generativelanguage.googleapis.com/v1beta/openai/
- apiKey: required
- model: see https://ai.google.dev/gemini-api/docs/models

## [Ollama](https://ollama.com)

- baseURL: http://localhost:11434/v1/
- apiKey: optional
- model: see https://ollama.com/search

## [LM Studio](https://lmstudio.ai)

- baseURL: http://localhost:1234/v1/
- apiKey: optional
- model: see https://lmstudio.ai/models

---

You can also head over to xsAI's [providers-local](https://github.com/moeru-ai/xsai/tree/main/packages-ext/providers-local/src/providers) and [providers-cloud](https://github.com/moeru-ai/xsai/tree/main/packages-ext/providers-cloud/src/providers) for more provider information.
