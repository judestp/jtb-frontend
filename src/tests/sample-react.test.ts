// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';

const stringVariable: number = 'Hello, World!';

/*prettier-ignore*/ (($= stringVariable)=>{console.warn(["string","number"].includes(typeof $)?$:JSON.stringify($,null,4));})();

interface IHelloProps {
  name: string;
}

function Hello(props: IHelloProps) {
  return createElement('h1', null, `Hello, ${props.name}`);
}

describe('Hello', () => {
  it('renders greeting', () => {
    render(createElement(Hello, { name: 'Test' }));
    const heading = screen.getByRole('heading', { name: 'Hello, Test' });
    expect(heading).toBeInTheDocument();
  });
});
