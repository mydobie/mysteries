# mysteries

## Description:

A series of mysteries to solve. This contains both "print it out" type of games and interactive AI based games.

[See app in action](https://mydobie.github.io/mysteries/)

## Get me started:

At the root of the project run the following commands in a terminal to verify you can perform all the development tasks:

1.  Verify node is installed => `node -v`. Ensure that it is version listed in the `engines` section of the `package.json` file.
1.  Install dependencies => `npm i`
1.  Star the dev server => `npm run dev`

---

## Running interactive mysteries

Some of the mysteries require AI. This application uses the OpenAI API service or an Ollama modal locally. A OpenAi API key is required in order for these mysteries to work correctly.

You can create an OpenAI account and key at the [OpenAI API site](https://platform.openai.com/docs/overview)

Copy the `.env` file as `.env.developement`.

If using a local model, ensure it is up and running and set `VITE_AI_BASE_URL` to the local URL. For Ollama this is usually `http://localhost:11434/v1`. If you are using the OpenAI API, leave this blank.

Set the `VITE_OPENAI_KEY` to either your OpenAI key or any value if using a local model.

Set the `VITE_AI_MODAL` to the model you are using. For OpenAI API, this project was tested on `gpt-5-mini`

---

## Use

You are free to copy and re-use the code (scss, typescript, etc). You may not copy, modify, host the PDF files or the images.

---

### Vite

This project was bootstrapped with [Vite](https://vitejs.dev/).

---
