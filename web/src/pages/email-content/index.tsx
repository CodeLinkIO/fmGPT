import { code, p } from '@components/Chat/ChatContent/Message/MessageContent';
import BulletedTextInput from '@components/Inputs/BulletedTextInput';
import CustomerMoodSelect from '@components/Selects/CustomerMoodSelect';
import {
  END_STREAM_VALUE_POSTFIX,
  LINE_TEXT_BULLET,
  STREAM_VALUE_PREFIX_REGEX,
} from '@constants/character';
import { codeLanguageSubset } from '@constants/chat';
import CopyIcon from '@icon/CopyIcon';
import useFirebaseStore from '@store/firebase-store';
import useStore from '@store/store';
import {
  EmailContentSubmitBodyInterface,
  SlackLogMessageSubmitBodyInterface,
} from '@type/api';
import { CustomerMood } from '@type/prompt';
import {
  getChatOutlinePromptWithFacts,
  getCustomerPromptByMood,
} from '@utils/prompt';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const EmailContentPage = () => {
  const dummyRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [customerMood, setCustomerMood] = useState(CustomerMood.Neutral);
  const setToastMessage = useStore((state) => state.setToastMessage);
  const setToastShow = useStore((state) => state.setToastShow);
  const setToastStatus = useStore((state) => state.setToastStatus);
  const user = useFirebaseStore((state) => state.user);

  const scrollToEmailContent = () => {
    if (!dummyRef || !dummyRef.current) {
      return;
    }

    dummyRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerateContent = async () => {
    if (generating) {
      return;
    }

    let textToCopy = '';
    setContent('');
    try {
      setGenerating(true);
      const data: EmailContentSubmitBodyInterface = {
        system_content: getCustomerPromptByMood(customerMood),
        user_content: getChatOutlinePromptWithFacts(
          prompt.replace(LINE_TEXT_BULLET, '')
        ),
      };
      const response = await fetch(
        `${import.meta.env.VITE_FASTAPI_BASE_URL}/simplequery/email`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok || !response.body) {
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done || !value) {
          break;
        }

        const lines = decoder.decode(value);
        for (const line of lines) {
          const text = line.replace(STREAM_VALUE_PREFIX_REGEX, '');
          if (text === END_STREAM_VALUE_POSTFIX) {
            break;
          }

          const resultString = line;
          textToCopy += resultString;
          setContent((prevContent) => prevContent + resultString);
          scrollToEmailContent();
        }
      }

      if (!user) {
        return;
      }

      const slackLogMessageSubmitBody: SlackLogMessageSubmitBodyInterface = {
        username: user.displayName || '',
        mood: customerMood,
        facts: prompt,
        content: textToCopy,
      };
      const slackResponse = await fetch(
        `${import.meta.env.VITE_FASTAPI_BASE_URL}/slack/message/send`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(slackLogMessageSubmitBody),
        }
      );

      if (!slackResponse.ok || !slackResponse.body) {
        return;
      }

      await navigator.clipboard.writeText(textToCopy);
      setToastMessage('Email content copied to your clipboard.');
      setToastShow(true);
      setToastStatus('success');
    } catch (error) {
      console.log({ error });
    }
    setGenerating(false);
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setToastMessage('Email content copied to your clipboard.');
    setToastShow(true);
    setToastStatus('success');
  };

  return (
    <div className='h-full flex flex-col p-2 gap-2 md:flex-row'>
      <div className='flex-1 flex flex-col p-2 rounded bg-white dark:bg-gray-650 dark:text-gray-100'>
        <CustomerMoodSelect value={customerMood} onChange={setCustomerMood} />
        <BulletedTextInput
          label='What are the facts?'
          value={prompt}
          onChange={setPrompt}
          className='mt-4'
        />
        <div className='flex justify-end'>
          <button
            onClick={handleGenerateContent}
            className={`btn btn-primary mt-4 ${
              generating && 'cursor-not-allowed opacity-40'
            }`}
          >
            <span>Generate</span>
          </button>
        </div>
      </div>
      <div className='flex-1 flex flex-col bg-white p-2 rounded overflow-hidden bg-gray-50 dark:bg-gray-650 dark:text-gray-100'>
        <div className='flex-1 overflow-y-auto'>
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
          <div ref={dummyRef} />
        </div>
        <div className='flex justify-end mt-4'>
          <div
            onClick={handleCopy}
            className='rounded p-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700'
          >
            <CopyIcon className='w-6 h-6' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailContentPage;
