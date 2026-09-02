export class RegistrationRequestError extends Error {
  status: number | null;
  kind: "timeout" | "server" | "network";

  constructor(message: string, options: { status?: number | null; kind: "timeout" | "server" | "network" }) {
    super(message);
    this.name = "RegistrationRequestError";
    this.status = options.status ?? null;
    this.kind = options.kind;
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
    const payload = await response.json().catch(() => null) as ({ ok?: boolean; error?: string } & T) | null;

    if (!response.ok) {
      throw new RegistrationRequestError(
        payload?.error || "We could not save your registration. Please try again.",
        { status: response.status, kind: "server" },
      );
    }

    if (!payload || typeof payload !== "object" || payload.ok !== true) {
      throw new RegistrationRequestError(
        "The registration service did not confirm your registration. Please try again.",
        { status: response.status, kind: "server" },
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof RegistrationRequestError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new RegistrationRequestError(
        "Registration is taking longer than expected. Please try again.",
        { kind: "timeout" },
      );
    }
    throw new RegistrationRequestError(
      "We could not reach the registration service. Check your connection and try again.",
      { kind: "network" },
    );
  } finally {
    clearTimeout(timeout);
  }
}