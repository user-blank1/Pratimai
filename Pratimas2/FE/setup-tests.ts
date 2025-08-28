import "@testing-library/jest-dom";

// Polyfill TextEncoder for Jest/Node
import { TextEncoder, TextDecoder } from "util";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).TextDecoder = TextDecoder;
