// Server-only, January-specific configuration. No legacy cohort fallbacks.
// The verification marker is an operator release gate, not provider certification.
type Env = Record<string, string | undefined>;
export function getLaunchConfig(kind: 'regular' | 'vip', env: Env = process.env) {
  const prefix = kind === 'vip' ? 'KI_JANUARY_2027_VIP_' : 'KI_JANUARY_2027_';
  const read = (key: string) => env[prefix + key] || '';
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const attioList = read('ATTIO_LIST_ID');
  const eventOption = env.KI_JANUARY_2027_ATTIO_EVENT_OPTION_ID || '';
  const brevoList = Number(read('BREVO_LIST_ID'));
  const smsList = read('SIMPLETEXTING_LIST_ID');
  if (read('VERIFIED') !== 'january-2027' || !uuid.test(attioList) || !uuid.test(eventOption)
    || !Number.isSafeInteger(brevoList) || brevoList <= 0 || !/^[a-f0-9]{24}$/i.test(smsList)) return null;
  // Exact nonsecret destinations independently read from providers November 24.
  const expected = kind === 'regular'
    ? ['dd7e0de7-26c7-43a8-b319-ea4b5f454e3c', 32, '6b05bd3e9a5e81ffa61b9352']
    : ['c8c50f57-ef28-41db-b3af-849fc87aea59', 33, '6b05bd2600965d56b50966ae'];
  if (attioList !== expected[0] || brevoList !== expected[1] || smsList !== expected[2] ||
      eventOption !== '031718af-253b-44c8-9c5f-20875993a3f7') return null;
  return { attioList, eventOption, brevoList, smsList };
}
