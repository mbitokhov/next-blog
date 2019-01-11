import { randint } from '../utils/random';

export interface Quote {
  quote: string;
  by: string;
}

const quotes: ReadonlyArray<Quote> = [
  {
    quote: 'Programs must be written for people to read, and only incidentally for machines to execute',
    by: 'Harold Abelson, Structure and Interpretation of Computer Programs',
  },
  {
    quote: 'But software which OpenBSD uses and redistributes must be free to all (be they people or companies), for any purpose they wish to use it, including modification, use, peeing on, or even integration into baby mulching machines or atomic bombs to be dropped on Australia.',
    by: 'Theo de Raadt, founder of OpenBSD',
  },
  {
    quote: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live',
    by: 'John Woods',
  },
  {
    quote: 'I\'m not a great programmer; I\'m just a good programmer with great habits.',
    by: 'Kent Beck',
  },
  {
    quote: 'Perl – The only language that looks the same before and after RSA encryption.',
    by: 'Keith Bostic',
  },
  {
    quote: 'Computer programming has always been a self-taught, maverick occupation',
    by: 'Ellen Ullman',
  },
  {
    quote: 'Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program',
    by: 'Linus Torvalds',
  },
  {
    quote: 'First learn computer science and all the theory. Next develop a programming style. Then forget all that and just hack.',
    by: 'George Carrette',
  },
  {
    quote: 'Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.',
    by: 'Larry Wall',
  },
  {
    quote: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
    by: 'Bill Gates',
  },
  {
    quote: 'Beware of bugs in the above code; I have only proved it correct, not tried it.',
    by: 'Donald E. Knuth',
  },
  {
    quote: 'One of my most productive days was throwing away 1000 lines of code',
    by: 'Ken Thompson',
  },
  {
    quote: 'Beauty is more important in computing than anywhere else in technology because software is so complicated. Beauty is the ultimate defence against complexity.',
    by: 'David Gelernter',
  },
  {
    quote: 'UNIX was not designed to stop its users from doing stupid things, as that would also stop them from doing clever things.',
    by: 'Doug Gwyn',
  },
  {
    quote: 'If you’re willing to restrict the flexibility of your approach, you can almost always do something better.',
    by: 'John Carmack',
  },
  {
    quote: 'The situation is so much better for programmers today - a cheap used PC, a linux CD, and an internet account, and you have all the tools necessary to work your way to any level of programming skill you want to shoot for.',
    by: 'John Carmack',
  },
  {
    quote: 'You can\'t trust code that you did not totally create yourself.',
    by: 'Ken Thompson',
  },
  {
    quote: 'Concurrency is not parallelism',
    by: 'Rob Pike',
  },
  {
    quote: 'There\'s nothing in computing that can\'t be broken by another level of indirection.',
    by: 'Rob Pike',
  },
  {
    quote: 'All problems in computer science can be solved by another level of indirection... Except for the problem of too many layers of indirection',
    by: 'David Wheeler',
  },
  {
    quote: 'Keep It Simple Stupid',
    by: 'Kelly Johnson',
  },
];

export default class QuoteGenerator {
  public static make(): Quote {
    return quotes[randint(quotes.length)];
  }
}
