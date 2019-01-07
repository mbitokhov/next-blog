import { Container } from 'inversify';

// okay so this is the best way I found of doing it.

// Container is able to be used whenever you want. But classes that have to be
// initialized asynchonously (database, job processing, api) will have to be
// initialized via initializeContainer (this gets called in server.php). Considering
// this is a simple blogging app (which all it does is read from files), I'm
// just writing this in the future for any person wishing to extend it. feel
// free to replace it with anything better.

export const container = new Container({
  autoBindInjectable: true,
});

export async function initializeContainer(): Promise<void> {
}