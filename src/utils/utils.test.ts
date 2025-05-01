import { pause, lang, someUtilityFunction } from './utils.js';
import { BotContext } from '../services/bot/bot.js';

describe('pause', () => {
  it('should pause for the specified duration', async () => {
    const start = Date.now();
    await pause(200);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(200);
  });
});

describe('lang', () => {
  it('should return the language code from ctx.from.language_code', () => {
    const ctx = { from: { language_code: 'es' }, me: {} } as BotContext;
    expect(lang(ctx)).toBe('es');
  });

  it('should return the language code from ctx.me.language_code if ctx.from.language_code is not available', () => {
    const ctx = { from: {}, me: { language_code: 'fr' } } as BotContext;
    expect(lang(ctx)).toBe('fr');
  });

  it("should return 'en' if no language code is available", () => {
    const ctx = { from: {}, me: {} } as BotContext;
    expect(lang(ctx)).toBe('en');
  });
});

describe('someUtilityFunction', () => {
  it('should return null', () => {
    expect(someUtilityFunction()).toBeNull();
  });
});