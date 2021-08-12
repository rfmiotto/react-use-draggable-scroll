import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDraggable } from '../src';
import { useRef } from 'react';

const App = () => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div
      {...events}
      ref={ref}
    >
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
