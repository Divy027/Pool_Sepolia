/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  Pool,
  Pool_Transfer,
  BurnStats
} from "generated";

Pool.Transfer.handler(async ({ event, context }) => {
  const isBurn = event.params.to.toLowerCase() === "0x0000000000000000000000000000000000000000";

  const transfer: Pool_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
    isBurn,
  };

  context.Pool_Transfer.set(transfer);

  if (isBurn) {
    const stats = await context.BurnStats.get("total") ?? {
      id: "total",
      totalBurned: BigInt(0),
    };

    const burned_amt = stats.totalBurned 
    const new_stats :BurnStats= {
      id: "total",
      totalBurned: burned_amt + event.params.value
    }
    context.BurnStats.set(new_stats);
  }
});
