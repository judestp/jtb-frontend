// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';

interface IHelloProps {
  name: string;
}

function Hello(props: IHelloProps) {
  return createElement('h1', null, 'Hello, ' + String(props.name));
}

describe('Hello', () => {
  it('renders greeting', () => {
    render(createElement(Hello, { name: 'Test' }));
    const heading = screen.getByRole('heading', { name: 'Hello, Test' });
    expect(heading).toBeInTheDocument();
  });
});


