import assert from "assert";
import { 
  TestHelpers,
  Pool_Transfer
} from "generated";
const { MockDb, Pool } = TestHelpers;

describe("Pool contract Transfer event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for Pool contract Transfer event
  const event = Pool.Transfer.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("Pool_Transfer is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await Pool.Transfer.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualPoolTransfer = mockDbUpdated.entities.Pool_Transfer.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedPoolTransfer: Pool_Transfer = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      from: event.params.from,
      to: event.params.to,
      value: event.params.value,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualPoolTransfer, expectedPoolTransfer, "Actual PoolTransfer should be the same as the expectedPoolTransfer");
  });
});
