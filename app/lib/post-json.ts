export const REGISTRATION_UNCERTAIN_MESSAGE = "We could not confirm the outcome of your registration. It may have been saved. Do not resubmit. Check your confirmation email (including spam), or contact support@fueledbyfire.com so we can verify your registration.";

export class RegistrationRequestError extends Error {
  status: number | null;
  kind: "timeout" | "server" | "network";
  retryable: boolean;
  uncertain: boolean;

  constructor(message: string, options: { status?: number | null; kind: "timeout" | "server" | "network"; retryable?: boolean; uncertain?: boolean }) {
    super(message);
    this.name = "RegistrationRequestError";
    this.status = options.status ?? null;
    this.kind = options.kind;
    this.retryable = options.retryable ?? false;
    this.uncertain = options.uncertain ?? false;
  }
}

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export async function postJsonWithTimeout<T>(
  url: string,
  body: unknown,
  fetcher: Fetcher = fetch,
  timeoutMs = 15000,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetcher(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => null) as ({ ok?: boolean; error?: string; retryable?: boolean } & T) | null;

    if (!response.ok && payload?.ok === false && typeof payload.error === "string" && payload.error) {
      throw new RegistrationRequestError(
        payload.error,
        { status: response.status, kind: "server", retryable: payload.retryable ?? response.status === 400 },
      );
    }

    if (!response.ok || !payload || typeof payload !== "object" || payload.ok !== true) {
      throw new RegistrationRequestError(
        REGISTRATION_UNCERTAIN_MESSAGE,
        { status: response.status, kind: "server", uncertain: true },
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof RegistrationRequestError) throw error;
    throw new RegistrationRequestError(
      REGISTRATION_UNCERTAIN_MESSAGE,
      { kind: error instanceof Error && error.name === "AbortError" ? "timeout" : "network", uncertain: true },
    );
  } finally {
    clearTimeout(timeout);
  }
}