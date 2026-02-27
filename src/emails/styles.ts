export const paragraph = {
  fontFamily: "neue-haas-grotesk-text, sans-serif",
  fontSize: "13px",
  lineHeight: "18px",
  color: "#000000",
  margin: "13px 0"
}

export const ctaButton = {
  display: "inline-block",
  backgroundColor: "#A31F34",
  color: "#FFFFFF",
  fontFamily: "neue-haas-grotesk-text, sans-serif",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: "120%",
  textDecoration: "none",
  padding: "10px 25px",
  borderRadius: "4px"
}

export const fallbackUrl = {
  ...paragraph,
  fontSize: "12px",
  wordBreak: "break-all" as const
}
