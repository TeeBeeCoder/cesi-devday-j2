import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';

it('shows the full event program initially', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Une journée pour créer, tester et publier.');
  expect(screen.getAllByRole('article')).toHaveLength(3);
});
it('filters by topic and restores the program with the clear button', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByRole('searchbox', { name: 'Rechercher un atelier' }), 'react');
  expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(screen.getByRole('status')).toHaveTextContent('1 atelier');
  await user.click(screen.getByRole('button', { name: 'Effacer la recherche' }));
  expect(screen.getAllByRole('article')).toHaveLength(3);
});
it('combines the available-places checkbox with a query and shows an empty state', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('checkbox', { name: 'Afficher seulement les ateliers avec des places' }));
  expect(screen.getAllByRole('article')).toHaveLength(2);
  await user.type(screen.getByRole('searchbox'), 'qualité');
  expect(screen.queryAllByRole('article')).toHaveLength(0);
  expect(screen.getByText('Aucun atelier ne correspond à votre recherche.')).toBeInTheDocument();
});
it('renders a query as text instead of interpreting HTML', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByRole('searchbox'), '<strong>React</strong>');
  expect(screen.getByRole('status')).toHaveTextContent('<strong>React</strong>');
  expect(screen.getByRole('status').querySelector('strong')).toBeNull();
});
