import {  
  serverGetCosts
} from '../../func/serverServiceCosts';

export function isAccountBeingUsed(accounts_name_id) {	
	serverGetCosts(({ isSuccess, data }) => {
		if (isSuccess) {
			return isAccountPresent(accounts_name_id, data);
		} else {
			return false;
		}
	});
};

function isAccountPresent(accounts_name_id, array) {
	const res = array.some(item => {
		return accounts_name_id === item.accounts_name_id
	});
}

// function getDataOne() {
	// return new Promise((resolve, reject) => {
		
		// serverGetCosts(({ isSuccess, data }) => {
			// if (isSuccess) {
				// resolve(data);
			// } else {
				// reject();
			// }
		// });
	// });
// }

// export async function isAccountBeingUsed(accounts_name_id) {	
	// const resultOne = await getDataOne().catch(err => { return null });
	
	// if (resultOne) {
		// return isAccountPresent(accounts_name_id, resultOne);
	// }
	
	// return false;
// };