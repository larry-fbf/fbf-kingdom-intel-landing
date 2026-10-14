// Server-only, November-specific configuration. No legacy cohort fallbacks.
// The verification marker is an operator release gate, not provider certification.
type Env = Record<string, string | undefined>;
export function getLaunchConfig(kind: 'regular' | 'vip', env: Env = process.env) {
  const prefix = kind === 'vip' ? 'KI_NOVEMBER_2026_VIP_' : 'KI_NOVEMBER_2026_';
  const read = (key: string) => env[prefix + key] || '';
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const attioList = read('ATTIO_LIST_ID');
  const eventOption = env.KI_NOVEMBER_2026_ATTIO_EVENT_OPTION_ID || '';
  const brevoList = Number(read('BREVO_LIST_ID'));
  const smsList = read('SIMPLETEXTING_LIST_ID');
  if (read('VERIFIED') !== 'november-2026' || !uuid.test(attioList) || !uuid.test(eventOption)
    || !Number.isSafeInteger(brevoList) || brevoList <= 0 || !/^[a-f0-9]{24}$/i.test(smsList)) return null;
  // Exact nonsecret destinations independently read from providers October 14.
  const expected = kind === 'regular'
    ? ['0be88ec0-42a9-4169-bdbc-fd47a86fbcdb', 26, '6ab168287c960c8a3dff232b']
    : ['e004417b-1e62-463f-bee2-87a61c864eeb', 27, '6ab168890bb25491ec9be684'];
  if (attioList !== expected[0] || brevoList !== expected[1] || smsList !== expected[2] ||
      eventOption !== 'e4039e80-b639-4481-b24d-c00aa5b6390d') return null;
  return { attioList, eventOption, brevoList, smsList };
}
