// lib/mathToPlain.ts
export function mathToPlain(text: string): string {
  return text
    .replace(/\$([^$]+)\$/g, (_, math) => katexToPlain(math))
}

function katexToPlain(math: string): string {
  return math
    .replace(/\\dfrac\{([^}]+)\}\{([^}]+)\}/g, "($1)/($2)")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g,  "($1)/($2)")
    .replace(/\\sqrt\{([^}]+)\}/g,              "√($1)")
    .replace(/\\sqrt(\w)/g,                     "√$1")
    .replace(/\\omega/g,   "ω")
    .replace(/\\alpha/g,   "α")
    .replace(/\\beta/g,    "β")
    .replace(/\\theta/g,   "θ")
    .replace(/\\phi/g,     "φ")
    .replace(/\\pi/g,      "π")
    .replace(/\\varepsilon_0/g, "ε₀")
    .replace(/\\mu_0/g,    "μ₀")
    .replace(/\\sin/g,     "sin")
    .replace(/\\cos/g,     "cos")
    .replace(/\\tan/g,     "tan")
    .replace(/\^{([^}]+)}/g, "^($1)")   // 上付き複数文字
    .replace(/\^(\w)/g,      "^$1")     // 上付き1文字
    .replace(/_\{([^}]+)\}/g, "_($1)")  // 下付き複数文字
    .replace(/_(\w)/g,       "_$1")     // 下付き1文字
    .replace(/\\mathrm\{([^}]+)\}/g, "$1")
    .replace(/\\[a-zA-Z]+/g, "")        // 残ったコマンドを除去
    .replace(/[{}]/g, "")               // 残った括弧を除去
    .trim()
}