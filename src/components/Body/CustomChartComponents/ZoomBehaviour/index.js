export function last(array, accessor) {
    // console.log('called');
    // console.log(accessor,array);
	if (accessor && array) {
		let value;
		for (let i = array.length - 1; i >= 0; i--) {
			value = array[i];
			if (isDefined(accessor(value))) return value;
		}
		return undefined;
	}
    // console.log(array);
	const length = array ? array.length : 0;
	return length ? array[length - 1] : undefined;
}

export function lastValid(array,accessor)
{
    if (accessor && array) {
		let value;
		for (let i = array.length - 1; i >= 0; i--) {
			value = array[i];
			if (isDefined(accessor(value))) return value;
		}
		return undefined;
	}
    const obj = array.slice().reverse().find(x => isDefined(x.open) && isDefined(x.close))
    return isDefined(obj) ? obj : undefined;
}

export function isDefined(d) {
	return d !== null && typeof d != "undefined";
}
