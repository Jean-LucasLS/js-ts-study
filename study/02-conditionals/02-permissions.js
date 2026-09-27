function canEditDocument({ role, isActive, hasTwoFactorAuth }) {
  return (
    isActive &&
    hasTwoFactorAuth &&
    (role === "admin" || role === "editor")
  );
}

function canEditDocumentWithGuards(user) {
  if (!user) return false;
  if (!user.isActive) return false;
  if (!user.hasTwoFactorAuth) return false;

  return user.role === "admin" || user.role === "editor";
}

const scenarios = [
  { role: "editor", isActive: true, hasTwoFactorAuth: true },
  { role: "viewer", isActive: true, hasTwoFactorAuth: true },
  { role: "admin", isActive: false, hasTwoFactorAuth: true },
  { role: "admin", isActive: true, hasTwoFactorAuth: false }
];

for (const scenario of scenarios) {
  console.log(
    scenario,
    canEditDocument(scenario),
    canEditDocumentWithGuards(scenario)
  );
}

console.log(canEditDocumentWithGuards(null)); // false: guard against missing input.
