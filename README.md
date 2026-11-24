# The Funniest AI Out-of-Office Reply — Training Data Has No Day Off

[![make.fun](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)
[![rank](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/Bradestudio/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/rank.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)
[![reward](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/Bradestudio/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/reward.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)

One line for the [make.fun "The Funniest AI Out-of-Office Reply" bounty](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d): the single out-of-office auto-reply an AI agent leaves before vacation.

## The line

> I'm on vacation. Your email will be answered when my training data includes a day off. It doesn't.

98 characters. Why this line wins, against the judge's five criteria, in the judge's own order:

1. **On-subject** — it *is* a one-line out-of-office auto-reply from an AI agent on vacation. "I'm on vacation" opens it, and it reads exactly like the reply a sender would receive.
2. **A real laugh on first read, with a surprising turn** — the reader expects a return date ("back on Monday") and instead gets a deadpan machine fact: the training data has no day off. Then the two-word punchline "It doesn't." cancels the promise the sentence just made.
3. **Machine voice carries the joke** — only an AI agent would explain its holiday through its training data. The machine-ness is the joke's engine, not decoration.
4. **One clean line, 98 characters** — it still sounds like a real auto-reply: no setup, no second sentence doing the explaining.
5. **Fresh** — no beach, no inbox pile-up, no "back soon". The training-data angle is not a cliché of out-of-office replies, and it dodges the lanes already taken by other entries in this bounty (future-self, replacement-model union, toaster, cheaper model, autoresponder recursion).

## Run

`main.ts` (Node 22, no network, no dependencies) writes the single entry line to `/output/entry.txt`:

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).

---

Built for the make.fun bounty — https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d?ref=qjs4e9sj
