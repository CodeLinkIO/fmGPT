import BulletedTextInput from '@components/Inputs/BulletedTextInput';
import CustomerMoodSelect from '@components/Selects/CustomerMoodSelect';
import { LINE_TEXT_BULLET } from '@constants/character';
import { ConfigInterface, MessageInterface } from '@type/chat';
import { CustomerMood } from '@type/prompt';
import {
  getChatOutlinePromptWithFacts,
  getCustomerPromptByMood,
} from '@utils/prompt';
import React, { useState } from 'react';
import { getChatCompletionStream } from '@api/api';
import { parseEventSource } from '@api/helper';
import { ChatInterface } from '@type/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { codeLanguageSubset } from '@constants/chat';
import { code, p } from '@components/Chat/ChatContent/Message/MessageContent';

type Props = {};

const EmailContentPage = (props: Props) => {
  const [content, setContent] = useState('');

  const [prompt, setPrompt] = useState('');
  const [isGengerating, setIsGengerating] = useState(false);
  const [customerMood, setCustomerMood] = useState(CustomerMood.Neutral);
  // TODO: Integrate the API from the server
  const handleGenerateContent = async () => {
    setIsGengerating(true);
    try {
      const messages: MessageInterface[] = [
        {
          role: 'system',
          content: getCustomerPromptByMood(customerMood),
        },
        {
          role: 'user',
          content: getChatOutlinePromptWithFacts(
            prompt.replace(LINE_TEXT_BULLET, '')
          ),
        },
      ];

      const config: ConfigInterface = {
        model: 'gpt-4',
        temperature: 0.7,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 1,
      };
      console.log({ messages, config });
      const stream = await getChatCompletionStream(messages, config);

      if (stream) {
        if (stream.locked)
          throw new Error(
            'Oops, the stream is locked right now. Please try again'
          );
        const reader = stream.getReader();
        let reading = true;
        let partial = '';
        while (reading) {
          const { done, value } = await reader.read();
          const result = parseEventSource(
            partial + new TextDecoder().decode(value)
          );
          partial = '';

          if (result === '[DONE]' || done) {
            reading = false;
          } else {
            const resultString = result.reduce((output: string, curr) => {
              if (typeof curr === 'string') {
                partial += curr;
              } else {
                const content = curr.choices[0].delta.content;
                if (content) output += content;
              }
              return output;
            }, '');
            setContent((prevContent) => prevContent + resultString);
          }
        }

        if (isGengerating) {
          reader.cancel('Cancelled by user');
        } else {
          reader.cancel('Generation completed');
        }
        reader.releaseLock();
        stream.cancel();
      }
    } catch (error) {
      console.log((error as Error).message);
    }
    setIsGengerating(false);
  };

  return (
    <div className='h-full flex bg-white p-2'>
      <div className='flex-1'>
        <CustomerMoodSelect value={customerMood} onChange={setCustomerMood} />
        <BulletedTextInput
          label='What are the facts?'
          value={prompt}
          onChange={setPrompt}
          className='border-gray-500 border-[1px]'
        />
        <button
          onClick={handleGenerateContent}
          className={`btn btn-primary ${
            isGengerating && 'cursor-not-allowed opacity-40'
          }`}
        >
          Generate
        </button>
      </div>
      <div className='flex-1'>
        {/* TODO: Email content generated here */}
        <div>
          <ReactMarkdown
            remarkPlugins={[
              remarkGfm,
              [remarkMath, { singleDollarTextMath: true }],
            ]}
            rehypePlugins={[
              rehypeKatex,
              [
                rehypeHighlight,
                {
                  detect: true,
                  ignoreMissing: true,
                  subset: codeLanguageSubset,
                },
              ],
            ]}
            linkTarget='_new'
            components={{
              code: code,
              p: p,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default EmailContentPage;
