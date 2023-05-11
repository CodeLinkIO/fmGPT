import * as dotenv from 'dotenv';
dotenv.config({
  debug: true,
});

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from './firebase.js';

const port = parseInt(process.env.PORT || '8080', 10);
const api_key = process.env.OPENAI_API_KEY;
const upstreamUrl = 'https://api.openai.com/v1/chat/completions';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const obfuscateOpenAIResponse = (text) => text.replace(/\borg-[a-zA-Z0-9]{24}\b/g, 'org-************************').replace(' Please add a payment method to your account to increase your rate limit. Visit https://platform.openai.com/account/billing to add a payment method.', '');

const app = express();
app.disable('etag');
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).set(corsHeaders).type('text/plain').send(err.message);
  }
  next();
});

const handleOptions = (req, res) => {
  res.setHeader('Access-Control-Max-Age', '1728000').set(corsHeaders).sendStatus(202);
};

const handlePost = async (req, res) => {
  const contentType = req.headers['content-type'];
  if (!contentType || contentType !== 'application/json') {
    return res.status(415).set(corsHeaders).type('text/plain').send("Unsupported media type. Use 'application/json' content type");
  }

  const { stream } = req.body;
  if (stream != null && stream !== true && stream !== false) {
    return res.status(400).set(corsHeaders).type('text/plain').send('The `stream` parameter must be a boolean value');
  }

  try {
    const authHeader = req.get('Authorization');
    const authHeaderUpstream = authHeader || `Bearer ${api_key}`;

    const requestHeader = {
      'Content-Type': 'application/json',
      'Authorization': authHeaderUpstream,
      'User-Agent': 'curl/7.64.1',
    };
    const resUpstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify(req.body),
    });

    if (!resUpstream.ok) {
      const { status } = resUpstream;
      const text = await resUpstream.text();
      const textObfuscated = obfuscateOpenAIResponse(text);
      return res.status(status).set(corsHeaders).type('text/plain').send(`OpenAI API responded:\n\n${textObfuscated}`);
    }

    const contentType = resUpstream.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    const contentLength = resUpstream.headers.get('content-length');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    if (stream) {
      res.setHeader('Connection', 'keep-alive');
    }
    res.set({
      ...corsHeaders,
      'Cache-Control': 'no-cache',
    });

    resUpstream.body.pipe(res);
  } catch (error) {
    res.status(500).set(corsHeaders).type('text/plain').send(error.message);
  }
};

const handleFetchUserChats = async (req, res) => {
  const { uid } = req.params;

  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (!docSnap.exists()) {
      return res.status(400).send('User not found');
    }
    const { data } = docSnap.data();

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handleCreateUserChats = async (req, res) => {
  const { uid, data } = req.body;

  try {
    await setDoc(doc(db, 'users', uid), { data });
    res.status(200).send('User chats created');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handleUpdateUserChats = async (req, res) => {
  const { uid } = req.params;
  const { data } = req.body;

  try {
    await updateDoc(doc(db, 'users', uid), { data });
    res.status(200).send('User chats updated');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handleDeleteUserChats = async (req, res) => {
  const { uid } = req.params;

  try {
    await deleteDoc(doc(db, 'users', uid));
    res.status(200).send('User chats deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.options('/chat/completions', handleOptions);
app.post('/chat/completions', handlePost);

app.options('/users', handleOptions);
app.post('/users', handleCreateUserChats);

app.options('/users/:uid', handleOptions);
app.get('/users/:uid', handleFetchUserChats);
app.put('/users/:uid', handleUpdateUserChats);
app.delete('/users/:uid', handleDeleteUserChats);

app.use('*', (req, res) => {
  res.status(404).set(corsHeaders).type('text/plain').send('Not found');
});

app.listen(port, '0.0.0.0', (error) => {
  if (error) {
    console.log(error);
    return process.exit(1);
  }
  console.log(`Server listening on port ${port}`);
});
