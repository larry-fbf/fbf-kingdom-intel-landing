export type IntegrationResult = {
  ok: boolean;
  error?: string;
  skipped?: boolean;
  value?: unknown;
};

export async function captureIntegration<T>(
  label: string,
  task: () => Promise<T>,
  timeoutMs = 10000,
): Promise<IntegrationResult & { value?: T }> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const value = await Promise.race([
      task(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out`)), timeoutMs);
      }),
    ]);
    const skipped = Boolean(value && typeof value === "object" && "skipped" in value && value.skipped);
    if (skipped) {
      const reason = value && typeof value === "object" && "reason" in value && typeof value.reason === "string"
        ? value.reason
        : `${label} is not configured`;
      return { ok: false, skipped: true, error: reason, value };
    }
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : `${label} integration failed` };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

type RegistrationIntegrationResults = {
  attio: IntegrationResult;
  brevo: IntegrationResult;
  simpleTexting: IntegrationResult;
};

export function classifyRegistrationResults(results: RegistrationIntegrationResults) {
  const failedIntegrations = (Object.entries(results) as Array<
    [keyof RegistrationIntegrationResults, IntegrationResult]
  >)
    .filter(([, result]) => !result.ok)
    .map(([name]) => name);

  const accepted = results.attio.ok || results.brevo.ok;

  return {
    accepted,
    degraded: failedIntegrations.length > 0,
    failedIntegrations,
  };
}