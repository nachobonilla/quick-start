import { Address, Hex, createMemoryClient, http } from "tevm";
import { optimism } from "tevm/common";
import { prefundedAccounts } from "tevm";
import { SimpleContract } from "tevm/contract";
import { EthjsAccount, EthjsAddress, bytesToHex } from '@tevm/utils'

// To get rid of the red underline for this import you must use the local typescript version
// https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript
// > Typescript: Select Typescript version: Use Workspace Version
import { Counter } from "../contracts/Counter.s.sol";
// This counter contract got imported from a solidity file directly into TypeScript
// Logging counter contract to see what properties it has
// If we add natspec comments to the contract they will also show up here
// Hover over it to see it'
console.log(Counter);
console.log("accounts prefunded with 1000 eth", prefundedAccounts);

const app = document.querySelector("#app") as Element;


const memoryClient = createMemoryClient();


/**
 * Runs the app demonstrating basic tevm features
 * More features are demonstrated in the `counter.spec.ts` file
 */
async function runApp() {
	// Initialize the html
	let vm = await memoryClient.transport.tevm.getVm();
	let counter = await memoryClient.tevmDeploy({
		from: prefundedAccounts[0],
		abi: Counter.abi,
		bytecode: `${Counter.bytecode}`,
		args: [],
	  })

		console.log(`counter ${JSON.stringify(counter, (_, v) => typeof v === "bigint"? v.toString():v)}`);
	await memoryClient.tevmMine()
	try {
		let account = await vm.stateManager.getAccount(EthjsAddress.fromString(counter.createdAddress))
	}

	catch(err){
		console.log(`err ${err}`)
	}
}

runApp();

/**
 * See `counter.spec.ts` for more advanced features
 */
