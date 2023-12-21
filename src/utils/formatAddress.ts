export default function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
}
