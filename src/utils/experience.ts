const EXP_CONSTANT = 0.2;
export const expLevel = (exp: number) => {
  return Math.max(1, Math.floor(EXP_CONSTANT * Math.sqrt(exp)));
};

export const nextExpLevel = (exp: number) => {
  const current = expLevel(exp);
  const next = expForCurrentLevel(current + 1);
  return next;
};

export const expForCurrentLevel = (level: number) => {
  return (level / 0.2) * (level / 0.2);
};
