// Console scenarios, verbatim from SEEDS in docs/design-handoff/reference/F-console-loop.dc.html.
export interface Seed {
  label: string;
  quote: string;
  signal: string;
  options: [string, string];
}

export const SEEDS: Record<'complaint' | 'deal' | 'calls', Seed> = {
  complaint: {
    label: 'A support ticket',
    quote: '“Exporting our weekly report takes 20 minutes, every Friday.”',
    signal: 'Problem proof: team leads repeat a manual export from your reporting screen every week.',
    options: ['One-click export from the report', 'The report, emailed on a schedule'],
  },
  deal: {
    label: 'A lost-deal note',
    quote: '“They liked us, but setup took five calls.”',
    signal: 'Problem proof: setup in your app depends on calls. Buyers want to do it themselves.',
    options: ['Guided setup inside the app', 'A setup checklist on the home screen'],
  },
  calls: {
    label: 'Customer call notes',
    quote: '“Three customers asked to approve requests from their phones.”',
    signal: 'Problem proof: approvals in your app stall when approvers are away from a desk.',
    options: ['A mobile approve screen', 'Approve straight from the email'],
  },
};

export type SeedKey = keyof typeof SEEDS;
