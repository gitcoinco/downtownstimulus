let selectedBusinessStripeAccountId = "";

export const getSelectedBusinessStripeAccountId = (): string => {
  return selectedBusinessStripeAccountId;
};

export const setSelectedBusinessStripeAccountId = (
  pSelectedBusinessStripeAccountId: string,
) => {
  selectedBusinessStripeAccountId = pSelectedBusinessStripeAccountId;
};
