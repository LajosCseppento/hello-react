import React, {FormEvent, useEffect, useState} from 'react';
import {useErrorHandler} from 'react-error-boundary';
import {useLocation} from 'react-router-dom';

import client, {doRequest} from '../utils/client';

export type EditablePageProps = {
  title: string;
  getRequest: () => Promise<string>;
  setRequest: (content: string) => Promise<unknown>;
};

export default function EditablePage(props: EditablePageProps) {
  const [content, setContent] = useState('Loading...');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const handleError = useErrorHandler(null);

  const reload = () => {
    setContent('Loading...');
    setLoading(true);
    doRequest(
      props.getRequest,
      content => {
        setContent(content);
        setLoading(false);
      },
      handleError
    );
  };

  const handleContentChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    doRequest(
      () => client.postEditablePage(content),
      () => alert('Content saved!'),
      handleError
    );
  };

  useEffect(() => {
    reload();
  }, [location]);

  return (
    <>
      <h2>{props.title}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading}>
            <textarea
              name="content"
              onChange={handleContentChange}
              value={content}
            />
            <input type="submit" value="Submit" />
            <button type="button" onClick={reload}>
              Reload
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
